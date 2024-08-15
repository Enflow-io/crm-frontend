import { useEffect, useState } from "react";
import {
    Badge,
    Button,
    Calendar,
    Col,
    DatePicker,
    Divider,
    Form,
    Input,
    List,
    Modal,
    notification,
    Row,
    Select, Spin,
    TimePicker
} from "antd";
import moment from 'moment';
import * as Lockr from "lockr";
import { UserInterface } from "../../interfaces/user.interface";
import {EditOutlined} from "@ant-design/icons";
import Api from "../../services/Api";
const { Option } = Select;

const CalendarComponent = () => {
    const [showModal, setShowModal] = useState(false)
    const [calendarList, setCalendarList] = useState<any>(null)
    const [currentDateList, setCurrentDateList] = useState<any[]>([])
    const [user, setUser] = useState<UserInterface | null>(null)
    const [form] = Form.useForm();
    
    useEffect(() => {
        if (!user) {
            setUser(Lockr.get('user'))
        }
        if (user) {
            Api.getEvents().then(data => {
                const group = data.reduce((r: any, a: any) => {
                    r[moment(a.date).format('YYYY-MM-DD').toString()] = [...(r[moment(a.date).format('YYYY-MM-DD').toString()] || []), a];
                    return r;
                }, {});
                console.log('group', group)
                setCalendarList(group)
            })
        }
    }, [user])
    const onPanelChange = (value: any, mode: any) => {
        console.log(value, mode);
    }

    const onSelect = (value: any) => {
        console.log('onSelect', value.format('YYYY-MM-DD'));
        const list = calendarList[value.format('YYYY-MM-DD')] || [];
        setCurrentDateList(list)
        setShowModal(true);
    }

    const dateCellRender = (value: any) => {
        const listData = calendarList[value.format('YYYY-MM-DD').toString()] || [];
        if (listData.length === 0) {
            return (
                <div></div>
            );
        }
        console.log('calendarList', calendarList, value.format('YYYY-MM-DD'))
        console.log('listData', listData)
        return (
                <div key={Math.random()}>
                    {/*// @ts-ignore*/}
                    {listData.map(item => (
                        <div key={Math.random()}>
                            <Badge key={item.description} status={item?.type || 'default'} text={item.description} /><br />
                        </div>
                    ))}
                </div>
        );
    }

    const monthCellRender = (value: any) => {
        const listData = [
            {type: 'warning', content: 'This is warning event.'},
            {type: 'success', content: 'This is usual event.'},
        ];
        return (
            <div>
                {listData.map(item => (
                    <>
                        <Badge key={item.content} status={item.type as any} text={item.content} /><br />
                    </>
                ))}
            </div>
        );
    }

    const submitForm = async () => {
        const validate = await form.validateFields();
        if (!validate) return;
        const values = await form.validateFields();
        const submitData = {
            ...values,
            userId: user?.id
        }
        const data = await Api.createEvent(submitData);
        if (data?.id) {
            if (calendarList[values.date.format('YYYY-MM-DD').toString()]) {
                calendarList[values.date.format('YYYY-MM-DD').toString()].push(data)
            } else {
                calendarList[values.date.format('YYYY-MM-DD').toString()] = [data]
            }
            setCalendarList(calendarList)
            if (currentDateList) {
                setCurrentDateList([...currentDateList, data])
            } else {
                setCurrentDateList([data])
            }
            notification.success({
                message: 'Событие успешно создано'
            })
        } else {
            notification.error({
                message: 'Произошла ошибка'
            })
        }
    }

    return <div>
         {user && calendarList && <>
            <Calendar
                dateCellRender={dateCellRender}
                monthCellRender={monthCellRender}
                onPanelChange={onPanelChange}
                onSelect={onSelect}
                defaultValue={moment(new Date())}
                locale={{
                    lang: {
                        locale: 'ru_RU',
                        placeholder: 'Выберите дату',
                        month: 'Месяц',
                        today: 'Сегодня',
                        year: 'Год',
                        previousMonth: 'Предыдущий месяц',
                        nextMonth: 'Следующий месяц',
                        monthSelect: 'Выберите месяц',
                        yearSelect: 'Выберите год',
                        weekSelect: 'Выберите неделю',
                        ok: 'Ок',
                        clear: 'Очистить',
                        shortMonths: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
                        shortWeekDays: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
                        yearFormat: 'YYYY',
                        now: 'Сейчас',
                        backToToday: 'Возврат к сегодняшнему дню',
                        nextYear: 'Следующий год',
                        timeSelect: 'Выберите время',
                        dateSelect: 'Выберите дату',
                        decadeSelect: 'Выберите десятилетие',
                        dayFormat: 'D',
                        dateFormat: 'DD.MM.YYYY',
                        dateTimeFormat: 'DD.MM.YYYY HH:mm:ss',
                        previousYear: 'Предыдущий год',
                        previousDecade: 'Предыдущий десятилетие',
                        nextDecade: 'Следующий десятилетие',
                        previousCentury: 'Предыдущий век',
                        nextCentury: 'Следующий век',
                    },
                    timePickerLocale: {
                        placeholder: 'Выберите время',
                        // ... other time picker properties ...
                    },
                }} />
                <Modal visible={showModal} footer={null} onCancel={() => setShowModal(false)} onOk={() => setShowModal(false)}>
                    <Divider>Список дел</Divider>
                    {currentDateList && <List
                        itemLayout="horizontal"
                        dataSource={currentDateList.sort((a, b) => a.date.localeCompare(b.date))}
                        renderItem={item => (
                            <List.Item>
                                <List.Item.Meta
                                    title={moment(item.date).format('HH:mm').toString()}
                                    description={item.description}
                                />
                            </List.Item>
                        )} />}
                    {!currentDateList && <p>Список дел пустой</p>}
                    <Divider>Добавить напоминание</Divider>
                    <Form form={form} layout="horizontal" labelCol={{ span: 5 }}>
                        <Row>
                            <Col span={12}>
                                <Form.Item 
                                    name="date"
                                    rules={[{ required: true, message: 'Укажите дату!' }]}
                                >
                                    <DatePicker showTime format={'DD.MM.YYYY HH:mm'} placeholder="Укажите дату" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="type">
                                        <Select placeholder="Укажите тип уведомления" defaultValue="default">
                                            <Option value="default">Обычное уведомление</Option>
                                            <Option value="error">Важное</Option>
                                            <Option value="warning">Предупреждение</Option>
                                            <Option value="success">Успех</Option>
                                            <Option value="info">Информация</Option>
                                        </Select>
                                    </Form.Item>
                            </Col>
                        </Row>
                        <Form.Item
                            name="description"
                            rules={[{ required: true, message: 'Укажите описание!' }]}
                        >
                            <Input.TextArea placeholder="Укажите описание" />
                        </Form.Item>
                        <Row justify="center" align="middle">
                            <Button type={'primary'}

                                    onClick={async () => {
                                        await submitForm()
                                    }} icon={<EditOutlined/>}>
                                Сохранить данные
                            </Button>
                        </Row>
                    </Form>
                </Modal>
            </>}
        {!user && !calendarList && <div>Загрузка...</div>}
    </div>
}
export default CalendarComponent;