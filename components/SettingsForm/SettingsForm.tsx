import React, {useEffect, useState} from 'react';
import {
    Form,
    Input,
    InputNumber,
    Cascader,
    Select,
    Row,
    Col,
    Checkbox,
    Button,
    AutoComplete, Spin, Radio, notification,
} from 'antd';
import Api from "../../services/Api";
import {UserInterface} from "../../interfaces/user.interface";

const {Option} = Select;


const formItemLayout = {
    labelCol: {
        xs: {span: 24},
        sm: {span: 8},
    },
    wrapperCol: {
        xs: {span: 24},
        sm: {span: 16},
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

const SettingsForm = () => {
    const [form] = Form.useForm();
    const [formPass] = Form.useForm();
    const [isLoading, setIsLoading] = useState(true)
    const [user, setUser] = useState<UserInterface>()
    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
    };

    const getUser = async () => {
        setIsLoading(true)
        const user = await Api.getCurrentUser()
        setUser(user)
        setIsLoading(false)
    }
    useEffect(() => {
        getUser()
    }, [])


    if (isLoading) {
        return <Spin/>
    }


    const saveUser = async () => {
        await form.validateFields();

        try{
            const newUserFields = form.getFieldsValue();
            await Api.updateCurrentUser(newUserFields)
            notification.success({
                message: 'Данные сохранены',
                placement: 'bottomRight'
            });
        }catch (e: any) {
            notification.error({
                message:  'Ошибка при сохранении данных',
                description: "Текст ошибки: " + e.message,
                placement: 'bottomRight'
            });
        }

    }


    const changePassword = async ()=>{
        await formPass.validateFields();

        try{
            const passwordFields = formPass.getFieldsValue();
            await Api.changeUserPassword(passwordFields.password, passwordFields.newPassword)
            notification.success({
                message: 'Пароль установлен',
                placement: 'bottomRight'
            });
        }catch (e: any) {
            const text = e?.response?.data?.message;
            notification.error({
                message:  'Ошибка при изменении пароля',
                description: "Текст ошибки: " + text ? text : e.message,
                placement: 'bottomRight'
            });
        }
    }


    return (
        <>
            <br />
            <Row>
                <Col span={10}>
                    <Form
                        {...formItemLayout}
                        form={form}
                        name="register"
                        onFinish={onFinish}
                        initialValues={{...user, prefix: '+7'}}
                        scrollToFirstError
                        style={{
                            maxWidth: 600
                        }}
                    >
                        <Form.Item label="Роль" name="role">
                            <Radio.Group disabled={true} id={'role-selector'}>
                                <Radio.Button defaultChecked={true} value="default">Базовый</Radio.Button>
                                <Radio.Button value="manager">Менеджер</Radio.Button>
                                <Radio.Button value="admin">Администратор</Radio.Button>
                            </Radio.Group>
                        </Form.Item>

                        <Form.Item
                            name="email"
                            label="E-mail"
                            rules={[
                                {
                                    type: 'email',
                                    message: 'The input is not valid E-mail!',
                                },
                                {
                                    required: true,
                                    message: 'Please input your E-mail!',
                                },
                            ]}
                        >
                            <Input                             disabled={true}
                            />
                        </Form.Item>

                        <Form.Item
                            name="name"
                            label="Имя"
                            rules={[
                                {
                                    required: true,
                                    message: 'Необходимо указать имя',
                                },
                            ]}
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item
                            name="lastName"
                            label="Фамилия"
                        >
                            <Input/>
                        </Form.Item>


                        <Form.Item
                            name="phone"
                            label="Телефон"
                        >
                            <Input style={{width: '100%'}}/>
                        </Form.Item>


                        <Form.Item
                            name="description"
                            label="О себе"
                        >
                            <Input.TextArea showCount maxLength={100}/>
                        </Form.Item>


                        <Form.Item {...tailFormItemLayout}>
                            <Button id={'setting-form-submit-btn'} onClick={saveUser} type="primary" htmlType="submit">
                                Сохранить
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
                <Col span={10}>
                    <Form
                        {...formItemLayout}
                        form={formPass}
                    >
                        <Form.Item
                            name="password"
                            label="Текущий"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                        >
                            <Input.Password/>
                        </Form.Item>

                        <Form.Item
                            name="newPassword"
                            label="Новый пароль"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please set a new your password!',
                                }
                            ]}
                        >
                            <Input.Password/>
                        </Form.Item>

                        <Form.Item {...tailFormItemLayout}>
                            <Button id={'password-form-submit-btn'} onClick={changePassword} type="primary" htmlType="submit">
                                Сменить пароль
                            </Button>
                        </Form.Item>
                    </Form>

                </Col>
            </Row>


        </>
    );
};

export default SettingsForm