import {Collapse, Input, List, Modal, Typography, Avatar, Spin, notification} from 'antd';
import styles from "./right-menu.module.scss"

const {Panel} = Collapse;

import {MinusOutlined, PlusOutlined, DeleteOutlined, ExclamationCircleOutlined} from '@ant-design/icons';
import {useEffect, useState} from "react";
import Api from "../../services/Api";
import {UserListInterface} from "../../interfaces/UserListInterface";
import {submitBuildingForm} from "../../effects/object";
import {ListsUpdated} from "../../effects/lists.effects";



const UsersLists = () => {
    /* Modals */
    const [visibleBlMod, setVisibleBlMod] = useState(false);
    const [visibleObjMod, setVisibleObjMod] = useState(false);

    const showModalBlMod = () => {
        setNewBlockListName('')
        setVisibleBlMod(true);
    };

    const hideModalBlMod = () => {
        setVisibleBlMod(false);
    };

    const showModalObjMod = () => {
        setNewBuildingListName('')
        setVisibleObjMod(true);
    };

    const hideModalObjMod = () => {
        setVisibleObjMod(false);
    };

    /* /Modals */



    // ListsUpdated.
    useEffect(() => {
        const unwatch = ListsUpdated.watch(async () => {
            await getLists();
        });

        return function cleanup() {
            unwatch()
        }
    })

        const [newBlockListName, setNewBlockListName] = useState('')
    const [newBuildingListName, setNewBuildingListName] = useState('')

    const confirm =  (entityName: string, id: number) => {
        Modal.confirm({
            title: 'Удалить элемент из списка?',
            icon: <ExclamationCircleOutlined />,
            content: 'Вы уверены, что хотите удалить элемент из списка?',
            okText: 'Да',
            cancelText: 'Отмена',
            onOk: async ()=>{
                if(entityName === 'building'){
                    await Api.deleteBuildingList(id)
                }else if(entityName === 'block'){
                    await Api.deleteBlockList(id)
                }

                notification.success({
                    message: `Элемент удален`,
                    placement: 'bottomRight'
                });


                await getLists();
            }
        });
    };







    const genExtra = (entityName: string, id: number) => (
        <DeleteOutlined
            onClick={event => {
                // If you don't want click extra trigger collapse, you can prevent this:
                event.stopPropagation();
                confirm(entityName, id)
            }}
        />
    );

    const [isListsLoading, setIsListsLoading] = useState(false);

    const [blocksLists, setBlocksLists] = useState<UserListInterface[]>([])
    const [buildingsLists, setBuildingsLists] = useState<UserListInterface[]>([])

    const getLists = async () => {
        setIsListsLoading(true)

        const result = await Promise.all([await Api.getBlocksLists(), Api.getBuildingsLists()])

        setBlocksLists(result[0].data)
        setBuildingsLists(result[1].data)

        setIsListsLoading(false)

    }

    useEffect(() => {


        getLists();


    }, []);



    return <>
        {!isListsLoading && <>
            <div className={styles.HeadRow}>
                <h4>Мои здания</h4> <a href={'#'} onClick={showModalObjMod}><PlusOutlined/></a>
            </div>
            {buildingsLists.length === 0 && <div>
                У вас еще нет списков объектов, <a onClick={showModalObjMod} href={'#'}>создать?</a>
            </div>}
            <Collapse accordion

            >
                {buildingsLists.map((item: UserListInterface, number: number)=>{
                    return <Panel header={item.name} key={item.id} extra={genExtra('building', item.id)}>
                        <List
                            itemLayout="horizontal"
                            dataSource={item.buildings}
                            renderItem={item => (
                                <List.Item>
                                    <List.Item.Meta
                                        avatar={<Avatar src="https://joeschmoe.io/api/v1/random"/>}
                                        title={<a href="https://ant.design">{item.name}</a>}
                                        description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                                    />
                                </List.Item>
                            )}
                        />
                    </Panel>
                })}


            </Collapse>

            <br/>
            <div className={styles.HeadRow}>
                <h4>Мои блоки</h4> <a href={'#'} onClick={showModalBlMod}><PlusOutlined/></a>
            </div>

            {blocksLists.length === 0 && <div>
                У вас еще нет списков офисов, <a onClick={showModalBlMod} href={'#'}>создать?</a>
            </div>}

            <Collapse accordion>
                {blocksLists.map((item: UserListInterface, number: number)=>{
                    return <Panel header={item.name} key={item.id} extra={genExtra('block', item.id)}>
                        <List
                            itemLayout="horizontal"
                            dataSource={item.blocks}
                            renderItem={item => (
                                <List.Item>
                                    <List.Item.Meta
                                        avatar={<Avatar src="https://joeschmoe.io/api/v1/random"/>}
                                        title={<a href="https://ant.design">{item.name}</a>}
                                        description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                                    />
                                </List.Item>
                            )}
                        />
                    </Panel>
                })}

            </Collapse>
        </>
        }

        {isListsLoading && <Spin />}
        <Modal
            title="Создать список блоков"
            visible={visibleBlMod}
            onOk={async ()=>{

                await Api.createBlockList(newBlockListName)

                notification.success({
                    message: `Список создан`,
                    placement: 'bottomRight'
                });

                hideModalBlMod()

                await getLists();
            }}
            onCancel={hideModalBlMod}
            okText="Сохранить"
            cancelText="Отменить"
        >
            <Input onChange={e=>{
                setNewBlockListName(e.target.value);
            }} placeholder={'введите название списка'}/>
        </Modal>

        <Modal
            title="Создать список объектов"
            visible={visibleObjMod}
            onOk={async ()=>{
                // if(entityName === 'building'){
                //     await Api.deleteBuildingList(id)
                // }else if(entityName === 'block'){
                //     await Api.deleteBlockList(id)
                // }

                await Api.createBuildingList(newBuildingListName)

                notification.success({
                    message: `Элемент создан`,
                    placement: 'bottomRight'
                });


                hideModalObjMod()
                await getLists();

            }}
            onCancel={hideModalObjMod}
            okText="Сохранить"
            cancelText="Отменить"
        >
            <Input onChange={e=>{
                setNewBuildingListName(e.target.value);
            }} placeholder={'введите название списка'}/>
        </Modal>
    </>
}


export default UsersLists;