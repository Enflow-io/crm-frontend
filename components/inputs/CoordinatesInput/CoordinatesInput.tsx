import React, {useState} from "react";
import {Form, Input} from "antd";


export interface CoordinatesInputProps {
    value?: string[];
    onChange?: (value: any) => void;
    initialPoint: any
}

const CoordinatesInput = ({value = [], onChange, initialPoint}: CoordinatesInputProps) => {


    return (
        <span>
            <Input
                prefix={<span style={{fontSize: '70%'}}>Lat</span>}
                style={{width: 140, marginRight: '1em'}}
                value={value[0] || initialPoint[0]}
                disabled={true}
                id={'lat-input'}
            />
            <Input
                prefix={<span style={{fontSize: '70%'}}>Long</span>}
                style={{width: 140}}
                value={value[1] || initialPoint[1]}
                disabled={true}
                id={'long-input'}
            />
    </span>
    );
};

export default CoordinatesInput