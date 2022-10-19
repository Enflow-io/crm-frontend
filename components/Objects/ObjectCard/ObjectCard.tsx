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



import {PlusOutlined, DeleteOutlined, ExclamationCircleOutlined, DownloadOutlined, FilePptOutlined, CopyOutlined} from '@ant-design/icons';

import React, {useEffect, useState} from "react";
import Api from "../../../services/Api";
import BldTabs from "./BldTabs";
import {BuildingInterface} from "../../../interfaces/BuildingInterface";
import ObjectForm from "../ObjectForm/ObjectForm";
// import styles from "../../tables/SubMenu/SubMenu.module.scss";
import styles from "./building.module.scss";
import {$copyObject, OpenCreateObjectModal, submitBuildingForm} from "../../../effects/object";
import BuildingListsSelector from "../../RightMenu/BuildingListsSelector";
import {router} from "next/client";
import {useRouter} from "next/router";

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


    const router = useRouter();

    const getBrief = () => {
        // const url = 'http://localhost:3000';
        // const url = 'https://rnb-crm.app';
        open(`${Api.apiUrl}/exports/one-brief/` + buildingData?.id)
    }
   const getPP = () => {
        // const url = 'http://localhost:3000';
        // const url = 'https://rnb-crm.app';
        open(`${Api.apiUrl}/exports/pptx/` + buildingData?.id)
    }

    const copyObject = async () => {

        await router.push('/objects');
        $copyObject(buildingData);
        OpenCreateObjectModal()

    }

    let pic = null;
    if(buildingData?.pics && buildingData?.pics[0]){
        pic = buildingData?.pics[0].url;
    }

    return <>
        <div className={styles.HeaderRow}>
            <Title id={'object-page-title'}>{buildingData ? buildingData.name : ''}</Title>

            <div className={styles.HeaderRowMenu}>
                <Tooltip placement="topLeft" title="Создать копию">
                    <a href={'#'} onClick={copyObject}><CopyOutlined  style={{ fontSize: '170%'}} /></a>
                </Tooltip>

                <Tooltip placement="topLeft" title="Скачать бриф (pdf)">
                    <a href={'#'} onClick={getBrief}><DownloadOutlined style={{ fontSize: '170%'}} /></a>
                </Tooltip>

                <Tooltip placement="topLeft" title="Скачать бриф (PowerPoint)">
                    <a href={'#'} onClick={getPP}><FilePptOutlined style={{ fontSize: '170%'}} /></a>
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
                            className={'obj-save-btn'}
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
                {pic &&
                    <div className={styles.PicCont}><img src={pic} /></div>
                }

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