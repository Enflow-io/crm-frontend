import {Form, Input, Button, Checkbox} from 'antd';

import styles from './login.module.scss'
import {useRouter} from "next/router";
import Api from "../../services/Api";
import {useRef} from "react";
import * as Lockr from 'lockr'
import Link from 'next/link';
const Login = () => {

    const form = useRef(null);
    const router = useRouter();

    const onFinish = async (values: any) => {
        let res: any;
        res = await Api.login(values.username, values.password).catch((error) => {

            const message = error?.response?.data?.message;

            // @ts-ignore
            form?.current?.setFields([
                {
                    name: 'password',
                    errors: [message]
                },

            ])


        }).then(async data=>{
            if(data){
                await Lockr.set('user', data.data)
                await router.push('/')
            }

        })





    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };



    return (
        <Form

            name="basic"
            labelCol={{span: 8}}
            wrapperCol={{span: 16}}
            initialValues={{remember: true}}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            className={styles.Form}
            ref={form}

            // style={{
            //     maxHeight: 500
            // }}
        >
            <Form.Item
                label="Email"
                name="username"
                rules={[{required: true, message: 'Введите почтовый адрес'}]}

            >
                <Input/>
            </Form.Item>

            <Form.Item
                label="Пароль"
                name="password"
                rules={[{required: true, message: 'Введите пароль'}]}
            >
                <Input.Password/>
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked" wrapperCol={{offset: 8, span: 16}}>
                <Checkbox>Запомнить меня</Checkbox>
            </Form.Item>

            <Form.Item wrapperCol={{offset: 8,}}>
                <Button onClick={() => {
                    // router.push('/')
                }} style={{
                    width: '100%'
                }} type="primary" htmlType="submit">
                    Войти
                </Button>
            </Form.Item>
            <Form.Item wrapperCol={{offset: 8, span: 16}} style={{marginBottom: 0}}>
                <Link href="/password-recovery">
                    <a style={{color: '#1890ff'}}>
                        Забыли пароль?
                    </a>
                </Link>
            </Form.Item>
        </Form>
    );
};


export default Login