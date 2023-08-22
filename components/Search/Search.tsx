import React, {useState} from "react";
import {Select} from 'antd';
import styles from './Search.module.scss'
import Icon, { SearchOutlined } from '@ant-design/icons';
const {Option} = Select;
import { AutoComplete, Input } from 'antd';
import type { SelectProps } from 'antd/es/select';
import Api from "../../services/Api";
import debounce from 'lodash/debounce';
import {useRouter} from "next/router";
interface SearchProps {

}

const getRandomInt = (max: number, min = 0) => Math.floor(Math.random() * (max - min + 1)) + min;

const searchResult = (query: string) =>
    new Array(getRandomInt(5))
        .join('.')
        .split('.')
        .map((_, idx) => {
            const category = `${query}${idx}`;
            return {
                value: category,
                label: (
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
            <span>
              Found {query} on{' '}
                <a
                    href={`https://s.taobao.com/search?q=${query}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                {category}
              </a>
            </span>
                        <span>{getRandomInt(200, 100)} results</span>
                    </div>
                ),
            };
        });


const Search = (props: SearchProps) => {
    const [options, setOptions] = useState<SelectProps<object>['options']>([]);
    const [value, setValue] = useState('');
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);


    async function fetchObjects(name: string) {

        if(!name){
            return []
        }
        setIsLoading(true)
        const res = await Api.get(`/objects?page=1&limit=10&filter=name||$contL||`+name+'&or=address||$contL||'+name)
        setIsLoading(false)

        return res?.data?.data.map((item: any) => {
            return {
                label: `${item.name} (${item.address})`,
                value: item.id
            }
        })

    }
    const fetchRef = React.useRef(0);

    const debounceFetcher = React.useMemo(() => {
        const loadOptions = (value: string) => {


            fetchRef.current += 1;
            const fetchId = fetchRef.current;
            setOptions([]);
            // setFetching(true);
            fetchObjects(value).then((newOptions) => {
                if (fetchId !== fetchRef.current) {
                    // for fetch callback order
                    return;
                }

                setOptions(newOptions);
                // setFetching(false);
            });
        };

        return debounce(loadOptions, 500);
    }, []);

    const handleSearch = (value: string) => {
        setOptions(value ? searchResult(value) : []);
    };

    const onSelect = async (value: string) => {
        setValue('')
        await router.push('/objects/'+value)
    };
    return (

            <AutoComplete
                dropdownMatchSelectWidth={252}
                style={{ width: 400 }}
                options={options}
                onSelect={onSelect}
                value={value}
                onSearch={(value: string)=>{
                    setValue(value)
                    debounceFetcher(value)
                }}
                className={styles.SearchComp}
                size={'small'}
            >
                <Input.Search
                loading={isLoading} 
                size="small" placeholder="найти объект" enterButton />
                
            </AutoComplete>
    );
};

export default Search