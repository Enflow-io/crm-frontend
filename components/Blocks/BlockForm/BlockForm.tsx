import { Button, Divider, Form, Input, notification, Select, Spin, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { BlockInterface } from "../../../interfaces/BlockInterface";
import styles from "./BlockForm.module.scss";
import Api from "../../../services/Api";
import {
    $blockToCopyStore,
    BlockCreated,
    BlockUpdated,
    clearBlockToCopy,
    SubmitBlockForm,
} from "../../../effects/block.effects";
import { useRouter } from "next/router";
import BuildingInput from "../../inputs/BuildingInput/BuildingInput";
import { BuildingInterface } from "../../../interfaces/BuildingInterface";
import BooleanSelect from "../../inputs/BooleanSelect";
import DateInput from "../../inputs/DateInput";
import UserInput from "../../inputs/UserInput/UserInput";
import PriceInput from "../../inputs/PriceInput/PriceInput";
import { useStore } from "effector-react";
import _ from "lodash";
import { CianTypes, CommCostsOptions, PlanTypes, TaxSaleOpitons } from "../BlockOptions";
import debounce from "lodash/debounce";
import TargetsBlockInput from "../../inputs/TargetsBlockInput";

const { Option } = Select;

interface BlockFormProps {
    modelData?: BlockInterface;
    isCreating?: boolean;
    onUpdate?: (params: any) => void;
    preselectedBuilding?: BuildingInterface;
    successRedirect?: boolean;
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
    successRedirect = true,
    ...otherProps
}: BlockFormProps) => {
    const [isDataLoading, setIsDataLoading] = useState(false);
    const [form] = Form.useForm();
    const router = useRouter();

    const [isUpdating, setIsUpdating] = useState(false);

    const [daysExposition, setDaysExposition] = useState(0);

    const [fields, setFields] = useState<FieldData[]>([]);

    useEffect(() => {
        const watcher = SubmitBlockForm.done.watch(async () => {
            setIsDataLoading(true);
            try {
                // let props = form.getFieldsValue(true);
                let props = form.getFieldsValue();
                // const res = await form.validateFields(Object.keys(props))

                let res: any = {};

                try {
                    res = await form.validateFields();
                } catch (errros) {
                    res = errros;
                }

                if (res?.errorFields && res.errorFields.length > 0) {
                    setIsDataLoading(false);
                    if (res.errorFields && res.errorFields.length > 0) {
                        notification.error({
                            message: res.errorFields[0].errors[0],
                            description: "Ошибки в заполнении формы",
                            placement: "bottomRight",
                        });
                    }
                    return;
                }
                try {
                    let res;
                    if (isCreating) {
                        res = await Api.createBlock(props);
                        await BlockCreated();
                    } else {
                        if (modelData) {
                            res = await Api.updateBlock(props, modelData.id);
                            await BlockUpdated();
                        } else {
                            throw Error("No block data for updating");
                        }
                    }

                    notification.success({
                        message: isCreating
                            ? `Блок ${props.name} создан с номером #${res.data.id}`
                            : "Данные сохранены",
                        placement: "bottomRight",
                    });
                    if (isCreating) {
                        if (successRedirect) {
                            await router.push(`/blocks/${res.data.id}`);
                        }
                    } else {
                        if (otherProps.onUpdate) {
                            otherProps.onUpdate(res);
                        }
                    }
                } catch (e: any) {
                    notification.error({
                        message: isCreating
                            ? `Ошибка при создании блока: ${props.name}`
                            : "Ошибка при сохранении данных",
                        description: "Текст ошибки: " + e.message,
                        placement: "bottomRight",
                    });
                }
            } catch (e: any) {
                console.log(e);

                // debugger
                // if(e.errorFields && e.errorFields.length>0){
                //     notification.error({
                //         message: e.errorFields[0],
                //         description: "Текст ошибки: " + e.message,
                //         placement: 'bottomRight'
                //     });
                // }
            }
            clearBlockToCopy();
            setIsDataLoading(false);
        });

        return function cleanup() {
            watcher();
        };
    });

    let defaultValues: any = {
        isOnAvito: false,
        isOnSite: false,
        isOnCian: false,
        isOnYandex: false,
        avitoDescription: "",
        currency: "RUB",
        buildingId: null,
        realisationType: "rent",
    };
    const [initialValues, setInitialValues] = useState<any>({});

    const formItemLayout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 12 },
    };

    // if (isCreating) {
    //     if (otherProps.preselectedBuilding) {
    //         initialValues = {
    //             ...initialValues,
    //             buildingId: otherProps.preselectedBuilding.id
    //         }
    //     }
    //
    // } else {
    //     initialValues = modelData
    // }

    const blockToCopy = useStore($blockToCopyStore);
    const debounceSetFields = debounce(setFields, 500);

    useEffect(() => {
        setIsDataLoading(true);
        setTimeout(() => {
            if (isCreating) {
                let newInitialData = defaultValues;
                if (otherProps.preselectedBuilding) {
                    newInitialData.buildingId = otherProps.preselectedBuilding.id;
                    newInitialData.building = otherProps.preselectedBuilding;
                }

                if (!_.isEmpty(blockToCopy)) {
                    newInitialData = blockToCopy;
                }
                form.resetFields();
                const fields = [];
                for (let fieldId of Object.keys(newInitialData)) {
                    fields.push({
                        // @ts-ignore
                        name: fieldId,
                        // @ts-ignore
                        errors: [],
                        // @ts-ignore
                        touched: false,
                        // @ts-ignore
                        validating: false,
                        // @ts-ignore
                        value: newInitialData[fieldId],
                    });
                }
                form.setFields(fields);
                form.setFieldsValue({ ...newInitialData });
                setInitialValues({ ...newInitialData });
                debounceSetFields(fields);
            } else {
                const fields = [];
                const obj: any = modelData || {};
                for (let fieldId of Object.keys(obj)) {
                    fields.push({
                        // @ts-ignore
                        name: fieldId,
                        // @ts-ignore
                        errors: [],
                        // @ts-ignore
                        touched: false,
                        // @ts-ignore
                        validating: false,
                        // @ts-ignore
                        value: obj[fieldId],
                    });
                }
                form.setFields(fields);
                form.resetFields();
                form.setFieldsValue({ ...modelData });
                setInitialValues({ ...modelData });
                if (fields) {
                    debounceSetFields(fields);
                }
            }
            setIsDataLoading(false);
        }, 0);
    }, [isCreating, modelData, otherProps.preselectedBuilding, form, blockToCopy]);

    useEffect(() => {
        form.resetFields();
        form.validateFields();
    }, [modelData]);

    const getFieldState = (fieldName: string) => {
        if (fieldName === "isOnCian") {
            // debugger
        }

        // @ts-ignore
        const field = fields.find((el) => el.name === fieldName);
        //
        //
        if (field) {
            return field.value;
        }

        if (form) {
            const res = form.getFieldValue(fieldName);
            if (res) {
                return res;
            }
        }
        //
        // @ts-ignore

        // } else {
        //
        //
        //     if ((!modelData && !modelData?.[fieldName]) && !initialValues[fieldName]) {
        //         return undefined;
        //     }
        //
        //     if (!modelData && !modelData?.[fieldName]) {
        //         return initialValues[fieldName]
        //     }
        //     // @ts-ignore
        //     return modelData[fieldName]
        // }
    };

    const setFieldsValue = (params: any) => {
        form.setFieldsValue(params);
    };

    // if (isDataLoading || _.isEmpty(initialValues)) {
    //     return <Spin/>
    // }

    return (
        <div className={`${styles.BlockForm} ${isDataLoading ? styles.Loading : null}`}>
            {isDataLoading && <Spin />}
            <Form
                className={styles.Form}
                {...formItemLayout}
                name="register"
                scrollToFirstError
                // initialValues={initialValues}
                form={form}
                fields={fields}
                onFieldsChange={(newFields, allFields) => {
                    // debugger
                    debounceSetFields(allFields);
                    // setFields(allFields);
                }}
            >
                <Form.Item
                    shouldUpdate={true}
                    name="name"
                    label="Название"
                    rules={[
                        {
                            required: true,
                            message: "укажите название",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="buildingId"
                    // initialValue={initialValues}
                    label="Объект"
                    rules={[
                        {
                            required: true,
                            message: "укажите объект",
                        },
                    ]}
                    shouldUpdate={true}
                >
                    <BuildingInput
                        style={{ width: "100%" }}
                        currentBuilding={getFieldState("building")}
                        onChange={(val: number) => {
                            form.setFieldsValue({
                                buildingId: val,
                            });
                        }}
                    />
                    {/*{getFieldState('building')?.name}*/}
                </Form.Item>

                {/*<button onClick={async () => {*/}
                {/*    await form.validateFields()*/}
                {/*}}>test*/}
                {/*</button>*/}

                {/*                        <Form.Item
shouldUpdate={true} 
shouldUpdate={true}*/}
                {/*    name="isOnRent"*/}
                {/*    label="На рынке"*/}
                {/*>*/}
                {/*    <Select defaultValue="yes" style={{width: 120}}>*/}
                {/*        <Option value="yes">Да</Option>*/}
                {/*        <Option value="no">Нет</Option>*/}
                {/*    </Select>*/}
                {/*</Form.Item>*/}

                <Form.Item
                    shouldUpdate={true}
                    name="isOnMarket"
                    label="На рынке?"
                    rules={[
                        {
                            required: true,
                            message: "поле обязательно для заполнения",
                        },
                    ]}
                >
                    <Select defaultValue="нет на рынке" style={{ width: 240 }}>
                        <Option value="нет на рынке">Нет на рынке</Option>
                        <Option value="есть на рынке">Есть на рынке</Option>
                        <Option value="продан">Продан</Option>
                    </Select>
                </Form.Item>

                <Form.Item shouldUpdate={true} name="isCoworking" label="Коворкинг?">
                    <BooleanSelect style={{ width: 120 }}>
                        <Option key={"true"} value={"true"}>
                            Да
                        </Option>
                        <Option key={"false"} value={"false"}>
                            Нет
                        </Option>
                    </BooleanSelect>
                </Form.Item>

                <Form.Item
                    shouldUpdate={true}
                    name="floor"
                    label="Этаж"
                    rules={[
                        {
                            required: true,
                            message: "поле обязательно для заполнения",
                        },
                    ]}
                >
                    <Input type={"text"} style={{ width: 120 }} />
                </Form.Item>

                <Form.Item
                    shouldUpdate={true}
                    name="area"
                    label="Площадь"
                    rules={[
                        {
                            required: true,
                            message: "поле обязательно для заполнения",
                        },
                    ]}
                >
                    <Input type={"number"} style={{ width: 120 }} />
                </Form.Item>

                <Form.Item shouldUpdate={true} name="name-eng" label="Название (eng)">
                    <Input />
                </Form.Item>

                <Form.Item shouldUpdate={true} name="blockType" label="Тип блока">
                    <Select defaultValue="Офис" style={{ width: 240 }}>
                        <Option value="Офис">Офис</Option>
                        <Option value="Банк">Банк</Option>
                        <Option value="Ритейл">Ритейл</Option>
                        <Option value="Столовая">Столовая</Option>
                        <Option value="Ресторан">Ресторан</Option>
                        <Option value="Шоу-рум">Шоу-рум</Option>
                        <Option value="ПСН">ПСН</Option>
                        <Option value="ГАБ">ГАБ</Option>
                        <Option value="Здание целиком">Здание целиком</Option>
                    </Select>
                </Form.Item>

                <Form.Item shouldUpdate={true} name="bti" label="БОМА/БТИ">
                    <Select defaultValue="null" style={{ width: 240 }}>
                        <Option value="null">Неизвестно</Option>
                        <Option value="БОМА">БОМА</Option>
                        <Option value="БТИ">БТИ</Option>
                    </Select>
                </Form.Item>
                <Form.Item shouldUpdate={true} name="bonusPercent" label="Бонусный %">
                    <Input style={{ width: 240 }} type={"number"} />
                </Form.Item>

                <Form.Item shouldUpdate={true} name="finishing" label="Отделка">
                    <Select defaultValue={"С мебелью"} style={{ width: 240 }}>
                        <Option value="С мебелью">С мебелью</Option>
                        <Option value="С отделкой">С отделкой</Option>
                        <Option value="Без отделки">Без отделки</Option>
                    </Select>
                </Form.Item>

                <Form.Item shouldUpdate={true} name="planType" label="Тип планировки">
                    <Select defaultValue={"null"} style={{ width: 240 }}>
                        {PlanTypes.map((el) => {
                            // @ts-ignore
                            return (
                                // @ts-ignore
                                <Option key={el.value ? el.value : "null"} value={el.value}>
                                    {el.label}
                                </Option>
                            );
                        })}
                        {/*<Option value="Open-space">Open-space</Option>*/}
                        {/*<Option value="Кабинетная">Кабинетная</Option>*/}
                    </Select>
                </Form.Item>

                <Divider dashed />

                {/*            <Form.Item
shouldUpdate={true}*/}
                {/*    name="taxIncluded"*/}
                {/*    label="Налог включен?"*/}
                {/*>*/}
                {/*    <Select defaultValue="yes" style={{width: 150}}>*/}
                {/*        <Option value="yes">Да</Option>*/}
                {/*        <Option value="no">Нет</Option>*/}
                {/*    </Select>*/}
                {/*</Form.Item>*/}

                <Form.Item shouldUpdate={true} name="qfsdfsdfsdf" label="Арендатор">
                    <Input type={"number"} />
                </Form.Item>

                <Divider orientation={"left"}>Условия сделки</Divider>
                <Form.Item shouldUpdate={true} name="securityDeposit" label="Обесп. платеж">
                    <Input suffix={"₽"} type={"number"} style={{ width: 240 }} />
                </Form.Item>

                <Form.Item
                    shouldUpdate={true}
                    name="realisationType"
                    label="Тип реализации"
                    rules={[
                        {
                            required: true,
                            message: "поле обязательно для заполнения",
                        },
                    ]}
                >
                    <Select defaultValue={"rent"} style={{ width: 240 }}>
                        <Option value="rent">Аренда</Option>
                        <Option value="sale">Продажа</Option>
                        <Option value="subRent">Субаренда</Option>
                    </Select>
                </Form.Item>
                <Form.Item shouldUpdate={true} name="agreementType" label="Срок договора">
                    <Select style={{ width: 240 }}>
                        <Option value="null">Неизвестно</Option>
                        <Option value="short">Крактосрочный</Option>
                        <Option value="long">Долгосрочный</Option>
                    </Select>
                </Form.Item>

                <Form.Item shouldUpdate={true} name="rentalHolidays" label="Арендн. каникулы">
                    <Input style={{ width: 240 }} suffix={"мес"} type={"number"} />
                </Form.Item>

                <Form.Item shouldUpdate={true} name="indexation" label="Индексация">
                    <Input style={{ width: 240 }} type={"number"} />
                </Form.Item>

                <Divider orientation={"left"}>Коммерческие условия</Divider>

                <Form.Item shouldUpdate={true} name="taxIncluded" label="НДС аренда">
                    <Select defaultValue={"Включен"} style={{ width: 240 }}>
                        <Option value="null">Неизвестно</Option>

                        <Option value="Включен">Включен</Option>
                        <Option value="Не включен">Не включен</Option>
                        <Option value="УСН">УСН</Option>
                    </Select>
                </Form.Item>

                <Form.Item shouldUpdate={true} name="ndsSale" label="НДС продажа">
                    <Select defaultValue={"Включен"} style={{ width: 240 }}>
                        <Option value="null">Неизвестно</Option>

                        {TaxSaleOpitons.map((el) => {
                            // @ts-ignore
                            return (
                                // @ts-ignore
                                <Option key={el} value={el}>
                                    {el}
                                </Option>
                            );
                        })}
                    </Select>
                </Form.Item>

                <Form.Item shouldUpdate={true} name="currency" label="Валюта">
                    <Select defaultValue={"RUB"} style={{ width: 240 }}>
                        <Option value="RUB">Рубль (₽)</Option>
                        <Option value="USD">Доллар ($)</Option>
                        <Option value="EUR">Евро (€)</Option>
                    </Select>
                </Form.Item>

                <Form.Item shouldUpdate={true} name="rentPrice" label="Ставка аренды">
                    <PriceInput
                        setFieldsValue={setFieldsValue}
                        currency={getFieldState("currency")}
                    />
                </Form.Item>

                <Form.Item shouldUpdate={true} name="salePrice" label="Стоимость при прод.">
                    <PriceInput
                        setFieldsValue={setFieldsValue}
                        currency={getFieldState("currency")}
                    />
                </Form.Item>

                <Form.Item shouldUpdate={true} name="baseRentPrice" label="Базовая ставка">
                    <PriceInput
                        disabled={true}
                        setFieldsValue={setFieldsValue}
                        currency={getFieldState("currency")}
                    />
                </Form.Item>

                <Form.Item shouldUpdate={true} name="fullRentPrice" label="Полная ставка">
                    <PriceInput
                        disabled={true}
                        setFieldsValue={setFieldsValue}
                        currency={getFieldState("currency")}
                    />
                </Form.Item>

                <Form.Item shouldUpdate={true} name="monthPrice" label="Мес. аренд. платеж">
                    <PriceInput
                        disabled={true}
                        setFieldsValue={setFieldsValue}
                        currency={getFieldState("currency")}
                    />
                </Form.Item>

                <Form.Item shouldUpdate={true} name="fullPriceAmount" label="Общая стоимость лота">
                    <PriceInput
                        disabled={false}
                        setFieldsValue={setFieldsValue}
                        currency={getFieldState("currency")}
                    />
                </Form.Item>

                <Form.Item shouldUpdate={true} name="opex" label="OPEX">
                    <Select defaultValue={"null"} style={{ width: 240 }}>
                        <Option value="null">Неизвестно</Option>
                        <Option value="Включен">Включен</Option>
                        <Option value="Не включен">Не включен</Option>
                        <Option value="openbook">Open-book</Option>
                        {/*<Option value="null">Неизвестно</Option>*/}
                        {/*<Option value="include">Включен</Option>*/}
                        {/*<Option value="not_include">Не включен</Option>*/}
                        {/*<Option value="openbook">Open-book</Option>*/}
                    </Select>
                </Form.Item>

                <Form.Item shouldUpdate={true} name="opexPrice" label="OPEX размер">
                    <PriceInput
                        setFieldsValue={setFieldsValue}
                        currency={getFieldState("currency")}
                    />
                </Form.Item>

                <Form.Item shouldUpdate={true} name="commCosts" label="Коммун. расходы">
                    <Select defaultValue={"null"} style={{ width: 240 }}>
                        {CommCostsOptions.map((el) => {
                            // @ts-ignore
                            return (
                                // @ts-ignore
                                <Option key={el.value ? el.value : "null"} value={el.value}>
                                    {el.label}
                                </Option>
                            );
                        })}
                    </Select>
                </Form.Item>

                <Divider>Техническая информация</Divider>

                <Form.Item shouldUpdate={true} name="wetPoints" label="Мокрые точки">
                    <Select style={{ width: 240 }}>
                        <Option value="null">неизвестно</Option>
                        <Option value="да">да</Option>
                        <Option value="нет">нет</Option>
                        <Option value="1">1</Option>
                        <Option value="2">2</Option>
                        <Option value="3">3</Option>
                        <Option value="4">4</Option>
                    </Select>
                </Form.Item>

                <Form.Item shouldUpdate={true} name="hasCafee" label="Кухня/кофе-поинт">
                    <BooleanSelect>
                        <Option value="null">неизвестно</Option>
                        <Option value="true">да</Option>
                        <Option value="false">нет</Option>
                    </BooleanSelect>
                </Form.Item>

                <Form.Item shouldUpdate={true} name="hasFalseFloor" label="Фальш-пол">
                    <BooleanSelect>
                        <Option value="null">неизвестно</Option>
                        <Option value="true">да</Option>
                        <Option value="false">нет</Option>
                    </BooleanSelect>
                </Form.Item>

                <Form.Item shouldUpdate={true} name="ceilings" label="Потолки">
                    <Select style={{ width: 240 }}>
                        <Option value="null">неизвестно</Option>
                        <Option value="Открытые">Открытые</Option>
                        <Option value="Армстронг">Армстронг</Option>
                    </Select>
                </Form.Item>

                <Divider orientation={"left"}>Описания и сайты</Divider>

                <Form.Item
                    shouldUpdate={true}
                    name="youtubeLink"
                    label="Ютуб (ссылка)"
                    rules={[
                        {
                            required: false,
                            message: "укажите название",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item shouldUpdate={true} name="briefDescription" label="Описание для брифа">
                    <Input.TextArea rows={3} />
                </Form.Item>

                <Form.Item shouldUpdate={true} name="briefEngDescription" label="Описание бриф ENG">
                    <Input.TextArea rows={3} />
                </Form.Item>

                <Divider />

                <Form.Item shouldUpdate={true} name="isOnSite" label="Выгрузить на сайт">
                    <BooleanSelect>
                        <Option value="true">да</Option>
                        <Option value="false">нет</Option>
                    </BooleanSelect>
                </Form.Item>

                <Form.Item name="isOnSite" label="Авто-генерация">
                    <Button
                        loading={isUpdating}
                        onClick={async (e) => {
                            if (modelData) {
                                setIsUpdating(true);
                                await Api.genereateDescr(modelData);

                                notification.success({
                                    message: "описания сгенерированы",
                                    placement: "bottomRight",
                                });



                                setIsUpdating(false);
                                if(otherProps && otherProps?.onUpdate){
                                    otherProps?.onUpdate({});
                                }
                                
                            }
                        }}
                    >
                        Сгенерировать описания
                    </Button>
                </Form.Item>

                {getFieldState("isOnSite") && (
                    <Form.Item
                        shouldUpdate={true}
                        name="siteDescription"
                        label="Описание для сайта"
                    >
                        <Input.TextArea rows={3} />
                    </Form.Item>
                )}

                {getFieldState("isOnSite") && (
                    <Form.Item
                        shouldUpdate={true}
                        name="siteDescriptionEng"
                        label="Описание сайт ENG"
                    >
                        <Input.TextArea rows={3} />
                    </Form.Item>
                )}

                <Form.Item shouldUpdate={true} name="isOnCian" label="Выгрузить на cian.ru">
                    <BooleanSelect>
                        <Option value="true">да</Option>
                        <Option value="false">нет</Option>
                    </BooleanSelect>
                </Form.Item>

                {getFieldState("isOnCian") && (
                    <Form.Item
                        shouldUpdate={true}
                        name="cianType"
                        label="Тип объявления"
                        rules={[
                            {
                                required: getFieldState("isOnCian"),
                                message: "Заполните тип объявления",
                            },
                        ]}
                    >
                        <Select defaultValue={"paid"} style={{ width: 240 }}>
                            {CianTypes.map((el) => {
                                // @ts-ignore
                                return (
                                    <Option key={el.value ? el.value : "null"} value={el.value}>
                                        {el.label}
                                    </Option>
                                );
                            })}
                        </Select>
                    </Form.Item>
                )}

                {getFieldState("isOnCian") && (
                    <Form.Item
                        shouldUpdate={true}
                        name="cianDescription"
                        label="Описание cian.ru"
                        rules={[
                            {
                                required: true, //getFieldState('isOnCian'),
                                message: "Заполните описание объявления",
                            },
                        ]}
                    >
                        <Input.TextArea placeholder={"не менее 50 символов"} rows={3} />
                    </Form.Item>
                )}

                {getFieldState("isOnCian") && (
                    <Form.Item
                        shouldUpdate={true}
                        name="cianMultiBlock"
                        label="В составе мультиблока?"
                    >
                        <BooleanSelect>
                            <Option value="false">нет</Option>
                            <Option value="true">да</Option>
                        </BooleanSelect>
                    </Form.Item>
                )}

                {getFieldState("isOnCian") && (
                    <Form.Item
                        shouldUpdate={true}
                        name="cianMainMultiBlock"
                        label="Основной мультиблок?"
                    >
                        <BooleanSelect>
                            <Option value="false">нет</Option>
                            <Option value="true">да</Option>
                        </BooleanSelect>
                    </Form.Item>
                )}

                {!isCreating && getFieldState("isOnCian") && (
                    <Form.Item shouldUpdate={true} name="cianEnabledBy" label="Включ. эксп. в циан">
                        {getFieldState("cianEnabledBy") && (
                            <>
                                {/*{modelData?.cianEnabledBy.id}*/}
                                <UserInput
                                    id={"cian-enabled-user"}
                                    disabled={true}
                                    relationName={"cianEnabledBy"}
                                    setFieldsValue={(params) => form.setFieldsValue(params)}
                                    currentUser={modelData?.cianEnabledBy}
                                />
                            </>
                        )}
                    </Form.Item>
                )}

                {/*{getFieldState('isOnCian') &&*/}
                {/*<Form.Item*/}
                {/*    shouldUpdate={true}*/}
                {/*    name="cianId"*/}
                {/*    label="ID в ЦИАН"*/}
                {/*>*/}
                {/*    <Input disabled={true}/>*/}
                {/*</Form.Item>*/}
                {/*}*/}

                <Form.Item shouldUpdate={true} name="isOnYandex" label="Выгр. на яндекс">
                    <BooleanSelect>
                        <Option value="true">да</Option>
                        <Option value="false">нет</Option>
                    </BooleanSelect>
                </Form.Item>

                {getFieldState("isOnYandex") && (
                    <Form.Item shouldUpdate={true} name="yandexDescription" label="Описание яндекс">
                        <Input.TextArea rows={3} />
                    </Form.Item>
                )}

                <Form.Item shouldUpdate={true} name="isOnAvito" label="Выгрузить на avito">
                    <BooleanSelect>
                        <Option value="true">да</Option>
                        <Option value="false">нет</Option>
                    </BooleanSelect>
                </Form.Item>

                {getFieldState("isOnAvito") && (
                    <Form.Item shouldUpdate={true} name="avitoDescription" label="Описание avito">
                        <Input.TextArea rows={3} />
                    </Form.Item>
                )}

                <Divider orientation={"left"}>Парковка</Divider>

                <Form.Item shouldUpdate name="parkingType" label="Паркинг тип">
                    <Select defaultValue={"Наземный"} style={{ width: 240 }}>
                        <Option value="Наземный">Наземный</Option>
                        <Option value="Подземный">Подземный</Option>
                        <Option value="Многоуровневый">Многоуровневый</Option>
                        <Option value="неизвестно">неизвестно</Option>
                    </Select>
                </Form.Item>

                <Form.Item shouldUpdate={true} name="prkQnt" label="Кол-во мест">
                    <Input type={"number"} placeholder={"кол-во"} style={{ width: 240 }} />
                </Form.Item>

                <Form.Item shouldUpdate={true} name="parkingPrice" label="Стоимость парк.">
                    <PriceInput
                        setFieldsValue={setFieldsValue}
                        currency={getFieldState("currency")}
                    />
                </Form.Item>

                <Form.Item shouldUpdate={true} name="parkingNds" label="НДС паркинг">
                    <Select defaultValue={"Включен"} style={{ width: 240 }}>
                        <Option value="null">Неизвестно</Option>
                        <Option value="Включен">Включен</Option>
                        <Option value="Не включен">Не включен</Option>
                        <Option value="УСН">УСН</Option>
                    </Select>
                </Form.Item>

                <Divider orientation={"left"}>Прочие параметры</Divider>

                <Form.Item shouldUpdate={true} name="vitrinWindows" label="Витринные окна">
                    <BooleanSelect style={{ width: 240 }}>
                        <Option key={"null"} value={"null"}>
                            Неизвестно
                        </Option>
                        <Option key={"true"} value={"true"}>
                            Да
                        </Option>
                        <Option key={"false"} value={"false"}>
                            Нет
                        </Option>
                    </BooleanSelect>
                </Form.Item>

                <Form.Item shouldUpdate={true} name="urAddress" label="Юр. адрес?">
                    <BooleanSelect style={{ width: 240 }}>
                        <Option key={"null"} value={"null"}>
                            Неизвестно
                        </Option>
                        <Option key={"true"} value={"true"}>
                            Предоставляется
                        </Option>
                        <Option key={"false"} value={"false"}>
                            Не предоставляется
                        </Option>
                    </BooleanSelect>
                </Form.Item>

                <Form.Item shouldUpdate={true} name="isBusy" label="Помещение занято">
                    <BooleanSelect>
                        <Option value="null">неизвестно</Option>
                        <Option value="true">да</Option>
                        <Option value="false">нет</Option>
                    </BooleanSelect>
                </Form.Item>

                {getFieldState("isBusy") && (
                    <Form.Item shouldUpdate={true} name="willNotBusy" label="Дата освобождения">
                        <DateInput />
                    </Form.Item>
                )}

                <Form.Item shouldUpdate={true} name="entrance" label="Вход">
                    <Select style={{ width: 240 }}>
                        <Option value="null">Неизвестно</Option>
                        <Option value="Отдельный со двора">Отдельный со двора</Option>
                        <Option value="Отдельный с улицы">Отдельный с улицы</Option>
                        <Option value="Общий со двора">Общий со двора</Option>
                        <Option value="Общий с улицы">Общий с улицы</Option>
                    </Select>
                </Form.Item>

                <Form.Item shouldUpdate={true} name="targets" label="Назначение">
                    <TargetsBlockInput />
                </Form.Item>

                <Divider orientation={"left"}>Системная информация</Divider>

                {/*            <Form.Item
shouldUpdate={true}*/}
                {/*    // name="daysExposition"*/}
                {/*    label="Срок экспоз."*/}
                {/*>*/}
                {/*    <Input placeholder={'–'} value={daysExposition} disabled={true} suffix={'дней'} style={{width: 130}} type={"number"}/>*/}
                {/*</Form.Item>*/}

                <Form.Item shouldUpdate={true} name="comeToMarketDate" label="Выход на рынок">
                    <DateInput disabled={true} />

                    {/*<Input type={"date"}/>*/}
                </Form.Item>

                {!isCreating && (
                    <Form.Item shouldUpdate={true} name="createdAt" label="Дата создания">
                        <DateInput disabled={true} />
                        {/*<Input disabled={true} style={{width: 240}} />*/}
                    </Form.Item>
                )}

                {!isCreating && (
                    <Form.Item shouldUpdate={true} name="updatedAt" label="Дата обновления">
                        <DateInput disabled={true} />
                    </Form.Item>
                )}

                {!isCreating && (
                    <Form.Item shouldUpdate={true} name="creator" label="Создав. пользователь">
                        {getFieldState("creator") && (
                            <UserInput
                                id={"creator-user"}
                                disabled={true}
                                relationName={"creator"}
                                setFieldsValue={(params) => form.setFieldsValue(params)}
                                currentUser={modelData?.creator}
                            />
                        )}
                        {!getFieldState("creator") && <div>Объект создан системой</div>}
                    </Form.Item>
                )}

                {!isCreating && (
                    <Form.Item shouldUpdate={true} name="updatedBy" label="Обновл. пользователем">
                        {!getFieldState("updatedBy") && <div>Объект обновлен системой</div>}
                        {getFieldState("updatedBy") && (
                            <UserInput
                                id={"updatedBy-user"}
                                disabled={true}
                                relationName={"updatedBy"}
                                setFieldsValue={(params) => form.setFieldsValue(params)}
                                currentUser={modelData?.updatedBy}
                            />
                        )}
                    </Form.Item>
                )}

                <Divider />
            </Form>
        </div>
    );
};

export default BlockForm;
