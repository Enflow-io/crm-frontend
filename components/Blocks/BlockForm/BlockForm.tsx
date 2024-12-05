import {Button, Checkbox, Col, Divider, Form, Input, Modal, notification, Row, Select, Spin, Tooltip} from "antd";
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
import _, { set } from "lodash";
import { CianTypes, CommCostsOptions, PlanTypes, TaxSaleOpitons } from "../BlockOptions";
import debounce from "lodash/debounce";
import TargetsBlockInput from "../../inputs/TargetsBlockInput";
import RentersList, { Renter } from "../../FormComponents/RenterList/RenterList";
import {UserInterface} from "../../../interfaces/user.interface";
import AdditionalParkingList, { AdditionalParking } from "../../FormComponents/AdditionalParkingList/AdditionalParkingList";
import {isFloatField, isIntegerField} from "../../../utils/fieldsValidators";
import ContragentForm from "../../Companies/ContragentForm/ContragentForm";
import {ICompany} from "../../../interfaces/CompanyInterface";
import CompanyForm from "../../Companies/CompanyForm/CompanyForm";
import {PlusOutlined} from "@ant-design/icons";
import useUser from "../../../hooks/useUser";
import UsersService from "../../../services/UsersService";

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
    const user = useUser();
    const [isDataLoading, setIsDataLoading] = useState(false);
    const [collapseTermsOfDeals, setCollapseTermsOfDeals] = useState(isCreating ? false : true);
    const [collapseCommercialTerms, setCollapseCommercialTerms] = useState(isCreating || (user && UsersService.isDefaultUser(user)) ? false : true);
    const [collapseTechnicalTerms, setCollapseTechnicalTerms] = useState(isCreating ? false : true);
    const [collapseDescription, setCollapseDescription] = useState(isCreating || (user && UsersService.isDefaultUser(user)) ? false : true);
    const [collapseParking, setCollapseParking] = useState(isCreating || (user && UsersService.isDefaultUser(user)) ? false : true);
    const [collapseAdditionalInfo, setCollapseAdditionalInfo] = useState(isCreating ? false : true);
    const [form] = Form.useForm();
    const router = useRouter();

    const [isUpdating, setIsUpdating] = useState(false);

    const [daysExposition, setDaysExposition] = useState(0);

    const [fields, setFields] = useState<FieldData[]>([]);
    const [users, setUsers] = useState<UserInterface[]>([]);

    const [rentersList, setRentersList] = useState<Renter[]>([]);
    const [contragentsList, setContragentsList] = useState<any[]>([{} as ICompany]);
    const [additionalParkingList, setAdditionalParkingList] = useState<AdditionalParking[]>([]);
    const [parkingIncluded, setParkingIncluded] = useState(false);
    const [forbiddenAds, setForbiddenAds] = useState(false);
    const [cianMultiblocks, setCianMultiblocks] = useState<any[]>([]);
    const [companies, setCompanies] = useState<ICompany[]>([]);
    const [isOpenCreateModal, setIsOpenCreateModal] = useState(false)
    const [attachCompany, setAttachCompany] = useState<any>(null)
    const [isCollapsedContragents, setIsCollapsedContragents] = useState(true)
    const [fullSalePrice, setFullSalePrice] = useState(0)

    const showCreateCompanyModal = () => {
        setIsOpenCreateModal(true)
    }
    const removeContragent = (id: number) => {
        const newContragents = contragentsList.filter((_, idx) => idx !== id);
        setContragentsList(newContragents);
    }

    useEffect(() => {
        if (attachCompany) {
            const data: ICompany = {
                id: attachCompany.id,
                name: attachCompany.name
            } as ICompany
            setCompanies([...companies, data])
            setAttachCompany(null)
        }
    }, [attachCompany])

    useEffect(() => {
        if (user && UsersService.isDefaultUser(user)) {
            setCollapseCommercialTerms(false);
            setCollapseDescription(false);
            setCollapseParking(false);
        }
    }, [user])

    const getUsers = async () => {
        const users = await Api.get(`/users?take=1000`)
        if (users) {
            setUsers(users.data.data)
        }
    }
    const getCompanies = async () => {
        const companies = await Api.getCompaniesList(true)
        if (companies) {
            setCompanies(companies)
        }
    }

    const getContragents = async () => {
        if (!modelData?.id) return;
        const contragents = await Api.getCompaniesByBlock(modelData.id)
        setContragentsList(contragents.sort((a, b) => {
            if (a.blockToCompanies?.type === 'Собственник') return -1
            if (a.name > b.name) return 1
            return 0
        }))
    }

    const getCianMultiblocks = async (buildingId: number) => {
        const multiblocks = await Api.getCianMultiblocks(buildingId)
        if (multiblocks) {
            console.log('multiblocks', multiblocks)
            setCianMultiblocks(multiblocks)
        }
    }
    useEffect (() => {
        getUsers()
        getCompanies()
        if (modelData?.buildingId) {
            getCianMultiblocks(modelData?.buildingId)
        }
    }, [])
    useEffect(() => {
        getContragents()
    }, [modelData])
    useEffect(() => {
        const watcher = SubmitBlockForm.done.watch(async () => {
            setIsDataLoading(true);
            try {
                // let props = form.getFieldsValue(true);
                let props = form.getFieldsValue();
                // const res = await form.validateFields(Object.keys(props))

                props.renters = rentersList;
                props.additionalParking = additionalParkingList;
                props.parkingIncluded = parkingIncluded;
                props.forbiddenAds = forbiddenAds;
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
        isOnSite: true,
        isOnCian: false,
        isOnYandex: false,
        avitoDescription: "",
        currency: "RUB",
        buildingId: null,
        realisationType: null,
        taxIncluded: null,
        finishing: null,
        furniture: null,
        parkingType: null,
        isOnMarket: null,
        parkingNds: null,
        parkingIncluded: false,
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
                modelData?.renters && setRentersList(modelData?.renters);
                modelData?.additionalParking && setAdditionalParkingList(modelData?.additionalParking);
                if (modelData?.forbiddenAds) {
                    setForbiddenAds(modelData?.forbiddenAds);
                } else {
                    setForbiddenAds(false);
                }
                if (modelData?.ndsSale && modelData?.ndsSale === 'Не включен') {
                    setFullSalePrice(modelData?.salePrice * 1.2)
                    fields.push({
                        name: "fullSalePrice",
                        errors: [],
                        touched: false,
                        validating: false,
                        value: modelData?.salePrice * 1.2
                    })
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
                {modelData && modelData?.cianLink &&
                    <Form.Item label="Ссылка на ЦИАН">
                        <a href={modelData?.cianLink} target='_blank' rel='noreferrer'>{modelData?.cianLink}</a>
                    </Form.Item>
                }
                <Form.Item
                    shouldUpdate={true}
                    name="name"
                    label="Название"
                    rules={[
                        {
                            required: true,
                            message: "Поле \"Название\" обязательно для заполнения",
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
                            message: "Поле \"Объект\" обязательно для заполнения",
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

                {/*<RentersList*/}
                {/*    renters={rentersList}*/}
                {/*    onChangeList={(list) => {*/}
                {/*        console.log(list);*/}
                {/*        setRentersList(list);*/}
                {/*    */}
                {/*    }}*/}
                {/*/>*/}
                {modelData?.buildingId && <Form.Item label={'Контрагенты'}>
                    <Button key={'collapseContragents'} onClick={() => setIsCollapsedContragents(!isCollapsedContragents)}>
                        {isCollapsedContragents ? 'Развернуть' : 'Свернуть'}
                    </Button>
                    <div id={'collapseContragents'} style={{display: isCollapsedContragents ? 'none' : 'block', margin: '10px 0'}}>
                        {contragentsList.map((contragent, idx) => (
                            console.log('contragent', contragentsList.length),
                            <ContragentForm
                                key={'ContragentForm' + contragent?.blockToCompanies?.id ?? Math.random()}
                                contragent={contragent}
                                companies={companies}
                                buildingId={modelData.buildingId}
                                blockId={modelData?.id || null}
                                removeContragent={removeContragent}
                                index={idx}
                            />
                        ))}
                        {contragentsList && <Button key="addContragent" onClick={() => setContragentsList([...contragentsList, {}])}>+</Button>}
                        {contragentsList && <Button style={{marginLeft: 10}} icon={<PlusOutlined/>} onClick={showCreateCompanyModal}>Добавить компанию</Button>}
                    </div>
                </Form.Item>}
                <Form.Item
                    shouldUpdate={true}
                    name="isOnMarket"
                    label="Статус на рынке"
                    rules={[
                        {
                            required: true,
                            message: "Поле \"Статус на рынке\" обязательно для заполнения",
                        },
                    ]}
                >
                    <Select style={{ width: 240 }}>
                        <Option value="нет на рынке">Нет на рынке</Option>
                        <Option value="есть на рынке">Есть на рынке</Option>
                        <Option value="продан">Продан</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    shouldUpdate={true}
                    name='forbiddenAds'
                    label={'Запрещено рекламировать: '}
                >
                    <Checkbox
                        defaultChecked={false}
                        onChange={(e) => setForbiddenAds(e.target.checked)}
                        checked={forbiddenAds}
                    ></Checkbox>
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
                    <Select style={{ width: 240 }}>
                        <Option value="rent">Аренда</Option>
                        <Option value="sale">Продажа</Option>
                        <Option value="subRent">Субаренда</Option>
                    </Select>
                </Form.Item>
                <Form.Item shouldUpdate={true} name="isCoworking" label="Коворкинг">
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
                            required: getFieldState('blockType') !== 'Здание целиком',
                            message: "Поле \"Этаж\" обязательно для заполнения",
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
                            message: "Поле \"Площадь\" обязательно для заполнения",
                        },
                    ]}
                >
                    <Input type={"number"} style={{ width: 120 }} />
                </Form.Item>

                <Form.Item
                    shouldUpdate={true}
                    name="workingPlaces"
                    label="Кол-во раб. мест"
                    rules={[
                        {
                            required: false,
                            message: "поле обязательно для заполнения",
                        },
                        {
                            validator: (_, value) => {
                                return isIntegerField(value, "Кол-во раб. мест");
                            }
                        }
                    ]}
                >
                    <Input type={"text"} style={{ width: 120 }} />
                </Form.Item>

                <Form.Item 
                    shouldUpdate={true} 
                    name="name-eng" 
                    label="Название (eng)" 
                    hidden={getFieldState("realisationType") === 'sale'}
                >
                    <Input />
                </Form.Item>

                <Form.Item 
                    shouldUpdate={true} 
                    name="blockType" 
                    label="Тип блока"
                    rules={[
                        {
                            required: true,
                            message: "поле обязательно для заполнения",
                        },
                    ]}
                >
                    <Select style={{ width: 240 }}>
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

                {user && UsersService.isAdmin(user) && <Form.Item shouldUpdate={true} name="bti" label="БОМА/БТИ">
                    <Select defaultValue="null" style={{ width: 240 }}>
                        <Option value="null">Неизвестно</Option>
                        <Option value="БОМА">БОМА</Option>
                        <Option value="БТИ">БТИ</Option>
                    </Select>
                </Form.Item>}
                {/*<Form.Item shouldUpdate={true} name="bonusPercent" label="Бонусный %">*/}
                {/*    <Input style={{ width: 240 }} type={"number"} />*/}
                {/*</Form.Item>*/}

                <Form.Item 
                    shouldUpdate={true} 
                    name="finishing" 
                    label="Отделка"
                    rules={[
                        {
                            required: true,
                            message: "поле обязательно для заполнения",
                        }
                    ]}
                >
                    <Select style={{ width: 240 }}>
                        <Option value="Требуется косметический ремонт">Требуется косметический ремонт</Option>
                        <Option value="С отделкой">С отделкой</Option>
                        <Option value="Без отделки">Без отделки</Option>
                    </Select>
                </Form.Item>
                <Form.Item shouldUpdate={true} name="furniture" label="Мебель">
                    <Select style={{ width: 240 }}>
                        <Option value="без мебели">Без мебели</Option>
                        <Option value="с мебелью">C мебелью</Option>
                    </Select>
                </Form.Item>

                <Form.Item 
                    shouldUpdate={true} 
                    name="planType" 
                    label="Тип планировки"
                    rules={[
                        {
                            required: true,
                            message: "поле обязательно для заполнения",
                        }
                    ]}
                >
                    <Select style={{ width: 240 }}>
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

                {/* <Form.Item shouldUpdate={true} name="qfsdfsdfsdf" label="Арендатор">
                    <Input type={"number"} />
                </Form.Item> */}

                <Divider 
                    orientation={"left"} 
                    className={"divider" + (collapseTermsOfDeals && user && !UsersService.isDefaultUser(user) ? " collapsedDivider" : "")}
                    //@ts-ignore
                    onClick={() => user && !UsersService.isDefaultUser(user) ? setCollapseTermsOfDeals(!collapseTermsOfDeals) : null}
                >Условия сделки</Divider>
                <div style={{display: collapseTermsOfDeals && user && !UsersService.isDefaultUser(user) ? 'none' : 'block', margin: '10px 0'}}>
                    <Form.Item
                        shouldUpdate={true}
                        name="securityDeposit"
                        label="Обесп. платеж"
                        hidden={getFieldState("realisationType") === 'sale'}
                        rules={[
                            {
                                validator: (_, value) => {
                                    return isIntegerField(value, "Обесп. платеж");
                                }
                            }
                        ]}
                    >
                        <Input suffix={"₽"} type={"number"} style={{ width: 240 }} />
                    </Form.Item>

                    <Form.Item 
                        shouldUpdate={true} 
                        name="agreementType" 
                        label="Срок договора"
                        hidden={getFieldState("realisationType") === 'sale'}
                    >
                        <Select style={{ width: 240 }}>
                            <Option value="null">Неизвестно</Option>
                            <Option value="short">Крактосрочный</Option>
                            <Option value="long">Долгосрочный</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        shouldUpdate={true}
                        name="rentalHolidays"
                        label="Арендн. каникулы"
                        hidden={getFieldState("realisationType") === 'sale'}
                        rules={[
                            {
                                validator: (_, value) => {
                                    return isIntegerField(value, "Арендн. каникулы");
                                }
                            }
                        ]}
                    >
                        <Input style={{ width: 240 }} suffix={"мес"} type={"number"} />
                    </Form.Item>

                    {user && UsersService.isAdmin(user) && <Form.Item 
                        shouldUpdate={true} 
                        name="indexation" 
                        label="Индексация"
                        hidden={getFieldState("realisationType") === 'sale'}
                    >
                        <Input style={{ width: 240 }} type={"number"} />
                    </Form.Item>}

                    <Form.Item 
                        shouldUpdate={true} 
                        name="saleType" 
                        label="Форма сделки продажа"
                        hidden={getFieldState("realisationType") !== 'sale'}
                        // rules={[
                        //     {
                        //         required: getFieldState("realisationType") === "sale",
                        //         message: "поле обязательно для заполнения",
                        //     }
                        // ]}
                    >
                        <Select style={{ width: 240 }}>
                            <Option value="null">Неизвестно</Option>
                            <Option value="ДКП">ДКП</Option>
                            <Option value="ДДУ">ДДУ</Option>
                            <Option value="ДКПБН">ДКПБН</Option>
                            <Option value="продажа юр. лица">продажа юр. лица</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        shouldUpdate={true}
                        name="agentCommission"
                        label="Комиссия, %"
                        // rules={[
                        //     {
                        //         required: true,
                        //         message: "поле обязательно для заполнения",
                        //     }
                        // ]}
                    >
                        <Input style={{ width: 240 }} type={"number"} />
                    </Form.Item>
                </div>
                <Divider 
                    orientation={"left"} 
                    className={"divider" + (collapseCommercialTerms && user && !UsersService.isDefaultUser(user) ? " collapsedDivider" : "")} 
                    //@ts-ignore
                    onClick={() => user && !UsersService.isDefaultUser(user) ? setCollapseCommercialTerms(!collapseCommercialTerms) : null}
                >Коммерческие условия</Divider>
                <div style={{display: collapseCommercialTerms ? 'none' : 'block', margin: '10px 0'}}>
                    <Form.Item 
                        shouldUpdate={true} 
                        name="taxIncluded" 
                        label="НДС аренда"
                        rules={[
                            {
                                required: getFieldState("realisationType") !== 'sale',
                                message: "поле обязательно для заполнения",
                            }
                        ]}
                        hidden={getFieldState("realisationType") === 'sale'}
                    >
                        <Select style={{ width: 240 }}>
                            <Option value="null">Неизвестно</Option>

                            <Option value="Включен">Включен</Option>
                            <Option value="Не включен">Не включен</Option>
                            <Option value="УСН">УСН</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item 
                        shouldUpdate={true} 
                        name="ndsSale" 
                        label="НДС продажа"
                        hidden={getFieldState("realisationType") !== 'sale'}
                        rules={[
                            {
                                required: getFieldState("realisationType") === 'sale',
                                message: "поле обязательно для заполнения",
                            }
                        ]}
                    >
                        <Select style={{ width: 240 }}>
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

                    <Form.Item
                        shouldUpdate={true}
                        name="rentPrice"
                        label="Ставка аренды"
                        hidden={getFieldState('realisationType') === 'sale'}
                        rules={[
                            {
                                required: getFieldState("realisationType") !== 'sale',
                                message: "поле обязательно для заполнения",
                            }
                        ]}
                    >
                        <PriceInput
                            setFieldsValue={setFieldsValue}
                            currency={getFieldState("currency")}
                            disabled={getFieldState('realisationType') === 'sale'}
                        />
                    </Form.Item>

                    <Form.Item
                        shouldUpdate={true}
                        name="salePrice"
                        label="Цена за кв. м"
                        rules={[
                            {
                                validator: (_, value: number) => {
                                    return isIntegerField(value, "Цена за кв. м");
                                }
                            },
                            {
                                required: getFieldState("realisationType") === 'sale' && !getFieldState('fullPriceAmount'),
                                message: "поле обязательно для заполнения",
                            }
                        ]}
                        hidden={getFieldState('realisationType') !== 'sale'}
                    >
                        <PriceInput
                            setFieldsValue={setFieldsValue}
                            currency={getFieldState("currency")}
                            disabled={getFieldState('realisationType') !== 'sale'}
                            onChange={(value: number) => {
                                const ndsSale = getFieldState('ndsSale');
                                if (ndsSale === 'Не включен') {
                                    setFieldsValue({
                                        fullSalePrice: value * 1.2
                                    });
                                } else {
                                    setFieldsValue({
                                        fullSalePrice: value
                                    });
                                }
                            }}
                        />
                    </Form.Item>

                    <Form.Item shouldUpdate={true} name="baseRentPrice" label="Базовая ставка" hidden={getFieldState('realisationType') === 'sale'}>
                        <PriceInput
                            disabled={true}
                            setFieldsValue={setFieldsValue}
                            currency={getFieldState("currency")}
                        />
                    </Form.Item>

                    <Form.Item shouldUpdate={true} name="fullRentPrice" label="Полная ставка" hidden={getFieldState('realisationType') === 'sale'}>
                        <PriceInput
                            disabled={true}
                            setFieldsValue={setFieldsValue}
                            currency={getFieldState("currency")}
                        />
                    </Form.Item>

                    <Form.Item shouldUpdate={true} name="fullSalePrice" label="Полная ставка" hidden={getFieldState('realisationType') !== 'sale'}>
                        <PriceInput
                            disabled={true}
                            setFieldsValue={setFieldsValue}
                            currency={getFieldState("currency")}
                        />
                    </Form.Item>

                    <Form.Item shouldUpdate={true} name="monthPrice" label="Мес. аренд. платеж" hidden={getFieldState('realisationType') === 'sale'}>
                        <PriceInput
                            disabled={true}
                            setFieldsValue={setFieldsValue}
                            currency={getFieldState("currency")}
                        />
                    </Form.Item>

                    <Form.Item
                        hidden={getFieldState('realisationType') !== 'sale'}
                        shouldUpdate={true}
                        name="fullPriceAmount"
                        label="Общая стоимость"
                        rules={[
                            {
                                validator: (_, value: number) => {
                                    return isIntegerField(value, "Общая стоимость");
                                }
                            },
                            {
                                required: getFieldState("realisationType") === 'sale' && !getFieldState('salePrice'),
                                message: "поле обязательно для заполнения",
                            }
                        ]}
                    >
                        <PriceInput
                            setFieldsValue={setFieldsValue}
                            currency={getFieldState("currency")}
                            disabled={getFieldState('realisationType') !== 'sale'}
                        />
                    </Form.Item>

                    <Form.Item shouldUpdate={true} name="opex" label="OPEX" hidden={getFieldState("realisationType") === 'sale'}>
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

                    <Form.Item
                        shouldUpdate={true}
                        name="opexPrice"
                        label="OPEX размер"
                        hidden={getFieldState("realisationType") === 'sale'}
                        rules={[
                            {
                                validator: (_, value: number) => {
                                    return isIntegerField(value, "OPEX размер");
                                }
                            }
                        ]}
                    >
                        <PriceInput
                            setFieldsValue={setFieldsValue}
                            currency={getFieldState("currency")}
                        />
                    </Form.Item>

                    <Form.Item shouldUpdate={true} name="commCosts" label="Коммун. расходы" hidden={getFieldState("realisationType") === 'sale'}>
                        <Select style={{ width: 240 }}>
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
                </div>
                <Divider 
                    orientation={"left"} 
                    className={"divider" + (collapseTechnicalTerms && user && !UsersService.isDefaultUser(user) ? " collapsedDivider" : "")}
                    //@ts-ignore
                    onClick={() => user && !UsersService.isDefaultUser(user) ?setCollapseTechnicalTerms(!collapseTechnicalTerms) : null}
                >Техническая информация</Divider>
                <div style={{ display: collapseTechnicalTerms && user && !UsersService.isDefaultUser(user) ? "none" : "block" }}>
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

                    <Form.Item shouldUpdate={true} name="toilet" label="Сан. узлы">
                        <Select style={{ width: 240 }}>
                            <Option value="null">неизвестно</Option>
                            <Option value="На этаже">На этаже</Option>
                            <Option value="В блоке">В блоке</Option>
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

                    <Form.Item
                        shouldUpdate={true}
                        name="ceilingHeight"
                        label="Высота потолков"
                        rules={[
                            {
                                type: "number",
                                required: false,
                                validator: (_, value: string) => {
                                    if (!value) {
                                        return Promise.resolve();
                                    }
                                    return isFloatField(value, "Высота потолков");
                                },
                                message: "Высота потолков должна быть числом",
                            }
                        ]}
                    >
                        <Input type={"text"} placeholder={"метры"} style={{ width: 240 }} />
                    </Form.Item>

                    <Form.Item
                        shouldUpdate={true}
                        name="electricPower"
                        label="Электрическая мощность"
                    >
                        <Input type={"text"} placeholder={"мощность"} style={{ width: 240 }} />
                    </Form.Item>
                 </div>
                <Divider 
                    orientation={"left"} 
                    className={"divider" + (collapseDescription && user && !UsersService.isDefaultUser(user) ? " collapsedDivider" : "")} 
                    //@ts-ignore
                    onClick={() => user && !UsersService.isDefaultUser(user) ?setCollapseDescription(!collapseDescription) : null}
                    >Описания и сайты</Divider>
                <div style={{ display: collapseDescription ? "none" : "block" }}>
                    <Form.Item
                        shouldUpdate={true}
                        name="youtubeLink"
                        label="Ссылка на видео"
                        rules={[
                            {
                                //required: getFieldState("responsibleId") ? true : false,
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

                    <Form.Item 
                        shouldUpdate={true} 
                        name="briefEngDescription" 
                        label="Описание бриф ENG"
                        hidden={getFieldState("realisationType") === 'sale'}
                    >
                        <Input.TextArea rows={3} />
                    </Form.Item>

                    {/* <Divider /> */}

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
                                    if (otherProps && otherProps?.onUpdate) {
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

                    {getFieldState('isOnCian') && (
                        <Form.Item
                            shouldUpdate={true}
                            name="cianTitle"
                            label="Заголовок"
                            rules={[
                                {
                                    required: false,
                                    max: 33,
                                },
                            ]}>
                            <Input placeholder={"максимум 33 символа"} />
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
                            name="cianMainMultiBlock"
                            label="Основной мультиблок?"
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
                            name="cianMultiBlock"
                            label="В составе мультиблока?"
                        >
                            <BooleanSelect>
                                <Option value="false">нет</Option>
                                <Option value="true">да</Option>
                            </BooleanSelect>
                        </Form.Item>
                    )}

                    {getFieldState("isOnCian") && !getFieldState("cianMainMultiBlock") && getFieldState("cianMultiBlock") && (
                        <Form.Item
                            shouldUpdate={true}
                            name="cianMainMultiBlockId"
                            label="Выберите основной блок"
                        >
                            <Select style={{ width: 400 }}>
                                <option value={0}>Не выбран</option>
                                {cianMultiblocks.length > 0 && cianMultiblocks.map((el) => {
                                    return (
                                        <Option key={el.id} value={el.id}>
                                            {el.label}
                                        </Option>
                                    );
                                })}

                            </Select>
                        </Form.Item>
                    )}

                    {getFieldState('isOnCian') && getFieldState('cianType') === "top3" && (
                        <div>
                            <Form.Item
                                shouldUpdate={true}
                                name="cianBet"
                                label="Ставка аукциона"
                            >
                                    <Input type={"number"} placeholder={"Ставка"} style={{ width: 240 }} />
                            </Form.Item>
                            <Form.Item shouldUpdate={true} name="cianBetStart" label="Дата начала действия ставки">
                                <DateInput showTime={true} format={'DD.MM.YYYY HH:mm'}/>
                            </Form.Item>
                            <Form.Item shouldUpdate={true} name="cianBetEnd" label="Дата окончания ставки">
                                <DateInput showTime={true} format={'DD.MM.YYYY HH:mm'}/>
                            </Form.Item>
                        </div>
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

                    {getFieldState('isOnAvito') && (
                        <Form.Item
                            shouldUpdate={true}
                            name="avitoTitle"
                            label="Заголовок"
                            rules={[
                                {
                                    required: false,
                                    max: 50,
                                },
                            ]}>
                            <Input placeholder={"максимум 50 символов"} />
                        </Form.Item>
                    )}

                    {getFieldState("isOnAvito") && (
                        <Form.Item shouldUpdate={true} name="avitoDescription" label="Описание avito">
                            <Input.TextArea rows={3} />
                        </Form.Item>
                    )}

                    {user && UsersService.isAdmin(user) && <Form.Item shouldUpdate name="siteCategory" label="Подборка на сайт">
                        <Select style={{ width: 240 }}>
                            <Option value="нет">Нет</Option>
                            <Option value="На проверку">На проверку</Option>
                            <Option value="Офисы на продажу">Офисы на продажу</Option>
                            <Option value="ОСЗ">ОСЗ</Option>
                            <Option value="Офисы в ЦАО">Офисы в ЦАО</Option>
                            <Option value="Офисы на Ленинградке">Офисы на Ленинградке</Option>
                        </Select>
                    </Form.Item>}
                </div>
                <Divider 
                    orientation={"left"} 
                    className={"divider" + (collapseParking && user &&!UsersService.isDefaultUser(user) ? " collapsedDivider" : "")}
                    //@ts-ignore
                    onClick={() => user && !UsersService.isDefaultUser(user) ? setCollapseParking(!collapseParking) : null}
                >Парковка</Divider>
                <div style={{display: collapseParking ? 'none' : 'block'}}>
                    <Form.Item shouldUpdate name="parkingType" label="Паркинг тип">
                        <Select style={{ width: 240 }}>
                            <Option value="Наземный">Наземный</Option>
                            <Option value="Подземный">Подземный</Option>
                            <Option value="Многоуровневый">Многоуровневый</Option>
                            <Option value="Городской">Городской</Option>
                            <Option value="неизвестно">неизвестно</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        shouldUpdate={true}
                        name="prkQnt"
                        label="Кол-во мест"
                        rules={[
                            {
                                validator: (_, value) => {
                                    return isIntegerField(value, "Кол-во мест паркинга");
                                }
                            }
                        ]}
                    >
                        <Input type={"number"} placeholder={"кол-во"} style={{ width: 240 }} />
                    </Form.Item>

                        <Form.Item
                            shouldUpdate={true}
                            name="parkingPrice"
                            label="Стоимость парк."
                            rules={[
                                {
                                    validator: (_, value) => {
                                        return isIntegerField(value, "Стоимость паркинга");
                                    }
                                }
                            ]}
                        >
                            <PriceInput
                                setFieldsValue={setFieldsValue}
                                currency={getFieldState("currency")}
                                parkingIncluded={parkingIncluded}
                            />
                        </Form.Item>
                        <Form.Item shouldUpdate={true} name="parkingIncluded" label={'Включен в стоимость'}>
                            <Checkbox
                                defaultChecked={false}
                                onChange={(e) => {
                                    setParkingIncluded(
                                    e.target.checked ? true : false
                                    )
                                }}
                                checked={parkingIncluded}
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
                    <AdditionalParkingList
                        additionalParkingList={additionalParkingList}
                        onChangeList={(list) => {
                            setAdditionalParkingList(list);
                        }}
                    />
                </div>
                <Divider 
                    orientation={"left"} 
                    className={"divider" + (collapseAdditionalInfo && user && !UsersService.isDefaultUser(user) ? " collapsedDivider" : "")}
                    //@ts-ignore
                    onClick={() => user && !UsersService.isDefaultUser(user) ?setCollapseAdditionalInfo(!collapseAdditionalInfo) : null}
                >Прочие параметры</Divider>
                <div style={{display: collapseAdditionalInfo && user && !UsersService.isDefaultUser(user) ? 'none' : 'block'}}>
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

                    <Form.Item shouldUpdate={true} name="urAddress" label="Юр. адрес?" hidden={getFieldState("realisationType") === 'sale'}>
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

                    <Form.Item shouldUpdate={true} name="isBusy" label="Помещение с арендатором">
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

                    <Form.Item 
                        shouldUpdate={true} 
                        name="payback" 
                        label="Окупаемость"
                        hidden={getFieldState("realisationType") !== 'sale'}
                    >
                        <Input type={"text"} placeholder={"Окупаемость"} style={{ width: 240 }} />
                    </Form.Item>

                    <Form.Item 
                        shouldUpdate={true} 
                        name="profitability" 
                        label="Доходность"
                        hidden={getFieldState("realisationType") !== 'sale'}
                    >
                        <Input type={"number"} placeholder={"%"} style={{ width: 240 }} />
                    </Form.Item>
                </div>
                <Divider orientation={"left"}>Системная информация</Divider>

                {/*            <Form.Item
shouldUpdate={true}*/}
                {/*    // name="daysExposition"*/}
                {/*    label="Срок экспоз."*/}
                {/*>*/}
                {/*    <Input placeholder={'–'} value={daysExposition} disabled={true} suffix={'дней'} style={{width: 130}} type={"number"}/>*/}
                {/*</Form.Item>*/}

                <Form.Item shouldUpdate={true} name="responsibleId" label="Ответственный">
                    <Select
                        defaultValue={0}
                        style={{ width: 240 }}
                        showSearch
                        optionFilterProp="children"
                        // @ts-ignore
                        filterOption={(input, option) => (option?.label ?? '').includes(input)}
                        filterSort={(optionA, optionB) =>
                            // @ts-ignore
                            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                        }
                        // @ts-ignore
                        options={[{label: 'Ответственный не указан', value: null},...users?.map((user) => ({ label: `${user.name} ${user.lastName}`, value: +user.id }))]}
                    ></Select>
                </Form.Item>

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
                    <Form.Item shouldUpdate={true} name="updatedByUserDate" label="Дата обновления">
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
            <Modal
                //@ts-ignore
                visible={isOpenCreateModal}
                onCancel={() => setIsOpenCreateModal(false)}
                okButtonProps={{disabled: true, style: {display: 'none'}}}
                key={'createModal'}
                //onOk={() => setIsOpenCreateModal(false)}
            >
                <CompanyForm
                    company={{} as ICompany}
                    setCompany={{}}
                    setIsOpenCreateModal={setIsOpenCreateModal}
                    isCreate
                    short
                    setAttachCompany={setAttachCompany}
                ></CompanyForm>
            </Modal>
        </div>
    );
};

export default BlockForm;
