import {Button, Form, Input, notification, Row} from "antd";
import {EditOutlined} from "@ant-design/icons";
import React from "react";
import {isIntegerField} from "../../../utils/fieldsValidators";
import Api from "../../../services/Api";

type props = {
    setAttachCompetitor?: any
}
const CompetitorForm = ({setAttachCompetitor}: props) => {
    const [form] = Form.useForm();
    const submitForm = async () => {
        const validate = await form.validateFields();
        if (!validate) return;
        const values = form.getFieldsValue();
        try {
            const res = await Api.createCompetitor({
                name: values.name,
                cianId: values.cianId
            });
            if (res.id && res.name) {
                notification.success({
                    message: `Конкурент добавлен`,
                    placement: 'bottomRight',
                    duration: 2
                })
                if (setAttachCompetitor) setAttachCompetitor(res);
            } else {
                console.log(res)
                notification.error({
                    message: `Произошла ошибка при создании конкурента`,
                    // @ts-ignore
                    description: `Возможно, конкурент с таким ID Cian уже существует`,
                    placement: 'bottomRight',
                    duration: 2
                })
            }
        } catch (e) {
                console.log(e)
                notification.error({
                    message: `Произошла ошибка при создании кокурента`,
                    description: `${e}`,
                    placement: 'bottomRight',
                    duration: 2
                })
            }
        }
    return <Form
        layout={'vertical'}
        form={form}
    >
        <Form.Item
            name={'name'}
            label={'Название'}
            rules={[
                {required: true, message: 'Название не может быть пустым'}
            ]}
        >
            <Input />
        </Form.Item>
        <Form.Item
            name={'cianId'}
            label={'ID Cian'}
            rules={[
                {required: true, message: 'ID Cian не может быть пустым'},
                {
                    validator: (_, value) => {
                        return isIntegerField(value, "ID Cian");
                    }
                }
            ]}
        >
            <Input />
        </Form.Item>
        <Row justify="center" align="middle">
            <Button type={'primary'}
                    onClick={async () => {
                        await submitForm()
                    }} icon={<EditOutlined/>}

            >
                Сохранить данные
            </Button>
        </Row>
    </Form>
}

export default CompetitorForm