import {Typography} from 'antd';
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
import {PlusOutlined, DeleteOutlined, ExclamationCircleOutlined} from '@ant-design/icons';

import React, {useEffect, useState} from "react";
import Api from "../../../services/Api";
import BldTabs from "./BldTabs";
import {BuildingInterface} from "../../../interfaces/BuildingInterface";
import ObjectForm from "../ObjectForm/ObjectForm";
import styles from "../../tables/SubMenu/SubMenu.module.scss";
import {submitBuildingForm} from "../../../effects/object";

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



    const getBrief = ()=>{
        // const url = 'http://localhost:3000';
        const url = 'https://rnb-crm.app';
        open(`${url}/brief?buildingId=`+buildingData?.id)
    }
    return <>
        <Title id={'object-page-title'}>{buildingData ? buildingData.name : ''}</Title>

        <button onClick={getBrief}> Скачать бриф</button>

        <Row>
            <Col span={16}>
                {buildingData &&
                <>
                    <ObjectForm
                        buildingData={buildingData}
                        onUpdate={async ()=>{
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