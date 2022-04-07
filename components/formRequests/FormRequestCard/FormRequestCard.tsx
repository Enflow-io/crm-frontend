import {Button, Divider, Form, Input, Select, Tooltip} from "antd";
import { InfoCircleOutlined, UserOutlined } from '@ant-design/icons';
import {useState} from "react";

const { Option } = Select;
interface FormRequestCardProps {
    model: any
    fields: any[]
}
const FormRequestCard = (props: FormRequestCardProps) =>{
    const formItemLayout = {
        labelCol: {span: 4},
        wrapperCol: {span: 12},
    };
    console.log(props)

    return <div>
        <Form
            {...formItemLayout}
            name="register"
            fields={props.fields}
            scrollToFirstError


        >
            <Form.Item
                name="source"
                label="Источник"

            >
                <Input disabled={true}/>
            </Form.Item>
            <Form.Item
                name="name"
                label="Название"
            >
                <Input/>
            </Form.Item>

            <Form.Item
                name="subject"
                label="Тема"
            >
                <Input disabled={true}/>
            </Form.Item>

            <Form.Item
                name="message"
                label="Сообщение"
            >
                <Input disabled={true}/>
            </Form.Item>

            <Form.Item
                name="email"
                label="Почта"
            >
                <Input disabled={true}/>

            </Form.Item>

            <Form.Item
                name="phone"
                label="Телефон"
            >
                <Input disabled={true}/>

            </Form.Item>


        </Form>
        <Divider dashed />

    </div>
}

export default FormRequestCard