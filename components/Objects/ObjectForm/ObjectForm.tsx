import styles from "ObjectForm.module.scss"
import {Button, Divider, Form, Input, notification, Select} from "antd";
import React, {forwardRef, useRef} from "react";
import MapSelector from "../MapSelector";
import {submitBuildingForm} from "../../../effects/object";
import CoordinatesInput from "../../inputs/CoordinatesInput/CoordinatesInput";
import Api from "../../../services/Api";
import {useRouter} from "next/router";
import {BuildingInterface} from "../../../interfaces/BuildingInterface";
import {resolveAny} from "dns";

const {Option} = Select;
const formItemLayout = {
    labelCol: {span: 4},
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
            <Input/>
        </Form.Item>

        <Form.Item
            name="district"
            label="Район"
        >
            <Input/>
        </Form.Item>

        <Form.Item
            name="taxOffice"
            label="Налоговая"
        >
            <Input/>
        </Form.Item>


        <Divider/>
        <Form.Item
            name="metro"
            label="Метро"
        >
            <Input/>
        </Form.Item>
        <Divider/>

        <Form.Item
            name="zone"
            label="Зона"
        >
            <Input/>
        </Form.Item>

        <Form.Item
            name="subMarket"
            label="Субрынок"
        >
            <Input/>
        </Form.Item>

        <Form.Item
            name="buildingType"
            label="Тип здания"
        >
            <Input/>
        </Form.Item>

        <Form.Item
            name="reconstructionYear"
            label="Год реконструкции"
        >
            <Input/>
        </Form.Item>


        <Form.Item
            name="constructionStatus"
            label="Стадия строительства"
        >
            <Input/>
        </Form.Item>

        <Form.Item
            name="constructionStartDate"
            label="Дата начала строительства"
        >
            <Input/>
        </Form.Item>


        <Form.Item
            name="bts"
            label="БТС"
        >
            <Input/>
        </Form.Item>


        <Form.Item
            name="isNewConstruction"
            label="Новое строительство?"
        >
            <Input/>
        </Form.Item>

        <Form.Item
            name="mfrBuildingClass"
            label="Класс здания MRF"
        >
            <Input/>
        </Form.Item>

        <Form.Item
            name="officesArea"
            label="Площадь офисов, кв. м"
        >
            <Input/>
        </Form.Item>


        <Form.Item
            name="isCoworking"
            label="Коворкинг?"
        >
            <Input/>
        </Form.Item>

        <Form.Item
            name="coworkingName"
            label="Название коворкинга"
        >
            <Input/>
        </Form.Item>

        <Form.Item
            name="coworkingArea"
            label="Площадь коворкинг, кв. м"
        >
            <Input/>
        </Form.Item>

        <Form.Item
            name="owner"
            label="Собственник"
        >
            <Input/>
        </Form.Item>


        <Form.Item
            name="owner"
            label="Арендодатель"
        >
            <Input/>
        </Form.Item>

        <Form.Item
            name="owner"
            label="Управляющая компания"
        >
            <Input/>
        </Form.Item>

        <Form.Item
            name="notes"
            label="Заметки"
        >
            <Input/>
        </Form.Item>

        <Form.Item
            name="hasAgencyContract"
            label="Агентский договор"
        >
            <Input/>
        </Form.Item>


        <Form.Item
            name="feePercentRent"
            label="Вознаграждение аренда"
        >
            <Input/>
        </Form.Item>


        <Form.Item
            name="feePercentSale"
            label="Вознаграждение продажа"
        >
            <Input/>
        </Form.Item>

        <Form.Item
            name="isExclusive"
            label="Эксклюзивность"
        >
            <Input/>
        </Form.Item>

        <Form.Item
            name="exclusiveConsultant"
            label="Эксклюзивный консультант"
        >
            <Input/>
        </Form.Item>

        <Form.Item
            name="exclusiveConsultant"
            label="Эксклюзивный консультант"
        >
            <Input/>
        </Form.Item>

        <Form.Item
            name="exclusiveConsultant"
            label="Консультант RnB по аренде"
        >
            <Input/>
        </Form.Item>

        <Form.Item
            name="exclusiveConsultant"
            label="Консультант RnB по продаже"
        >
            <Input/>
        </Form.Item>

        <Form.Item
            name="updateDate"
            label="Дата обновления"
        >
            <Input/>
        </Form.Item>

        <Form.Item
            name="isOnMarket"
            label="Статус объекта"
        >
            <Input/>
        </Form.Item>

        <Form.Item
            name="isOnMarket"
            label="Тип реализации"
        >
            <Input/>
        </Form.Item>

        <Form.Item
            name="finishing"
            label="Отделка"
        >
            <Input/>
        </Form.Item>

        <Form.Item
            name="finishing"
            label="Отделка"
        >
            <Input/>
        </Form.Item>

        {
            // Open-space/Кабинетная
        }
        <Form.Item
            name="finishing"
            label="Тип планировки"
        >
            <Input/>
        </Form.Item>

        <Form.Item
            name="currency"
            label="Валюта"
        >
            <Input/>
        </Form.Item>


        <Form.Item
            name="parkingType"
            label="Паркинг тип"
        >
            <Input/>
        </Form.Item>
        <Form.Item
            name="parkingType"
            label="Паркинг кол-во м/м, наземные"
        >
            <Input/>
        </Form.Item>
        <Form.Item
            name="parkingType"
            label="Паркинг кол-во м/м, подземный"
        >
            <Input/>
        </Form.Item>
        <Form.Item
            name="parkingType"
            label="Паркинг кол-во м/м, многоуровневый"
        >
            <Input/>
        </Form.Item>
        <Form.Item
            name="parkingType"
            label="Паркинг стоимость м/м, наземные"
        >
            <Input/>
        </Form.Item>
        <Form.Item
            name="parkingType"
            label="Паркинг стоимость м/м, подземный"
        >
            <Input/>
        </Form.Item>

        <Form.Item
            name="parkingType"
            label="Паркинг стоимость м/м, многоуровневый"
        >
            <Input/>
        </Form.Item>

        <Form.Item
            name="parkingType"
            label="Паркинг НДС м/м, наземные"
        >
            <Input/>
        </Form.Item>

        <Form.Item
            name="parkingType"
            label="Паркинг НДС м/м, подземный"
        >
            <Input/>
        </Form.Item>

        <Form.Item
            name="parkingType"
            label="Паркинг НДС м/м, многоуровневый"
        >
            <Input/>
        </Form.Item>

        <Form.Item
            name="parkingType"
            label="Высота потолков, м"
        >
            <Input/>
        </Form.Item>


        <Form.Item
            name="parkingType"
            label="Шаг колонн, м"
        >
            <Input/>
        </Form.Item>

        <Form.Item
            name="parkingType"
            label="Нагрузка на перекрытия, кг/кв. м"
        >
            <Input/>
        </Form.Item>

        <Form.Item
            name="parkingType"
            label="Помещения под серверные"
        >
            <Input/>
        </Form.Item>

        <Form.Item
            name="ventType"
            label="Тип вентиляции"
        >
            <Input/>
        </Form.Item>

        <Form.Item
            name="fireSystem"
            label="Тип вентиляции"
        >
            <Input/>
        </Form.Item>
        <Form.Item
            name="peopleLiftsQnt"
            label="Кол-во пассажирских лифтов"
        >
            <Input/>
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
            <Input/>
        </Form.Item>


        <Form.Item
            name="q"
            label="Выделенная мощность на кв. м, Вт"
        >
            <Input/>
        </Form.Item>


        <Form.Item
            name="q"
            label="Категория электроснабжения"
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
            <Input/>
        </Form.Item>

        <Form.Item
            name="showOnSite"
            label="Выгрузить на сайт R&B"
        >
            <Input/>
        </Form.Item>


        <Form.Item
            name="createDate"
            label="Дата создания"
        >
            <Input/>
        </Form.Item>


        <Form.Item
            name="author"
            label="Создавший пользователь"
        >
            <Input/>
        </Form.Item>

        <Form.Item
            name="author"
            label="Обновлено пользователем"
        >
            <Input/>
        </Form.Item>

    </Form>

}


export default ObjectForm