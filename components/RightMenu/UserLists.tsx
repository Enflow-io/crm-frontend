import {Collapse, Input, List, Modal, Typography, Avatar} from 'antd';
import styles from "./right-menu.module.scss"
const {Panel} = Collapse;

import {MinusOutlined, PlusOutlined, DeleteOutlined} from '@ant-design/icons';
import {useState} from "react";

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const genExtra = () => (
    <DeleteOutlined
        onClick={event => {
            // If you don't want click extra trigger collapse, you can prevent this:
            event.stopPropagation();
        }}
    />
);

const UsersLists = () => {
    const [visibleBlMod, setVisibleBlMod] = useState(false);
    const [visibleObjMod, setVisibleObjMod] = useState(false);

    const showModalBlMod = () => {
        setVisibleBlMod(true);
    };

    const hideModalBlMod = () => {
        setVisibleBlMod(false);
    };

    const showModalObjMod = () => {
        setVisibleObjMod(true);
    };

    const hideModalObjMod = () => {
        setVisibleObjMod(false);
    };
    const data = [
        {
            title: 'Ant Design Title 1',
        },
        {
            title: 'Ant Design Title 2',
        },
        {
            title: 'Ant Design Title 3',
        },
        {
            title: 'Ant Design Title 4',
        },
    ];

    return <>
        <div className={styles.HeadRow}>
            <h4>Мои здания</h4> <a href={'#'} onClick={showModalObjMod}><PlusOutlined/></a>
        </div>
        <Collapse accordion

        >
            <Panel header="Список 1" key="1" extra={genExtra()}>
                <List
                    itemLayout="horizontal"
                    dataSource={data}
                    renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                                avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                                title={<a href="https://ant.design">{item.title}</a>}
                                description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                            />
                        </List.Item>
                    )}
                />
            </Panel>
            <Panel header="Список 2" key="2" extra={genExtra()}>
                <List
                    itemLayout="horizontal"
                    dataSource={data}
                    renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                                avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                                title={<a href="https://ant.design">{item.title}</a>}
                                description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                            />
                        </List.Item>
                    )}
                />
            </Panel>

        </Collapse>

        <br/>
        <div className={styles.HeadRow}>
            <h4>Мои блоки</h4> <a href={'#'} onClick={showModalBlMod}><PlusOutlined/></a>
        </div>

        <Collapse accordion>
            <Panel header="Мелкие блоки" key="1" extra={genExtra()}>
                <List
                    itemLayout="horizontal"
                    dataSource={data}
                    renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                                avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                                title={<a href="https://ant.design">{item.title}</a>}
                                description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                            />
                        </List.Item>
                    )}
                />
            </Panel>
            <Panel header="Большие блоки" key="2" extra={genExtra()}>
                <List
                    itemLayout="horizontal"
                    dataSource={data}
                    renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                                avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                                title={<a href="https://ant.design">{item.title}</a>}
                                description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                            />
                        </List.Item>
                    )}
                />
            </Panel>

        </Collapse>

        <Modal
            title="Создать список блоков"
            visible={visibleBlMod}
            onOk={hideModalBlMod}
            onCancel={hideModalBlMod}
            okText="Сохранить"
            cancelText="Отменить"
        >
            <Input placeholder={'введите название '} />
        </Modal>

        <Modal
            title="Создать список объектов"
            visible={visibleObjMod}
            onOk={hideModalObjMod}
            onCancel={hideModalObjMod}
            okText="Сохранить"
            cancelText="Отменить"
        >
            <Input placeholder={'введите название '} />
        </Modal>
    </>
}


export default UsersLists;