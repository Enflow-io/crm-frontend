import CreateUserForm from "../UserForm/UserForm";
import {submitBuildingForm} from "../../../effects/object";
import {Button, Row, Col} from "antd";
import React, {useEffect, useState} from "react";
import {UserInterface} from "../../../interfaces/user.interface";
import {PlusOutlined, DeleteOutlined, ExclamationCircleOutlined} from '@ant-design/icons';
import {SubmitUserForm} from "../../../effects/user";
import Api from "../../../services/Api";
import {useRouter} from "next/router";
import UploadAvatar from "../../Avatar/UploadAvatar";


interface UserCardProps {
    model: UserInterface

}
const UserCard = (props: UserCardProps)=>{
    const [user, setUser] = useState<UserInterface>()
    const [canEdit, setCanEdit] = useState(false)

    const getUser = async () => {
        const user = await Api.getCurrentUser()
        setUser(user)
        setCanEdit(user.role === 'admin' ||
            user.email === 'a.sonyushkin@rnbconsulting.ru' ||
            user.email === 'm.ponomareva@rnbconsulting.ru')
    }
    useEffect(() => {
        getUser()
    }, [])

    return <div className={'user-card-page'}>
        <Row>
            <Col span={12}>
                { // @ts-ignore
                <CreateUserForm model={props.model} canEdit={canEdit} />}
            </Col>
            <Col span={12}>
                {// @ts-ignore
                <UploadAvatar image={props.model?.avatar} user={props.model}/>}
            </Col>
        </Row>
            { canEdit &&
            <Button type={'primary'}
                    style={{
                        float: "right"
                    }}
                    onClick={async () => {
                        await SubmitUserForm()
                    }} icon={<PlusOutlined/>}>
                Сохранить данные
            </Button>}

            { canEdit && <Button type="dashed" danger
                onClick={async () =>{
                    await Api.deleteUser(props.model.id)
                }}
            >Удалить</Button>}

    </div>
}

export default UserCard