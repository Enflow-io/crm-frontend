import {ICompany} from "../../../interfaces/CompanyInterface";
import type { PopconfirmProps } from 'antd';
import {Button, Col, DatePicker, Divider, Form, Input, notification, Popconfirm, Row, Select, message} from "antd";
import {useEffect, useState} from "react";
import Api from "../../../services/Api";
import moment from "moment";
import {DeleteOutlined, LinkOutlined, SaveOutlined} from "@ant-design/icons";
import Link from "next/link";
const { Option, OptGroup } = Select;
const { RangePicker } = DatePicker;
interface ContragentFormProps {
    companies: ICompany[]
    contragent?: ICompany
    blockId?: number | null
    buildingId: number
    removeContragent?: any
    index?: number
}
const ContragentForm = ({companies, contragent, blockId, buildingId, removeContragent, index}: ContragentFormProps) => {
    const [form] = Form.useForm();
    const key = Math.random()
    const types = ['Арендатор', 'Агент', 'Собственник', 'УК', 'Банк', 'Физическое лицо'];
    const typesOptions = types.map((type) =>  {return {label: type, value: type}});
    const [companiesOptions, setCompaniesOptions] = useState<{label: string, value: number}[]>([])
    const [contragentType, setContragentType] = useState('Арендатор')
    const [currentCompanyId, setCurrentCompanyId] = useState<number | null>(null)
    const confirm: PopconfirmProps['onConfirm'] = (e) => {
        if (contragent?.blockToCompanies?.id) {
            Api.deatachCompany(contragent?.blockToCompanies?.id).then((res) => {
                if (res.status === 200) {
                    notification.success({message: 'Контрагент удален'})
                }
            })
        }
        removeContragent(index)
    };

    const cancel: PopconfirmProps['onCancel'] = (e) => {
        return;
    };
    useEffect(() => {
        if (contragent && contragent.id) {
            const values = {
                blockId: contragent.blockToCompanies?.blockId ?? null,
                buildingId: contragent.blockToCompanies.buildingId,
                companyId: contragent.id,
                type: contragent.blockToCompanies.type,
                contractType: contragent.blockToCompanies.details?.contractType,
                period: contragent.blockToCompanies.details?.period && contragent.blockToCompanies.details?.period.length > 0 ? contragent.blockToCompanies.details?.period.map((el: any) => moment(el, 'YYYY-MM')) : null,
                map: contragent.blockToCompanies.details?.map
            }
            setContragentType(contragent.blockToCompanies.type)
            setCurrentCompanyId(contragent.id)
            form.setFieldsValue({ ...values });
            return () => {}
        }

    }, [contragent])

    useEffect(() => {
        if (companies && companies.length > 0) {
            setCompaniesOptions(companies.map((company) =>  {return {label: company.name, value: company.id}}))
        }
    }, [companies])
    const submitForm = async () => {
        const validate = await form.validateFields();
        if (!validate) return;
        const values = form.getFieldsValue();
        if (contragent && contragent.blockToCompanies && contragent.blockToCompanies.id) {
            const data: any = {
                id: contragent.blockToCompanies.id,
                type: values.type ?? 'Арендатор',
                companyId: values.companyId,
                blockId: blockId ?? null,
                buildingId: buildingId,
                details: {
                    contractType: values.contractType ?? null,
                    period: values.period && values.period.length > 0 ? values.period.map((el: any) => el.format('YYYY-MM')) : null,
                    map: values.map ?? null
                }
            }
            const res = await Api.patchAttachedCompany(data)
            if (res.status === 200 && res.data) {
                notification.success({
                    message: 'Контрагент успешно обновлен'
                })
            }
            // update
        } else {
            // create
            const data: any = {
                type: values.type ?? 'Арендатор',
                companyId: values.companyId,
                blockId: blockId ?? null,
                buildingId: buildingId,
            }
            if (data.type === 'Арендатор') {
                data.details = {
                    contractType: values.contractType ?? null,
                    period: values.period && values.period.length > 0 ? values.period.map((el: any) => el.format('YYYY-MM')) : null,
                    map: values.map ?? null
                }
            }
            const res = await Api.attachCompany(data)
            if (res.status === 201 && res.data) {
                notification.success({
                    message: 'Контрагент успешно создан'
                })
            }
        }
    }

    return <Form form={form} name={'contragent' + key}  layout={'vertical'} >
        <Row justify={'space-between'} gutter={16}>
            <Col span={7}>
                <Form.Item name={'type'} key={'contragentType' + key} label={'Тип контрагента'} >
                    <Select
                        defaultValue={'Арендатор'}
                        onChange={(value) => setContragentType(value)} options={typesOptions}
                    />
                </Form.Item>
            </Col>
            <Col span={11}>
                <Form.Item
                    name={'companyId'}
                    key={'contragentCompany' + key}
                    label={'Компания'}
                    rules={[{ required: true, message: 'Поле "Компания" обязательно для заполнения' }]}
                >
                    <Select
                        showSearch
                        options={companiesOptions}
                        filterOption={(input, option) =>
                            //@ts-ignore
                            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
                        }
                        //@ts-ignore
                        onChange={(value) => setCurrentCompanyId(value)}
                    />
                </Form.Item>
            </Col>
            <Col span={6} style={{alignContent: 'baseline', display: 'flex', justifyContent: 'space-between'}}>
                <Form.Item key={'contragentSave' + key} label={' '}>
                    <Button  type={'primary'} onClick={submitForm} placeholder={'Сохранить'}><SaveOutlined /></Button>
                </Form.Item>
                <Form.Item key={'contragentDelete' + key} label={' '}>
                    <Popconfirm
                        title="Удалить контрагента?"
                        onConfirm={confirm}
                        onCancel={cancel}
                        okText="Да"
                        cancelText="Нет"
                    >
                        <Button danger><DeleteOutlined /></Button>
                    </Popconfirm>
                </Form.Item>
                <Form.Item key={'contragentLink' + key} label={' '}>
                    <a href={`/companies/${currentCompanyId}`} target={'_blank'} rel={'noreferrer'}><LinkOutlined /></a>
                </Form.Item>
            </Col>
        </Row>
        {contragentType === 'Арендатор' &&
            <Row justify={'space-between'} gutter={16}>
                <Col span={8}>
                    <Form.Item
                        name={'contractType'}
                        key={'contragentContractType' + key}
                        label={'Тип договора'}
                        rules={[{ required: true, message: 'Поле "Тип договора" обязательно для заполнения' }]}
                    >
                        <Select>
                            <Option value={'Долгосрочный'}>Долгосрочный</Option>
                            <Option value={'Краткосрочный'}>Краткосрочный</Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item name={'period'} key={'contragentPeriod' + key} label={'Период'}>
                        {/*//@ts-ignore*/}
                        <RangePicker picker="month" />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item name={'map'} key={'contragentMap' + key} label={'МАП'}>
                        <Input type={'number'} />
                    </Form.Item>
                </Col>
            </Row>
        }
        <Divider></Divider>
    </Form>
}
export default ContragentForm