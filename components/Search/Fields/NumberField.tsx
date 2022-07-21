import React, {useState} from "react";
import {Input, Select} from 'antd';

const {Option} = Select;
interface NumberFieldProps {
    onValChanged: (query: any) => void
}
enum Conditions {
    Between = 1,
    LT,
    GT

}
const NumberField = (props: NumberFieldProps) => {
    const [conditionType, setConditionType] =  useState(Conditions.Between);
    const [query, setQuery] = useState<any>({})


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
                        onChange={(value)=>{
                            const newQuery: any = {
                                gte: parseFloat(value.target.value),

                            }

                            if(query.lte){
                                newQuery.lte = query.lte
                            }

                            setQuery(newQuery)

                            props.onValChanged(newQuery);
                        }}
                        type={'number'}  style={{width: 90}}/>
                    <Input
                        onChange={(value)=>{
                            const newQuery: any = {
                                lte: parseFloat(value.target.value),

                            }

                            if(query.gte){
                                newQuery.gte = query.gte
                            }

                            setQuery(newQuery)

                            props.onValChanged(newQuery);
                        }}
                        type={'number'}  style={{width: 90}}/>

            </>

        }

        {conditionType === Conditions.LT &&
        <Input
            onChange={(value)=>{
                const query = {
                        lte: parseFloat(value.target.value)
                }
                props.onValChanged(query);
            }}
            type={'number'}  style={{width: 120}}/>
        }
        {conditionType === Conditions.GT &&
        <Input
            onChange={(value)=>{
                const query = {
                    gte: parseFloat(value.target.value)
                }
                props.onValChanged(query);
            }}
            type={'number'}  style={{width: 120}}/>
        }

    </>
}

export default NumberField