import {Button, Divider, Form, Input, notification, Select, Tooltip} from "antd";
import {InfoCircleOutlined, UserOutlined} from '@ant-design/icons';
import React, {useEffect, useState} from "react";
import {BlockInterface} from "../../../interfaces/BlockInterface";
import {submitBuildingForm} from "../../../effects/object";
import Api from "../../../services/Api";
import {SubmitBlockForm} from "../../../effects/block.effects";
import {useRouter} from "next/router";
import BuildingInput from "../../inputs/BuildingInput/BuildingInput";

const {Option} = Select;

interface BlockFormProps {
    modelData?: BlockInterface
    isCreating?: boolean
    onUpdate?: (params: any) => void

}

const BlockForm = ({isCreating = false, modelData, ...otherProps}: BlockFormProps) => {


    const [isDataLoading, setIsDataLoading] = useState(false);
    // const [modelData, setModelData] = useState(null);
    const [form] = Form.useForm();
    const router = useRouter();


    useEffect(() => {
        const watcher = SubmitBlockForm.done.watch(async () => {

            try {
                let props = form.getFieldsValue();
                console.log(props)
                await form.validateFields()

                try {
                    let res;
                    if (isCreating) {

                        res = await Api.createBlock(props)
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
                        await router.push(`/blocks/${res.data.id}`)
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


        });


        return function cleanup() {
            watcher()
        }

    }, [])


    const formItemLayout = {
        labelCol: {span: 4},
        wrapperCol: {span: 12},
    };
    return <div>
        <Form
            {...formItemLayout}
            name="register"
            scrollToFirstError
            initialValues={modelData}
            form={form}


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
                    currentBuilding={modelData?.building}

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
                <Input type={"number"}/>
            </Form.Item>

            <Form.Item
                name="area"
                label="Площадь"
            >
                <Input type={"number"}/>
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
                <Input/>
            </Form.Item>

            <Form.Item
                name="agreementType"
                label="Тип договора"
            >
                <Select defaultValue="yes" style={{width: 120}}>
                    <Option value="yes">Да</Option>
                    <Option value="no">Нет</Option>
                </Select>
            </Form.Item>

            <Form.Item
                name="cianId"
                label="ID в ЦИАН"
            >
                <Input/>
            </Form.Item>


            <Form.Item
                name="bti"
                label="БТИ"
            >
                <Input type={"number"}/>
            </Form.Item>
            <Form.Item
                name="bonusPercent"
                label="Бонусный %"
            >
                <Input type={"number"}/>
            </Form.Item>

            <Form.Item
                name="finishing"
                label="Отделка"
            >
                <Input type={"number"}/>
            </Form.Item>


            <Form.Item
                name="planType"
                label="Тип планировки"
            >
                <Input type={"number"}/>
            </Form.Item>


            <Divider dashed/>

            <Form.Item
                name="price"
                label="Ставка аренды"
            >
                <Input style={{width: 150}}
                       placeholder="1200"
                       prefix={<span>$</span>}
                       suffix={
                           <Tooltip title="$1 = ₽100">
                               <InfoCircleOutlined style={{color: 'rgba(0,0,0,.45)'}}/>
                           </Tooltip>
                       }
                />
                <Input style={{width: 150, marginLeft: '1em'}}
                       placeholder="120000"
                       prefix={<span>₽</span>}
                       suffix={
                           <Tooltip title="$1 = ₽100">
                               <InfoCircleOutlined style={{color: 'rgba(0,0,0,.45)'}}/>
                           </Tooltip>
                       }
                />

            </Form.Item>

            <Form.Item
                name="price"
                label="Стоимость при продаже"
            >
                <Input style={{width: 150}}
                       placeholder="1200"
                       prefix={<span>$</span>}
                       suffix={
                           <Tooltip title="$1 = ₽100">
                               <InfoCircleOutlined style={{color: 'rgba(0,0,0,.45)'}}/>
                           </Tooltip>
                       }
                />
                <Input style={{width: 150, marginLeft: '1em'}}
                       placeholder="120000"
                       prefix={<span>₽</span>}
                       suffix={
                           <Tooltip title="$1 = ₽100">
                               <InfoCircleOutlined style={{color: 'rgba(0,0,0,.45)'}}/>
                           </Tooltip>
                       }
                />

            </Form.Item>

            <Form.Item
                name="taxIncluded"
                label="Налог включен?"
            >
                <Select defaultValue="yes" style={{width: 150}}>
                    <Option value="yes">Да</Option>
                    <Option value="no">Нет</Option>
                </Select>
            </Form.Item>


            <Divider/>
            <Form.Item
                name="q"
                label="Тип реализации"
            >
                <Input type={"number"}/>
            </Form.Item>

            <Form.Item
                name="q"
                label="Срок договора"
            >
                <Input type={"number"}/>
            </Form.Item>

            <Form.Item
                name="q"
                label="Арендные каникулы, мес"
            >
                <Input type={"number"}/>
            </Form.Item>


            <Form.Item
                name="q"
                label="Индексация"
            >
                <Input type={"number"}/>
            </Form.Item>


            <Form.Item
                name="q"
                label="Обеспечительный платеж"
            >
                <Input type={"number"}/>
            </Form.Item>


            <Form.Item
                name="q"
                label="БОМА/БТИ"
            >
                <Input type={"number"}/>
            </Form.Item>

            <Form.Item
                name="q"
                label="Валюта"
            >
                <Input type={"number"}/>
            </Form.Item>


            <Form.Item
                name="q"
                label="Ставка аренды, руб./кв. м/год"
            >
                <Input type={"number"}/>
            </Form.Item>


            <Form.Item
                name="q"
                label="Ставка аренды, $/кв. м/год"
            >
                <Input type={"number"}/>
            </Form.Item>


            <Form.Item
                name="q"
                label="Ставка аренды, евро/кв. м/год"
            >
                <Input type={"number"}/>
            </Form.Item>


            <Form.Item
                name="q"
                label="НДС аренда"
            >
                <Input type={"number"}/>
            </Form.Item>


            <Form.Item
                name="q"
                label="OPEX"
            >
                <Input type={"number"}/>
            </Form.Item>

            <Form.Item
                name="q"
                label="OPEX размер, руб."
            >
                <Input type={"number"}/>
            </Form.Item>


            <Form.Item
                name="q"
                label="Коммунальные расходы"
            >
                <Input type={"number"}/>
            </Form.Item>


            <Form.Item
                name="q"
                label="Базовая ставка, руб./кв. м/год"
            >
                <Input type={"number"}/>
            </Form.Item>

            <Form.Item
                name="q"
                label="Базовая ставка, $/кв. м/год"
            >
                <Input type={"number"}/>
            </Form.Item>


            <Form.Item
                name="q"
                label="Базовая ставка, евро/кв. м/год"
            >
                <Input type={"number"}/>
            </Form.Item>

            <Form.Item
                name="q"
                label="Месячный арендный платеж, руб. (с НДС и OPEX)"
            >
                <Input type={"number"}/>
            </Form.Item>

            <Form.Item
                name="q"
                label="Цена продажи, руб./кв. м"
            >
                <Input type={"number"}/>
            </Form.Item>


            <Form.Item
                name="q"
                label="Цена продажи, $/кв. м"
            >
                <Input type={"number"}/>
            </Form.Item>


            <Form.Item
                name="q"
                label="Цена продажи, евро/кв. м"
            >
                <Input type={"number"}/>
            </Form.Item>


            <Form.Item
                name="q"
                label="НДС продажа"
            >
                <Input type={"number"}/>
            </Form.Item>


            <Form.Item
                name="q"
                label="Общая стоимость лота, руб. (с НДС)"
            >
                <Input type={"number"}/>
            </Form.Item>


            <Form.Item
                name="q"
                label="Наличие собственных мокрых точек"
            >
                <Input type={"number"}/>
            </Form.Item>


            <Form.Item
                name="q"
                label="Наличие кухни/кофе-поинта"
            >
                <Input type={"number"}/>
            </Form.Item>


            <Form.Item
                name="q"
                label="Наличие фальш-пола"
            >
                <Input type={"number"}/>
            </Form.Item>


            <Form.Item
                name="q"
                label="Потолки"
            >
                <Input type={"number"}/>
            </Form.Item>


            <Form.Item
                name="q"
                label="Описание для брифа"
            >
                <Input type={"number"}/>
            </Form.Item>


            <Form.Item
                name="q"
                label="Описание для брифа ENG"
            >
                <Input type={"number"}/>
            </Form.Item>

            <Form.Item
                name="q"
                label="Описание для сайта"
            >
                <Input type={"number"}/>
            </Form.Item>

            <Form.Item
                name="q"
                label="Описание для сайта ENG"
            >
                <Input type={"number"}/>
            </Form.Item>

            <Form.Item
                name="q"
                label="Выгрузить на сайт"
            >
                <Input type={"number"}/>
            </Form.Item>

            <Form.Item
                name="q"
                label="Описание cian.ru"
            >
                <Input type={"number"}/>
            </Form.Item>


            <Form.Item
                name="q"
                label="Выгрузить на cian.ru"
            >
                <Input type={"number"}/>
            </Form.Item>

            <Form.Item
                name="q"
                label="Описание яндекс.недвижимость"
            >
                <Input type={"number"}/>
            </Form.Item>

 <Form.Item
                name="q"
                label="Выгрузить на яндекс.недвижимость"
            >
                <Input type={"number"}/>
            </Form.Item>



 <Form.Item
                name="q"
                label="Описание avito"
            >
                <Input type={"number"}/>
            </Form.Item>


 <Form.Item
                name="q"
                label="Выгрузить на avito"
            >
                <Input type={"number"}/>
            </Form.Item>

            <Form.Item
                name="q"
                label="Дата создания"
            >
                <Input type={"number"}/>
            </Form.Item>


            <Form.Item
                name="q"
                label="Дата изменения"
            >
                <Input type={"number"}/>
            </Form.Item>

  <Form.Item
                name="q"
                label="Пользователь, создание"
            >
                <Input type={"number"}/>
            </Form.Item>

 <Form.Item
                name="q"
                label="Пользователь, изменение"
            >
                <Input type={"number"}/>
            </Form.Item>

            <Form.Item
                name="q"
                label="Дата выхода на рынок"
            >
                <Input type={"number"}/>
            </Form.Item>

            <Form.Item
                name="q"
                label="Срок экспозиции, дней"
            >
                <Input type={"number"}/>
            </Form.Item>

            <Form.Item
                name="q"
                label="Арендатор"
            >
                <Input type={"number"}/>
            </Form.Item>


        </Form>
    </div>
}

export default BlockForm