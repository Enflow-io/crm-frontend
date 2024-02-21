import CreateUserForm from "../UserForm/UserForm";
import {submitBuildingForm} from "../../../effects/object";
import {Button} from "antd";
import React from "react";
import {UserInterface} from "../../../interfaces/user.interface";
import {PlusOutlined, DeleteOutlined, ExclamationCircleOutlined} from '@ant-design/icons';
import {SubmitUserForm} from "../../../effects/user";
import Api from "../../../services/Api";


interface UserCardProps {
    model: UserInterface

}
const UserCard = (props: UserCardProps)=>{
    return <div className={'user-card-page'}>
        <CreateUserForm model={props.model} />
        <Button type={'primary'}
                style={{
                    float: "right"
                }}
                onClick={async () => {
                    await SubmitUserForm()
                }} icon={<PlusOutlined/>}>
            Сохранить данные
        </Button>

        <Button type="dashed" danger
            onClick={async () =>{
                await Api.deleteUser(props.model.id)
            }}
        >Удалить</Button>
    </div>
}

export default UserCard