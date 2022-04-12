import {Button, Modal, notification} from "antd";
import {PlusOutlined, DeleteOutlined, ExclamationCircleOutlined, SettingOutlined} from '@ant-design/icons';
import React, {useRef, useState} from "react";
import styles from "./ObjectSubMenu.module.scss"
import CreateUserForm from "../../users/UserForm/UserForm";
import {registerUser, updateUsersTable} from "../../../effects/user";
import Api from "../../../services/Api";
import ObjectForm from "../ObjectForm/ObjectForm";
import {submitBuildingForm} from "../../../effects/object";
import {Checkbox} from 'antd';

interface UserSubMenuProps {
    selectedRows: number[]
}

const allColumns = [
    {
        title: 'Название',
        dataIndex: 'name',
    },

    {
        title: 'Название Eng',
        dataIndex: 'nameEng',
    },
    {
        title: 'На сайте',
        dataIndex: 'showOnSite',
    },
    {
        title: 'Округ',
        dataIndex: 'globalDistrict',
    },
    {
        title: 'ID',
        dataIndex: 'id',
    },
    {
        title: 'Local ID',
        dataIndex: 'localId',
    },
    {
        title: 'Адрес',
        dataIndex: 'address',
    },
];

const ObjectSubMenu = (props: UserSubMenuProps) => {
    const formRef = useRef();
    const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
    const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const [isSettingsModalVisible, setIsSettingsModalVisible] = useState(false);


    return <div className={styles.SubMenu}>


        <Button id={'create-object-btn'} className={styles.Button} onClick={() => {
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
                        onOk: async () => {
                            setIsLoading(true)
                            for (let userId of props.selectedRows) {
                                try {
                                    await Api.removeUser(userId);
                                    notification.success({
                                        message: `Пользователь  #${userId} удален`,
                                        description: '',
                                        placement: 'bottomRight'
                                    });

                                } catch (e: any) {
                                    notification.error({
                                        message: `Пользователь  #${userId}  НЕ удален`,
                                        description: 'Ошибка: ' + e?.message,
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

        <Modal title="Создание объекта" visible={isCreateModalVisible}
               width={'100%'}
               style={{top: 20}}

               onOk={async () => {

                   try {
                       await submitBuildingForm()
                       // @ts-ignore
                       // const result = await formRef.current.validateFields()
                       //
                       // await registerUser(result)
                       // setIsCreateModalVisible(false)


                   } catch (err: any) {
                       console.log("errros!!", err)
                       notification.error({
                           message: `Пользователь НЕ создан`,
                           description: 'Ошибка: ' + err?.message,
                           placement: 'bottomRight'
                       });
                   }

                   // setIsCreateModalVisible(false)
               }}
               onCancel={() => {
                   setIsCreateModalVisible(false)
               }}>

            <ObjectForm isCreate={true}/>

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
            cancelText="Отменить"
        >
            <Checkbox.Group className={styles.CheckBoxGroup} options={allColumns.map(column => {
                return  { label: column.title, value: column.dataIndex }
            })}

                // onChange={onChange}
            />

        </Modal>
    </div>

};


export default ObjectSubMenu