import CreateUserForm from "../UserForm/UserForm";
import {submitBuildingForm} from "../../../effects/object";
import {Button} from "antd";
import React from "react";
import {UserInterface} from "../../../interfaces/user.interface";
import {PlusOutlined, DeleteOutlined, ExclamationCircleOutlined} from '@ant-design/icons';
import {SubmitUserForm} from "../../../effects/user";


interface UserCardProps {
    model: UserInterface

}
const UserCard = (props: UserCardProps)=>{
    return <div className={'user-card-page'}>
        <CreateUserForm model={props.model} />
        <Button type={'primary'}
                style={{
                    marginLeft: '10.4%',
                }}
                onClick={async () => {
                    await SubmitUserForm()
                }} icon={<PlusOutlined/>}>
            Сохранить данные
        </Button>
    </div>
}

export default UserCard