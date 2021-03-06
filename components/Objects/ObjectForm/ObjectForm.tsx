import styles from "ObjectForm.module.scss"
import {Button, Col, DatePicker, Divider, Form, Input, notification, Row, Select} from "antd";

const {TextArea} = Input;
import React, {forwardRef, useEffect, useRef, useState} from "react";
import MapSelector from "../MapSelector";
import {submitBuildingForm} from "../../../effects/object";
import CoordinatesInput from "../../inputs/CoordinatesInput/CoordinatesInput";
import Api from "../../../services/Api";
import {useRouter} from "next/router";
import {BuildingInterface} from "../../../interfaces/BuildingInterface";
import {Districts, TaxOffices} from "../../../utils/constants";
import BooleanSelect from "../../inputs/BooleanSelect";
import UserInput from "../../inputs/UserInput/UserInput";
import InfrastructureInput from "../../inputs/InfrastructureInput";
import PriceInput from "../../inputs/PriceInput/PriceInput";
import {MetroInput} from "../../inputs/StationsInput/MetroInput";
import debounce from "lodash/debounce";
import DateInput from "../../inputs/DateInput";
import {BlockInterface} from "../../../interfaces/BlockInterface";

const {Option, OptGroup} = Select;
const formItemLayout = {
    labelCol: {span: 5},
    // wrapperCol: {span: 12},
};

interface ObjectFormProps {
    buildingData?: BuildingInterface
    isCreate?: boolean
    onUpdate?: (params: any) => void
}

interface FieldData {
    name: string | number | (string | number)[];
    value?: any;
    touched?: boolean;
    validating?: boolean;
    errors?: string[];
}

