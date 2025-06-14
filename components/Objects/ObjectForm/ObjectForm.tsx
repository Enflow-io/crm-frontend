import styles from "ObjectForm.module.scss";
import {
    Button,
    InputNumber,
    Divider,
    Form,
    Input,
    notification,
    Select,
    Spin,
    Tooltip, Modal,
} from "antd";

const { TextArea } = Input;
import React, { forwardRef, useEffect, useRef, useState } from "react";
import MapSelector from "../MapSelector";
import {InfoCircleOutlined, PlusOutlined} from "@ant-design/icons";
import {
    $$objectToCopy,
    $clearCopyObjStore,
    CloseCreateObjectModal,
    OpenCreateObjectModal,
    submitBuildingForm,
} from "../../../effects/object";
import CoordinatesInput from "../../inputs/CoordinatesInput/CoordinatesInput";
import Api from "../../../services/Api";
import { useRouter } from "next/router";
import { BuildingInterface } from "../../../interfaces/BuildingInterface";
import { Districts, TaxOffices } from "../../../utils/constants";
import BooleanSelect from "../../inputs/BooleanSelect";
import UserInput from "../../inputs/UserInput/UserInput";
import InfrastructureInput from "../../inputs/InfrastructureInput";
import PriceInput from "../../inputs/PriceInput/PriceInput";
import { MetroInput } from "../../inputs/StationsInput/MetroInput";
import debounce from "lodash/debounce";
import DateInput from "../../inputs/DateInput";
import { BlockInterface } from "../../../interfaces/BlockInterface";
import { useStore } from "effector-react";
import _ from "lodash";
import {isFloatField, isIntegerField} from "../../../utils/fieldsValidators";
import ContragentForm from "../../Companies/ContragentForm/ContragentForm";
import {ICompany} from "../../../interfaces/CompanyInterface";
import CompanyForm from "../../Companies/CompanyForm/CompanyForm";
import {convertGlobalDistrict} from "../../../utils/utils";
import useUser from "../../../hooks/useUser";
import UsersService from "../../../services/UsersService";
import { UserInterface } from "../../../interfaces/user.interface";

const { Option, OptGroup } = Select;
const formItemLayout = {
    labelCol: { span: 5 },
    // wrapperCol: {span: 12},
};

interface ObjectFormProps {
    buildingData?: BuildingInterface;
    isCreate?: boolean;
    onUpdate?: (params: any) => void;
}

interface FieldData {
    name: string | number | (string | number)[];
    value?: any;
    touched?: boolean;
    validating?: boolean;
    errors?: string[];
}

