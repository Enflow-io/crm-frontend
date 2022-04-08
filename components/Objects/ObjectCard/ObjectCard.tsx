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
    const [fields, setFields] = useState<any[]>([]);
    const getBuildings = async () => {
        setIsDataLoading(true)
        const res = await Api.get(`/buildings/${props.objectId}`)
        if (res?.data) {
            setBuildingData(res.data)
            console.log(res.data)

            let fields = []
            for (let field of Object.entries(res.data)) {
                fields.push({
                    name: field[0],
                    value: field[1]
                })
            }
            setFields(fields)
        }
        setIsDataLoading(false)
    }
    useEffect(() => {


        getBuildings();


    }, [props.objectId]);



    return <>
        <Title>{buildingData ? buildingData.name : ''}</Title>

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
                <BldTabs buildingData={buildingData}/>
                }
            </Col>
        </Row>
    </>
}

export default ObjectCard;