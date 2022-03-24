import {Button, Modal} from "antd";
import { PlusOutlined } from '@ant-design/icons';
import React, {useState} from "react";
import styles from "./SubMenu.module.scss"

const SubMenu = () => {

    const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
    const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);

    return  <div className={styles.SubMenu}>
        <Button onClick={()=>{setIsCreateModalVisible(true)}} icon={<PlusOutlined />}>
            Добавить
        </Button>

        <Modal title="Basic Modal" visible={isCreateModalVisible}
               onOk={()=>{setIsCreateModalVisible(false)}}
               onCancel={()=>{setIsCreateModalVisible(false)}}>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>

            <button onClick={()=>{setIsConfirmModalVisible(true)}}>Test</button>
            <Modal
                title="Modal"
                visible={isConfirmModalVisible}
                onOk={()=>{setIsConfirmModalVisible(false)}}
                onCancel={()=>{setIsConfirmModalVisible(false)}}
                okText="Подтвердить"
                cancelText="Отменить"
            >
                <p>Bla bla ...</p>
                <p>Bla bla ...</p>
                <p>Bla bla ...</p>
            </Modal>
        </Modal>
    </div>

};


export default SubMenu