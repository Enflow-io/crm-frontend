import React, {ReactChild, ReactChildren} from "react";
import {convertBooleanToString, convertStringToBoolean} from "../../utils/utils";
import {Form, Select} from "antd";

const {Option} = Select;

export interface InfrastructureInputProps {
    value?: any;
    onChange?: (value: any | undefined) => void;
}


const options = 'Банк,Банкомат' +
    ',Фитнес-центр,Студия йоги,Фитнес-клуб,Салон красоты,Парикмахерская,Магазин,' +
    'Торговая зона,Аптека,Медицинский центр,Цветы,Цветочный салон,Химчистка,Туристическое агентство,' +
    'Турагенство,Гостиница,Иностранные языки,Нотариус,Курьерские услуги,Ремонт одежды,Автомойка,Бюро переводов,' +
    'Срочное фото,Автосервис,Ремонт обуви,Кинотеатр,Заправка картриджей,Ремонт оргтехники,Полиграфия';

const InfrastructureInput = ({value, onChange, ...props}: InfrastructureInputProps) => {


    const splittedVal = value ? value.split(',') : []
    console.log("infra", splittedVal)
    return <Select
        mode="multiple"
        allowClear
        style={{width: 240}}
        placeholder="Please select"
        defaultValue={splittedVal}
        onChange={(values: string[])=>{
            onChange?.(values.join(','))
        }}
    >
        {options.split(',').map(item=>{
            return <Option key={item} value={item}>{item}</Option>
        })}


    </Select>
};

export default InfrastructureInput