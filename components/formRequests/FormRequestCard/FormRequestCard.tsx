import {Button, Divider, Form, Input, Select, Row, notification} from "antd";
import {EditOutlined} from '@ant-design/icons';
import React, {useState} from "react";
import Api from "../../../services/Api";
const { TextArea } = Input;
const { Option } = Select;
interface FormRequestCardProps {
    model: any
    fields: any[]
}
const FormRequestCard = (props: FormRequestCardProps) =>{
    const [form] = Form.useForm();

    const formItemLayout = {
        labelCol: {span: 4},
        wrapperCol: {span: 12},
    };

    const submitFormRequest = async () => {

        const values = await form.validateFields()
        await Api.updateFormRequest(props.model.id, values)
        notification.success({
            message: `Заявка отредактирована`,
            placement: 'bottomRight',
        })
    }
    return <div >
        <Form
            {...formItemLayout}
            name="formRequest"
            fields={props.fields}
            scrollToFirstError
            form={form}
        >
            <Form.Item
                name="source"
                label="Источник"

            >
                <Input />
            </Form.Item>
            <Form.Item
                name="name"
                label="Имя"
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="subject"
                label="Тема"
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="message"
                label="Сообщение"
            >
                <TextArea rows={7}  />
                {/*<Input type={'textarea'} disabled={true}/>*/}
            </Form.Item>

            <Form.Item
                name="email"
                label="Почта"
            >
                <Input />

            </Form.Item>

            <Form.Item
                name="phone"
                label="Телефон"
            >
                <Input/>

            </Form.Item>
            <Row justify="center" align="middle">
                <Button type={'primary'}

                        onClick={async () => {
                             await submitFormRequest()
                        }} icon={<EditOutlined/>}>
                    Сохранить данные
                </Button>
            </Row>
        </Form>

        <Divider dashed />

    </div>
}

export default FormRequestCard