import React, {ReactChild, ReactChildren} from "react";
import {convertBooleanToString, convertStringToBoolean} from "../../utils/utils";
import {Form, Select} from "antd";

const {Option} = Select;

export interface InfrastructureInputProps {
    value?: any;
    onChange?: (value: any | undefined) => void;
}

const blockTargets = [
    'Офис',
    'Торговая площадь',
    'Склад',
    'Производство',
    'Банк',
    'Салон красоты',
    'Кафе/ресторан',
    'Фитнес',
    'Цех',
    'Спортзал',
    'Гостиница',
    'Медицинский центр',
    'Продукты',
    'Общепит',
    'Ресторан',
    'Магазин',
    'Арендный бизнес',
    'Гипермаркет',
    'Завод',
    'Зубная поликлиника',
    'Клиника',
    'Кофейня',
    'Свободное назначение',
    'Спортивный зал',
    'Столовая',
    'Супермаркет',
    'Торговля',
    'Торговое',
    'Фастфуд',
    'Клуб',
    'Другое',
    'Шоурум',
    'Галерея',
    'Клиентский офис',
    'Ночной клуб',
    'ТНП',
    'Торговый центр ',
    'Торговый комплекс',
    'Пекарня',
    'Выпечка',
]


const TargetsBlockInput = ({value, onChange, ...props}: InfrastructureInputProps) => {


    const splittedVal = value ? value.split(',') : []
    console.log("splittedVal", splittedVal)
    return <Select
        mode="multiple"
        allowClear
        style={{width: 240}}
        placeholder="Please select"
        defaultValue={splittedVal}
        value={splittedVal}
        onChange={(values: string[])=>{
            onChange?.(values.join(','))
        }}
    >
        {blockTargets.map(item=>{
            return <Option key={item} value={item}>{item}</Option>
        })}


    </Select>
};

export default TargetsBlockInput