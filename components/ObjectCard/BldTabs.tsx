import {List, Tabs} from 'antd';
import Styles from "./building.module.scss"
import { Button, Radio } from 'antd';
import BldImages from "./BldImages";
import BldDocs from "./BldDocs";
const {TabPane} = Tabs;

let data: string[] = []

for(let i = 0; i < 140; i++) {
    data.push(`${1 + i} м2 - аренда`)
}

const BldTabs = () => (
    <div className={Styles.BldTabs}>
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
                        <List.Item>
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
    </div>
);

export default BldTabs