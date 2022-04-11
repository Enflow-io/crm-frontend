import {Button, Modal, notification} from "antd";
import {PlusOutlined, DeleteOutlined, ExclamationCircleOutlined, SettingOutlined} from '@ant-design/icons';
import React, {useRef, useState} from "react";
import styles from "./SubMenu.module.scss"
import CreateUserForm from "../../users/UserForm/UserForm";
import {registerUser, SubmitUserForm, updateUsersTable} from "../../../effects/user";
import Api from "../../../services/Api";

interface UserSubMenuProps {
    selectedRows: number[]
}

const SubMenu = (props: UserSubMenuProps) => {


    const formRef = useRef();
    const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
    const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false)


    return <div className={`${styles.SubMenu} sub-menu`}>




        <Button className={styles.Button} onClick={() => {
            setIsCreateModalVisible(true)
        }} icon={<PlusOutlined/>}>
            Добавить
        </Button>

        {props.selectedRows.length > 0 &&
        <Button loading={isLoading} disabled={isLoading} className={styles.Button}
                onClick={() => {
                    Modal.confirm({
                        title: 'Confirm',
                        icon: <ExclamationCircleOutlined/>,
                        content: 'Вы уверены, что хотите удалить выделенных пользователей?',
                        okText: 'Удалить',
                        cancelText: 'Отмена',
                        onCancel: (close) => {
                            close()
                        },
                        onOk: async ()=>{
                            setIsLoading(true)
                            for(let userId of props.selectedRows){
                                try{
                                    await Api.removeUser(userId);
                                    notification.success({
                                        message: `Пользователь  #${userId} удален`,
                                        description: '',
                                        placement: 'bottomRight'
                                    });

                                }catch (e: any) {
                                    notification.error({
                                        message: `Пользователь  #${userId}  НЕ удален`,
                                        description: 'Ошибка: '+e?.message,
                                        placement: 'bottomRight'
                                    });
                                }
                            }
                            setIsLoading(false)
                            await updateUsersTable()
                        }
                    });
                }
                }
                icon={<DeleteOutlined/>}>
            Удалить
        </Button>
        }
        <Button className={styles.Button} onClick={() => {
        }}
                icon={<SettingOutlined/>}>
        </Button>

        <Modal title="Создание пользователя" visible={isCreateModalVisible}
               onOk={async () => {

                   await SubmitUserForm()

               }}
               onCancel={() => {
                   setIsCreateModalVisible(false)
               }}>

            <CreateUserForm isCreating={true}/>


        </Modal>
    </div>

};


export default SubMenu