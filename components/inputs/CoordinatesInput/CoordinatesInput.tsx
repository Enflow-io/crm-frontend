import React, {useState} from "react";
import {Form, Input} from "antd";


export interface CoordinatesInputProps {
    value?: string[];
    onChange?: (value: any) => void;
}

const CoordinatesInput = ({value = [], onChange}: CoordinatesInputProps) => {


    return (
        <span>
    <Input
        prefix={<span style={{fontSize: '70%'}}>Lat</span>}
        style={{width: 140, marginRight: '1em'}}
        value={value[0]}
        disabled={true}
    />
            <Input
                prefix={<span style={{fontSize: '70%'}}>Long</span>}
                style={{width: 140}}
                value={value[1]}
                disabled={true}
            />
    </span>
    );
};

export default CoordinatesInput