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
import {BlockCreated, SubmitBlockForm} from "../../../effects/block.effects";
import BlockForm from "../../Blocks/BlockForm/BlockForm";
import {inspect} from "util";
import styles from "./BldTabs.module.scss"
import {Divider, Tag} from 'antd';

const {TabPane} = Tabs;

let data: string[] = []

for (let i = 0; i < 140; i++) {
    data.push(`${1 + i} м² - аренда`)
}

interface BldTabsProps {
    buildingData: BuildingInterface
    refresh: () => void
}

const BldTabs = (props: BldTabsProps) => {
    const [blockFilter, setBlockFilter] = useState(1);
    const router = useRouter();
    const [currentBlockId, setCurrentBlockId] = useState(0)
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isSaving, setIsSaving] = useState(false)

    const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);

    let blocks = props.buildingData?.blocks || [];
    blocks = blocks.sort((a: any, b: any) => {
        return a.floor - b.floor;
    })

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
                <Radio.Group value={blockFilter}>
                    <Radio.Button
                        onClick={() => {
                            setBlockFilter(1)
                        }}
                        value={1}>Все</Radio.Button>
                    <Radio.Button
                        onClick={() => {
                            setBlockFilter(2)
                        }}
                        value={2}>Аренда</Radio.Button>
                    <Radio.Button
                        onClick={() => {
                            setBlockFilter(3)
                        }}
                        value={3}>Продажа</Radio.Button>
                </Radio.Group>
                <Button onClick={() => {
                    setIsCreateModalVisible(true)
                }} style={{float: 'right'}} icon={<PlusOutlined/>}/>
                <br/>
                <br/>
                <List className={Styles.BlockList}
                      bordered
                      dataSource={blocks.filter(el => {
                          if (blockFilter === 2) {
                              return el.isRent;
                          }
                          if (blockFilter === 3) {
                              return !el.isRent;
                          }

                          return true;
                      })}
                      renderItem={item => {
                          const color = item.isOnMarket === 'есть на рынке' ? 'green' : 'red';

                          return <List.Item
                              style={{cursor: "pointer"}}
                              onClick={e => {
                                  // @ts-ignore
                                  setCurrentBlockId(parseInt(item?.id));
                                  setIsModalVisible(true)
                              }
                              }
                              className={`${item.isOnMarket === 'есть на рынке' ? styles.OnMarketBlock : styles.NotMarketBlock} ${styles.BlockLine}`}

                          >

                              <span style={{
                                  marginRight: '1em',
                                  // fontSize: '75%'
                                  display: 'block',
                                  width: '55%'


                              }}>{item.name}</span>
                              <div style={{
                                  width: '45%'

                              }}>
                              <Tag style={{
                                  fontSize: '65%'
                              }} color={color}>{item.floor} этаж</Tag>
                              {item.rentPrice &&
                              <Tag style={{
                                  fontSize: '65%'
                              }} color={color}>{item.rentPrice} ₽</Tag>
                              }
                              {item.opex.toString() !=='null' &&
                              <Tag style={{
                                  fontSize: '65%'
                              }} color={color}>{item.opex}</Tag>
                              }
                              </div>

                          </List.Item>
                      }}
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
                       const watcher = BlockCreated.done.watch(async () => {

                           await props.refresh()
                           watcher()
                       });
                       await SubmitBlockForm();
                       setIsCreateModalVisible(false)


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

            <BlockForm
                isCreating={true}
                preselectedBuilding={props.buildingData}
                successRedirect={false}

            />

        </Modal>
    </div>


}

export default BldTabs