import {Modal, Tooltip, Typography} from 'antd';
import {
    Form,
    Input,
    InputNumber,
    Cascader,
    Select,
    Row,
    Col,
    Checkbox,
    Button,
    AutoComplete,
} from 'antd';



import {PlusOutlined, DeleteOutlined, ExclamationCircleOutlined, DownloadOutlined} from '@ant-design/icons';

import React, {useEffect, useState} from "react";
import Api from "../../../services/Api";
import BldTabs from "./BldTabs";
import {BuildingInterface} from "../../../interfaces/BuildingInterface";
import ObjectForm from "../ObjectForm/ObjectForm";
// import styles from "../../tables/SubMenu/SubMenu.module.scss";
import styles from "./building.module.scss";
import {submitBuildingForm} from "../../../effects/object";
import BuildingListsSelector from "../../RightMenu/BuildingListsSelector";

const {Title} = Typography;

interface ObjectCardProps {
    objectId: number
}

const formItemLayout = {
    labelCol: {span: 4},
    // wrapperCol: {span: 12},
};
const ObjectCard = (props: ObjectCardProps) => {
    const [isDataLoading, setIsDataLoading] = useState(false);
    const [buildingData, setBuildingData] = useState<BuildingInterface | null>(null);
    const getBuildings = async () => {
        setIsDataLoading(true)
        const res = await Api.get(`/objects/${props.objectId}`)
        if (res?.data) {
            setBuildingData(res.data)
            console.log("new blds", res.data)

        }
        setIsDataLoading(false)
    }
    useEffect(() => {


        getBuildings();


    }, [props.objectId]);


    const getBrief = () => {
        // const url = 'http://localhost:3000';
        // const url = 'https://rnb-crm.app';
        open(`${Api.apiUrl}/exports/one-brief/` + buildingData?.id)
    }
    return <>
        <div className={styles.HeaderRow}>
            <Title id={'object-page-title'}>{buildingData ? buildingData.name : ''}</Title>

            <div className={styles.HeaderRowMenu}>
                <Tooltip placement="topLeft" title="Скачать бриф (pdf)">
                    <a href={'#'} onClick={getBrief}><DownloadOutlined style={{ fontSize: '170%'}} /></a>
                </Tooltip>

                <Tooltip placement="topLeft" title="Сохранить в список">
                    <a href={'#'} onClick={async () => {
                        Modal.info({
                            title: 'Выберите списки для сохранения',
                            content: <BuildingListsSelector buildingId={buildingData?.id || 0}/>,
                            maskClosable: true
                        })
                    }}><PlusOutlined style={{ fontSize: '170%'}} /></a>
                </Tooltip>

            </div>
        </div>


        <Row>
            <Col span={16}>
                {buildingData &&
                <>
                    <ObjectForm
                        buildingData={buildingData}
                        onUpdate={async () => {
                            await getBuildings();
                        }
                        }
                    />
                    <Button type={'primary'}
                            style={{
                                float: "right"
                            }}
                            onClick={async () => {
                                await submitBuildingForm()
                            }} icon={<PlusOutlined/>}>
                        Сохранить данные
                    </Button>
                </>
                }
            </Col>
            <Col span={8}>
                {buildingData &&
                <BldTabs
                    refresh={getBuildings}
                    buildingData={buildingData}/>
                }
            </Col>
        </Row>
    </>
}

export default ObjectCard;