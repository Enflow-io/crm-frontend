import React, {useEffect} from "react";
import {Input, Select} from 'antd';
import {Field} from "../AbstractField";

const {Option} = Select;

interface BooleanFieldProps {
    onValChanged: (query: any) => void
    field: Field
    prefix?: string


}

const BooleanField = (props: BooleanFieldProps) => {

    useEffect(()=>{
        props.onValChanged(true);

    }, [])
    return <>
        <Select defaultValue="eq" style={{width: 120}}>
            <Option disabled={true} value="eq"> = </Option>
        </Select>

        <Select onChange={(val: string) => {
            const booleanVal = val === 'true'
            props.onValChanged(booleanVal);
        }
        } defaultValue={props?.field?.value?.term[`${props.prefix ? props.prefix + '.' : ''}${(props.field?.fieldId || 'boolval').toString()}`].toString() || "true"} style={{width: 120}}>
            <Option  value="true">Да</Option>
            <Option  value="false">Нет</Option>
            </Select>
            </>
        }

                export default BooleanField