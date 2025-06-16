import { useEffect, useRef, useState } from 'react';
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
  Popconfirm,
  Row,
  Select,
  Checkbox,
  Space,
  Card,
  Radio,
} from 'antd';
import moment from 'moment';
import 'moment/locale/ru';
import * as Lockr from 'lockr';
import { UserInterface } from '../../interfaces/user.interface';
import {
  CheckCircleOutlined,
  EditOutlined,
  InfoCircleOutlined,
  WarningOutlined,
  CloseCircleOutlined,
  DeleteOutlined,
  LeftOutlined,
  RightOutlined,
  CalendarOutlined,
} from '@ant-design/icons';
import Api from '../../services/Api';
const { Option } = Select;

moment.locale('ru');

const CalendarComponent = () => {
  const [showModal, setShowModal] = useState(false);
  const [calendarList, setCalendarList] = useState<any>(null);
  const [currentDateList, setCurrentDateList] = useState<any[]>([]);
  const [user, setUser] = useState<UserInterface | null>(null);
  const [isEdit, setIsEdit] = useState(false);
  const [needNotifyTime, setNeedNotifyTime] = useState<any>(false);
  const [form] = Form.useForm();
  const [currentDate, setCurrentDate] = useState(moment());
  const [showMonthGrid, setShowMonthGrid] = useState(false);
  const [calendarMode, setCalendarMode] = useState<'month' | 'year'>('month');

  useEffect(() => {
    if (!user) {
      setUser(Lockr.get('user'));
    }
    if (user) {
      Api.getEvents().then((data) => {
        const group = data.reduce((r: any, a: any) => {
          r[moment(a.date).format('YYYY-MM-DD').toString()] = [
            ...(r[moment(a.date).format('YYYY-MM-DD').toString()] || []),
            a,
          ];
          r[moment(a.date).format('YYYY-MM').toString()] = [
            ...(r[moment(a.date).format('YYYY-MM').toString()] || []),
            a,
          ];
          return r;
        }, {});
        //console.log('group', group)
        setCalendarList(group);
      });
    }
  }, [user]);

  useEffect(() => {
    if (!showModal) {
      resetForm();
    }
    return function cleanup() {};
  }, [showModal]);

  const resetForm = () => {
    form.resetFields();
    setNeedNotifyTime(false);
    setIsEdit(false);
  };
  const onPanelChange = (value: any, mode: any) => {
    setCurrentDate(value);
    setCalendarMode(mode);
  };

  const handleMonthChange = (month: number) => {
    const newDate = currentDate.clone().month(month);
    setCurrentDate(newDate);
    setShowMonthGrid(false);
  };

  const renderMonthGrid = () => {
    const months = [
      ['Янв', 'Фев', 'Мар'],
      ['Апр', 'Май', 'Июн'],
      ['Июл', 'Авг', 'Сен'],
      ['Окт', 'Ноя', 'Дек']
    ];

    return (
      <div style={{ 
        position: 'absolute', 
        top: '100%', 
        left: '50%', 
        transform: 'translateX(-50%)',
        zIndex: 1000,
        background: 'white',
        padding: '8px',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
      }}>
        <Card size="small" style={{ width: 300 }}>
          <div style={{ textAlign: 'center', marginBottom: 8 }}>
            <Space>
              <Button 
                icon={<LeftOutlined />} 
                onClick={() => setCurrentDate(currentDate.clone().subtract(1, 'year'))}
              />
              <span>{currentDate.year()}</span>
              <Button 
                icon={<RightOutlined />} 
                onClick={() => setCurrentDate(currentDate.clone().add(1, 'year'))}
              />
            </Space>
          </div>
          {months.map((row, rowIndex) => (
            <Row key={rowIndex} gutter={[8, 8]} style={{ marginBottom: 8 }}>
              {row.map((month, colIndex) => {
                const monthIndex = rowIndex * 3 + colIndex;
                return (
                  <Col span={8} key={month}>
                    <Button
                      type={currentDate.month() === monthIndex ? 'primary' : 'default'}
                      onClick={() => handleMonthChange(monthIndex)}
                      style={{ width: '100%' }}
                    >
                      {month}
                    </Button>
                  </Col>
                );
              })}
            </Row>
          ))}
        </Card>
      </div>
    );
  };

  const onSelect = async (value: any) => {
    console.log('value', value);
    form.setFieldsValue({ date: value });
    const list = calendarList[value.format('YYYY-MM-DD')] || [];
    setCurrentDateList(list);
    setShowModal(true);
  };

  const delay = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const dateCellRender = (value: any) => {
    const listData = calendarList[value.format('YYYY-MM-DD').toString()] || [];
    if (listData.length === 0) {
      return <div></div>;
    }
    //console.log('calendarList', calendarList, value.format('YYYY-MM-DD'))
    //console.log('listData', listData)
    return (
      <div key={Math.random()}>
        {/*// @ts-ignore*/}
        {listData.map((item) => (
          <div key={Math.random()}>
            <Badge
              key={item.title}
              status={item?.type || 'success'}
              text={item.title}
            />
            <br />
          </div>
        ))}
      </div>
    );
  };

  const monthCellRender = (value: any) => {
    const listData: any[] =
      calendarList[value.format('YYYY-MM').toString()] || [];
    return (
      <div>
        {listData.map((item) => (
          <>
            <Badge
              key={item.title}
              status={item?.type || 'success'}
              text={`${moment(item.date).format('DD-MM-YY').toString()} ${
                item.title
              }`}
            />
            <br />
          </>
        ))}
      </div>
    );
  };

  const submitForm = async () => {
    const validate = await form.validateFields();
    if (!validate) return;
    const values = await form.validateFields();
    const submitData = {
      ...values,
      userId: user?.id,
      emailNotification: values?.emailNotification ? true : false,
      notifyTimeType: values?.notifyTimeType || '1',
      notifyTime: values?.notifyTime || null,
    };
    if (submitData?.id) {
      const data = await Api.updateEvent(submitData);
      if (data?.id) {
        notification.success({
          message: 'Событие успешно обновлено',
        });
        setCurrentDateList([
          ...currentDateList.filter((item) => item.id !== data.id),
          data,
        ]);
        resetForm();
      } else {
        notification.error({
          message: 'Произошла ошибка',
        });
      }
    } else {
      const data = await Api.createEvent(submitData);
      if (data?.id) {
        if (calendarList[values.date.format('YYYY-MM-DD').toString()]) {
          calendarList[values.date.format('YYYY-MM-DD').toString()].push(data);
        } else {
          calendarList[values.date.format('YYYY-MM-DD').toString()] = [data];
        }
        setCalendarList(calendarList);
        if (currentDateList) {
          setCurrentDateList([
            ...currentDateList.filter((item) => item.id !== data.id),
            data,
          ]);
        } else {
          setCurrentDateList([data]);
        }
        notification.success({
          message: 'Событие успешно создано',
        });
        resetForm();
      } else {
        notification.error({
          message: 'Произошла ошибка',
        });
      }
    }
  };

  const setEditEvent = (data: any) => {
    setIsEdit(true);
    form.setFieldsValue({
      ...data,
      date: moment(data.date),
      notifyTime: moment(data.notifyTime),
      notifyTimeType: data.notifyTimeType.toString(),
    });
  };

  const removeEvent = (data: any) => {
    Api.deleteEvent(data.id).then(() => {
      notification.success({
        message: 'Событие успешно удалено',
      });
      setCurrentDateList([
        ...currentDateList.filter((item) => item.id !== data.id),
      ]);
    });
  };

  return (
    <div>
      {user && calendarList && (
        <>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16, gap: 16 }}>
            <div style={{ position: 'relative' }}>
              <Button 
                onClick={() => setShowMonthGrid(!showMonthGrid)}
                style={{ width: 200 }}
              >
                {currentDate.format('MMMM YYYY').replace(/^\w/, c => c.toUpperCase())}
              </Button>
              {showMonthGrid && renderMonthGrid()}
            </div>
            <Radio.Group 
              value={calendarMode} 
              onChange={(e) => setCalendarMode(e.target.value)}
              buttonStyle="solid"
            >
              <Radio.Button value="month">
                <CalendarOutlined /> Месяц
              </Radio.Button>
              <Radio.Button value="year">
                <CalendarOutlined /> Год
              </Radio.Button>
            </Radio.Group>
          </div>
          <Calendar
            dateCellRender={dateCellRender}
            monthCellRender={monthCellRender}
            onPanelChange={onPanelChange}
            onSelect={onSelect}
            value={currentDate}
            mode={calendarMode}
            headerRender={() => null}
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
                shortMonths: [
                  'Янв',
                  'Фев',
                  'Мар',
                  'Апр',
                  'Май',
                  'Июн',
                  'Июл',
                  'Авг',
                  'Сен',
                  'Окт',
                  'Ноя',
                  'Дек',
                ],
                shortWeekDays: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
                yearFormat: 'YYYY',
                now: 'Сейчас',
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
              },
            }}
          />
          <Modal
            visible={showModal}
            footer={null}
            onCancel={() => setShowModal(false)}
            onOk={() => setShowModal(false)}
          >
            <Divider>Список дел</Divider>
            {currentDateList && (
              <List
                itemLayout="horizontal"
                dataSource={currentDateList.sort((a, b) =>
                  a.date.localeCompare(b.date),
                )}
                renderItem={(item) => (
                  <List.Item
                    actions={[
                      <Button
                        key={item.id}
                        type="ghost"
                        onClick={() => setEditEvent(item)}
                      >
                        <EditOutlined />
                      </Button>,
                      <Popconfirm
                        title="Удалить событие?"
                        onConfirm={() => removeEvent(item)}
                        okText="Да"
                        cancelText="Нет"
                        key={'confirm' + item.id}
                      >
                        <Button danger key={'delete' + item.id}>
                          <DeleteOutlined />
                        </Button>
                      </Popconfirm>,
                    ]}
                  >
                    <List.Item.Meta
                      title={`${moment(item.date).format('HH:mm').toString()} ${
                        item.title
                      }`}
                      description={item?.description ?? ''}
                    />
                  </List.Item>
                )}
              />
            )}
            {!currentDateList && <p>Список дел пустой</p>}
            <Divider>
              {isEdit ? 'Редактировать' : 'Добавить'} напоминание
            </Divider>
            <Form form={form} layout="horizontal" labelCol={{ span: 5 }}>
              <Form.Item hidden={true} name="id">
                <Input />
              </Form.Item>
              <Row>
                <Col span={12}>
                  <Form.Item
                    name="date"
                    rules={[{ required: true, message: 'Укажите дату!' }]}
                  >
                    {/*// @ts-ignore*/}
                    <DatePicker
                      showTime
                      format={'DD.MM.YYYY HH:mm'}
                      placeholder="Укажите дату"
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="type">
                    <Select
                      placeholder="Укажите тип уведомления"
                      defaultValue="success"
                    >
                      <Option value="success">
                        <CheckCircleOutlined /> Важное
                      </Option>
                      <Option value="error">
                        <CloseCircleOutlined /> Очень важное
                      </Option>
                      <Option value="warning">
                        <WarningOutlined /> Предупреждение
                      </Option>
                      <Option value="info">
                        <InfoCircleOutlined /> Обычное
                      </Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <Form.Item name="emailNotification" valuePropName="checked">
                    <Checkbox>Уведомлять по почте</Checkbox>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="notifyTimeType">
                    <Select
                      placeholder="Время уведомления"
                      defaultValue="0"
                      // @ts-ignore
                      onChange={(value) => setNeedNotifyTime(value === '4')}
                    >
                      <Option value="0">Напомнить за 15 минут</Option>
                      <Option value="1">Напомнить за 30 минут</Option>
                      <Option value="2">Напомнить за 1 час</Option>
                      <Option value="3">Напомнить за 1 день</Option>
                      <Option value="4">Напомнить по времени</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              {needNotifyTime && (
                <Row>
                  <Col span={12}></Col>
                  <Col span={12}>
                    <Form.Item
                      name="notifyTime"
                      rules={[
                        {
                          required: true,
                          message: 'Укажите время напоминания!',
                        },
                      ]}
                    >
                      {/*// @ts-ignore*/}
                      {needNotifyTime && (
                        <DatePicker
                          showTime
                          format={'DD.MM.YYYY HH:mm'}
                          placeholder="Укажите дату"
                        />
                      )}
                    </Form.Item>
                  </Col>
                </Row>
              )}
              <Form.Item
                name={'title'}
                rules={[
                  { required: true, message: 'Укажите название!' },
                  {
                    max: 50,
                    message: 'Максимальная длина названия 50 символов!',
                  },
                ]}
              >
                <Input placeholder="Укажите название" />
              </Form.Item>
              <Form.Item
                name="description"
                //rules={[{ required: true, message: 'Укажите описание!' }]}
              >
                <Input.TextArea placeholder="Укажите описание" />
              </Form.Item>
              <Row justify="center" align="middle">
                <Button
                  type={'primary'}
                  onClick={async () => {
                    await submitForm();
                  }}
                  icon={<EditOutlined />}
                >
                  {isEdit ? 'Изменить' : 'Создать'}
                </Button>
              </Row>
            </Form>
          </Modal>
        </>
      )}
      {!user && !calendarList && <div>Загрузка...</div>}
    </div>
  );
};
export default CalendarComponent;
