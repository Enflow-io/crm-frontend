import React, {useEffect, useState} from "react";
import {Button, Col, Divider, Form, Input, notification, Row, Select} from "antd";
import {ICompany, IPerson} from "../../../interfaces/CompanyInterface";
import {EditOutlined} from "@ant-design/icons";
import Api from "../../../services/Api";
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
        const submitData: Partial<IPerson> = {
            companyId: company.id,
            firstName: values.firstName,
            thirdName: values.thirdName,
            lastName: values.lastName,
            position: values.position,
            department: values.department,
            state: values.state.toString(),
            contactInfo: {
                mobilePhone: values.mobilePhone,
                workPhone: values.workPhone,
                additionalPhone: values.additionalPhone,
                email: values.email,
                additionalEmail: values.additionalEmail,
            },
        }
        if (personData?.id && !isCreate) {
            //Обновляем пользователя
            try {
                submitData.id = personData?.id
                await Api.updatePerson(submitData).then(data => {
                    setPerson(data)
                    notification.success({message: 'Контакт обновлен'})
                })
            } catch (e) {
                notification.error({message: 'Что то пошло не так'})
            }
        } else {
            try {
                await Api.createPerson(submitData).then(data => {
                    setPerson(data)
                    setPersonCreated(data)
                    notification.success({message: 'Контакт создан'})
                })
            } catch (e) {
                notification.error({message: 'Что то пошло не так'})
            }
        }
        if (setPersonCreated) setPersonCreated(submitData)
    }
    useEffect(() => {
        if (personData) {
            const personInfo = {
                ...personData,
                ...personData.contactInfo
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
                    <Form.Item
                        name={'lastName'}
                        label="Фамилия"
                        rules={[{required: true, message: 'Фамилия обязательна к заполнению'}]}
                    >
                        <Input placeholder={'Фамилия'} />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name={'firstName'}
                        label="Имя"
                        rules={[{required: true, message: 'Имя обязательно к заполнению'}]}
                    >
                        <Input placeholder={'Имя'} />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item name={'thirdName'} label="Отчество">
                        <Input placeholder={'Отчество'} />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name={'state'} label="Статус" rules={[{required: true}]} initialValue={true}>
                        <Select>
                            <Option
                                // @ts-ignore
                                value={true}>Активен</Option>
                            <Option
                                // @ts-ignore
                                value={false}>Неактивен</Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name={'position'}
                        label="Должность"
                        rules={[{required: true, message: 'Должность обязательна к заполнению'}]}
                    >
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