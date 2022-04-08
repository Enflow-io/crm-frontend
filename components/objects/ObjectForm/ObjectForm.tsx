import styles from "ObjectForm.module.scss"
import {Button, Divider, Form, Input, Select} from "antd";
import React, {forwardRef, useRef} from "react";
import MapSelector from "../MapSelector";
import {submitBuildingForm} from "../../../effects/object";

const {Option} = Select;
const formItemLayout = {
    labelCol: {span: 4},
    // wrapperCol: {span: 12},
};



const ObjectForm = () => {
    const formRef = useRef()
    const [form] = Form.useForm();

    submitBuildingForm.watch(() => {
        // @ts-ignore
        formRef.current.validateFields()
    })


    const coords = form.getFieldValue('coords');
    console.log(coords)
    return <Form
        form={form}
        {...formItemLayout}
        name="register"
        scrollToFirstError
        // @ts-ignore
        ref={formRef}

        onFieldsChange={e => {
            console.log(e)
        }
        }


    >
        <Form.Item
            name="localId"
            label="Local ID"

        >
            <Input disabled={true}/>
        </Form.Item>
        <Form.Item
            name="name"
            label="Название"
            rules={[
                {
                    required: true,
                    message: 'название объекта должно быть указано',
                },
                {min: 15, message: 'Название не может быть короче 15 символов'},
            ]}
        >
            <Input/>
        </Form.Item>

        <Form.Item
            name="name-eng"
            label="Название (eng)"
        >
            <Input/>
        </Form.Item>

        <Form.Item
            name="area"
            label="площадь"
            rules={[
                {
                    required: true,
                    message: 'укажите площадь',
                }
            ]}
        >
            <Input style={{width: 120}} type={"number"}/>
        </Form.Item>

        <Form.Item
            name="buildingClass"
            label="Класс"
            rules={[
                {
                    required: true,
                    message: 'необходимо выбрать класс здания',
                }
            ]}
        >
            <Select defaultValue="A" style={{width: 120}} onChange={e => {
                console.log(e)
            }}>
                <Option value="A">A</Option>
                <Option value="B+">B+</Option>
                <Option value="B">
                    B
                </Option>
                <Option value="C">C</Option>
            </Select>
        </Form.Item>

        <Divider dashed/>

        <MapSelector onSelected={((addressLine, coords) => {
            form.setFieldsValue({
                address: addressLine
            })

            form.setFieldsValue({
                coords: coords
            })


        })}/>

        <Form.Item
            name="address"
            label="Адрес"
        >
            <Input/>
        </Form.Item>


        <Form.Item
            name="addressEng"
            label="Адрес (eng)"
        >
            <Input/>
        </Form.Item>




        <Form.Item
            name="coords"
            label="Координаты"

        >
            <Input

                prefix={<span style={{fontSize: '70%'}}>Lat / Long</span>}
                style={{width: 250, marginRight: '1em'}}
                // value={coords ? coords[0] : null}
            />
            {/*<Input*/}
            {/*    prefix={<span style={{fontSize: '70%'}}>Lat</span>}*/}
            {/*    style={{width: 140, marginRight: '1em'}}*/}
            {/*    // value={coords ? coords[0] : null}*/}
            {/*/>*/}
            {/*<Input*/}
            {/*    prefix={<span style={{fontSize: '70%'}}>Long</span>}*/}
            {/*    style={{width: 140}}*/}
            {/*    // value={coords ? coords[1] : null}*/}

            {/*/>*/}

        </Form.Item>


        <Divider dashed/>

        <Form.Item
            name="buildingYear"
            label="Год постройки"
            rules={[
                {
                    required: true,
                    message: 'укажите год постройки',
                }
            ]}
        >
            <Input style={{width: 120, marginRight: '1em'}}
            />
        </Form.Item>


        <Form.Item
            name="fireSystem"
            label="Пожарная система"
        >
            <Select defaultValue={'null'} style={{width: 120}} onChange={e => {
                console.log(e)
            }}>
                <Option value="true">Да</Option>
                <Option value="false">Нет</Option>
                <Option value="null">Неизвестно</Option>

            </Select>
        </Form.Item>


        {/*<Form.Item>*/}
        {/*    <Button type="primary" htmlType="submit">*/}
        {/*        Сохранить*/}
        {/*    </Button>*/}
        {/*</Form.Item>*/}
    </Form>
}


export default ObjectForm