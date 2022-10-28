import {Select} from "antd";
import NumberField from "./Fields/NumberField";
import StringField from "./Fields/StringField";
import BooleanField from "./Fields/BooleandField";
import React, {useState} from "react";
import SelectableField from "./Fields/SelectableField";
import {MetroInput} from "../inputs/StationsInput/MetroInput";
import {CompactMetroInput} from "../inputs/CompactStationsInput/CompactMetroInput";
import {PolygonInput} from "../inputs/PolygonInput/PolygonInput";

const {Option} = Select;

interface AbstractFieldProps {
    field: Field
    index: number
    onFieldChanged: (newField: Field, index: number) => void
    options: Field[]
    prefix?: string
    query?: any


}

export interface Field {
    fieldId?: string
    condition?: string
    name?: string
    value?: any
    type: string//'number' | 'string' | 'boolean',
    options?: any[]
}

const AbstractField = (props: AbstractFieldProps) => {
    const propsField = props.field;
    const query = props.query;
    const [field, setField] = useState(propsField)
    return <>
        <Select value={field.name} placeholder={'Выберите поле'} onChange={e => {
            const found = props.options.find(el => el.fieldId === e);

            if (!found) {
                throw new Error('No such field')
            }
            // @ts-ignore
            const field: Field = found;
            props.onFieldChanged(field, props.index)
            setField(field)
        }} style={{width: 200}}>
            {props.options.map((el) => {
                return <Option key={el.fieldId} value={el.fieldId || ''}>{el.name}</Option>
            })}

        </Select>

        {field.type === 'number' &&
        <NumberField
            field={props.field}
            onValChanged={(value: any) => {
                const newField = {
                    ...field,
                    value
                };
                setField(newField)
                props.onFieldChanged(newField, props.index)
            }
            }/>
        }

        {field.type === 'string' &&
        <StringField
            field={props.field}
            onValChanged={(value: string) => {
                const newField = {
                    ...field,
                    value
                };
                setField(newField)
                props.onFieldChanged(newField, props.index)
            }
            }/>
        }

        {field.type === 'boolean' &&
        <BooleanField
            field={props.field}
            prefix={props.prefix}
            onValChanged={(value: boolean) => {
                const newField = {
                    ...field,
                    value: {
                        "term": {
                            [`${props.prefix ? props.prefix + '.' : ''}${(field?.fieldId || 'boolval').toString()}`]: value
                        }
                    }
                };
                setField(newField)
                console.log(newField)
                props.onFieldChanged(newField, props.index)
            }
            }
        />
        }

        {field.type === 'stations' &&
        <div style={{
            display: "inline-block",
            maxWidth: 300,
            // overflow: "scroll"
        }}>
            <CompactMetroInput
                dontShowFrom={true}
                // field={props.field}


                setFieldsValue={() => {
                }}
                modelData={{}}
                setStations={params => {

                    const newField = {
                        ...field,
                        value: params
                    };
                    setField(newField)
                    props.onFieldChanged(newField, props.index)

                    console.log("set stationms", params)
                    // setMetroStations(params)
                }}
            />
        </div>
        }
        {field.type === 'polygon' &&
        <div style={{
            display: "inline-block",
            maxWidth: 300,
            // overflow: "scroll"
        }}>
            <PolygonInput onSetCoordinates={(params => {


                    const newField = {
                        ...field,
                        value: params
                    };

                    setField(newField)
                    props.onFieldChanged(newField, props.index)
            })} />
        </div>
        }

        {field.type === 'selectable' &&
        <SelectableField
            field={props.field}

            options={field.options || []}
            onValChanged={(value: string) => {
                const newField = {
                    ...field,
                    value
                };
                setField(newField)
                props.onFieldChanged(newField, props.index)
            }}/>
        }


    </>
}


export default AbstractField