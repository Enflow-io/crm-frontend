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
                name="agreementType"
                label="Срок договора"
            >
                <Select defaultValue="yes" style={{width: 240}}>
                    <Option value="yes">Крактосрочный</Option>
                    <Option value="no">Долгосрочный</Option>
                </Select>
            </Form.Item>

            <Form.Item
                name="cianId"
                label="ID в ЦИАН"
            >
                <Input disabled={true}/>
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
                label="Стоимость при прод."
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


            <Form.Item
                name="q"
                label="Обесп. платеж"
            >
                <Input type={"number"}/>
            </Form.Item>


            <Form.Item
                name="qс"
                label="Валюта"
            >
                <Select defaultValue={'Рубли'} style={{width: 240}}>
                    <Option value="Рубли">Рубли</Option>
                    <Option value="Бизнес центр2">Доллары</Option>
                    <Option value="Бизнес центр2">Евро</Option>
                </Select>
            </Form.Item>


            <Form.Item
                name="rentpr"
                label="Ставка аренды:"
            >
                <Input prefix={'руб./кв. м/год'} type={"number"}/>
            </Form.Item>


            <Form.Item
                name="dfgq"
                label="Ставка аренды"
            >
                <Input prefix={'$/кв. м/год'} type={"number"}/>
            </Form.Item>


            <Form.Item
                name="qsdf"
                label="Ставка аренды"
            >
                <Input prefix={'евро/кв. м/год'} type={"number"}/>
            </Form.Item>


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
                name="q"
                label="OPEX"
            >
                <Input type={"number"}/>
            </Form.Item>

            <Form.Item
                name="sfgq"
                label="OPEX размер, руб."
            >
                <Input type={"number"}/>
            </Form.Item>


            <Form.Item
                name="qfdgf"
                label="Коммун. расходы"
            >
                <Input type={"number"}/>
            </Form.Item>


            <Form.Item
                name="qcvbc"
                label="Базовая ставка"
            >
                <Input prefix={'руб./кв. м/год'} type={"number"}/>
            </Form.Item>

            <Form.Item
                name="tybq"
                label="Базовая ставка"
            >
                <Input prefix={'$/кв. м/год'} type={"number"}/>
            </Form.Item>


            <Form.Item
                name="qвапкк"
                label="Базовая ставка"
            >
                <Input prefix={'евро/кв. м/год'} type={"number"}/>
            </Form.Item>

            <Form.Item
                name="q"
                label="Мес. аренд. платеж"
            >
                <Input prefix={'руб.'} type={"number"}/>
            </Form.Item>

            <Form.Item
                name="q"
                label="Цена продажи"
            >
                <Input prefix={'руб./кв. м'} type={"number"}/>
            </Form.Item>


            <Form.Item
                name="rrrq"
                label="Цена продажи"
            >
                <Input prefix={'$/кв. м'} type={"number"}/>
            </Form.Item>


            <Form.Item
                name="qdddr"
                label="Цена продажи"
            >
                <Input prefix={'евро/кв. м'} type={"number"}/>
            </Form.Item>


            <Form.Item
                name="ggssfq"
                label="НДС продажа"
            >
                <Input type={"number"}/>
            </Form.Item>


            <Form.Item
                name="sdfsfdcvq"
                label="Общая стоимость лота"
            >
                <Input prefix={'руб.'} type={"number"}/>
            </Form.Item>


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

            <Form.Item
                name="sdfaseq"
                label="Описание для сайта"
            >
                <Input.TextArea rows={3}/>
            </Form.Item>

            <Form.Item
                name="qherdsa"
                label="Описание сайт ENG"
            >
                <Input.TextArea rows={3}/>
            </Form.Item>

            <Form.Item
                name="cvxzcvcq"
                label="Выгрузить на сайт"
            >
                <Select style={{width: 240}}>
                    <Option value="Бизнес центр">да</Option>
                    <Option value="Бизнес центр2">нет</Option>
                </Select>
            </Form.Item>

            <Form.Item
                name="dfgdfgq"
                label="Описание cian.ru"
            >
                <Input.TextArea rows={3}/>
            </Form.Item>


            <Form.Item
                name="qasdfafeeee"
                label="Выгрузить на cian.ru"
            >
                <Select style={{width: 240}}>
                    <Option value="Бизнес центр">да</Option>
                    <Option value="Бизнес центр2">нет</Option>
                </Select>
            </Form.Item>

            <Form.Item
                name="qhhhhsssss"
                label="Описание яндекс"
            >
                <Input.TextArea rows={3}/>
            </Form.Item>

            <Form.Item
                name="vvvvssssq"
                label="Выгр. на яндекс"
            >
                <Select style={{width: 240}}>
                    <Option value="Бизнес центр">да</Option>
                    <Option value="Бизнес центр2">нет</Option>
                </Select>
            </Form.Item>


            <Form.Item
                name="qghhhhaedfgs"
                label="Описание avito"
            >
                <Input.TextArea rows={3}/>
            </Form.Item>


            <Form.Item
                name="qaaaffeeee"
                label="Выгрузить на avito"
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
                <Input type={"date"}/>
            </Form.Item>


            <Form.Item
                name="updateDate"
                label="Дата изменения"
            >
                <Input type={"date"}/>
            </Form.Item>

            <Form.Item
                name="fwads"
                label="Польз., создание"
            >
                <Input type={"number"}/>
            </Form.Item>

            <Form.Item
                name="q"
                label="Польз., изменение"
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
                name="daysExposition"
                label="Срок экспоз., дней"
            >
                <Input type={"number"}/>
            </Form.Item>

            <Form.Item
                name="qfsdfsdfsdf"
                label="Арендатор"
            >
                <Input type={"number"}/>
            </Form.Item>


        </Form>
    </div>
}

export default BlockForm