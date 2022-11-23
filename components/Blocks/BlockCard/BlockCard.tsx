import { Button, Divider, Form, Input, Modal, notification, Select, Tooltip } from "antd";
import { InfoCircleOutlined, UserOutlined } from '@ant-design/icons';
import { PlusOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { useRouter } from "next/router";

import BlockImages from "./BlockImages";
import React, { useEffect, useState } from "react";
import Api from "../../../services/Api";
import BlockForm from "../BlockForm/BlockForm";
import { submitBuildingForm } from "../../../effects/object";
import { SubmitBlockForm } from "../../../effects/block.effects";
import BuildingListsSelector from "../../RightMenu/BuildingListsSelector";
import BlockListsSelector from "../../RightMenu/BlocksListsSelector";
const { confirm } = Modal;

const { Option } = Select;
const BlockCard = (props: { modelId: number, showSaveBtn: boolean }) => {

    const router = useRouter();
    const [isDataLoading, setIsDataLoading] = useState(false);
    const [modelData, setModelData] = useState(null);
    const [modelId, setModelId] = useState(props.modelId);
    const getModel = async () => {
        setIsDataLoading(true)
        const res = await Api.getBlock(props.modelId);
        if (res?.data) {
            setModelData(res.data)

        }
        setIsDataLoading(false)
    }

    useEffect(() => {


        getModel();


    }, [props, modelId]);


    return <div>
        {modelData &&
            <>



                <BlockForm onUpdate={async newData => {
                    await getModel()
                }
                } modelData={modelData} />

                {props.showSaveBtn !== false &&
                    <>


                        <Button type={'primary'}
                            style={{
                                float: "left"
                            }}
                            className={'block-save-btn'}
                            onClick={async () => {
                                await SubmitBlockForm()
                            }} icon={<PlusOutlined />}>
                            Сохранить данные
                        </Button>
                        <Button style={{
                            float: "left",
                            marginRight: '1em',
                            marginLeft: '1em',
                        }}
                            onClick={async () => {
                                if (modelData) {
                                    // @ts-ignore
                                    await router.push(`/objects/${modelData.buildingId}`)
                                }
                            }
                            }
                        >Открыть объект</Button>

                        <Button
                            danger
                            style={{
                                float: "right",
                                marginRight: '1em'
                            }}
                            onClick={async () => {

                                confirm({
                                    icon: <ExclamationCircleOutlined />,
                                    content: <p>Вы дейсвительно хотите удалить этот блок?</p>,
                                    async onOk() {
                                        // @ts-ignore
                                        const blockId = modelData.id;
                                        // @ts-ignore
                                        await Api.deleteBlock(modelData.id)

                                        notification.success({
                                            message: `Блок ${blockId} удален`,
                                            placement: 'bottomRight'
                                        });
                                        // @ts-ignore
                                        await router.push(`/objects/${modelData.buildingId}`)
                                    }
                                });

                            }
                            }
                        >Удалить блок</Button>

                        <br />
                    </>}
            </>


        }
        <Divider dashed />
        <h4>Фото блока</h4>
        <BlockImages modelData={modelData} />
        <br />
        <br />
        <h4>Планировки</h4>
        <BlockImages isPlans={true} modelData={modelData} />
    </div>
}

export default BlockCard