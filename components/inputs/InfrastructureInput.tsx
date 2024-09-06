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
    'Гостиница,Иностранные языки,Нотариус,Курьерские услуги,Ремонт одежды,Автомойка,Бюро переводов,' +
    'Срочное фото,Автосервис,Ремонт обуви,Кинотеатр,Заправка картриджей,Ремонт оргтехники,Полиграфия,' +
    'Кафе,Ресторан,Столовая,Буфет,Центральная рецепция,Выставочно-складской комплекс,Фотосалон,Бассейн,' +
    'Ателье одежды,Складские помещения,Парк,Супермаркет,Минимаркет,Конференц-зал,Фуд-корт,Игровые автоматы,' +
    'Аквапарк,Беби-ситинг,Каток,Боулинг,Игровая комната';

const InfrastructureInput = ({value, onChange, ...props}: InfrastructureInputProps) => {


    const splittedVal = value ? value.split(',') : []
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
        {options.split(',').sort((a:string,b:string)=>a.localeCompare(b)).map(item=>{
            return <Option key={item} value={item}>{item}</Option>
        })}


    </Select>
};

export default InfrastructureInput