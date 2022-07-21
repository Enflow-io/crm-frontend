import React from "react";
import {Input, Select} from 'antd';

const {Option} = Select;
interface NumberFieldProps {
}

const BooleanField = () => {
    return <>
        <Select defaultValue="eq" style={{width: 120}}>
            <Option disabled={true} value="eq"> = </Option>
        </Select>

        <Select defaultValue="true" style={{width: 120}}>
            <Option  value="true">Да</Option>
            <Option  value="false">Нет</Option>
        </Select>
    </>
}

export default BooleanField