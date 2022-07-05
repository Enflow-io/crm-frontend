import {Input, Select} from "antd";
import React from "react";
const {Option, OptGroup} = Select;

const RangeInput = ()=>{
    return <Input.Group compact>
        <Select defaultValue="1">
            <Option value="1">$</Option>
            <Option value="2">EU</Option>
            <Option value="2">Р</Option>
        </Select>
        <Input style={{ width: 100, textAlign: 'center' }} placeholder="Minimum" />
        <Input
            className="site-input-split"
            style={{
                width: 30,
                borderLeft: 0,
                borderRight: 0,
                pointerEvents: 'none',
            }}
            placeholder="~"
            disabled
        />
        <Input
            className="site-input-right"
            style={{
                width: 100,
                textAlign: 'center',
            }}
            placeholder="Maximum"
        />
    </Input.Group>
}


export default RangeInput