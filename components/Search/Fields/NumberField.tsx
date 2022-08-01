import React, {useState} from "react";
import {Input, Select} from 'antd';
import {Field} from "../AbstractField";

const {Option} = Select;
interface NumberFieldProps {
    onValChanged: (query: any) => void
    field: Field

}
enum Conditions {
    Between = 1,
    LT,
    GT

}
const NumberField = (props: NumberFieldProps) => {
    const [conditionType, setConditionType] =  useState(Conditions.Between);
    const [query, setQuery] = useState<any>({})
    console.log("value ", props.field?.value)
    const [val1, setVal1] = useState(props.field?.value?.gte)
    const [val2, setVal2] = useState(props.field?.value?.lte)


    return <>
        <Select defaultValue={conditionType}
                onChange={val=>{
                    setConditionType(val)
                }}
                style={{width: 120}}>
            <Option value={Conditions.LT}> &lt;= </Option>
            <Option value={Conditions.GT}> &gt;= </Option>
            <Option value={Conditions.Between}>между</Option>
        </Select>

        {conditionType === Conditions.Between &&
            <>

                    <Input
                        value={val1}
                        onChange={(value)=>{
                            const newQuery: any = {
                                gte: parseFloat(value.target.value),

                            }

                            if(query.lte){
                                newQuery.lte = query.lte
                            }

                            setQuery(newQuery)
                            setVal1(parseFloat(value.target.value))

                            props.onValChanged(newQuery);
                        }}
                        type={'number'}  style={{width: 90}}/>
                    <Input
                        value={val2}
                        onChange={(value)=>{
                            const newQuery: any = {
                                lte: parseFloat(value.target.value),

                            }

                            if(query.gte){
                                newQuery.gte = query.gte
                            }
                            setVal2(parseFloat(value.target.value))

                            setQuery(newQuery)

                            props.onValChanged(newQuery);
                        }}
                        type={'number'}  style={{width: 90}}/>

            </>

        }

        {conditionType === Conditions.LT &&
        <Input
            value={val1}
            onChange={(value)=>{
                const query = {
                        lte: parseFloat(value.target.value)
                }
                setVal1(query.lte)
                props.onValChanged(query);
            }}
            type={'number'}  style={{width: 120}}/>
        }
        {conditionType === Conditions.GT &&
        <Input
            value={val2}
            onChange={(value)=>{
                const query = {
                    gte: parseFloat(value.target.value)
                }
                setVal2((query.gte))
                props.onValChanged(query);
            }}
            type={'number'}  style={{width: 120}}/>
        }

    </>
}

export default NumberField