import {
    Form,
    Input,
    Button,
    Radio,
    Select,
    Cascader,
    DatePicker,
    InputNumber,
    TreeSelect,
    Switch,
} from 'antd';
import {UserOutlined, LockOutlined} from '@ant-design/icons';
import React, {forwardRef} from "react";

const CreateUserForm = (props: any) => {
    return <div>
        <Form
            ref={props.forwardedRef}
            labelCol={{span: 6}}
            wrapperCol={{span: 17}}
            layout="horizontal"
            // initialValues={{ size: componentSize }}
            // onValuesChange={onFormLayoutChange}
            size={'small'}
            autoComplete="off"
            onFieldsChange={e => {
                console.log(e)
                }
            }
        >
            <Form.Item label="Роль" name="role">
                <Radio.Group>
                    <Radio.Button defaultChecked={true} value="small">Базовый</Radio.Button>
                    <Radio.Button value="default">Менеджер</Radio.Button>
                    <Radio.Button value="large">Администратор</Radio.Button>
                </Radio.Group>
            </Form.Item>

            <Form.Item
                label="Email"
                name={'email'}
                rules={[
                    {
                        required: true,
                        message: 'Введите корректный электронный адрес пользователя',
                        type: 'email'
                    }
                ]}
            >
                <Input/>
            </Form.Item>

            <Form.Item
                label="Имя"
                name={'name'}
                rules={[
                    {
                        required: true,
                        message: 'Введите имя пользователя',
                    }
                ]}
            >
                <Input/>
            </Form.Item>
            <Form.Item
                label="Фамилия"
                name={'lastName'}

            >
                <Input/>
            </Form.Item>
            <Form.Item
                label={'Пароль'}
                name="password"
                rules={[{required: true, message: 'Please input your password!'}]}
            >
                <Input
                    prefix={<LockOutlined className="site-form-item-icon"/>}
                    type="password"
                    placeholder="Password"
                />
            </Form.Item>

        </Form>

    </div>
}

export default React.forwardRef((props, ref) => {
    return <CreateUserForm {...props} forwardedRef={ref} />
})
// export default CreateUserForm