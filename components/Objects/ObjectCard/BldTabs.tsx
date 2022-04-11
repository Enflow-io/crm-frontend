import {List, Modal, Tabs, notification} from 'antd';
import Styles from "./building.module.scss"
import {Button, Radio} from 'antd';
import BldImages from "./BldImages";
import BldDocs from "./BldDocs";
import React, {useState} from "react";
import BlockCard from "../../Blocks/BlockCard/BlockCard";
import {useRouter} from "next/router";
import {BuildingInterface} from "../../../interfaces/BuildingInterface";
import {PlusOutlined} from '@ant-design/icons';
import {submitBuildingForm} from "../../../effects/object";
import ObjectForm from "../ObjectForm/ObjectForm";
import {SubmitBlockForm} from "../../../effects/block.effects";
import BlockForm from "../../Blocks/BlockForm/BlockForm";


const {TabPane} = Tabs;

let data: string[] = []

for (let i = 0; i < 140; i++) {
    data.push(`${1 + i} м2 - аренда`)
}

interface BldTabsProps {
    buildingData: BuildingInterface
    refresh: ()=>void
}

const BldTabs = (props: BldTabsProps) => {
    const router = useRouter();
    const [currentBlockId, setCurrentBlockId] = useState(0)
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isSaving, setIsSaving] = useState(false)

    const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);

    const blocks = props.buildingData?.blocks || [];
    console.log(blocks)

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsSaving(true)
        setTimeout(() => {
            setIsModalVisible(false);
            notification.success({
                message: `Данные сохранены`,
                description:
                    `Обновления блока #${currentBlockId} сохранены в базу данных и доступны для остальных пользователей.`,
                placement: 'bottomRight'
            });

            setIsSaving(false)

        }, 500)
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    if (!props.buildingData) {
        return <div>loading</div>
    }
    return <div className={Styles.BldTabs}>
        <Tabs className={Styles.Tabs} size={'small'} defaultActiveKey="1" onChange={() => {
        }}>
            <TabPane tab="Блоки" key="1">
                <Radio.Group value={'small'}>
                    <Radio.Button value="large">Аренда</Radio.Button>
                    <Radio.Button value="default">Продажа</Radio.Button>
                    <Radio.Button value="small">Все</Radio.Button>
                </Radio.Group>
                <Button onClick={()=>{
                    setIsCreateModalVisible(true)
                }} style={{float: 'right'}} icon={<PlusOutlined/>} />
                <br/>
                <br/>
                <List className={Styles.BlockList}
                      bordered
                      dataSource={blocks}
                      renderItem={item => (
                          <List.Item style={{cursor: "pointer"}} onClick={e => {
                              // @ts-ignore
                              setCurrentBlockId(parseInt(item?.id));
                              setIsModalVisible(true)
                          }
                          }>
                              {item.floor} этаж, {item.name}
                          </List.Item>
                      )}
                />
            </TabPane>
            <TabPane tab="Фото" key="2">
                <BldImages buildingData={props.buildingData}/>
            </TabPane>
            <TabPane tab="Документы" key="3">
                <BldDocs buildingData={props.buildingData}/>
            </TabPane>
        </Tabs>

        <Modal title={`Блок ${currentBlockId}`}
               visible={isModalVisible}
               onOk={handleOk}
               onCancel={handleCancel}
               width={'100%'}
               style={{top: 20}}
               footer={[
                   <Button key="back" onClick={handleOk}>
                       Закрыть
                   </Button>,
                   <Button key="submit" type="primary" loading={false} onClick={() => {
                       router.push(`/blocks/${currentBlockId.toString()}`)

                   }}>
                       Открыть страницу
                   </Button>,
                   <Button
                       key="link"
                       type="primary"
                       loading={isSaving}
                       onClick={handleOk}
                   >
                       Сохранить
                   </Button>,
               ]}>
            <BlockCard showSaveBtn={false} modelId={currentBlockId}/>
        </Modal>



        <Modal title="Создание блока" visible={isCreateModalVisible}
               width={'100%'}
               style={{top: 20}}

               onOk={async () => {

                   try {
                       await SubmitBlockForm()
                       setIsCreateModalVisible(false)
                       setTimeout(async ()=>{
                           await props.refresh()
                       }, 2000)




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

            <BlockForm
                isCreating={true}
                preselectedBuilding={props.buildingData}
                successRedirect={false}

            />

        </Modal>
    </div>


}

export default BldTabs