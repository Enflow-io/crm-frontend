import React, {ReactChild, ReactChildren, useState} from "react";
import {DatePicker, Form, Input, Select} from "antd";
import {convertBooleanToString, convertStringToBoolean} from "../../utils/utils";
import moment from 'moment';


export interface DateInputProps {
    value?: any;
    onChange?: (value: any | undefined) => void;
    disabled?: boolean
    id?: string
    placeholder?: string
}

const DateInput = ({value,disabled, onChange, placeholder= '–', ...props}: DateInputProps) => {

   return <>
       {/*{moment(value).toString()}*/}
       <DatePicker placeholder={placeholder} onChange={newDate=>{
           onChange?.(newDate)
        }
       } id={props.id}  disabled={disabled} value={value ? moment(value) : null}  format={'DD.MM.YYYY'}/></>
    // return <div>{}</div>


};

export default DateInput