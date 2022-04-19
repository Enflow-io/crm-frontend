import {Button, Divider, Form, Input, notification, Select, Tooltip} from "antd";
import {InfoCircleOutlined, UserOutlined} from '@ant-design/icons';
import React, {useEffect, useState} from "react";
import {BlockInterface} from "../../../interfaces/BlockInterface";
import {submitBuildingForm} from "../../../effects/object";
import Api from "../../../services/Api";
import {BlockCreated, SubmitBlockForm} from "../../../effects/block.effects";
import {useRouter} from "next/router";
import BuildingInput from "../../inputs/BuildingInput/BuildingInput";
import {BuildingInterface} from "../../../interfaces/BuildingInterface";
import BooleanSelect from "../../inputs/BooleanSelect";
import DateInput from "../../inputs/DateInput";
import UserInput from "../../inputs/UserInput/UserInput";
import PriceInput from "../../inputs/PriceInput/PriceInput";

const {Option} = Select;

interface BlockFormProps {
    modelData?: BlockInterface
    isCreating?: boolean
    onUpdate?: (params: any) => void
    preselectedBuilding?: BuildingInterface
    successRedirect?: boolean

}

interface FieldData {
    name: string | number | (string | number)[];
    value?: any;
    touched?: boolean;
    validating?: boolean;
    errors?: string[];
}

