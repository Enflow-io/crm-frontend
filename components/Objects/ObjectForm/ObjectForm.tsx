import styles from "ObjectForm.module.scss"
import {Button, Divider, Form, Input, notification, Select} from "antd";
const { TextArea } = Input;
import React, {forwardRef, useRef} from "react";
import MapSelector from "../MapSelector";
import {submitBuildingForm} from "../../../effects/object";
import CoordinatesInput from "../../inputs/CoordinatesInput/CoordinatesInput";
import Api from "../../../services/Api";
import {useRouter} from "next/router";
import {BuildingInterface} from "../../../interfaces/BuildingInterface";
import {resolveAny} from "dns";
import {Districts, TaxOffices} from "../../../utils/constants";
import Scheme from "../../inputs/StationsInput/Scheme";
import {groupedStations} from "../../inputs/StationsInput/lines";

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

const ObjectForm = ({isCreate = false, buildingData, ...otherProps}: ObjectFormProps) => {
    const formRef = useRef()
    const [form] = Form.useForm();
    const router = useRouter();

    submitBuildingForm.watch(async () => {

        try {
            let props = form.getFieldsValue()

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
            console.log(e.message);
        }

    })


    const coords = form.getFieldValue('coords');
    return <Form
        form={form}
        {...formItemLayout}
        name="register"
        initialValues={isCreate ? {} : buildingData}
        scrollToFirstError
        // @ts-ignore
        ref={formRef}

        onFieldsChange={e => {
            console.log(e)
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
                {min: 15, message: 'Название не может быть короче 15 символов'},
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
            label="площадь"
            rules={[
                {
                    required: true,
                    message: 'укажите площадь',
                }
            ]}
        >
            <Input style={{width: 120}} type={"number"}/>
        </Form.Item>

        <Form.Item
            name="buildingClass"
            label="Класс"
            initialValue={'A'}

        >
            <Select defaultValue="A" style={{width: 120}} onChange={e => {
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

        <MapSelector onSelected={((addressLine, coords) => {
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
            <CoordinatesInput/>

        </Form.Item>


        <Divider dashed/>

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
            name="fireSystem"
            label="Пожарная система"
        >
            <Select defaultValue={'null'} style={{width: 120}} onChange={e => {
                console.log(e)
            }}>
                <Option value="true">Да</Option>
                <Option value="false">Нет</Option>
                <Option value="null">Неизвестно</Option>

            </Select>
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
        <Form.Item
            name="metro"
            label="Метро"
        >
            <Select
                mode="multiple"
                size={'large'}
                placeholder="Please select"
                defaultValue={['Маяковская']}
                // onChange={handleChange}
                style={{width: '100%'}}
            >

                {groupedStations.map(group => {
                    return <OptGroup key={group.name} label={group.name}>
                        {group.stations.map(station => {
                            return <Option key={station.id + group.name} value={station.id}>{station.label}</Option>
                        })}
                    </OptGroup>
                })}

            </Select>
            {/*<Scheme />*/}
        </Form.Item>
        <Divider/>

        <Form.Item
            name="zone"
            label="Зона"
        >
            <Select style={{width: 240}}>
                <Option value="1">Зона №1</Option>
                <Option value="2">Зона №2</Option>
                <Option value="3">Зона №3</Option>
                <Option value="4">Зона №4</Option>
            </Select>
            <p>(не нашли справочник)</p>

        </Form.Item>

        <Form.Item
            name="subMarket"
            label="Субрынок"
        >
            <Input/>
            <p>(не нашли справочник)</p>

        </Form.Item>

        <Form.Item
            name="buildingType"
            label="Тип здания"
        >
            <Select style={{width: 240}}>
                <Option value="Бизнес центр">Бизнес центр</Option>
                <Option value="Бизнес центр2">Бизнес центр2</Option>
            </Select>
            <p>(не нашли справочник)</p>

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
                <Option value="Бизнес центр">Проект</Option>
                <Option value="Бизнес центр2">Заморожен</Option>
                <Option value="Бизнес центр2">Строится</Option>
                <Option value="Бизнес центр2">Построен</Option>
                <Option value="Бизнес центр2">неизвестно</Option>
            </Select>
        </Form.Item>

        <Form.Item

            name="constructionStartDate"
            label="Дата начала строит."
        >
            <Input style={{width: 240}} type={"date"} />
        </Form.Item>


        <Form.Item
            name="bts"
            label="БТС"
        >
            <Select style={{width: 240}}>
                <Option value="Бизнес центр2">неизвестно</Option>
                <Option value="Бизнес центр">да</Option>
                <Option value="Бизнес центр2">нет</Option>
            </Select>
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
            <Select  style={{width: 240}} onChange={e => {
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
            label="Площадь офисов, кв. м"
        >
            <Input style={{width: 240}} type={"number"}/>
        </Form.Item>


        <Form.Item
            name="isCoworking"
            label="Коворкинг?"
        >
            <Select style={{width: 240}}>
                <Option value="Бизнес центр2">неизвестно</Option>
                <Option value="Бизнес центр">да</Option>
                <Option value="Бизнес центр2">нет</Option>
            </Select>
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
            <Input prefix={'кв. м'} type={"number"}/>
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
            <TextArea rows={4} />
        </Form.Item>

        <Form.Item
            name="hasAgencyContract"
            label="Агентский договор"
        >
            <Select style={{width: 240}}>
                <Option value="Бизнес центр2">неизвестно</Option>
                <Option value="Бизнес центр">да</Option>
                <Option value="Бизнес центр2">нет</Option>
            </Select>
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
            <Input                 style={{width: 240}}
            />
        </Form.Item>

        <Form.Item
            name="exclusiveConsultant"
            label="Конс. RnB прод"
        >
            <Input                 style={{width: 240}}
            />
        </Form.Item>

        <Form.Item
            name="updateDate"
            label="Дата обновления"
        >
            <Input type={"date"} disabled={true}                 style={{width: 240}}
            />
        </Form.Item>

        <Form.Item
            name="isOnMarket"
            label="Статус объекта"
        >
            <Select defaultValue={'null'} style={{width: 240}}>
                <Option value="Бизнес центр">Есть на рынке</Option>
                <Option value="Бизнес центр2">Нет на рынке</Option>
            </Select>
        </Form.Item>

        <Form.Item
            name="isOnMarket"
            label="Тип реализации"
        >
            <Select defaultValue={'null'} style={{width: 240}}>
                <Option value="Бизнес центр">Аренда</Option>
                <Option value="Бизнес центр2">Продажа</Option>
                <Option value="Бизнес центр2">Субаренда</Option>
            </Select>
        </Form.Item>

        <Form.Item
            name="finishing"
            label="Отделка"
        >
            <Select defaultValue={'null'} style={{width: 240}}>
                <Option value="Бизнес центр">С мебелью</Option>
                <Option value="Бизнес центр2">С отделкой</Option>
                <Option value="Бизнес центр2">Без отделки</Option>
            </Select>
        </Form.Item>



        {
            // Open-space/Кабинетная
        }
        <Form.Item
            name="planType"
            label="Тип планировки"
        >
            <Select defaultValue={'null'} style={{width: 240}}>
                <Option value="Бизнес центр">Open-space</Option>
                <Option value="Бизнес центр2">Кабинетная</Option>
            </Select>
        </Form.Item>

        <Form.Item
            name="currency"
            label="Валюта"
        >
            <Select defaultValue={'Рубли'} style={{width: 240}}>
                <Option value="Рубли">Рубли</Option>
                <Option value="Бизнес центр2">Доллары</Option>
                <Option value="Бизнес центр2">Евро</Option>
            </Select>
        </Form.Item>


        <Form.Item
            name="parkingType"
            label="Паркинг тип"
        >
            <Select defaultValue={'Наземный'} style={{width: 240}}>
                <Option value="Наземный">Наземный</Option>
                <Option value="Бизнес центр2">Подземный</Option>
                <Option value="Бизнес центр2">Многоуровневый</Option>
                <Option value="Бизнес центр2">неизвестно</Option>
            </Select>
        </Form.Item>

        <Form.Item
            name="parkingQnt"
            label="Парк. кол-во, наземн."
        >
            <Input     prefix={' м/м'}        style={{width: 240}}
                               type={"number"}/>
        </Form.Item>
        <Form.Item
            name="parkingQnt2"
            label="Парк. кол-во, подземн."
        >
            <Input        prefix={'м/м'}     style={{width: 240}}
                               type={"number"}/>

        </Form.Item>
        <Form.Item
            name="parkingQnt3"
            label="Паркинг, многоуровн."
        >
            <Input       prefix={'м/м'}      style={{width: 240}}
                               type={"number"}/>

        </Form.Item>
        <Form.Item
            name="parkingPrice"
            label="Парк. назем."
        >
            <Input             style={{width: 240}}
                               prefix={'м/м, руб.'} type={"number"}/>

        </Form.Item>
        <Form.Item
            name="parkingPrice2"

            label="Парк. подземн."
        >
            <Input             style={{width: 240}}
                               prefix={'м/м, руб.'} type={"number"}/>

        </Form.Item>

        <Form.Item
            name="parkingPrice3"
            label="Паркинг многоуровн."
        >
            <Input  prefix={' м/м, руб.'} type={"number"} style={{width: 240}}/>
        </Form.Item>

        <Form.Item
            name="parkingNds"
            label="Парк. НДС наземн."
        >
            <Select style={{width: 240}}>
                <Option value="Бизнес центр2">неизвестно</Option>
                <Option value="Бизнес центр">да</Option>
                <Option value="Бизнес центр2">нет</Option>
            </Select>
        </Form.Item>

        <Form.Item
            name="parkingNds2"
            label="Парк. НДС, подземн."
        >
            <Select style={{width: 240}}>
                <Option value="Бизнес центр2">неизвестно</Option>
                <Option value="Бизнес центр">да</Option>
                <Option value="Бизнес центр2">нет</Option>
            </Select>
        </Form.Item>

        <Form.Item
            name="parkingNds3"
            label="Парк. НДС, многоуровн."
        >
            <Select style={{width: 240}}>
                <Option value="Бизнес центр2">неизвестно</Option>
                <Option value="Бизнес центр">да</Option>
                <Option value="Бизнес центр2">нет</Option>
            </Select>
        </Form.Item>

        <Form.Item
            name="parkingType"
            label="Высота потолков, м"
        >
            <Input style={{width: 240}} type={"number"}/>
        </Form.Item>


        <Form.Item
            name="stepKolonn"
            label="Шаг колонн, м"
        >
            <Input style={{width: 240}} type={"number"}/>

        </Form.Item>

        <Form.Item
            name="parkingLoad"
            label="Нагрузка на перекрыт."
        >
            <Input prefix={'кг/кв. м'} style={{width: 240}} type={"number"}/>

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
            <p>не нашел данных</p>
        </Form.Item>

        <Form.Item
            name="fireSystem"
            label="Пожарн. система"
        >
            <Input/>
            <p>не нашел данных</p>

        </Form.Item>
        <Form.Item
            name="peopleLiftsQnt"
            label="Кол-во пассаж. лифтов"
        >
            <Input style={{width: 240}} type={"number"}/>

        </Form.Item>

        <Form.Item
            name="peopleLiftsQnt"
            label="Марка лифтов"
        >
            <Input/>
        </Form.Item>


        <Form.Item
            name="peopleLiftsQnt"
            label="Грузовой лифт"
        >
            <Select style={{width: 240}}>
                <Option value="Бизнес центр2">неизвестно</Option>
                <Option value="Бизнес центр">да</Option>
                <Option value="Бизнес центр2">нет</Option>
            </Select>
        </Form.Item>


        <Form.Item
            name="q"
            label="Выделенная мощность"
        >
            <Input prefix={'на кв. м, Вт'} style={{width: 240}} type={"number"}/>
        </Form.Item>


        <Form.Item
            name="q"
            label="Катег. электроснабж."
        >
            <Input/>
        </Form.Item>

        <Form.Item
            name="q"
            label="Провайдер"
        >
            <Input/>
        </Form.Item>

        <Form.Item
            name="q"
            label="Инфрастуктура"
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
            name="showOnSite"
            label="Выгрузить на сайт R&B"
        >
            <Select style={{width: 240}}>
                <Option value="Бизнес центр">да</Option>
                <Option value="Бизнес центр2">нет</Option>
            </Select>
        </Form.Item>


        <Form.Item
            name="createDate"
            label="Дата создания"
        >
            <Input style={{width: 240}} type={"date"}/>
        </Form.Item>


        <Form.Item
            name="author"
            label="Создав. пользователь"
        >
            <Input/>
        </Form.Item>

        <Form.Item
            name="author"
            label="Обновл. пользователем"
        >
            <Input/>
        </Form.Item>

    </Form>

}


export default ObjectForm