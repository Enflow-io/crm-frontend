import {List, Modal, Tabs} from 'antd';
import Styles from "./building.module.scss"
import { Button, Radio } from 'antd';
import BldImages from "./BldImages";
import BldDocs from "./BldDocs";
import {useState} from "react";
import BlockCard from "../BlockCard/BlockCard";
const {TabPane} = Tabs;

let data: string[] = []

for(let i = 0; i < 140; i++) {
    data.push(`${1 + i} м2 - аренда`)
}

const BldTabs = () => {

    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return <div className={Styles.BldTabs}>
        <Tabs className={Styles.Tabs} size={'small'} defaultActiveKey="1" onChange={() => {
        }}>
            <TabPane tab="Блоки" key="1">
                <Radio.Group value={'small'} >
                    <Radio.Button value="large">Аренда</Radio.Button>
                    <Radio.Button value="default">Продажа</Radio.Button>
                    <Radio.Button value="small">Все</Radio.Button>
                </Radio.Group>
                <br />
                <br />
                <List className={Styles.BlockList}
                    bordered
                    dataSource={data}
                    renderItem={item => (
                        <List.Item style={{cursor: "pointer"}} onClick={e=>{setIsModalVisible(true)}}>
                             {item}
                        </List.Item>
                    )}
                />
            </TabPane>
            <TabPane tab="Фото" key="2">
                <BldImages />
            </TabPane>
            <TabPane tab="Документы" key="3">
                <BldDocs />
            </TabPane>
        </Tabs>

        <Modal title="Блок #12"
               visible={isModalVisible}
               onOk={handleOk}
               onCancel={handleCancel}
               width={'100%'}
               style={{ top: 20 }}
            footer={[
            <Button key="back" onClick={handleOk}>
                Закрыть
            </Button>,
            <Button key="submit" type="primary" loading={false} onClick={handleOk}>
                Открыть страницу
            </Button>,
            <Button
                key="link"
                href="https://google.com"
                type="primary"
                loading={true}
                onClick={handleOk}
            >
                Сохранить
            </Button>,
        ]}>
           <BlockCard />
        </Modal>
    </div>


}

export default BldTabs