import styles from "ObjectForm.module.scss"
import {Button, Divider, Form, Input, notification, Select} from "antd";
import React, {forwardRef, useRef} from "react";
import MapSelector from "../MapSelector";
import {submitBuildingForm} from "../../../effects/object";
import CoordinatesInput from "../../inputs/CoordinatesInput/CoordinatesInput";
import Api from "../../../services/Api";
import {useRouter} from "next/router";
import {BuildingInterface} from "../../../interfaces/BuildingInterface";
import {resolveAny} from "dns";

const {Option} = Select;
const formItemLayout = {
    labelCol: {span: 4},
    // wrapperCol: {span: 12},
};

interface ObjectFormProps {
    buildingData?: BuildingInterface
    isCreate?: boolean
    onUpdate?: (params: any) => void
}

const ObjectForm = ({isCreate = false, buildingData, ...otherProps}: ObjectFormProps) => {
    const formRef = useRef()
    const [form] = Form.useForm();
    const router = useRouter();

    submitBuildingForm.watch(async () => {

        try {
            let props = form.getFieldsValue()

            // @ts-ignore
            await formRef.current.validateFields();

            try {
                let res;
                if(isCreate){
                     res = await Api.createBuilding(props)
                }else{
                    console.log(buildingData)
                    if(buildingData){
                        res = await Api.updateBuilding(props, buildingData.id)
                    }else{
                        throw Error("No building data for updating")
                    }
                }
                notification.success({
                    message: isCreate ? `Объект ${props.name} создан с номером #${res.data.id}` : 'Данные сохранены',
                    placement: 'bottomRight'
                });
                if(isCreate){
                    await router.push(`/objects/${res.data.id}`)
                }else{
                    if(otherProps.onUpdate){
                        otherProps.onUpdate(res)
                    }
                }
            } catch (e: any) {
                notification.error({
                    message: isCreate ? `Ошибка при создании объекта: ${props.name}` : 'Ошибка при сохранении данных',
                    description: "Текст ошибки: " + e.message,
                    placement: 'bottomRight'
                });
            }
        } catch (e: any) {
            console.log(e.message);
        }

    })


    const coords = form.getFieldValue('coords');
    return <Form
        form={form}
        {...formItemLayout}
        name="register"
        initialValues={isCreate ? {} : buildingData}
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
            initialValue={'A'}

        >
            <Select defaultValue="A" style={{width: 120}} onChange={e => {
                form.setFieldsValue({
                    buildingClass: e
                })
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
            <CoordinatesInput/>

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


    </Form>
}


export default ObjectForm