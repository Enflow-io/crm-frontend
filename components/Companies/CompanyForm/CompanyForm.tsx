import {Button, Col, Divider, Form, Input, notification, Row, Select} from "antd";
import React, {useEffect, useState} from "react";
import {ICompany, ICompanyContactInfo} from "../../../interfaces/CompanyInterface";
import Api from "../../../services/Api";
import {UserInterface} from "../../../interfaces/user.interface";
import {EditOutlined} from "@ant-design/icons";
import moment from "moment";
const { Option, OptGroup } = Select;


type props = {
    company: ICompany | null;
    setCompany: any;
    isCreate?: boolean;
    setIsOpenCreateModal?: any;
    setIsDataLoading?: any;
}
const CompanyForm = ({company, setCompany, isCreate = false, setIsOpenCreateModal, setIsDataLoading }: props ) => {
    const [form] = Form.useForm();
    const [companies, setCompanies] = useState<ICompany[]>([])
    const [responsibleList, setResponsibleList] = useState<UserInterface[]>([])

    useEffect(() => {
        form.setFieldsValue({ ...company });
        Api.getCompaniesList().then(data => {
            const dataWithoutCurrent = data.filter((item: ICompany) => item.id !== company?.id)
            setCompanies(dataWithoutCurrent)
        });
        Api.getUsersList().then(data => {
            setResponsibleList(data)
        })
    }, [company])
    const submitForm = async () => {
        const validate = await form.validateFields();
        if (!validate) return;
        const values = await form.validateFields()
        const contactInfo: ICompanyContactInfo = {
            phone: [],
            email: [],
            site: [],
        }
        if (values.phone1 && contactInfo.phone) contactInfo.phone.push(values.phone1);
        if (values.phone2 && contactInfo.phone) contactInfo.phone.push(values.phone2);
        if (values.email1 && contactInfo.email) contactInfo.email.push(values.email1);
        if (values.email2 && contactInfo.email) contactInfo.email.push(values.email2);
        if (values.site1 && contactInfo.site) contactInfo.site.push(values.site1);
        if (values.site2 && contactInfo.site) contactInfo.site.push(values.site2);
        const submitData = {
            name: values.name,
            nameEng: values.nameEng,
            parentId: values.parentId,
            responsibleId: values?.responsibleId ?? null,
            address: values?.address ?? null,
            isClient: values?.isClient ?? false,
            type: values?.type ?? null,
            contactInfo,
        }
        if (company?.id && !isCreate) {
            try {
                const res = await Api.updateCompany(company?.id, submitData)
                if (res.status === 200 && res.data) {
                    setCompany(res.data)
                    notification.success({
                        message: `Организация отредактирована`,
                        placement: 'bottomRight',
                        duration: 2
                    })
                } else {
                    notification.error({
                        message: `Произошла ошибка при редактировании организации`,
                        description: `${res}`,
                        placement: 'bottomRight',
                        duration: 2
                    })
                }
            } catch (e) {
                notification.error({
                    message: `Произошла ошибка при редактировании организации`,
                    placement: 'bottomRight',
                    duration: 2
                })
            }
        } else {
            try {
                const res = await Api.createCompany(submitData)
                console.log('createCompany', res)
                if (res.status === 201 && res.data) {
                    notification.success({
                        message: `Организация создана`,
                        placement: 'bottomRight',
                        duration: 2
                    })
                    if (setIsOpenCreateModal) setIsOpenCreateModal(false)
                    if (setIsDataLoading) setIsDataLoading(true)
                } else {
                    notification.error({
                        message: `Произошла ошибка при создании организации`,
                        description: `${res}`,
                        placement: 'bottomRight',
                        duration: 2
                    })
                }
            } catch (e) {
                console.log(e)
                notification.error({
                    message: `Произошла ошибка при создании организации`,
                    description: `${e}`,
                    placement: 'bottomRight',
                    duration: 2
                })
            }
        }
    }
    return (
            <Form
                layout={'vertical'}
                form={form}
            >
                <Divider>Общая информация</Divider>
                <Form.Item
                    label="Название"
                    name="name"
                    initialValue={company?.name}
                    rules={[
                        {
                            required: true,
                            min: 3,
                            message: "Поле обязательно к заполнению. Минимальная длина 3 символа",
                        }
                    ]}
                >
                    <Input/>
                </Form.Item>
                {/*<Form.Item*/}
                {/*    label="Название на английском"*/}
                {/*    name="nameEng"*/}
                {/*    initialValue={company?.nameEng}*/}
                {/*>*/}
                {/*    <Input/>*/}
                {/*</Form.Item>*/}
                <Form.Item
                    label="Родительская организация"
                    name={'parentId'}
                    initialValue={company?.parentId}
                >
                    <Select
                        showSearch
                        allowClear
                        placeholder="Выберите родительскую организацию"
                        optionFilterProp="children"
                        options={
                            companies.map(c => ({ label: c.name, value: c.id }))
                                .sort((a, b) =>
                                    a.label.localeCompare(b.label))
                        }
                        filterOption={(input, option) =>
                            //@ts-ignore
                            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
                        }
                        filterSort={(optionA, optionB) =>
                            //@ts-ignore
                            (optionA?.label ?? "").toLowerCase().localeCompare((optionB?.label ?? "").toLowerCase())
                        }
                    >
                    </Select>
                </Form.Item>
                {!isCreate && <Form.Item
                    label="Тип"
                    name="type"
                    initialValue={company?.type}
                >
                    <Input disabled={true}/>
                </Form.Item>}
                <Form.Item
                    label={'Адрес'}
                    name="address"
                    initialValue={company?.address}
                >
                    <Input />
                </Form.Item>
                <Divider>Контактная информация</Divider>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            label="Телефон 1"
                            name="phone1"
                            initialValue={company?.contactInfo?.phone && company?.contactInfo?.phone[0] ? company?.contactInfo?.phone[0] : ''}
                        >
                            <Input type={"phone"}/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Телефон 2"
                            name="phone2"
                            initialValue={company?.contactInfo?.phone && company?.contactInfo?.phone[1] ? company?.contactInfo?.phone[1] : ''}
                        >
                            <Input type={"phone"}/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            label="Email 1"
                            name="email1"
                            initialValue={company?.contactInfo?.email && company?.contactInfo?.email[0] ? company?.contactInfo?.email[0] : ''}
                        >
                            <Input type={"email"}/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Email 2"
                            name="email2"
                            initialValue={company?.contactInfo?.email && company?.contactInfo?.email[1] ? company?.contactInfo?.email[1] : ''}
                        >
                            <Input type={"email"}/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            label="Сайт 1"
                            name="site1"
                            initialValue={company?.contactInfo?.site && company?.contactInfo?.site[0] ? company?.contactInfo?.site[0] : ''}
                        >
                            <Input/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Сайт 2"
                            name="site2"
                            initialValue={company?.contactInfo?.site && company?.contactInfo?.site[1] ? company?.contactInfo?.site[1] : ''}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Divider>Маркетинг</Divider>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            label="Клиент"
                            name="isClient"
                            initialValue={company?.isClient}
                        >
                            <Select>
                                <Option
                                    // @ts-ignore
                                    value={false}>Нет</Option>
                                <Option
                                    // @ts-ignore
                                    value={true}>Да</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Ответственный"
                            name="responsibleId"
                            initialValue={company?.responsibleId}
                        >
                            <Select
                                showSearch
                                allowClear
                                placeholder="Выберите ответственного"
                                optionFilterProp="children"
                                options={responsibleList.map(r => ({ label: r.name + ' ' + r.lastName, value: r.id }))}
                                filterOption={(input, option) =>
                                    //@ts-ignore
                                    (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
                                }
                                filterSort={(optionA, optionB) =>
                                    //@ts-ignore
                                    (optionA?.label ?? "").toLowerCase().localeCompare((optionB?.label ?? "").toLowerCase())
                                }
                            >

                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                {!isCreate && <>
                    <Divider>Системная информация</Divider>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                label="Создан"
                                name="createdAt"
                                initialValue={company?.createdAt}
                            >
                                <Input disabled={true}/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Пользователь"
                                name={'createdByUser.name'}
                                initialValue={company?.createdByUser?.name + ' ' + company?.createdByUser?.lastName}
                            >
                                <Input disabled={true}/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                label="Обновлен"
                                name="updatedAt"
                                initialValue={company?.updatedAt}
                            >
                                <Input disabled={true}/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Пользователь"
                                name={'updatedByUser?.name'}
                                initialValue={company?.updatedByUser !== null ? company?.updatedByUser?.name + ' ' + company?.updatedByUser?.lastName : ''}
                            >
                                <Input disabled={true}/>
                            </Form.Item>
                        </Col>
                    </Row>
                </>}
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
export default CompanyForm;