const ObjectForm = ({ isCreate = false, buildingData, ...otherProps }: ObjectFormProps) => {
    const user = useUser();
    const formRef = useRef();
    const [form] = Form.useForm();
    const router = useRouter();
    const [metroStations, setMetroStations] = useState<any>(undefined);
    const [users, setUsers] = useState<UserInterface[]>([]);
    const [realizationTypes, setRealizationTypes] = useState<string>("–");
    const [planTypes, setPlanTypes] = useState<string>("–");
    const [finishings, setFinishings] = useState<string>("–");
    const [isLoading, setIsLoading] = useState(true);
    const [contragentsList, setContragentsList] = useState<any[]>([{} as ICompany]);
    const [companies, setCompanies] = useState<ICompany[]>([]);
    const [isOpenCreateModal, setIsOpenCreateModal] = useState(false)
    const [attachCompany, setAttachCompany] = useState<any>(null)
    const [isCollapsedContragents, setIsCollapsedContragents] = useState(true)
    const [address, setAddress] = useState<string | null>(null);
    const [collapsePrices, setCollapsePrices] = useState(isCreate ? false : true);
    const [collapsePlace, setCollapsePlace] = useState(isCreate ? false : true);
    const [collapseMarketing, setCollapseMarketing] = useState(isCreate ? false : true);
    const [collapseParking, setCollapseParking] = useState(isCreate ? false : true);
    const [collapseBuildingInfo, setCollapseBuildingInfo] = useState(isCreate ? false : true);

    const showCreateCompanyModal = () => {
        setIsOpenCreateModal(true)
    }

    const objectToCopyStore = useStore($$objectToCopy);
    const initialDefValues = {
        // createdAt: '2090-10-10',
        // updatedAt: '2090-10-10',
        currency: "RUB",
        stations: [],
        showOnSite: true,
        bts: false,
        hasAgencyContract: null,
    };
    // const [initialValues, setInitialValues] = useState<any>(isCreate ? (objectToCopyStore ? objectToCopyStore : initialDefValues) : buildingData)
    const [initialValues, setInitialValues] = useState<any>({});

    const [fields, setFields] = useState<FieldData[]>([]);
    const [cianMultiblocks, setCianMultiblocks] = useState<any[]>([]);

    const getCianMultiblocks = async (buildingId: number) => {
        const multiblocks = await Api.getCianMultiblocks(buildingId)
        if (multiblocks) {
            setCianMultiblocks(multiblocks)
        }
    }

    const getUsers = async () => {
        const users = await Api.get(`/users?take=1000`)
        if (users) {
            setUsers(users.data.data)
        }
    }

    const getDaDataInfo = async () => {
        if (
            (form.getFieldValue('coords') &&
            form.getFieldValue('coords').length === 2 &&
            buildingData?.longitude !== form.getFieldValue('coords')[1] &&
            buildingData?.latitude !== form.getFieldValue('coords')[0] &&
            form.getFieldValue('longitude') &&
            address && address !== buildingData?.address) ||
            (isCreate && form.getFieldValue('coords') && form.getFieldValue('coords').length === 2)
        ) {
            if (!buildingData?.longitude && !isCreate) return;
            const daDataInfo = await Api.getBuildingInfoByCoords(form.getFieldValue('coords')[1], form.getFieldValue('coords')[0]);
            if (daDataInfo?.data) {
                const tax = +daDataInfo?.data?.tax_office - 7700;
                if (tax && TaxOffices.includes(tax)) {
                    form.setFieldsValue({ taxOffice: tax })
                }

                const globalDistrict = convertGlobalDistrict(daDataInfo?.data?.city_area);
                if (globalDistrict) {
                    form.setFieldsValue({ globalDistrict })
                }
            }
            if (daDataInfo?.unrestricted_value) {
                const district = daDataInfo?.unrestricted_value.split(', ').find((item: string) => item.includes('р-н'));
                if (district) {
                    form.setFieldsValue({ district: district.replace('р-н ', '').replace(' р-н', '') })
                }
            }
        }
    }
    useEffect(() => {
        getDaDataInfo();
    }, [address])

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

    const getCompanies = async () => {
        const companies = await Api.getCompaniesList(true)
        if (companies) {
            setCompanies(companies)
        }
    }

    const getContragents = async () => {
        if (!buildingData?.id) return;
        const contragents = await Api.getCompaniesByBuilding(buildingData.id)
        if (contragents) {
            setContragentsList(contragents.sort((a, b) => {
                if (a.blockToCompanies?.type === 'Собственник') return -1
                if (a.name > b.name) return 1
                return 0
            }))
        } else {
            setContragentsList([{} as ICompany])
        }
    }

    useEffect(() => {
        setIsLoading(true);
        setTimeout(() => {
            if (isCreate) {
                if (_.isEmpty(objectToCopyStore)) {
                    form.resetFields();
                    form.setFieldsValue({ ...initialDefValues });
                    // setInitialValues(initialDefValues);
                    // form.resetFields();
                } else {
                    // console.log("SET FIELDS objectToCopyStore", objectToCopyStore)
                    // console.log(form)
                    form.resetFields();
                    form.setFieldsValue({ ...objectToCopyStore });
                    // setInitialValues(objectToCopyStore);

                    // form.resetFields();
                }
            } else {
                // debugger
                form.resetFields();
                if (buildingData?.freeRentArea) {
                    buildingData.freeRentArea = Math.round(
                        parseFloat(buildingData?.freeRentArea)
                    ).toString();
                }
                form.setFieldsValue(buildingData);
                // setInitialValues(buildingData);
                // form.resetFields();
            }
            setIsLoading(false);
            if (buildingData?.id) {
                getCianMultiblocks(buildingData?.id);
            }
        }, 0);
    }, [isCreate, objectToCopyStore, buildingData, form]);

    useEffect(() => {
    }, [fields]);

    useEffect(() => {
        const unwatch = submitBuildingForm.watch(async () => {
            try {
                let props = form.getFieldsValue();

                if (props.coords) {
                    props.longitude = props.coords[1];
                    props.latitude = props.coords[0];
                }

                if (metroStations?.station1) {
                    props.station1 = metroStations.station1;
                } else {
                    props.station1 = null;
                }
                if (metroStations?.station2) {
                    props.station2 = metroStations.station2;
                } else {
                    props.station2 = null;
                }
                if (metroStations?.fromStation1) {
                    props.fromStation1 = metroStations.fromStation1;
                } else {
                    props.fromStation1 = null;
                }
                if (metroStations?.fromStation2) {
                    props.fromStation2 = metroStations.fromStation2;
                } else {
                    props.fromStation2 = null;
                }
                if (metroStations?.fromStation1Type) {
                    props.fromStation1Type = metroStations.fromStation1Type;
                } else {
                    props.fromStation1Type = null;
                }
                if (metroStations?.fromStation2Type) {
                    props.fromStation2Type = metroStations.fromStation2Type;
                } else {
                    props.fromStation2Type = null;
                }

                if (isCreate && (!props.siteCategory || props.siteCategory === 'нет')) {
                    props.siteCategory = "На проверку";
                }

                // @ts-ignore
                await formRef.current.validateFields();

                try {
                    let res;
                    if (isCreate) {
                        res = await Api.createBuilding(props);
                    } else {
                        //console.log(buildingData);
                        if (buildingData) {
                            res = await Api.updateBuilding(props, buildingData.id);
                        } else {
                            throw Error("No building data for updating");
                        }
                    }
                    notification.success({
                        message: isCreate
                            ? `Объект ${props.name} создан с номером #${res.data.id}`
                            : "Данные сохранены",
                        placement: "bottomRight",
                    });
                    if (isCreate) {
                        await router.push(`/objects/${res.data.id}`);
                    } else {
                        if (otherProps.onUpdate) {
                            otherProps.onUpdate(res);
                        }
                    }
                } catch (e: any) {
                    notification.error({
                        message: isCreate
                            ? `Ошибка при создании объекта: ${props.name}`
                            : "Ошибка при сохранении данных",
                        description: "Текст ошибки: " + e.message,
                        placement: "bottomRight",
                    });
                }
            } catch (e: any) {
                console.log(e);
                console.log(e.message);

                notification.error({
                    message: `Некорректно заполнены поля объекта`,
                    description:
                        //"Проверьте поля " + e.errorFields.map((e: any) => e.name[0]).join(", "),
                        `${e.errorFields.map((e: any) => e.errors.join(", ")).join(", ")}`,
                    placement: "bottomRight",
                });
            }
        });
        return function cleanup() {
            unwatch();
        };
    }, [metroStations]);

    useEffect(() => {
        form.resetFields();

        const enums = {
            rent: "Аренда",
            sale: "Продажа",
            subRent: "Субаренда",
        };

        const onMarketBlocks =
            buildingData?.blocks?.filter((el) => {
                return el.isOnMarket === "Есть на рынке";
            }) || [];

        const realizationTypes = onMarketBlocks
            .map((block: BlockInterface) => {
                return block.realisationType;
            })
            .filter((value, index, self) => {
                return self.indexOf(value) === index;
            })
            .map((item) => {
                // @ts-ignore
                return enums[item];
            });

        if (realizationTypes) {
            setRealizationTypes(realizationTypes.join(", "));
        } else {
            setRealizationTypes("–");
        }

        const planTypes = onMarketBlocks
            .map((block: BlockInterface) => {
                return block.planType;
            })
            .filter((value, index, self) => {
                return self.indexOf(value) === index;
            });

        if (planTypes && planTypes.length > 0) {
            setPlanTypes(planTypes.join(", "));
        } else {
            setPlanTypes("–");
        }

        const uniqFinishings = onMarketBlocks
            .map((block: BlockInterface) => {
                return block.finishing;
            })
            .filter((value, index, self) => {
                return self.indexOf(value) === index;
            });

        if (uniqFinishings && uniqFinishings.length > 0) {
            setFinishings(uniqFinishings.join(", "));
        } else {
            setFinishings("–");
        }
        getUsers();
        getCompanies();
        getContragents();
    }, [buildingData]);

    const setFieldsValue = (params: any) => {
        form.setFieldsValue(params);
    };

    // const today = new Date();

    const getFieldState = (fieldName: string) => {
        if (form) {
            const res = form.getFieldValue(fieldName);
            if (res) {
                return res;
            }
        }

        // @ts-ignore
        const field = fields.find((el) => el.name[0] === fieldName);

        if (field) {
            //console.log("1", field.value);
            return field.value;
        } else {
            // @ts-ignore
            if ((!buildingData || !buildingData[fieldName]) && !initialValues[fieldName]) {
                return undefined;
            }

            // @ts-ignore
            if (!buildingData || !buildingData[fieldName]) {
                // @ts-ignore
                //console.log("2", initialValues[fieldName]);
                // @ts-ignore
                return initialValues[fieldName];
            }

            // @ts-ignore
            //console.log("3", initialValues[fieldName]);
            // @ts-ignore
            return buildingData[fieldName];
        }
    };

    const debounceSetFields = debounce(setFields, 500);

    if (isLoading) {
        return <Spin />;
    }
    // @ts-ignore
    return (
    <div>
        <Form
            form={form}
            {...formItemLayout}
            name="register"
            // initialValues={initialValues}

            scrollToFirstError
            // fields={fields}
            // @ts-ignore
            ref={formRef}
            onFieldsChange={(newFields) => {
                //console.log(newFields);
                debounceSetFields(newFields);
            }}
        >
            <Form.Item label="ID" shouldUpdate>
                <Input disabled={true} value={buildingData?.id} />
            </Form.Item>

            {/*<button onClick={() => {*/}
            {/*    form.setFieldsValue({*/}
            {/*        name: "test"*/}
            {/*    })*/}
            {/*}}>test*/}
            {/*</button>*/}
            {/*<button onClick={() => {*/}
            {/*    form.setFieldsValue({*/}
            {/*        "name-eng": "test"*/}
            {/*    })*/}
            {/*}}>test2*/}
            {/*</button>*/}

            <Form.Item
                name="name"
                label="Название"
                rules={[
                    {
                        required: true,
                        message: "название объекта должно быть указано",
                    },
                    //{ min: 4, message: "Название не может быть короче 4 символов" },
                ]}
                shouldUpdate={true}
            >
                <Input />
            </Form.Item>

            {user && UsersService.isAdmin(user) && <Form.Item name="name-eng" label="Название (eng)" shouldUpdate>
                <Input />
            </Form.Item>}

            <Form.Item
                name="area"
                label="Общ. площадь, м²"
                rules={[
                    {
                        required: !['ТЦ', 'ЖК', 'Жилой дом', 'ТОЦ', 'Деловой центр'].includes(getFieldState('buildingType')),
                        message: "Укажите \"Общ. площадь\"",
                    },
                ]}
                shouldUpdate
            >
                <Input style={{ width: 240 }} type={"number"} />
            </Form.Item>

            <Form.Item shouldUpdate name="officesArea" label="Пл. офисов, м²"
                       rules={[
                           {
                               validator: (_, value: number) => {
                                   return isIntegerField(value, "Пл. офисов");
                               }
                           },
                       ]}>
                <Input style={{ width: 240 }} type={"number"} />
            </Form.Item>

            <Form.Item
                name="freeRentArea"
                label="Площадь в аренду, м²"
                shouldUpdate
                normalize={(val: string) => {
                    return Math.round(parseFloat(val));
                }}
            >
                <Input disabled={true} style={{ width: 240 }} type={"string"} />
            </Form.Item>

            <Form.Item shouldUpdate name="freeSaleArea" label="Площадь на продажу, м²">
                <Input disabled={true} style={{ width: 240 }} type={"string"} />
            </Form.Item>

            <Form.Item
                shouldUpdate
                name="buildingType"
                label="Тип здания"
                rules={[
                    {
                        required: true,
                        message: "поле обязательно для заполнения",
                    },
                ]}
            >
                <Select style={{ width: 240 }}>
                    <Option value="Бизнес-центр">Бизнес-центр</Option>
                    <Option value="Бизнес-парк">Бизнес-парк</Option>
                    <Option value="Административное здание">Административное здание</Option>
                    <Option value="МФК">МФК</Option>
                    <Option value="Особняк">Особняк</Option>
                    <Option value="ТЦ">ТЦ</Option>
                    <Option value="ЖК">ЖК</Option>
                    <Option value="Жилой дом">Жилой дом</Option>
                    <Option value="Офисно-складской комплекс">Офисно-складской комплекс</Option>
                    <Option value="Складской комплекс">Складской комплекс</Option>
                    <Option value="ОСЗ">ОСЗ</Option>
                    <Option value="ТОЦ">ТОЦ</Option>
                    <Option value="Деловой центр">Деловой центр</Option>
                    <Option value="Технопарк">Технопарк</Option>
                </Select>
            </Form.Item>

            <Form.Item
                shouldUpdate
                name="buildingClass"
                label="Класс"
                rules={[
                    {
                        required: !['ТЦ', 'ЖК', 'Жилой дом', 'ТОЦ', 'Деловой центр'].includes(getFieldState('buildingType')),
                        message: "поле обязательно для заполнения",
                    },
                ]}
            >
                <Select
                    style={{ width: 240 }}
                    onChange={(e) => {
                        form.setFieldsValue({
                            buildingClass: e,
                        });
                    }}
                >
                    <Option value="A">A</Option>
                    <Option value="B+">B+</Option>
                    <Option value="B">B</Option>
                    <Option value="C">C</Option>
                </Select>
            </Form.Item>

            <Form.Item
                shouldUpdate
                name="floorsQnt"
                label="Кол-во этажей"
                rules={[
                    {
                        required: true,
                        message: "Поле \"Кол-во этажей\" обязательно для заполнения",
                    },
                ]}
            >
                <Input type={"number"}  style={{ width: 240 }}/>
            </Form.Item>

            <Form.Item
                shouldUpdate
                name="buildingYear"
                label="Год постройки"
                rules={[
                    {
                        required: true,
                        message: "Поле \"Год постройки\" обязательно для заполнения",
                    },
                    {
                        validator: (_, value) => {
                            return isIntegerField(value, "Год постройки");
                        }
                    },
                    { min: 4, message: "Минимум 4 цифры" },
                    { max: 4, message: "Максимум 4 цифры" },
                ]}
            >
                <Input style={{ width: 240 }} />
            </Form.Item>

            <Form.Item
                shouldUpdate
                name="reconstructionYear"
                label="Год реконструкции"
                rules={[
                    { min: 4, message: "Минимум 4 цифры" },
                    { max: 4, message: "Максимум 4 цифры" },
                    {
                        validator: (_, value) => {
                            return isIntegerField(value, "Год реконструкции");
                        }
                    },
                ]}
            >
                <Input style={{ width: 240 }} type={"number"} />
            </Form.Item>

            <MetroInput
                setFieldsValue={setFieldsValue}
                modelData={buildingData}
                setStations={(params) => {
                    //console.log("set stationms", params);
                    setMetroStations(params);
                }}
            />

            <Form.Item shouldUpdate name="mainBlock" label="Основной блок">
                <Select
                    style={{ width: 240 }}
                    onChange={(e) => {
                        form.setFieldsValue({
                            mainBlock: e,
                        });
                    }}
                >
                    {buildingData?.blocks
                        .sort(
                            // @ts-ignore
                            (el: BlockInterface, el2: BlockInterface) => {
                                // @ts-ignore
                                return el.id < el2.id;
                            }
                        )
                        .map((block) => {
                            // console.log("block", block)
                            let canBeSelected = false;
                            if (block.pics.length > 0) {
                                const plan = block.pics.find((el: any) => el.isPlan === true);
                                if (plan && plan.url) {
                                    canBeSelected = true;
                                }
                            }

                            return (
                                <Option
                                    //disabled={!canBeSelected}
                                    key={block.id}
                                    value={block.id}
                                >
                                    {block.name} (#{block.id}) {canBeSelected ? '' : '(нет плана)'}
                                </Option>
                            );
                        })}
                </Select>
            </Form.Item>
            {buildingData?.id && <Form.Item label={'Контрагенты'}>
                <Button key={'collapseContragents'} onClick={() => setIsCollapsedContragents(!isCollapsedContragents)}>
                    {isCollapsedContragents ? 'Развернуть' : 'Свернуть'}
                </Button>
                <div id={'collapseContragents'} style={{display: isCollapsedContragents ? 'none' : 'block', margin: '10px 0'}}>
                    {contragentsList.map((contragent, idx) => (
                            <ContragentForm
                                key={'ContragentForm' + contragent?.blockToCompanies?.id ?? Math.random()}
                                contragent={contragent}
                                companies={companies}
                                buildingId={buildingData?.id}
                                blockId={null}
                                removeContragent={removeContragent}
                                index={idx}
                            />
                    ))}
                    {contragentsList && <Button key="addContragent" onClick={() => setContragentsList([...contragentsList, {}])}>+</Button>}
                    {contragentsList && <Button style={{marginLeft: 10}} icon={<PlusOutlined/>} onClick={showCreateCompanyModal}>Добавить компанию</Button>}
                </div>
            </Form.Item>}
            <Form.Item shouldUpdate name="responsibleForContactsId" label="Ответственный за контакты">
                <Select
                    defaultValue={buildingData?.responsibleForContactsId || "null"}
                    style={{ width: 240, borderColor: 'red', borderWidth: 1, borderStyle: 'solid'}}
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
            <Form.Item shouldUpdate name="notes" label="Заметки" >
                <TextArea rows={3} style={{borderColor: 'red'}}/>
            </Form.Item>
            <Divider dashed />

            <MapSelector
                initialPoint={
                    isCreate
                        ? [55.770223, 37.594611]
                        : [buildingData?.latitude, buildingData?.longitude]
                }
                onSelected={(addressLine, coords) => {
                    form.setFieldsValue({
                        address: addressLine,
                    });

                    form.setFieldsValue({
                        coords: coords,
                    });
                    setAddress(addressLine);
                }}
            />

            <Form.Item
                shouldUpdate
                name="address"
                label="Адрес"
                rules={[
                    {
                        required: true,
                        message: "Поле \"Адрес\" обязательно для заполнения",
                    },
                ]}
            >
                <Input disabled={true} onChange={(e) => setAddress(e.target?.value)} />
            </Form.Item>

            {user && UsersService.isAdmin(user) && <Form.Item shouldUpdate name="addressEng" label="Адрес (eng)">
                <Input />
            </Form.Item>}

            <Form.Item
                shouldUpdate
                name="coords"
                label={
                    <div>
                        <span style={{ color: "red" }}>*</span> Координаты
                    </div>
                }
                validateStatus={"success"}
            >
                <CoordinatesInput
                    initialPoint={[buildingData?.longitude, buildingData?.latitude]}
                />
            </Form.Item>

            <Form.Item shouldUpdate name="globalDistrict" label="Округ">
                <Select style={{ width: 240 }}>
                    <Option value="ЦАО">ЦАО</Option>
                    <Option value="САО">САО</Option>
                    <Option value="СВАО">СВАО</Option>
                    <Option value="ВАО">ВАО</Option>
                    <Option value="ЮВАО">ЮВАО</Option>
                    <Option value="ЮАО">ЮАО</Option>
                    <Option value="ЮЗАО">ЮЗАО</Option>
                    <Option value="ЗАО ">ЗАО</Option>
                    <Option value="СЗАО">СЗАО</Option>
                    <Option value="ЗелАО">ЗелАО</Option>
                </Select>
            </Form.Item>

            <Form.Item shouldUpdate name="district" label="Район">
                <Select style={{ width: 240 }}>
                    {Districts.sort((a, b) => a.localeCompare(b, 'ru')).map((item) => {
                        return (
                            <Option key={item} value={item}>
                                {item}
                            </Option>
                        );
                    })}
                </Select>
            </Form.Item>

            <Form.Item shouldUpdate name="taxOffice" label="Налоговая">
                <Select style={{ width: 240 }}>
                    {TaxOffices.map((item) => {
                        return (
                            <Option key={item} value={item}>
                                ИФНС №{item}
                            </Option>
                        );
                    })}
                </Select>
            </Form.Item>

            <Divider 
                orientation="left" 
                className={"divider" + (collapsePrices ? " collapsedDivider" : "")}
                //@ts-ignore
                onClick={() => setCollapsePrices(!collapsePrices)}
            >Цены</Divider>
            <div style={{ display: collapsePrices ? "none" : "block" }}>
                <Form.Item shouldUpdate name="currency" label="Валюта">
                    <Select id={"currency-selector"} defaultValue={"RUB"} style={{ width: 240 }}>
                        <Option value="RUB">Рубль (₽)</Option>
                        <Option value="USD">Доллар ($)</Option>
                        <Option value="EUR">Евро (€)</Option>
                    </Select>
                </Form.Item>

                <Form.Item shouldUpdate name="basePriceRent" label="Базов. ставка аренда">
                    <PriceInput
                        disabled={true}
                        setFieldsValue={setFieldsValue}
                        currency={getFieldState("currency")}
                    />
                </Form.Item>

                <Form.Item shouldUpdate name="basePriceSale" label="Базов. ставка продажа">
                    <PriceInput
                        disabled={true}
                        setFieldsValue={setFieldsValue}
                        currency={form.getFieldValue("currency")}
                    />
                </Form.Item>

                <Form.Item shouldUpdate name="parkingLandPrice" label="Назем. паркинг">
                    <PriceInput
                        setFieldsValue={setFieldsValue}
                        currency={form.getFieldValue("currency")}
                    />
                </Form.Item>

                <Form.Item shouldUpdate name="parkingMultiLevelPrice" label="Мультиуровн. паркинг">
                    <PriceInput
                        setFieldsValue={setFieldsValue}
                        currency={form.getFieldValue("currency")}
                    />
                </Form.Item>

                <Form.Item shouldUpdate name="parkingSubwayPrice" label="Подземн. паркинг">
                    <PriceInput
                        setFieldsValue={setFieldsValue}
                        currency={form.getFieldValue("currency")}
                    />
                </Form.Item>
            </div>
            {/* 
        <Form.Item
            shouldUpdate
            name="fireSystem"
            label="Пожарная система"
        >
            <Select defaultValue={'null'} style={{ width: 240 }} onChange={e => {
                console.log(e)
            }}>
                <Option value="true">Да</Option>
                <Option value="false">Нет</Option>
                <Option value="null">Неизвестно</Option>

            </Select>
        </Form.Item> */}

            <Divider 
                orientation="left" 
                className={"divider" + (collapsePlace ? " collapsedDivider" : "")}
                //@ts-ignore
                onClick={() => setCollapsePlace(!collapsePlace)}
            >Земля и стадия стр-ва</Divider>
            <div style={{ display: collapsePlace ? "none" : "block" }}>
                <Form.Item shouldUpdate name="spot" label="Участок, ГА"
                    rules={[
                        {
                            type: "number",
                                required: false,
                                validator: (_, value: string) => {
                                    if (!value) {
                                        return Promise.resolve();
                                    }
                                    return isFloatField(value, "Участок, ГА");
                                },
                                message: "Участок, ГА должно быть числом",
                        },
                    ]}
                >
                    <Input style={{ width: 240 }} type={"number"} />
                </Form.Item>

                <Form.Item shouldUpdate name="spotStatus" label="Статус участка">
                    <Select defaultValue={"null"} style={{ width: 240 }}>
                        <Option value="В собственности">В собственности</Option>
                        <Option value="В аренде">В аренде</Option>
                        <Option value="null">Неизвестно</Option>
                    </Select>
                </Form.Item>

                <Form.Item shouldUpdate name="zone" label="Зона">
                    <Select placeholder={"Выберите зону"} style={{ width: 240 }}>
                        <Option value="ЦДР">ЦДР</Option>
                        <Option value="СК-ТТК">СК-ТТК</Option>
                        <Option value="ТТК-МКАД">ТТК-МКАД</Option>
                        <Option value="За МКАД">За МКАД</Option>
                    </Select>
                </Form.Item>

                {user && UsersService.isAdmin(user) && <Form.Item shouldUpdate name="subMarket" label="Субрынок">
                    <Select placeholder={"Выберите субрынок"} style={{ width: 240 }}>
                        <Option value="СК Юг">СК Юг</Option>
                        <Option value="СК Север">СК Север</Option>
                        <Option value="СК Запад">СК Запад</Option>
                        <Option value="СК Восток">СК Восток</Option>
                        <Option value="СК-ТТК Юг">СК-ТТК Юг</Option>
                        <Option value="СК-ТТК Север">СК-ТТК Север</Option>
                        <Option value="СК-ТТК Запад">СК-ТТК Запад</Option>
                        <Option value="СК-ТТК Восток">СК-ТТК Восток</Option>
                        <Option value="ТТК-МКАД Юг">ТТК-МКАД Юг</Option>
                        <Option value="ТТК-МКАД Север">ТТК-МКАД Север</Option>
                        <Option value="ТТК-МКАД Запад">ТТК-МКАД Запад</Option>
                        <Option value="ТТК-МКАД Восток">ТТК-МКАД Восток</Option>
                        <Option value="ТТК-МКАД Юг">ТТК-МКАД Юг</Option>
                        <Option value="ТТК-МКАД Север">ТТК-МКАД Север</Option>
                        <Option value="ТТК-МКАД Запад">ТТК-МКАД Запад</Option>
                        <Option value="За МКАД">За МКАД</Option>
                        <Option value="Новая Москва">Новая Москва</Option>
                        <Option value="Химки">Химки</Option>
                        <Option value="Москва-Сити">Москва-Сити</Option>
                        <Option value="Павелецкий">Павелецкий</Option>
                        <Option value="Белорусский">Белорусский</Option>
                        <Option value="Ленинградский">Ленинградский</Option>
                    </Select>
                </Form.Item>}

                <Form.Item shouldUpdate name="constructionStatus" label="Стадия строит.">
                    <Select style={{ width: 240 }}>
                        <Option value="project">Проект</Option>
                        <Option value="frozen">Заморожен</Option>
                        <Option value="inprogress">Строится</Option>
                        <Option value="done">Построен</Option>
                        <Option value="null">неизвестно</Option>
                    </Select>
                </Form.Item>

                <Form.Item shouldUpdate name="constructionStartDate" label="Дата начала строит.">
                    <Input style={{ width: 240 }} type={"date"} />
                </Form.Item>

                {user && UsersService.isAdmin(user) && <Form.Item shouldUpdate name="bts" label="БТС">
                    <BooleanSelect>
                        <Option value="null">неизвестно</Option>
                        <Option value="true">да</Option>
                        <Option value="false">нет</Option>
                    </BooleanSelect>
                </Form.Item>}

                {user && UsersService.isAdmin(user) && <Form.Item shouldUpdate name="isNewConstruction" label="Новое строит.?">
                    <Select style={{ width: 240 }}>
                        <Option value="Бизнес центр2">неизвестно</Option>
                        <Option value="Бизнес центр">Новое строительство</Option>
                        <Option value="Бизнес центр2">Реконструкция</Option>
                    </Select>
                </Form.Item>}

                {user && UsersService.isAdmin(user) && <Form.Item shouldUpdate name="mfrBuildingClass" label="Класс здания MRF">
                    <Select
                        style={{ width: 240 }}
                        onChange={(e) => {
                            // form.setFieldsValue({
                            //     buildingClass: e
                            // })
                        }}
                    >
                        <Option value="null">неизвестно</Option>
                        <Option value="A">A</Option>
                        <Option value="B+">B+</Option>
                        <Option value="B">B</Option>
                        <Option value="C">C</Option>
                    </Select>
                </Form.Item>}

                {user && UsersService.isAdmin(user) && <Form.Item name="isCoworking" label="Коворкинг" shouldUpdate>
                    <BooleanSelect disabled={true}>
                        <Option key={"true"} value={"true"}>
                            да
                        </Option>
                        <Option key={"false"} value={"false"}>
                            нет
                        </Option>
                    </BooleanSelect>
                </Form.Item>}

                {user && UsersService.isAdmin(user) && <Form.Item shouldUpdate name="coworkingName" label="Название коворк.">
                    <Input />
                </Form.Item>}

                {user && UsersService.isAdmin(user) && <Form.Item shouldUpdate name="coworkingArea" label="Площадь коворк."
                    rules={[
                        {
                            validator: (_, value) => {
                                return isIntegerField(value, "Площадь коворк.");
                            }
                        },
                    ]}
                >
                    <Input prefix={"м²"} type={"number"} />
                </Form.Item>}
            </div>
            <Divider 
                orientation="left" 
                className={"divider" + (collapseMarketing ? " collapsedDivider" : "")}
                //@ts-ignore
                onClick={() => setCollapseMarketing(!collapseMarketing)}
            >Маркетинг</Divider>
            <div style={{display: collapseMarketing ? 'none' : 'block'}}>
                <Form.Item shouldUpdate name="description" label="Описание здания">
                    <TextArea rows={3} />
                </Form.Item>

                <Form.Item
                    shouldUpdate={true}
                    name="cianMultiBlockId"
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

                <Form.Item
                    shouldUpdate={true}
                    name="cianMultiTitle"
                    label="Заголовок мультиобъявления ЦИАН"
                    rules={[
                        {
                            required: false,
                            max: 33,
                        },
                    ]}>
                    <Input placeholder={"Максимум 33 символа"} />
                </Form.Item>

                <Form.Item shouldUpdate name="cianMultiDescription" label="Описание мультиобъявления ЦИАН">
                    <TextArea rows={3} />
                </Form.Item>

                {cianMultiblocks.length > 1 &&
                    getFieldState("cianMultiBlockId") !== 0 &&
                    getFieldState("cianMultiBlockId") !== undefined &&
                    getFieldState("cianMultiBlockId") !== null && (
                        <>
                            <Form.Item
                                shouldUpdate={true}
                                name="cianMultiBlockId2"
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
                            <Form.Item
                                shouldUpdate={true}
                                name="cianMultiTitle2"
                                label="Заголовок мультиобъявления ЦИАН"
                                rules={[
                                    {
                                        required: false,
                                        max: 33,
                                    },
                                ]}>
                                <Input placeholder={"Максимум 33 символа"} />
                            </Form.Item>

                            <Form.Item shouldUpdate name="cianMultiDescription2" label="Описание мультиобъявления ЦИАН">
                                <TextArea rows={3} />
                            </Form.Item>
                        </>
                    )}
                {cianMultiblocks.length > 1 &&
                    getFieldState("cianMultiBlockId2") !== 0 &&
                    getFieldState("cianMultiBlockId2") !== undefined &&
                    getFieldState("cianMultiBlockId2") !== null && (
                        <>
                            <Form.Item
                                shouldUpdate={true}
                                name="cianMultiBlockId3"
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
                            <Form.Item
                                shouldUpdate={true}
                                name="cianMultiTitle3"
                                label="Заголовок мультиобъявления ЦИАН"
                                rules={[
                                    {
                                        required: false,
                                        max: 33,
                                    },
                                ]}>
                                <Input placeholder={"Максимум 33 символа"} />
                            </Form.Item>

                            <Form.Item shouldUpdate name="cianMultiDescription3" label="Описание мультиобъявления ЦИАН">
                                <TextArea rows={3} />
                            </Form.Item>
                        </>
                    )}

                <Form.Item shouldUpdate name="showOnSite" label="Выгрузить на сайт R&B">
                    <BooleanSelect>
                        <Option value="true">да</Option>
                        <Option value="false">нет</Option>
                    </BooleanSelect>
                </Form.Item>
                {/* {user && UsersService.isAdmin(user) && <Form.Item shouldUpdate name="siteCategory" label="Подборка на сайт">
                    <Select style={{ width: 240 }}>
                        <Option value="нет">Нет</Option>
                        <Option value="На проверку">На проверку</Option>
                        <Option value="Офисы на продажу">Офисы на продажу</Option>
                        <Option value="ОСЗ">ОСЗ</Option>
                        <Option value="Офисы в ЦАО">Офисы в ЦАО</Option>
                        <Option value="Офисы на Ленинградке">Офисы на Ленинградке</Option>
                    </Select>
                </Form.Item>} */}
            </div>
            {user && UsersService.isAdmin(user) && <Form.Item shouldUpdate name="hasAgencyContract" label="Агентский договор">
                <Select defaultValue={"null"} style={{ width: 240 }}>
                    <Option value="null">неизвестно</Option>
                    <Option value="true">да</Option>
                    <Option value="false">нет</Option>
                    <Option value="rejection">отказ</Option>
                </Select>
            </Form.Item>}

            {/*<Form.Item shouldUpdate name="feePercentRent" label="Вознагр. аренда">*/}
            {/*    <Input style={{ width: 240 }} prefix={"%"} type={"number"} />*/}
            {/*</Form.Item>*/}

            {/*<Form.Item shouldUpdate name="feePercentSale" label="Вознагр. продажа">*/}
            {/*    <Input style={{ width: 240 }} prefix={"%"} type={"number"} />*/}
            {/*</Form.Item>*/}

            {user && UsersService.isAdmin(user) && <Form.Item shouldUpdate name="isExclusive" label="Эксклюзивность">
                <Select defaultValue={"null"} style={{ width: 240 }}>
                    <Option value="null">неизвестно</Option>
                    <Option value="Бизнес центр">Нет эксклюзива</Option>
                    <Option value="Бизнес центр2">Эксклюзив</Option>
                    <Option value="Бизнес центр2">Ко-эксклюзив</Option>
                </Select>
            </Form.Item>}

            {user && UsersService.isAdmin(user) && <Form.Item shouldUpdate name="exclusiveConsultant1" label="Экск. консультант">
                <Select
                    mode="multiple"
                    allowClear
                    style={{ width: 240 }}
                    placeholder="Please select"
                    defaultValue={["Юзер 1", "5"]}
                    // onChange={handleChange}
                >
                    <Option value="1">Юзер 1</Option>
                    <Option value="2">Юзер 2</Option>
                    <Option value="3">Юзер 3</Option>
                    <Option value="4">Юзер 4</Option>
                    <Option value="5">Юзер 5</Option>
                </Select>
            </Form.Item>}

            {user && UsersService.isAdmin(user) && <Form.Item shouldUpdate name="exclusiveConsultantRnb" label="Конс. RnB аренда">
                <Input style={{ width: 240 }} />
            </Form.Item>}

            {user && UsersService.isAdmin(user) && <Form.Item shouldUpdate name="exclusiveConsultant" label="Конс. RnB прод">
                <Input style={{ width: 240 }} />
            </Form.Item>}

            {user && UsersService.isAdmin(user) && <Form.Item shouldUpdate name="isOnMarket" label="Статус объекта">
                <BooleanSelect disabled={true}>
                    <Option value="true">На рынке</Option>
                    <Option value="false">Нет на рынке</Option>
                </BooleanSelect>
            </Form.Item>}

            {user && UsersService.isAdmin(user) && <Form.Item shouldUpdate label="Тип реализации">
                <Input style={{ width: 240 }} disabled={true} value={realizationTypes} />
            </Form.Item>}

            {/* <Form.Item
                shouldUpdate
                // name="finishing"
                label="Отделка"
            >
                <Input style={{ width: 240 }} disabled={true} value={finishings} />
            </Form.Item>

            <Form.Item shouldUpdate label="Тип планировки">
                <Input style={{ width: 240 }} disabled={true} value={planTypes} />
            </Form.Item> */}
            <Divider 
                orientation="left"
                className={"divider" + (collapseParking ? " collapsedDivider" : "")}
                //@ts-ignore
                onClick={() => {setCollapseParking(!collapseParking)}}
            >Паркинг</Divider>
            <div style={{display: collapseParking ? "none" : "block"}}>
                <Form.Item shouldUpdate name="parkingType" label="Паркинг тип">
                    <Select
                        // mode="multiple"
                        defaultValue={"Наземный"}
                        style={{ width: 240 }}
                    >
                        <Option value="Наземный">Наземный</Option>
                        <Option value="Подземный">Подземный</Option>
                        <Option value="Многоуровневый">Многоуровневый</Option>
                        <Option value="Городской">Городской</Option>
                        <Option value="неизвестно">неизвестно</Option>
                    </Select>
                </Form.Item>

                <Form.Item shouldUpdate name="parkingNazemQnt" label="Парк. кол-во, наземн.">
                    <Input prefix={" м/м"} style={{ width: 240 }} type={"number"} />
                </Form.Item>
                <Form.Item shouldUpdate name="parkingSubwayQnt" label="Парк. кол-во, подземн.">
                    <Input prefix={"м/м"} style={{ width: 240 }} type={"number"} />
                </Form.Item>
                <Form.Item shouldUpdate name="parkingMultiQnt" label="Паркинг, многоуровн.">
                    <Input prefix={"м/м"} style={{ width: 240 }} type={"number"} />
                </Form.Item>
                <Form.Item name="parkingLandPrice" label="Парк. назем.">
                    <Input style={{ width: 240 }} prefix={"м/м, ₽"} type={"number"} />
                </Form.Item>
                <Form.Item name="parkingSubwayPrice" label="Парк. подземн.">
                    <Input style={{ width: 240 }} prefix={"м/м, ₽"} type={"number"} />
                </Form.Item>

                <Form.Item shouldUpdate name="parkingMultiLevelPrice" label="Паркинг многоуровн.">
                    <Input prefix={" м/м, ₽"} type={"number"} style={{ width: 240 }} />
                </Form.Item>

                <Form.Item shouldUpdate name="parkingNds" label="Парк. НДС наземн.">
                    <BooleanSelect>
                        <Option value="null">неизвестно</Option>
                        <Option value="true">да</Option>
                        <Option value="false">нет</Option>
                    </BooleanSelect>
                </Form.Item>

                <Form.Item shouldUpdate name="parkingNdsSubway" label="Парк. НДС, подземн.">
                    <BooleanSelect>
                        <Option value="null">неизвестно</Option>
                        <Option value="true">да</Option>
                        <Option value="false">нет</Option>
                    </BooleanSelect>
                </Form.Item>

                <Form.Item shouldUpdate name="parkingNdsMulti" label="Парк. НДС, многоуровн.">
                    <BooleanSelect>
                        <Option value="null">неизвестно</Option>
                        <Option value="true">да</Option>
                        <Option value="false">нет</Option>
                    </BooleanSelect>
                </Form.Item>
                {user && UsersService.isAdmin(user) && <Form.Item shouldUpdate name="parkCoefManual" label="Парк. Коэф.">
                    <InputNumber
                        type={"string"}
                        style={{ width: 240 }}
                        placeholder={buildingData?.parkCoefAuto}
                        addonAfter={
                            <Tooltip
                                title={
                                    buildingData?.parkCoefAuto
                                        ? buildingData?.parkCoefAuto
                                        : "Недостаточно данных для автоматического определения"
                                }
                            >
                                <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
                            </Tooltip>
                        }
                    />
                </Form.Item>}
            </div>
            <Divider 
                orientation="left"
                className={"divider" + (collapseBuildingInfo ? " collapsedDivider" : "")}
                //@ts-ignore
                onClick={() => {setCollapseBuildingInfo(!collapseBuildingInfo)}}
            >Информация о здании</Divider>
            <div style={{display: collapseBuildingInfo ? "none" : "block"}}>
                <Form.Item shouldUpdate name="floorsHeight" label="Высота потолков, м">
                    <Input style={{ width: 240 }} type={"text"} />
                </Form.Item>

                <Form.Item shouldUpdate name="stepKolonn" label="Шаг колонн, м">
                    <Input style={{ width: 240 }} type={"string"} />
                </Form.Item>

                <Form.Item shouldUpdate name="parkingLoad" label="Нагрузка на перекрыт.">
                    <Input prefix={"кг/м²"} style={{ width: 240 }} type={"number"} />
                </Form.Item>

                {user && UsersService.isAdmin(user) && <Form.Item shouldUpdate name="roomServerQnt" label="Помещения под сервер.">
                    <Input style={{ width: 240 }} type={"number"} />
                </Form.Item>}

                <Form.Item shouldUpdate name="ventType" label="Тип вентиляции">
                    <Select style={{ width: 240 }}>
                        <Option value="Неизвестно">Неизвестно</Option>
                        <Option value="Естественная">Естественная</Option>
                        <Option value="Приточная">Приточная</Option>
                        <Option value="Нет">Нет</Option>
                    </Select>
                </Form.Item>

                <Form.Item shouldUpdate name="fireSystem" label="Пожарн. система">
                    <Select style={{ width: 240 }}>
                        <Option value="Неизвестно">Неизвестно</Option>
                        <Option value="Гидратная">Гидратная</Option>
                        <Option value="Спринклерная">Спринклерная</Option>
                        <Option value="Порошковая">Порошковая</Option>
                        <Option value="Газовая">Газовая</Option>
                        <Option value="Сигнализация">Сигнализация</Option>
                        <Option value="Да">Да</Option>
                        <Option value="Нет">Нет</Option>
                        <Option value="Неизвестно">Неизвестно</Option>
                    </Select>
                </Form.Item>
                <Form.Item shouldUpdate name="peopleLiftsQnt" label="Кол-во пассаж. лифтов">
                    <Input style={{ width: 240 }} type={"number"} />
                </Form.Item>

                <Form.Item shouldUpdate name="peopleLiftsBrand" label="Марка лифтов">
                    <Input />
                </Form.Item>

                <Form.Item shouldUpdate name="bigLiftsBrand" label="Марка лифтов, гр.">
                    <Input />
                </Form.Item>

                <Form.Item shouldUpdate name="hasBigLift" label="Грузовой лифт">
                    <BooleanSelect>
                        <Option value="null">неизвестно</Option>
                        <Option value="true">да</Option>
                        <Option value="false">нет</Option>
                    </BooleanSelect>
                </Form.Item>

                <Form.Item shouldUpdate name="allocatedPower" label="Выделенная мощность">
                    <Input prefix={"на м², Вт"} style={{ width: 240 }} type={"number"} />
                </Form.Item>

                <Form.Item shouldUpdate name="electricSupply" label="Катег. электроснабж.">
                    <Input />
                </Form.Item>

                <Form.Item shouldUpdate name="provider" label="Телеком провайдер">
                    <Input />
                </Form.Item>

                <Form.Item shouldUpdate name="infra" label="Инфрастуктура">
                    <InfrastructureInput />
                </Form.Item>
            </div>

            <Form.Item shouldUpdate name="createdAt" label="Дата создания">
                <DateInput disabled={true} />
                {/*<Input disabled={true} style={{width: 240}} />*/}
            </Form.Item>

            <Form.Item shouldUpdate name="updatedByUserDate" label="Дата обновления">
                <DateInput disabled={true} />
            </Form.Item>

            {!isCreate && (
                <Form.Item shouldUpdate name="creator" label="Создав. пользователь">
                    {getFieldState("creator") && (
                        <UserInput
                            id={"creator-user"}
                            disabled={true}
                            relationName={"creator"}
                            setFieldsValue={setFieldsValue}
                            currentUser={buildingData?.creator}
                        />
                    )}
                    {!getFieldState("creator") && <div>Объект создан системой</div>}
                </Form.Item>
            )}

            {!isCreate && (
                <Form.Item shouldUpdate name="updatedBy" label="Обновл. пользователем">
                    {!getFieldState("updatedBy") && <div>Объект обновлен системой</div>}
                    {getFieldState("updatedBy") && (
                        <UserInput
                            id={"updatedBy-user"}
                            disabled={true}
                            relationName={"updatedBy"}
                            setFieldsValue={setFieldsValue}
                            currentUser={buildingData?.updatedBy}
                        />
                    )}
                </Form.Item>
            )}
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

export default ObjectForm;
