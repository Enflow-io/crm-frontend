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
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const CreateUserForm = ()=>{
    return <div>
        <Form
            labelCol={{ span: 6}}
            wrapperCol={{ span: 17 }}
            layout="horizontal"
            // initialValues={{ size: componentSize }}
            // onValuesChange={onFormLayoutChange}
            size={'small'}
        >
            <Form.Item label="Роль" name="size">
                <Radio.Group>
                    <Radio.Button defaultChecked={true} value="small">Базовый</Radio.Button>
                    <Radio.Button value="default">Менеджер</Radio.Button>
                    <Radio.Button value="large">Администратор</Radio.Button>
                </Radio.Group>
            </Form.Item>

            <Form.Item label="Email">
                <Input />
            </Form.Item>

            <Form.Item label="Имя">
                <Input />
            </Form.Item>
            <Form.Item label="Фамилия">
                <Input />
            </Form.Item>
            <Form.Item
                label={'Пароль'}
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                />
            </Form.Item>

        </Form>

    </div>
}

export default CreateUserForm