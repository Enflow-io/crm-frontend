import React, {useState} from "react";
import {Input, Select} from 'antd';
import {Field} from "../AbstractField";

const {Option} = Select;
interface StringFieldProps {
    onValChanged: (val: string) => void
    field: Field
}

const StringField = (props: StringFieldProps) => {
    const [val, setVal] = useState(props.field.value)
    return <>
        <Select defaultValue="eq" style={{width: 120}}>
            <Option value="eq">содержит</Option>
        </Select>

        <Input value={val} onChange={(value)=>{
            // debugger
            setVal(value.target.value)
            props.onValChanged(value.target.value);
        }
        } type={'text'} style={{width: 120}}/>
    </>
}

export default StringField