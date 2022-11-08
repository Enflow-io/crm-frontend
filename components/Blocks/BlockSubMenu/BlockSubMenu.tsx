import {Button, Checkbox, Modal, notification} from "antd";
import {
    PlusOutlined,
    DeleteOutlined,
    ExclamationCircleOutlined,
    SettingOutlined,
    FilterOutlined
} from '@ant-design/icons';
import React, {useEffect, useRef, useState} from "react";
import styles from "./BlockSubMenu.module.scss"
import CreateUserForm from "../../users/UserForm/UserForm";
import {registerUser, updateUsersTable} from "../../../effects/user";
import Api from "../../../services/Api";
import {CloseCreateObjectModal, OpenCreateObjectModal, submitBuildingForm} from "../../../effects/object";
import ObjectForm from "../../Objects/ObjectForm/ObjectForm";
import BlockForm from "../BlockForm/BlockForm";
import {closeBlockCreateModal, openBlockCreateModal, SubmitBlockForm} from "../../../effects/block.effects";
import BuildingListsSelector from "../../RightMenu/BuildingListsSelector";
import BlockListsSelector from "../../RightMenu/BlocksListsSelector";

interface UserSubMenuProps {
    selectedRows: number[]
    onColsChanged: (params: any) => void
    columns: any[]
    onShowMyBlocks: (bol: boolean)=> void
    showMyBlocks: boolean
    onShowMyEditedBlocks: (bol: boolean)=> void
    showMyEditedBlocks: boolean
}

const BlockSubMenu = (props: UserSubMenuProps) => {
    const formRef = useRef();
    const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
    const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const [isSettingsModalVisible, setIsSettingsModalVisible] = useState(false);


    useEffect(() => {
        const unwatch = openBlockCreateModal.watch(() => {
            setIsCreateModalVisible(true)
        })

        const unwatch2 = closeBlockCreateModal.watch(() => {
            setIsCreateModalVisible(false)
        })

        return () => {
            unwatch();
            unwatch2();
        }

    }, []);

    return <div className={styles.SubMenu}>
        <Button
            className={styles.Button}
            onClick={() => {
                props.onShowMyBlocks(!props.showMyBlocks)
            }}
            type={props.showMyBlocks ? "primary" : undefined}
            icon={<FilterOutlined/>}>

            Созданные мной
        </Button>
        <Button
            className={styles.Button}
            onClick={() => {
                props.onShowMyEditedBlocks(!props.showMyEditedBlocks)
            }}
            type={props.showMyEditedBlocks ? "primary" : undefined}
            icon={<FilterOutlined/>}>
            Ред. мной
        </Button>

        <Button className={styles.Button} onClick={() => {
            setIsCreateModalVisible(true)
        }} icon={<PlusOutlined/>}>
            Добавить
        </Button>

        {props.selectedRows.length > 0 &&
        <Button loading={isLoading} disabled={isLoading} className={styles.Button}
                onClick={() => {
                    Modal.info({
                        title: 'Выберите списки для сохранения',
                        content: <BlockListsSelector blockId={props.selectedRows || []}/>,
                        maskClosable: true
                    })
                }
                }
                icon={<PlusOutlined/>}>
            Сохранить в коллекцию
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
                   // setIsCreateModalVisible(false)
                   closeBlockCreateModal();
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

                value={props.columns.filter(el => el.isVisible === true).map(el => el.dataIndex)}
                onChange={(params: any[]) => {
                    const newCols = props.columns.map(col => {
                        if (params.includes(col.dataIndex)) {
                            return {...col, isVisible: true};
                        } else {
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