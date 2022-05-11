import React, {ReactChild, ReactChildren, useState} from "react";
import {Form, Input, Select} from "antd";
import {convertBooleanToString, convertStringToBoolean} from "../../utils/utils";
const Option = Select.Option;


export interface BooleanSelectProps {
    value?: any;
    onChange?: (value: any | undefined) => void;
    children: ReactChildren[] | ReactChild[];
    disabled?: boolean
    style?: any
}

const BooleanSelect = ({value, onChange, disabled = false, ...props}: BooleanSelectProps) => {

    const stringValue = convertBooleanToString(value);

    return <Select

        disabled={disabled}
        value={stringValue} onChange={(value: string)=>{
        if(onChange){
            const boolVal = convertStringToBoolean(value);
            onChange(boolVal)
        }
    }
    } style={props.style ? props.style : {width: 240}}>

        {props.children.map(child=>{
            return child;
        })}
    </Select>
};

export default BooleanSelect