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
    notification, 
    Row,
    Col
} from 'antd';
import {UserOutlined, LockOutlined} from '@ant-design/icons';
import React, {forwardRef, useEffect} from "react";
import {UserInterface} from "../../../interfaces/user.interface";
import {SubmitBlockForm} from "../../../effects/block.effects";
import Api from "../../../services/Api";
import {SubmitUserForm} from "../../../effects/user";
import {useRouter} from "next/router";

interface UserFormProps {
    model?: UserInterface
    isCreating?: boolean

}

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

const UserForm = ({isCreating, model, ...props}: UserFormProps) => {
    const [form] = Form.useForm();

    const router = useRouter();

    useEffect(()=>{
        const watcher = SubmitUserForm.done.watch(async () => {

            try {
                let props = form.getFieldsValue();
                console.log(props)
                await form.validateFields()

                try {
                    let res;
                    if(isCreating){

                        res = await Api.createUser(props)
                    }else{
                        if(model){
                            res = await Api.updateUser(props, model.id)
                        }else{
                            throw Error("No users data for updating")
                        }
                    }


                    notification.success({
                        message: isCreating ? `Пользователь ${props.name} создан с номером #${res.data.id}` : 'Данные сохранены',
                        placement: 'bottomRight'
                    });
                    if(isCreating){
                        await router.push(`/users/${res.data.id}`)
                    }else{
                        if(props.onUpdate){
                            props.onUpdate(res)
                        }
                    }
                } catch (e: any) {
                    notification.error({
                        message: isCreating ? `Ошибка при создании пользователя: ${props.name}` : 'Ошибка при сохранении данных',
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

    return (
        <>
            <br />
            <Row>
                <Col span={10}>
    <div>
        <Form
        {...formItemLayout}
        
            labelCol={{span: 6}}
            wrapperCol={{span: 17}}
            layout="horizontal"
            initialValues={{role: "default", ...model}}
            form={form}

            // initialValues={{ size: componentSize }}
            // onValuesChange={onFormLayoutChange}
            autoComplete="off"
            onFieldsChange={e => {
                console.log(e)
            }
            }
        >
            <Form.Item label="Роль" name="role">
                <Radio.Group id={'role-selector'} >
                    <Radio.Button defaultChecked={true} value="default">Базовый</Radio.Button>
                    <Radio.Button value="manager">Менеджер</Radio.Button>
                    <Radio.Button value="admin">Администратор</Radio.Button>
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
            {isCreating &&
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
            }

        </Form>

    </div>
                    </Col>
           </Row>
       </>
    );
};
export default UserForm

// export default React.forwardRef((props, ref) => {
//     return <UserForm {...props} forwardedRef={ref} />
// })
// export default CreateUserForm