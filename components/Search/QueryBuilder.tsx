import styles from './Search.module.scss'
import {Input, Select} from 'antd';
import React, {useEffect, useState} from 'react';
import AbstractField, {Field} from "./AbstractField";
import Icon, {DeleteOutlined} from '@ant-design/icons';
import {BuildingCols} from "./Cols";

const {Option} = Select;


interface QueryBuilderProps {
    onQueryChanged: (query: any) => void
    cols: any[]
    prefix?: string
    query?: any
}

const QueryBuilder = (props: QueryBuilderProps) => {

    const [query, setQuery] = useState<any>(props.query || {})
    let defFields: any = false

    if(Object.keys(props.query).length > 0){
        defFields = Object.values(props.query);
    }

    const [buildingFields, setBuildingFields] = useState<Field[]>( defFields || [{
        fieldId: undefined,
        condition: undefined,
        name: undefined,
        value: undefined,
        type: 'number'
    }])


    useEffect(() => {

        let query: any = {}
        for (let field of buildingFields) {
            if (field.name && field.value && field.fieldId) {
                query[field.fieldId] = field;
            }
        }

        setQuery(query)
        console.log("query", query)

    }, [buildingFields])

    useEffect(() => {
        props.onQueryChanged(query)
    }, [query])

    const addField = () => {
        setBuildingFields([
            ...buildingFields,
            {
                fieldId: undefined,
                condition: undefined,
                value: undefined,
                type: 'number'
            }
        ])

    }

    const removeField = (index: number) => {
        let clone = [...buildingFields]

        clone = clone.filter(el => {
            return el.fieldId !== clone[index].fieldId
        })

        console.log(clone);
        // clone.splice(index, 1);

        setBuildingFields([
            ...clone
        ])
    }

    const onFieldChanged = (field: Field, index: number) => {
        const clone = [...buildingFields]
        clone[index] = field;
        setBuildingFields(clone)
    }

    const options = props.cols.filter(el => {
        return !buildingFields.map(el => el.fieldId).includes(el.fieldId)
    });


    return <div className={styles.QueryBuilder}>
        <ul>
            {buildingFields.map((field, index) => {
                return <li key={field.fieldId + '' + index}>
                    <AbstractField
                        query={props.query}
                        index={index}
                        field={field}
                        onFieldChanged={onFieldChanged}
                        options={options}
                        prefix={props.prefix}
                    />
                    <a className={styles.RemoveBtn} href={'#'} onClick={() => {
                        removeField(index)
                    }}><DeleteOutlined style={{
                        color: '#000000'
                    }}/></a>
                </li>
            })}

        </ul>
        <a href={'#'} onClick={addField} style={{
            // color: '#000000'

        }}>Добавить условие</a>

    </div>
}

export default QueryBuilder