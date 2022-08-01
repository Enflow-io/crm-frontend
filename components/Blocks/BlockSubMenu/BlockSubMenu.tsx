import {Button, Checkbox, Modal, notification} from "antd";
import {PlusOutlined, DeleteOutlined, ExclamationCircleOutlined, SettingOutlined} from '@ant-design/icons';
import React, {useRef, useState} from "react";
import styles from "./BlockSubMenu.module.scss"
import CreateUserForm from "../../users/UserForm/UserForm";
import {registerUser, updateUsersTable} from "../../../effects/user";
import Api from "../../../services/Api";
import {submitBuildingForm} from "../../../effects/object";
import ObjectForm from "../../Objects/ObjectForm/ObjectForm";
import BlockForm from "../BlockForm/BlockForm";
import {SubmitBlockForm} from "../../../effects/block.effects";
import Search from "antd/lib/input/Search";

interface UserSubMenuProps {
    selectedRows: number[]
    onColsChanged: (params: any) => void
    columns: any[]
}

const BlockSubMenu = (props: UserSubMenuProps) => {
    const formRef = useRef();
    const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
    const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const [isSettingsModalVisible, setIsSettingsModalVisible] = useState(false);


    return <div className={styles.SubMenu}>
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
            setIsSettingsModalVisible(true)
        }} icon={<SettingOutlined/>}>

        </Button>




        <Modal title="Создание блока" visible={isCreateModalVisible}
               width={'100%'}
               style={{top: 20}}

               onOk={async () => {

                   try {
                       await SubmitBlockForm()
                       // @ts-ignore
                       // const result = await formRef.current.validateFields()
                       //
                       // await registerUser(result)
                       // setIsCreateModalVisible(false)


                   } catch (err: any) {
                       console.log("errros!!", err)
                       notification.error({
                           message: `Пользователь НЕ создан`,
                           description: 'Ошибка: '+ err?.message,
                           placement: 'bottomRight'
                       });
                   }

                   // setIsCreateModalVisible(false)
               }}
               onCancel={() => {
                   setIsCreateModalVisible(false)
               }}>

            <BlockForm isCreating={true}/>

        </Modal>

        <Modal
            title="Настройки таблицы"
            visible={isSettingsModalVisible}
            onOk={() => {
                setIsSettingsModalVisible(false)
            }}
            onCancel={() => {
                setIsSettingsModalVisible(false)
            }}

            okText="Подтвердить"
            cancelText="Закрыть"
        >
            <Checkbox.Group
                className={styles.CheckBoxGroup}
                options={props.columns.map(column => {
                    return {
                        label: column.title, value: column.dataIndex
                    }
                })}

                value={props.columns.filter(el=>el.isVisible===true).map(el=>el.dataIndex)}
                onChange={(params: any[])=>{
                    const newCols = props.columns.map(col=>{
                        if(params.includes(col.dataIndex)){
                            return {...col, isVisible: true};
                        }else{
                            return {...col, isVisible: false};

                        }
                    });
                    props.onColsChanged(newCols)
                }}
            />

        </Modal>
    </div>

};


export default BlockSubMenu