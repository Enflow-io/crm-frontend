import {Button, Divider, Form, Input, Select, Tooltip} from "antd";
import {InfoCircleOutlined, UserOutlined} from '@ant-design/icons';
import {PlusOutlined, DeleteOutlined, ExclamationCircleOutlined} from '@ant-design/icons';
import {useRouter} from "next/router";

import BlockImages from "./BlockImages";
import React, {useEffect, useState} from "react";
import Api from "../../../services/Api";
import BlockForm from "../BlockForm/BlockForm";
import {submitBuildingForm} from "../../../effects/object";
import {SubmitBlockForm} from "../../../effects/block.effects";

const {Option} = Select;
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

            <BlockForm onUpdate={async newData=>{
                await getModel()
            }
            } modelData={modelData}/>

            {props.showSaveBtn !== false &&
            <>
                <Button type={'primary'}
                        style={{
                            float: "right"
                        }}
                        onClick={async () => {
                            await SubmitBlockForm()
                        }} icon={<PlusOutlined/>}>
                    Сохранить данные
                </Button>
                <Button style={{
                    float: "right",
                    marginRight: '1em'
                }}
                        onClick={async () => {
                            if (modelData) {
                                // @ts-ignore
                                await router.push(`/objects/${modelData.buildingId}`)
                            }
                        }
                        }
                >Открыть объект</Button>
            </>}
        </>


        }
        <Divider dashed/>
        <h4>Фото блока</h4>
        <BlockImages modelData={modelData}/>
    </div>
}

export default BlockCard