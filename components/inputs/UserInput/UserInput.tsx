import React, {useEffect, useState} from "react";
import {Select, Spin} from 'antd';
import {SelectProps} from 'antd/es/select';
import debounce from 'lodash/debounce';
import Api from "../../../services/Api";
import {BuildingInterface} from "../../../interfaces/BuildingInterface";
import {UserInterface} from "../../../interfaces/user.interface";

export interface DebounceSelectProps<ValueType = any>
    extends Omit<SelectProps<ValueType>, 'options' | 'children'> {
    debounceTimeout?: number;
    currentUser?: UserInterface
    onChange?: (value: any) => void;
    setFieldsValue: (params: any) => void
    relationName: string
    disabled?: boolean
    id?: string
}

function UserInput({debounceTimeout = 800, disabled = false, ...props}: DebounceSelectProps) {
    const [fetching, setFetching] = React.useState(false);
    const [options, setOptions] = React.useState<any[]>([]);
    const fetchRef = React.useRef(0);


    const [currValue, setCurrValue] = useState<OptionValue | null>(null)

    useEffect(() => {
        const currentValue = props.currentUser ? {
            label: `${props.currentUser.name} [#${props.currentUser.id}]`,
            value: props.currentUser.id,
        } : null;

        setCurrValue(currentValue)
    }, [props.currentUser])


    const loadOptions = (value: string) => {
        fetchRef.current += 1;
        const fetchId = fetchRef.current;
        setOptions([]);
        setFetching(true);

        fetchUserList(value).then(newOptions => {
            if (fetchId !== fetchRef.current) {
                // for fetch callback order
                return;
            }

            if (currValue) {
                // @ts-ignore
                newOptions.push(currValue)
            }

            // @ts-ignore
            setOptions(newOptions);
            setFetching(false);
        });
    };
    const debounceFetcher = React.useMemo(() => {
        return debounce(loadOptions, debounceTimeout);
    }, [debounceTimeout]);


    useEffect(() => {
        loadOptions('')
    }, [])


    return (<div id={props.id}
        >
            <Select<any>
                showSearch
                value={currValue || undefined}
                labelInValue
                filterOption={false}
                disabled={disabled}
                onSearch={debounceFetcher}
                notFoundContent={fetching ? <Spin size="small"/> : null}
                onChange={newValue => {
                    setCurrValue(newValue);


                    console.log(newValue)
                    if (props.onChange) {
                        console.log("UPDATE USER!!")
                        props.onChange({id: newValue.value})

                        props.setFieldsValue({
                            [props.relationName]: {
                                id: newValue.value
                            }
                        })
                    }

                }}
                options={options}
                placeholder={'введие имя пользователя'}
            />
        </div>
    );
}

// Usage of DebounceSelect
interface OptionValue {
    label: string;
    value: number;
}

async function fetchUserList(searchStr: string): Promise<OptionValue[]> {


    const uri = searchStr ? `/users-crud?limit=20&filter=name||$contL||${searchStr}` : `/users-crud?limit=20`
    return fetch(Api.apiUrl + uri)
        .then(response => response.json())
        .then(body => {
                return body.map(
                    (user: UserInterface) => ({
                        label: `${user.name} [#${user.id}]`,
                        value: user.id,
                    }),
                )
            }
        );
}

export default UserInput;
