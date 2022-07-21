import React from "react";
import {Input, Select} from 'antd';

const {Option} = Select;
interface StringFieldProps {
    onValChanged: (val: string) => void
}

const StringField = (props: StringFieldProps) => {
    return <>
        <Select defaultValue="eq" style={{width: 120}}>
            <Option value="eq">содержит</Option>
        </Select>

        <Input onChange={(value)=>{
            // debugger
            props.onValChanged(value.target.value);
        }
        } type={'text'} style={{width: 120}}/>
    </>
}

export default StringField