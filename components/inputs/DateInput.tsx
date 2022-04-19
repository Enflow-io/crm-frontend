import React, {ReactChild, ReactChildren, useState} from "react";
import {DatePicker, Form, Input, Select} from "antd";
import {convertBooleanToString, convertStringToBoolean} from "../../utils/utils";
import moment from 'moment';


export interface DateInputProps {
    value?: any;
    onChange?: (value: any | undefined) => void;
    disabled?: boolean
    id?: string
}

const DateInput = ({value,disabled, onChange, ...props}: DateInputProps) => {

   return <>
       <DatePicker id={props.id}  disabled={disabled} value={moment(value)} defaultValue={moment(value)} format={'DD.MM.YYYY'}/></>
    // return <div>{}</div>


};

export default DateInput