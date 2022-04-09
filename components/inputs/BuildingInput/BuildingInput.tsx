import React, {useEffect, useState} from "react";
import {Form, Input} from "antd";
import { Select, Spin } from 'antd';
import { SelectProps } from 'antd/es/select';
import debounce from 'lodash/debounce';
import Api from "../../../services/Api";
import {BuildingInterface} from "../../../interfaces/BuildingInterface";

export interface DebounceSelectProps<ValueType = any>
    extends Omit<SelectProps<ValueType>, 'options' | 'children'> {
    debounceTimeout?: number;
    currentBuilding?: BuildingInterface
    onChange?: (value: any) => void;
}
function BuildingInput({ debounceTimeout = 800, ...props }: DebounceSelectProps) {
    const [fetching, setFetching] = React.useState(false);
    const [options, setOptions] = React.useState<any[]>([]);
    const fetchRef = React.useRef(0);
    const currentValue = props.currentBuilding ? {
        label: `${props.currentBuilding.name} [#${props.currentBuilding.id}]`,
        value: props.currentBuilding.id,
    } : null;

    const [currValue, setCurrValue] = useState(currentValue)


    console.log(currentValue)

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

            if(currentValue){
                // @ts-ignore
                newOptions.push(currentValue)
            }

            // @ts-ignore
            setOptions(newOptions);
            setFetching(false);
        });
    };
    const debounceFetcher = React.useMemo(() => {
        return debounce(loadOptions, debounceTimeout);
    }, [debounceTimeout]);


    useEffect(()=>{
        loadOptions('')
    }, [])


    return (<>
        <Select<any>
            showSearch
            value={currValue ||  undefined}
            labelInValue
            id={'register_buildingId'}
            filterOption={false}
            onSearch={debounceFetcher}
            notFoundContent={fetching ? <Spin size="small" /> : null}
            onChange={newValue => {
                setCurrValue(newValue);


                if(props.onChange){
                    props.onChange(newValue.value)
                }

            }}
            options={options}
            placeholder={'введие название здания'}
        />
        </>
    );
}

// Usage of DebounceSelect
interface OptionValue {
    label: string;
    value: string;
}

async function fetchUserList(searchStr: string): Promise<OptionValue[]> {


    const uri = searchStr ? `/objects?limit=20&filter=name||$contL||${searchStr}` : `/objects?limit=20`
    return fetch(Api.apiUrl+uri)
        .then(response => response.json())
        .then(body => {
            return  body.map(
                (building: BuildingInterface) => ({
                    label: `${building.name} [#${building.id}]`,
                    value: building.id,
                }),
            )
        }

        );
}

export default BuildingInput;
