import React, {useEffect, useState} from "react";
import {Button, Col, Divider, Form, Input, notification, Row, Select} from "antd";
import {ICompany, IPerson} from "../../../interfaces/CompanyInterface";
import {EditOutlined} from "@ant-design/icons";
const { Option, OptGroup } = Select;
type personFormProps = {
    company: ICompany
    personData?: IPerson | null
    isCreate?: boolean
    setPersonCreated?: any
}
const PersonForm = ({company, personData, isCreate = false, setPersonCreated}: personFormProps) => {
    const [form] = Form.useForm();
    const [person, setPerson] = useState<IPerson>({} as IPerson)

    const submitForm = async () => {
        const validate = await form.validateFields();
        if (!validate) return;
        const values = await form.validateFields()
        const submitData = {
            companyId: values.companyId,
            name: values.name,
            surname: values.surname,
            lastName: values.lastName,
            position: values.position,
            department: values.department,
            isActive: values.isActive,
            contacts: {
                mobilePhone: values.mobilePhone,
                workPhone: values.workPhone,
                additionalPhone: values.additionalPhone,
                email: values.email,
                additionalEmail: values.additionalEmail,
            },
            //Для теста. Удалить
            id: 1,
        }
        if (personData?.id && !isCreate) {
            // try {
            //     const res = await onSave(submitData, personData?.id)
            //     if (res) {
            //         notification.success({message: 'Успешно'})
            //     }
            // } catch (e) {
            //     notification.error({message: 'Что то пошло не так'})
            // }
        }
        if (setPersonCreated) setPersonCreated(submitData)
    }
    useEffect(() => {
        if (personData) {
            const personInfo = {
                ...personData,
                ...personData.contacts
            }
            form.setFieldsValue({ ...personInfo });
            setPerson(personData)
        }
    }, [personData])
    return (
        <Form form={form} name={'personFrom'} layout={'vertical'} >
            <Divider>Основная информация</Divider>
            <Form.Item name={'company'} label="Компания" initialValue={company.name}>
                <Input disabled={true} />
            </Form.Item>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item name={'lastName'} label="Фамилия" rules={[{required: true}]}>
                        <Input placeholder={'Фамилия'} />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name={'name'} label="Имя" rules={[{required: true}]}>
                        <Input placeholder={'Имя'} />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item name={'surname'} label="Отчество">
                        <Input placeholder={'Отчество'} />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name={'isActive'} label="Статус" rules={[{required: true}]} initialValue={true}>
                        <Select>
                            <Option value={true}>Активен</Option>
                            <Option value={false}>Неактивен</Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item name={'position'} label="Должность" rules={[{required: true}]}>
                        <Input placeholder={'Должность'} />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name={'department'} label="Департамент">
                        <Input placeholder={'Департамент'} />
                    </Form.Item>
                </Col>
            </Row>

            <Divider>Контактная информация</Divider>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item name={'mobilePhone'} label="Мобильный телефон">
                        <Input type={'phone'} placeholder={'Мобильный телефон'} />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name={'workPhone'} label="Рабочий телефон">
                        <Input type={'phone'} placeholder={'Рабочий телефон'} />
                    </Form.Item>
                </Col>
            </Row>
            <Form.Item name={'additionalPhone'} label="Дополнительный телефон">
                <Input type={'phone'} placeholder={'Дополнительный телефон'} />
            </Form.Item>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item name={'email'} label="Email 1">
                        <Input type={'email'} placeholder={'Email'} />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name={'additionalEmail'} label="Email 2">
                        <Input type={'email'} placeholder={'Дополнительный email'} />
                    </Form.Item>
                </Col>
            </Row>
            <Row justify="center" align="middle">
                <Button type={'primary'}

                        onClick={async () => {
                            await submitForm()
                        }} icon={<EditOutlined/>}>
                    Сохранить данные
                </Button>
            </Row>
        </Form>
    )
}

export default PersonForm;