const ObjectForm = ({isCreate = false, buildingData, ...otherProps}: ObjectFormProps) => {
    const formRef = useRef()
    const [form] = Form.useForm();
    const router = useRouter();
    const [metroStations, setMetroStations] = useState<any>(undefined)

    const [realizationTypes, setRealizationTypes] = useState<string>('–');
    const [planTypes, setPlanTypes] = useState<string>('–');
    const [finishings, setFinishings] = useState<string>('–');


    const [fields, setFields] = useState<FieldData[]>([]);

    useEffect(() => {
        const unwatch = submitBuildingForm.watch(async () => {

            try {
                let props = form.getFieldsValue()

                if (props.coords) {
                    props.longitude = props.coords[1]
                    props.latitude = props.coords[0]
                }

                if(metroStations?.station1){
                    props.station1 = metroStations.station1
                }else{
                    props.station1 =  null

                }
                if(metroStations?.station2){
                    props.station2 = metroStations.station2
                }else{
                    props.station2=  null
                }
                if(metroStations?.fromStation1){
                    props.fromStation1 = metroStations.fromStation1
                }else{
                    props.fromStation1 = null

                }
                if(metroStations?.fromStation2){
                    props.fromStation2 = metroStations.fromStation2
                }else{
                    props.fromStation2 =null
                }




                // @ts-ignore
                await formRef.current.validateFields();


                try {
                    let res;
                    if (isCreate) {
                        res = await Api.createBuilding(props)
                    } else {
                        console.log(buildingData)
                        if (buildingData) {
                            res = await Api.updateBuilding(props, buildingData.id)
                        } else {
                            throw Error("No building data for updating")
                        }
                    }
                    notification.success({
                        message: isCreate ? `Объект ${props.name} создан с номером #${res.data.id}` : 'Данные сохранены',
                        placement: 'bottomRight'
                    });
                    if (isCreate) {
                        await router.push(`/objects/${res.data.id}`)
                    } else {
                        if (otherProps.onUpdate) {
                            otherProps.onUpdate(res)
                        }
                    }
                } catch (e: any) {
                    notification.error({
                        message: isCreate ? `Ошибка при создании объекта: ${props.name}` : 'Ошибка при сохранении данных',
                        description: "Текст ошибки: " + e.message,
                        placement: 'bottomRight'
                    });
                }
            } catch (e: any) {
                console.log(e)
                console.log(e.message);


                notification.error({
                    message: `Некорректно заполнены поля объекта`,
                    description: "Проверьте поля " + e.errorFields.map((e: any)=>e.name[0]).join(', '),
                    placement: 'bottomRight'
                });
            }

        })
        return function cleanup() {
            unwatch()
        }

    }, [metroStations])

    useEffect(()=>{
        form.resetFields();

        const enums = {
            rent: 'Аренда',
            sale: 'Продажа',
            subRent: 'Субаренда'
        }


        const onMarketBlocks = (buildingData?.blocks?.filter(el=>{
            return el.isOnMarket === 'Есть на рынке'
        }) || [])

        const realizationTypes = onMarketBlocks.map((block: BlockInterface)=>{
            return block.realisationType;
        }).filter((value, index, self)=>{
            return self.indexOf(value) === index;
        }).map(item=>{
            // @ts-ignore
            return enums[item];
        });

        if(realizationTypes){
            setRealizationTypes(realizationTypes.join(', '))
        }else{
            setRealizationTypes('–')
        }




        const planTypes =  onMarketBlocks.map((block: BlockInterface)=>{
            return block.planType;
        }).filter((value, index, self)=>{
            return self.indexOf(value) === index;
        });


        if(planTypes && planTypes.length > 0){
            setPlanTypes(planTypes.join(', '))
        }else{
            setPlanTypes('–')
        }


        const uniqFinishings =  onMarketBlocks.map((block: BlockInterface)=>{
            return block.finishing;
        }).filter((value, index, self)=>{
            return self.indexOf(value) === index;
        });


        if(uniqFinishings && uniqFinishings.length > 0){
            setFinishings(uniqFinishings.join(', '))
        }else{
            setFinishings('–')
        }


    }, [buildingData])

    const setFieldsValue = (params: any) => {
        form.setFieldsValue(params);
    }

    // const today = new Date();

    const initialValues = {
        // createdAt: '2090-10-10',
        // updatedAt: '2090-10-10',
        currency: 'RUB',
        stations: [],
        showOnSite: false,
        bts: false,
        hasAgencyContract: null
    }

    const getFieldState = (fieldName: string) => {

        if(form){
            const res =  form.getFieldValue(fieldName)
            if(res){
                return res;
            }
        }


        // @ts-ignore
        const field = fields.find(el => el.name[0] === fieldName);


        if (field) {
            console.log('1', field.value)
            return field.value;
        } else {

            // @ts-ignore
            if((!buildingData || !buildingData[fieldName]) && !initialValues[fieldName]){
                return undefined;
            }

            // @ts-ignore
            if(!buildingData || !buildingData[fieldName]){
                // @ts-ignore
                console.log('2', initialValues[fieldName])
                // @ts-ignore
                return initialValues[fieldName]
            }

            // @ts-ignore
            console.log('3', initialValues[fieldName])
            // @ts-ignore
            return buildingData[fieldName]
        }

    }

    const debounceSetFields = debounce(setFields, 500);

    return <Form
        form={form}
        {...formItemLayout}
        name="register"
        initialValues={isCreate ? initialValues : buildingData}

        scrollToFirstError
        fields={fields}
        // @ts-ignore
        ref={formRef}


        onFieldsChange={newFields => {
            console.log(newFields)
            debounceSetFields(newFields);

        }
        }


    >
        <Form.Item
            name="localId"
            label="Local ID"

        >
            <Input disabled={true}/>
        </Form.Item>


        <Form.Item
            name="name"
            label="Название"
            rules={[
                {
                    required: true,
                    message: 'название объекта должно быть указано',
                },
                {min: 4, message: 'Название не может быть короче 4 символов'},
            ]}
        >
            <Input/>
        </Form.Item>

        <Form.Item
            name="name-eng"
            label="Название (eng)"
        >
            <Input/>
        </Form.Item>

        <Form.Item
            name="area"
            label="Площадь, м²"
            rules={[
                {
                    required: true,
                    message: 'укажите площадь',
                }
            ]}
        >
            <Input style={{width: 240}} type={"number"}/>
        </Form.Item>
        <Form.Item
            name="freeRentArea"
            label="Площадь в аренду, м²"

        >
            <Input disabled={true} style={{width: 240}} type={"string"}/>
        </Form.Item>

        <Form.Item
            name="freeSaleArea"
            label="Площадь на продажу, м²"

        >
            <Input disabled={true} style={{width: 240}} type={"string"}/>
        </Form.Item>

        <Form.Item
            name="buildingType"
            label="Тип здания"
        >
            <Select style={{width: 240}}>
                <Option value="Бизнес-центр">Бизнес-центр</Option>
                <Option value="Бизнес-парк">Бизнес-парк</Option>
                <Option value="Административное здание">Административное здание</Option>
                <Option value="МФК">МФК</Option>
                <Option value="Особняк">Особняк</Option>
                <Option value="ТЦ">ТЦ</Option>
                <Option value="ЖК">ЖК</Option>
                <Option value="Офисно-складской комплекс">Офисно-складской комплекс</Option>
                <Option value="Складской комплекс">Складской комплекс</Option>
            </Select>


        </Form.Item>

        <Form.Item
            name="buildingClass"
            label="Класс"
            initialValue={'A'}

        >
            <Select defaultValue="A" style={{width: 240}} onChange={e => {
                form.setFieldsValue({
                    buildingClass: e
                })
            }}>
                <Option value="A">A</Option>
                <Option value="B+">B+</Option>
                <Option value="B">
                    B
                </Option>
                <Option value="C">C</Option>
            </Select>
        </Form.Item>

        <Divider dashed/>

        <MapSelector
            initialPoint={[buildingData?.latitude, buildingData?.longitude]}
            onSelected={((addressLine, coords) => {
                form.setFieldsValue({
                    address: addressLine
                })

                form.setFieldsValue({
                    coords: coords
                })


            })}/>

        <Form.Item
            name="address"
            label="Адрес"
        >
            <Input/>
        </Form.Item>


        <Form.Item
            name="addressEng"
            label="Адрес (eng)"
        >
            <Input/>
        </Form.Item>


        <Form.Item
            name="coords"
            label="Координаты"

        >
            <CoordinatesInput
                initialPoint={[buildingData?.longitude, buildingData?.latitude]}
            />

        </Form.Item>

        <Form.Item
            name="globalDistrict"
            label="Округ"
        >
            <Select style={{width: 240}}>
                <Option value="ЦАО">ЦАО</Option>
                <Option value="САО">САО</Option>
                <Option value="СВАО">СВАО</Option>
                <Option value="ВАО">ВАО</Option>
                <Option value="ЮВАО">ЮВАО</Option>
                <Option value="ЮАО">ЮАО</Option>
                <Option value="ЮЗАО">ЮЗАО</Option>
                <Option value="ЗАО ">ЗАО </Option>

            </Select>
        </Form.Item>

        <Form.Item
            name="district"
            label="Район"
        >
            <Select style={{width: 240}}>
                {Districts.map(item => {
                    return <Option key={item} value={item}>{item}</Option>
                })}

            </Select>
        </Form.Item>

        <Form.Item
            name="taxOffice"
            label="Налоговая"
        >
            <Select style={{width: 240}}>
                {TaxOffices.map(item => {
                    return <Option key={item} value={item}>ИФНС №{item}</Option>
                })}

            </Select>
        </Form.Item>

        <Divider/>
        <h3>Цены</h3>

        <Form.Item
            name="currency"
            label="Валюта"
        >
            <Select id={'currency-selector'} defaultValue={'RUB'} style={{width: 240}}>
                <Option value="RUB">Рубль (₽)</Option>
                <Option value="USD">Доллар ($)</Option>
                <Option value="EUR">Евро (€)</Option>
            </Select>
        </Form.Item>


        <Form.Item
            name="basePriceRent"
            label="Базов. ставка аренда"
        >
            <PriceInput
                setFieldsValue={setFieldsValue}
                currency={getFieldState('currency')}
            />
        </Form.Item>

        <Form.Item
            name="basePriceSale"
            label="Базов. ставка продажа"
        >
            <PriceInput
                setFieldsValue={setFieldsValue}
                currency={form.getFieldValue('currency')}
            />
        </Form.Item>


        <Form.Item
            name="parkingLandPrice"
            label="Назем. паркинг"
        >
            <PriceInput
                setFieldsValue={setFieldsValue}
                currency={form.getFieldValue('currency')}
            />
        </Form.Item>


        <Form.Item
            name="parkingMultiLevelPrice"
            label="Мультиуровн. паркинг"
        >
            <PriceInput
                setFieldsValue={setFieldsValue}
                currency={form.getFieldValue('currency')}
            />
        </Form.Item>


        <Form.Item
            name="parkingSubwayPrice"
            label="Подземн. паркинг"
        >
            <PriceInput
                setFieldsValue={setFieldsValue}
                currency={form.getFieldValue('currency')}
            />
        </Form.Item>


        <Divider dashed/>


        <Form.Item
            name="fireSystem"
            label="Пожарная система"
        >
            <Select defaultValue={'null'} style={{width: 240}} onChange={e => {
                console.log(e)
            }}>
                <Option value="true">Да</Option>
                <Option value="false">Нет</Option>
                <Option value="null">Неизвестно</Option>

            </Select>
        </Form.Item>


        <Divider/>


        <MetroInput
            setFieldsValue={setFieldsValue}
                                    modelData={buildingData}
            setStations={params=>{
                console.log("set stationms", params)
                setMetroStations(params)
            }}
        />


        <Divider/>

        <Form.Item
            name="zone"
            label="Зона"
        >
            <Select placeholder={'Выберите зону'} style={{width: 240}}>
                <Option value="ЦДР">ЦДР</Option>
                <Option value="СК-ТТК">СК-ТТК</Option>
                <Option value="ТТК-МКАД">ТТК-МКАД</Option>
                <Option value="За МКАД">За МКАД</Option>
            </Select>

        </Form.Item>

        <Form.Item
            name="subMarket"
            label="Субрынок"
        >
            <Select placeholder={'Выберите субрынок'} style={{width: 240}}>
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

        </Form.Item>


        <Form.Item
            name="buildingYear"
            label="Год постройки"
            rules={[
                {
                    required: true,
                    message: 'укажите год постройки',
                }
            ]}
        >
            <Input style={{width: 120, marginRight: '1em'}}
            />
        </Form.Item>

        <Form.Item
            name="reconstructionYear"
            label="Год реконструкции"
            rules={[
                {min: 4, message: 'must be minimum 4 characters.'},
                {max: 4, message: 'must be maximum 4 characters.'},
            ]}
        >
            <Input style={{width: 240}} type={"number"}/>
        </Form.Item>


        <Form.Item
            name="constructionStatus"
            label="Стадия строит."
        >
            <Select style={{width: 240}}>
                <Option value="project">Проект</Option>
                <Option value="frozen">Заморожен</Option>
                <Option value="inprogress">Строится</Option>
                <Option value="done">Построен</Option>
                <Option value="null">неизвестно</Option>
            </Select>
        </Form.Item>

        <Form.Item

            name="constructionStartDate"
            label="Дата начала строит."
        >
            <Input style={{width: 240}} type={"date"}/>
        </Form.Item>


        <Form.Item
            name="bts"
            label="БТС"
        >
            <BooleanSelect>
                <Option value="null">неизвестно</Option>
                <Option value="true">да</Option>
                <Option value="false">нет</Option>
            </BooleanSelect>
        </Form.Item>


        <Form.Item
            name="isNewConstruction"
            label="Новое строит.?"
        >
            <Select style={{width: 240}}>
                <Option value="Бизнес центр2">неизвестно</Option>
                <Option value="Бизнес центр">Новое строительство</Option>
                <Option value="Бизнес центр2">Реконструкция</Option>
            </Select>
        </Form.Item>

        <Form.Item
            name="mfrBuildingClass"
            label="Класс здания MRF"
        >
            <Select style={{width: 240}} onChange={e => {
                // form.setFieldsValue({
                //     buildingClass: e
                // })
            }}>
                <Option value="null">неизвестно</Option>
                <Option value="A">A</Option>
                <Option value="B+">B+</Option>
                <Option value="B">B</Option>
                <Option value="C">C</Option>

            </Select>
        </Form.Item>

        <Form.Item
            name="officesArea"
            label="Площадь офисов, м²"
        >
            <Input style={{width: 240}} type={"number"}/>
        </Form.Item>


        <Form.Item
            name="isCoworking"
            label="Коворкинг?"
        >
            <BooleanSelect disabled={true}>
                <Option key={'true'} value={'true'}>да</Option>
                <Option key={'false'} value={'false'}>нет</Option>
            </BooleanSelect>

        </Form.Item>

        <Form.Item
            name="coworkingName"
            label="Название коворк."
        >
            <Input/>
        </Form.Item>

        <Form.Item
            name="coworkingArea"
            label="Площадь коворк."
        >
            <Input prefix={'м²'} type={"number"}/>
        </Form.Item>

        <Form.Item
            name="owner"
            label="Собственник"
        >
            <Input/>
            <p>будет позже, после создания контрагентов</p>
        </Form.Item>


        <Form.Item
            name="owner"
            label="Арендодатель"
        >
            <Input/>
            <p>будет позже, после создания контрагентов</p>

        </Form.Item>

        <Form.Item
            name="owner"
            label="Управл. компания"
        >
            <Input/>
            <p>будет позже, после создания контрагентов</p>

        </Form.Item>

        <Form.Item
            name="notes"
            label="Заметки"
        >
            <TextArea rows={4}/>
        </Form.Item>

        <Form.Item
            name="hasAgencyContract"
            label="Агентский договор"
        >
            <BooleanSelect>
                <Option value="null">неизвестно</Option>
                <Option value="true">да</Option>
                <Option value="false">нет</Option>
            </BooleanSelect>
        </Form.Item>


        <Form.Item
            name="feePercentRent"
            label="Бонус аренда"
        >
            <Input style={{width: 240}} prefix={'%'} type={"number"}/>
        </Form.Item>


        <Form.Item
            name="feePercentSale"
            label="Бонус продажа"
        >
            <Input style={{width: 240}} prefix={'%'} type={"number"}/>

        </Form.Item>

        <Form.Item
            name="isExclusive"
            label="Эксклюзивность"
        >
            <Select defaultValue={'null'} style={{width: 240}}>
                <Option value="null">неизвестно</Option>
                <Option value="Бизнес центр">Нет эксклюзива</Option>
                <Option value="Бизнес центр2">Эксклюзив</Option>
                <Option value="Бизнес центр2">Ко-эксклюзив</Option>
            </Select>
        </Form.Item>

        <Form.Item
            name="exclusiveConsultant1"
            label="Экск. консультант"
        >
            <Select
                mode="multiple"
                allowClear
                style={{width: 240}}
                placeholder="Please select"
                defaultValue={['Юзер 1', '5']}
                // onChange={handleChange}
            >
                <Option value="1">Юзер 1</Option>
                <Option value="2">Юзер 2</Option>
                <Option value="3">Юзер 3</Option>
                <Option value="4">Юзер 4</Option>
                <Option value="5">Юзер 5</Option>

            </Select>

        </Form.Item>


        <Form.Item
            name="exclusiveConsultantRnb"
            label="Конс. RnB аренда"
        >
            <Input style={{width: 240}}
            />
        </Form.Item>

        <Form.Item
            name="exclusiveConsultant"
            label="Конс. RnB прод"
        >
            <Input style={{width: 240}}
            />
        </Form.Item>


        <Form.Item
            name="isOnMarket"
            label="Статус объекта"
        >
            <BooleanSelect disabled={true}>
                <Option value="true">На рынке</Option>
                <Option value="false">Нет на рынке</Option>
            </BooleanSelect>
        </Form.Item>

        <Form.Item
            label="Тип реализации"
        >
            <Input style={{width: 240}}  disabled={true} value={realizationTypes} />
            {/*<Select defaultValue={'null'} style={{width: 240}}>*/}
            {/*    <Option value="Аренда">Аренда</Option>*/}
            {/*    <Option value="Продажа">Продажа</Option>*/}
            {/*    <Option value="Субаренда">Субаренда</Option>*/}
            {/*</Select>*/}
        </Form.Item>

        <Form.Item
            // name="finishing"
            label="Отделка"
        >
            <Input style={{width: 240}}  disabled={true} value={finishings} />

            {/*<Select defaultValue={'неизвестно'} style={{width: 240}}>*/}
            {/*    <Option value="С мебелью">С мебелью</Option>*/}
            {/*    <Option value="С отделкой">С отделкой</Option>*/}
            {/*    <Option value="Без отделки">Без отделки</Option>*/}
            {/*</Select>*/}
        </Form.Item>


        <Form.Item
            label="Тип планировки"
        >
            <Input style={{width: 240}}  disabled={true} value={planTypes} />

            {/*<Select defaultValue={''} style={{width: 240}}>*/}
            {/*    <Option value="Open-space">Open-space</Option>*/}
            {/*    <Option value="Кабинетная">Кабинетная</Option>*/}
            {/*</Select>*/}
        </Form.Item>


        <Form.Item
            name="parkingType"
            label="Паркинг тип"
        >
            <Select defaultValue={'Наземный'} style={{width: 240}}>
                <Option value="Наземный">Наземный</Option>
                <Option value="Подземный">Подземный</Option>
                <Option value="Многоуровневый">Многоуровневый</Option>
                <Option value="неизвестно">неизвестно</Option>
            </Select>
        </Form.Item>

        <Form.Item
            name="parkingNazemQnt"
            label="Парк. кол-во, наземн."
        >
            <Input prefix={' м/м'} style={{width: 240}}
                   type={"number"}/>
        </Form.Item>
        <Form.Item
            name="parkingSubwayQnt"
            label="Парк. кол-во, подземн."
        >
            <Input prefix={'м/м'} style={{width: 240}}
                   type={"number"}/>

        </Form.Item>
        <Form.Item
            name="parkingMultiQnt"
            label="Паркинг, многоуровн."
        >
            <Input prefix={'м/м'} style={{width: 240}}
                   type={"number"}/>

        </Form.Item>
        <Form.Item
            name="parkingLandPrice"
            label="Парк. назем."
        >
            <Input style={{width: 240}}
                   prefix={'м/м, ₽'} type={"number"}/>

        </Form.Item>
        <Form.Item
            name="parkingSubwayPrice"

            label="Парк. подземн."
        >
            <Input style={{width: 240}}
                   prefix={'м/м, ₽'} type={"number"}/>

        </Form.Item>

        <Form.Item
            name="parkingMultiLevelPrice"
            label="Паркинг многоуровн."
        >
            <Input prefix={' м/м, ₽'} type={"number"} style={{width: 240}}/>
        </Form.Item>

        <Form.Item
            name="parkingNds"
            label="Парк. НДС наземн."
        >
            <BooleanSelect>
                <Option value="null">неизвестно</Option>
                <Option value="true">да</Option>
                <Option value="false">нет</Option>
            </BooleanSelect>
        </Form.Item>

        <Form.Item
            name="parkingNdsSubway"
            label="Парк. НДС, подземн."
        >
            <BooleanSelect>
                <Option value="null">неизвестно</Option>
                <Option value="true">да</Option>
                <Option value="false">нет</Option>
            </BooleanSelect>
        </Form.Item>

        <Form.Item
            name="parkingNdsMulti"
            label="Парк. НДС, многоуровн."
        >
            <BooleanSelect>
                <Option value="null">неизвестно</Option>
                <Option value="true">да</Option>
                <Option value="false">нет</Option>
            </BooleanSelect>

        </Form.Item>

        <Form.Item
            name="floorsHeight"
            label="Высота потолков, м"
        >
            <Input style={{width: 240}} type={"number"}/>
        </Form.Item>


        <Form.Item
            name="stepKolonn"
            label="Шаг колонн, м"
        >
            <Input style={{width: 240}} type={"string"}/>

        </Form.Item>

        <Form.Item
            name="parkingLoad"
            label="Нагрузка на перекрыт."
        >
            <Input prefix={'кг/м²'} style={{width: 240}} type={"number"}/>

        </Form.Item>

        <Form.Item
            name="roomServerQnt"
            label="Помещения под сервер."
        >
            <Input style={{width: 240}} type={"number"}/>
        </Form.Item>

        <Form.Item
            name="ventType"
            label="Тип вентиляции"
        >
            <Input/>
        </Form.Item>

        <Form.Item
            name="fireSystem"
            label="Пожарн. система"
        >
            <Input/>

        </Form.Item>
        <Form.Item
            name="peopleLiftsQnt"
            label="Кол-во пассаж. лифтов"
        >
            <Input style={{width: 240}} type={"number"}/>

        </Form.Item>

        <Form.Item
            name="peopleLiftsBrand"
            label="Марка лифтов"
        >
            <Input/>
        </Form.Item>

  <Form.Item
            name="bigLiftsBrand"
            label="Марка лифтов, гр."
        >
            <Input/>
        </Form.Item>


        <Form.Item
            name="hasBigLift"
            label="Грузовой лифт"
        >
            <BooleanSelect>
                <Option value="null">неизвестно</Option>
                <Option value="true">да</Option>
                <Option value="false">нет</Option>
            </BooleanSelect>
        </Form.Item>


        <Form.Item
            name="allocatedPower"
            label="Выделенная мощность"
        >
            <Input prefix={'на м², Вт'} style={{width: 240}} type={"number"}/>
        </Form.Item>


        <Form.Item
            name="electricSupply"
            label="Катег. электроснабж."
        >
            <Input/>
        </Form.Item>

        <Form.Item
            name="provider"
            label="Провайдер"
        >
            <Input/>
        </Form.Item>

        <Form.Item
            name="infra"
            label="Инфрастуктура"
        >
            <InfrastructureInput/>
            {/*<Select*/}
            {/*    mode="multiple"*/}
            {/*    allowClear*/}
            {/*    style={{width: 240}}*/}
            {/*    placeholder="Please select"*/}
            {/*    defaultValue={['Юзер 1', '5']}*/}
            {/*    // onChange={handleChange}*/}
            {/*>*/}
            {/*    <Option value="1">Юзер 1</Option>*/}
            {/*    <Option value="2">Юзер 2</Option>*/}
            {/*    <Option value="3">Юзер 3</Option>*/}
            {/*    <Option value="4">Юзер 4</Option>*/}
            {/*    <Option value="5">Юзер 5</Option>*/}

            {/*</Select>*/}
        </Form.Item>

        <Form.Item
            name="showOnSite"
            label="Выгрузить на сайт R&B"
        >
            <BooleanSelect>
                <Option value="true">да</Option>
                <Option value="false">нет</Option>
            </BooleanSelect>
        </Form.Item>


        <Form.Item
            name="createdAt"
            label="Дата создания"
        >
            <DateInput disabled={true} />
            {/*<Input disabled={true} style={{width: 240}} />*/}
        </Form.Item>


        <Form.Item
            name="updatedAt"
            label="Дата обновления"
        >
            <DateInput disabled={true} />
        </Form.Item>



        {!isCreate &&
        <Form.Item
            name="creator"
            label="Создав. пользователь"
        >
            {getFieldState('creator') &&
            <UserInput id={'creator-user'} disabled={true} relationName={'creator'} setFieldsValue={setFieldsValue} currentUser={buildingData?.creator}/>
            }
            {!getFieldState('creator') &&
            <div>Объект создан системой</div>
            }

        </Form.Item>
        }

        {!isCreate &&

        <Form.Item
            name="updatedBy"
            label="Обновл. пользователем"
        >
            {!getFieldState('updatedBy') &&
            <div>Объект обновлен системой</div>
            }
            {getFieldState('updatedBy') &&
            <UserInput id={'updatedBy-user'} disabled={true} relationName={'updatedBy'} setFieldsValue={setFieldsValue}
                       currentUser={buildingData?.updatedBy}/>
            }
        </Form.Item>
        }

    </Form>

}


export default ObjectForm