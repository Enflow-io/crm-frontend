import React, {useEffect} from "react";
import {Input, Select} from 'antd';
import {Field} from "../AbstractField";

const {Option} = Select;
interface SelectableFieldProps {
    onValChanged: (val: string) => void
    options: any[]
    field: Field

}

const SelectableField = (props: SelectableFieldProps) => {

    useEffect(()=>{
        props.onValChanged(props.options[0]);

    }, [])
    return <>
        <Select defaultValue="eq" style={{width: 120}}>
            <Option value="eq"> = </Option>
        </Select>


        <Select
            onChange={(value)=>{
                // debugger
                props.onValChanged(value);
            }
            }
            defaultValue={props.field.value || props.options[0] || '1'} style={{width: 120}}>
            {props.options.map((el, index)=>{
                    return <Option key={index} value={el}>{el}</Option>
            })
            }

        </Select>

        {/*<Input onChange={(value)=>{*/}
        {/*    // debugger*/}
        {/*    props.onValChanged(value.target.value);*/}
        {/*}*/}
        {/*} type={'text'} style={{width: 120}}/>*/}
    </>
}

export default SelectableField