const BlockForm = ({
                       isCreating = false,
                       modelData,
                       successRedirect = true, ...otherProps
                   }:
                       BlockFormProps
) => {


    const [isDataLoading, setIsDataLoading] = useState(false);
    const [form] = Form.useForm();
    const router = useRouter();

    const [fields, setFields] = useState<FieldData[]>([]);

    useEffect(() => {
        const watcher = SubmitBlockForm.done.watch(async () => {
            setIsDataLoading(true)
            try {
                let props = form.getFieldsValue();
                await form.validateFields()

                try {
                    let res;
                    if (isCreating) {

                        res = await Api.createBlock(props)
                        await BlockCreated()

                    } else {
                        if (modelData) {
                            res = await Api.updateBlock(props, modelData.id)

                        } else {
                            throw Error("No block data for updating")
                        }
                    }


                    notification.success({
                        message: isCreating ? `Блок ${props.name} создан с номером #${res.data.id}` : 'Данные сохранены',
                        placement: 'bottomRight'
                    });
                    if (isCreating) {
                        if (successRedirect) {
                            await router.push(`/blocks/${res.data.id}`)

                        }
                    } else {
                        if (otherProps.onUpdate) {
                            otherProps.onUpdate(res)
                        }
                    }
                } catch (e: any) {
                    notification.error({
                        message: isCreating ? `Ошибка при создании блока: ${props.name}` : 'Ошибка при сохранении данных',
                        description: "Текст ошибки: " + e.message,
                        placement: 'bottomRight'
                    });
                }
            } catch (e: any) {
                console.log(e.message);
            }

            setIsDataLoading(false)

        });


        return function cleanup() {
            watcher()
        }

    }, [])


    const formItemLayout = {
        labelCol: {span: 4},
        wrapperCol: {span: 12},
    };
    let initialValues: any = {
        isOnAvito: false,
        isOnSite: false,
        isOnCian: false,
        isOnYandex: false,
        avitoDescription: ''

    }
    if (isCreating) {
        if (otherProps.preselectedBuilding) {
            initialValues = {
                buildingId: otherProps.preselectedBuilding.id
            }
        }

    } else {
        initialValues = modelData
    }


    useEffect(() => {
        form.resetFields();
        form.validateFields();
        console.log(form.getFieldValue('updatedBy'))
        console.log(modelData)
    }, [modelData])
    const getFieldState = (fieldName: string) => {
        // @ts-ignore
        const field = fields.find(el => el.name[0] === fieldName);


        if (field) {
            return field.value;
        } else {

            // @ts-ignore
            if ((!modelData || !modelData[fieldName]) && !initialValues[fieldName]) {
                return undefined;
            }

            // @ts-ignore
            if (!modelData[fieldName]) {
                return initialValues[fieldName]
            }
            // @ts-ignore
            return modelData[fieldName]
        }

    }


    const setFieldsValue = (params: any) => {
        form.setFieldsValue(params);
    }
    return <div>
        <Form
            {...formItemLayout}
            name="register"
            scrollToFirstError
            initialValues={isCreating ? initialValues : modelData}
            form={form}
            fields={fields}
            onFieldsChange={(newFields, allFields) => {
                setFields(allFields);
                // console.log(allFields)


            }
            }


        >

            <Form.Item
                name="name"
                label="Название"
            >
                <Input/>
            </Form.Item>

            <Form.Item
                name="buildingId"
                label="Объект"
            >
                <BuildingInput
                    style={{width: '100%'}}
                    currentBuilding={otherProps.preselectedBuilding || modelData?.building}

                />
            </Form.Item>


            <Form.Item
                name="isOnRent"
                label="На рынке"
            >
                <Select defaultValue="yes" style={{width: 120}}>
                    <Option value="yes">Да</Option>
                    <Option value="no">Нет</Option>
                </Select>
            </Form.Item>

            <Form.Item
                name="floor"
                label="Этаж"
            >
                <Input type={"number"} style={{width: 120}}/>
            </Form.Item>

            <Form.Item
                name="area"
                label="Площадь"
            >
                <Input type={"number"} style={{width: 120}}/>
            </Form.Item>

            <Form.Item
                name="name-eng"
                label="Название (eng)"
            >
                <Input/>
            </Form.Item>


            <Form.Item
                name="blockType"
                label="Тип блока"
            >
                <Select defaultValue="Офис" style={{width: 240}}>
                    <Option value="Офис">Офис</Option>
                    <Option value="Банк">Банк</Option>
                    <Option value="Ритейл">Ритейл</Option>
                    <Option value="Столовая">Столовая</Option>
                    <Option value="Ресторан">Ресторан</Option>
                    <Option value="Шоу-рум">Шоу-рум</Option>
                    <Option value="ПСН">ПСН</Option>
                </Select>
            </Form.Item>





            <Form.Item
                name="bti"
                label="БОМА/БТИ"
            >
                <Select defaultValue="yes" style={{width: 240}}>
                    <Option value="БОМА">БОМА</Option>
                    <Option value="БТИ">БТИ</Option>
                </Select>
            </Form.Item>
            <Form.Item
                name="bonusPercent"
                label="Бонусный %"
            >
                <Input style={{width: 240}} type={"number"}/>
            </Form.Item>

            <Form.Item
                name="finishing"
                label="Отделка"
            >
                <Select defaultValue={'С мебелью'} style={{width: 240}}>
                    <Option value="С мебелью">С мебелью</Option>
                    <Option value="С отделкой">С отделкой</Option>
                    <Option value="Без отделки">Без отделки</Option>
                </Select>
            </Form.Item>


            <Form.Item
                name="planType"
                label="Тип планировки"
            >
                <Select defaultValue={'null'} style={{width: 240}}>
                    <Option value="Open-space">Open-space</Option>
                    <Option value="Кабинетная">Кабинетная</Option>
                </Select>
            </Form.Item>


            <Divider dashed/>


            <Form.Item
                name="taxIncluded"
                label="Налог включен?"
            >
                <Select defaultValue="yes" style={{width: 150}}>
                    <Option value="yes">Да</Option>
                    <Option value="no">Нет</Option>
                </Select>
            </Form.Item>


            <Form.Item
                name="qfsdfsdfsdf"
                label="Арендатор"
            >
                <Input type={"number"}/>
            </Form.Item>

            <Divider orientation={'left'}>Условия сделки</Divider>
            <Form.Item
                name="q"
                label="Обесп. платеж"
            >
                <Input type={"number"}/>
            </Form.Item>

            <Form.Item
                name="аq"
                label="Тип реализации"
            >
                <Select defaultValue={'null'} style={{width: 240}}>
                    <Option value="Бизнес центр">Аренда</Option>
                    <Option value="Бизнес центр2">Продажа</Option>
                    <Option value="Бизнес центр2">Субаренда</Option>
                </Select>
            </Form.Item>
            <Form.Item
                name="agreementType"
                label="Срок договора"
            >
                <Select defaultValue="yes" style={{width: 240}}>
                    <Option value="yes">Крактосрочный</Option>
                    <Option value="no">Долгосрочный</Option>
                </Select>
            </Form.Item>

            <Form.Item
                name="qа"
                label="Арендн. каник"
            >
                <Input prefix={'мес'} type={"number"}/>
            </Form.Item>

            <Form.Item
                name="q"
                label="Индексация"
            >
                <Input type={"number"}/>
            </Form.Item>


            <Divider orientation={'left'}>Коммерческие условия</Divider>

            <Form.Item
                name="ndsar"
                label="НДС аренда"
            >
                <Select defaultValue={'Включен'} style={{width: 240}}>
                    <Option value="Включен">Включен</Option>
                    <Option value="Не включен">Не включен</Option>
                    <Option value="УСН">УСН</Option>
                </Select>
            </Form.Item>

            <Form.Item
                name="currency"
                label="Валюта"
            >
                <Select defaultValue={'RUB'} style={{width: 240}}>
                    <Option value="RUB">Рубль (₽)</Option>
                    <Option value="USD">Доллар ($)</Option>
                    <Option value="EUR">Евро (€)</Option>
                </Select>
            </Form.Item>



            <Form.Item
                name="rentPriceAmount"
                label="Ставка аренды"
            >
                <PriceInput
                    setFieldsValue={setFieldsValue}
                    currency={getFieldState('currency')}
                />
            </Form.Item>


            <Form.Item
                name="salePriceAmount"
                label="Стоимость при прод."
            >
                <PriceInput
                    setFieldsValue={setFieldsValue}
                    currency={getFieldState('currency')}
                />
            </Form.Item>


            <Form.Item
                name="baseRentPrice"
                label="Базовая ставка"
            >
                <PriceInput
                    setFieldsValue={setFieldsValue}
                    currency={getFieldState('currency')}
                />
            </Form.Item>


            <Form.Item
                name="monthPriceAmount"
                label="Мес. аренд. платеж"
            >
                <PriceInput
                    setFieldsValue={setFieldsValue}
                    currency={getFieldState('currency')}
                />
            </Form.Item>



            <Form.Item
                name="fullPriceAmount"
                label="Общая стоимость лота"
            >
                <PriceInput
                    setFieldsValue={setFieldsValue}
                    currency={getFieldState('currency')}
                />
            </Form.Item>

            <Form.Item
                name="opex"
                label="OPEX"
            >
                <Select defaultValue={'null'} style={{width: 240}}>
                    <Option value="null">Неизвестно</Option>
                    <Option value="include">Включен</Option>
                    <Option value="not_include">Не включен</Option>
                    <Option value="openbook">Open-book</Option>
                </Select>
            </Form.Item>

            <Form.Item
                name="opexPrice"
                label="OPEX размер"
            >
                <PriceInput
                    setFieldsValue={setFieldsValue}
                    currency={getFieldState('currency')}
                />
            </Form.Item>


            <Form.Item
                name="commCosts"
                label="Коммун. расходы"
            >
                <PriceInput
                    setFieldsValue={setFieldsValue}
                    currency={getFieldState('currency')}
                />
            </Form.Item>








            <Form.Item
                name="ggssfq"
                label="НДС продажа"
            >
                <Input type={"number"}/>
            </Form.Item>











            <Divider>Техническая информация</Divider>

            <Form.Item
                name="xcvxcvxq"
                label="Мокрые точки"
            >
                <Select style={{width: 240}}>
                    <Option value="Бизнес центр2">неизвестно</Option>
                    <Option value="Бизнес центр">да</Option>
                    <Option value="Бизнес центр2">нет</Option>
                </Select>
            </Form.Item>


            <Form.Item
                name="qаааа"
                label="Кухня/кофе-поинт"
            >
                <Select style={{width: 240}}>
                    <Option value="Бизнес центр2">неизвестно</Option>
                    <Option value="Бизнес центр">да</Option>
                    <Option value="Бизнес центр2">нет</Option>
                </Select>
            </Form.Item>


            <Form.Item
                name="вавапфвфффq"
                label="Фальш-пол"
            >
                <Select style={{width: 240}}>
                    <Option value="Бизнес центр2">неизвестно</Option>
                    <Option value="Бизнес центр">да</Option>
                    <Option value="Бизнес центр2">нет</Option>
                </Select>
            </Form.Item>


            <Form.Item
                name="qпропропо"
                label="Потолки"
            >
                <Select style={{width: 240}}>
                    <Option value="неизвестно">неизвестно</Option>
                    <Option value="Открытые">Открытые</Option>
                    <Option value="Армстронг">Армстронг</Option>
                </Select>
            </Form.Item>

            <Divider orientation={'left'}>Описания и сайты</Divider>

            <Form.Item
                name="qffffsassbhh"
                label="Описание для брифа"
            >
                <Input.TextArea rows={3}/>
            </Form.Item>


            <Form.Item
                name="qeeeefs"
                label="Описание бриф ENG"
            >
                <Input.TextArea rows={3}/>
            </Form.Item>

            <Divider/>

            <Form.Item
                name="isOnSite"
                label="Выгрузить на сайт"
            >
                <BooleanSelect>
                    <Option value="true">да</Option>
                    <Option value="false">нет</Option>
                </BooleanSelect>
            </Form.Item>

            {getFieldState('isOnSite') &&
            <Form.Item
                name="siteDescription"
                label="Описание для сайта"
            >
                <Input.TextArea rows={3}/>
            </Form.Item>
            }

            {getFieldState('isOnSite') &&
            <Form.Item
                name="siteDescriptionEng"
                label="Описание сайт ENG"
            >
                <Input.TextArea rows={3}/>
            </Form.Item>
            }


            <Form.Item
                name="isOnCian"
                label="Выгрузить на cian.ru"
            >
                <BooleanSelect>
                    <Option value="true">да</Option>
                    <Option value="false">нет</Option>
                </BooleanSelect>
            </Form.Item>

            {getFieldState('isOnCian') &&

            <Form.Item
                name="cianDescription"
                label="Описание cian.ru"
            >
                <Input.TextArea rows={3}/>
            </Form.Item>
            }


            {getFieldState('isOnCian') &&
                <Form.Item
                name="cianId"
                label="ID в ЦИАН"
                >
                <Input disabled={true}/>
                </Form.Item>
            }


            <Form.Item
                name="isOnYandex"
                label="Выгр. на яндекс"
            >
                <BooleanSelect>
                    <Option value="true">да</Option>
                    <Option value="false">нет</Option>
                </BooleanSelect>
            </Form.Item>

            {getFieldState('isOnYandex') &&
            <Form.Item
                name="yandexDescription"
                label="Описание яндекс"
            >
                <Input.TextArea rows={3}/>
            </Form.Item>
            }


            <Form.Item
                name="isOnAvito"
                label="Выгрузить на avito"
            >
                <BooleanSelect>
                    <Option value="true">да</Option>
                    <Option value="false">нет</Option>
                </BooleanSelect>
            </Form.Item>


            {getFieldState('isOnAvito') &&
            <Form.Item
                name="avitoDescription"
                label="Описание avito"
            >
                <Input.TextArea rows={3}/>
            </Form.Item>

            }


            <Divider orientation={'left'}>Системная информация</Divider>

            <Form.Item
                name="daysExposition"
                label="Срок экспоз., дней"
            >
                <Input type={"number"}/>
            </Form.Item>

            <Form.Item
                name="qfsdff"
                label="Выход на рынок"
            >
                <Input type={"date"}/>
            </Form.Item>


            <Form.Item
                name="createdAt"
                label="Дата создания"
            >
                <DateInput disabled={true}/>
                {/*<Input disabled={true} style={{width: 240}} />*/}
            </Form.Item>


            <Form.Item
                name="updatedAt"
                label="Дата обновления"
            >
                <DateInput disabled={true}/>
            </Form.Item>

            {!isCreating &&
            <Form.Item
                name="creator"
                label="Создав. пользователь"
            >
                {getFieldState('creator') &&
                <UserInput id={'creator-user'} disabled={true} relationName={'creator'}
                           setFieldsValue={(params) => form.setFieldsValue(params)}
                           currentUser={modelData?.creator}/>
                }
                {!getFieldState('creator') &&
                <div>Объект создан системой</div>
                }

            </Form.Item>
            }

            {!isCreating &&

            <Form.Item
                name="updatedBy"
                label="Обновл. пользователем"
            >
                {!getFieldState('updatedBy') &&
                <div>Объект обновлен системой</div>
                }
                {getFieldState('updatedBy') &&
                <UserInput id={'updatedBy-user'} disabled={true} relationName={'updatedBy'}
                           setFieldsValue={(params) => form.setFieldsValue(params)}
                           currentUser={modelData?.updatedBy}/>
                }
            </Form.Item>
            }

            <Divider/>


        </Form>
    </div>
}

export default BlockForm