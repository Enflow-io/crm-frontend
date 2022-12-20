import { Modal, notification, Tooltip, Typography } from 'antd';
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
const { confirm } = Modal;


import { PlusOutlined, DeleteOutlined, ExclamationCircleOutlined, DownloadOutlined, FilePptOutlined, CopyOutlined } from '@ant-design/icons';

import React, { useEffect, useState } from "react";
import Api from "../../../services/Api";
import BldTabs from "./BldTabs";
import { BuildingInterface } from "../../../interfaces/BuildingInterface";
import ObjectForm from "../ObjectForm/ObjectForm";
// import styles from "../../tables/SubMenu/SubMenu.module.scss";
import styles from "./building.module.scss";
import { $copyObject, OpenCreateObjectModal, submitBuildingForm } from "../../../effects/object";
import BuildingListsSelector from "../../RightMenu/BuildingListsSelector";
import { router } from "next/client";
import { useRouter } from "next/router";

const { Title } = Typography;

interface ObjectCardProps {
    objectId: number
}

const formItemLayout = {
    labelCol: { span: 4 },
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
            if (res.data?.pics && res.data?.pics[0]) {
                setPic(res.data?.pics[0].url)
            }
            console.log("new blds", res.data)

        }
        setIsDataLoading(false)
    }
    useEffect(() => {
        getBuildings();
    }, [props.objectId]);

    // let pic: any = null;
    const [pic, setPic] = useState('');


    /* Sticky bar */
    const [isSticky, setIsSticky] = useState(false);
    useEffect(() => {
        const container = document.querySelector(".ant-layout-content ")

        container && container.addEventListener('scroll', onScroll);
        return () => {
            container && container.removeEventListener('scroll', onScroll);
        };
    });

    const onScroll = (event: any) => {
        const limit = pic ? 360 : 60;
        if (event.target.scrollTop > limit) {
            setIsSticky(true)
        } else {
            setIsSticky(false)

        }
    }
    /* /Sticky bar */

    const router = useRouter();

    const getBrief = () => {
        open(`${Api.apiUrl}/exports/one-brief/` + buildingData?.id)
    }
    const getPP = () => {
        open(`${Api.apiUrl}/exports/pptx/` + buildingData?.id)
    }

    const copyObject = async () => {

        await router.push('/objects');
        $copyObject(buildingData);
        OpenCreateObjectModal()

    }



    return <>
        <div className={styles.HeaderRow}>
            <Title id={'object-page-title'}>{buildingData ? buildingData.name : ''}</Title>

            <div className={styles.HeaderRowMenu}>
                {/* <Tooltip placement="topLeft" title="Создать копию">
                    <a href={'#'} onClick={copyObject}><CopyOutlined style={{ fontSize: '170%' }} /></a>
                </Tooltip> */}

                <Tooltip placement="topLeft" title="Скачать бриф (pdf)">
                    <a href={'#'} onClick={getBrief}><DownloadOutlined style={{ fontSize: '170%' }} /></a>
                </Tooltip>

                <Tooltip placement="topLeft" title="Скачать бриф (PowerPoint)">
                    <a href={'#'} onClick={getPP}><FilePptOutlined style={{ fontSize: '170%' }} /></a>
                </Tooltip>

                <Tooltip placement="topLeft" title="Сохранить в список">
                    <a href={'#'} onClick={async () => {
                        Modal.info({
                            title: 'Выберите списки для сохранения',
                            content: <BuildingListsSelector buildingId={buildingData?.id || 0} />,
                            maskClosable: true
                        })
                    }}><PlusOutlined style={{ fontSize: '170%' }} /></a>
                </Tooltip>

            </div>
        </div>


        <Row>
            <Col span={12}>
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
                            }} icon={<PlusOutlined />}>
                            Сохранить данные
                        </Button>
                        
                        

                        <Button
                            danger
                            className={'obj-save-btn'}
                            style={{
                                float: "left"
                            }}
                            onClick={
                                async () => {

                                    confirm({
                                        icon: <ExclamationCircleOutlined />,
                                        content: <p>Вы дейсвительно хотите удалить этот объект?</p>,
                                        async onOk() {

                                            const modelId = buildingData.id;

                                            await Api.deleteObject(modelId)

                                            notification.success({
                                                message: `Объект ${modelId} удален`,
                                                placement: 'bottomRight'
                                            });

                                            await router.push(`/objects`)
                                        }
                                    });

                                }
                            } icon={<PlusOutlined />}>
                            Удалить объект
                        </Button>

                        <Button type={'default'}
                            className={'obj-save-btn'}
                            style={{
                                float: "left",
                                marginLeft: 20
                            }}
                            onClick={copyObject} icon={<CopyOutlined />}>
                            Создать копию
                        </Button>
                    </>
                }
            </Col>
            <Col span={12}>
                <div className={isSticky ? styles.StickyCont : undefined}>
                    {pic &&
                        <div className={styles.PicCont}><img src={pic} /></div>
                    }

                    {buildingData &&
                        <BldTabs
                            mainImageUpdated={(img) => {
                                setPic(img)
                            }}
                            refresh={getBuildings}
                            buildingData={buildingData} />
                    }
                </div>
            </Col>
        </Row>
    </>
}
export default ObjectCard;