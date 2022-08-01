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
import BuildingListsSelector from "../../RightMenu/BuildingListsSelector";

interface ObjSubMenuProps {
    selectedRows: number[]
    // onColsChanged: (params: any) => void
    // columns: any[]
}


const SearchSubMenu = (props: ObjSubMenuProps) => {
    const formRef = useRef();
    const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
    const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const [isSettingsModalVisible, setIsSettingsModalVisible] = useState(false);


    return <div className={styles.SubMenu}>


        {/*<Button id={'create-object-btn'} className={styles.Button} onClick={() => {*/}
        {/*    setIsCreateModalVisible(true)*/}
        {/*}} icon={<PlusOutlined/>}>*/}
        {/*    Добавить*/}
        {/*</Button>*/}

        {props.selectedRows.length > 0 &&
        <Button loading={isLoading} disabled={isLoading} className={styles.Button}
                onClick={() => {
                    Modal.info({
                        title: 'Выберите списки для сохранения',
                        content: <BuildingListsSelector buildingId={props.selectedRows || []}/>,
                        maskClosable: true
                    })
                }
                }
                icon={<PlusOutlined />}>
            Сохранить в коллекцию
        </Button>
        }

        {/*<Button className={styles.Button} onClick={() => {*/}
        {/*    setIsSettingsModalVisible(true)*/}
        {/*}} icon={<SettingOutlined/>}>*/}

        {/*</Button>*/}




    </div>

};


export default SearchSubMenu