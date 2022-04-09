import {Button, Divider, Form, Input, Select, Tooltip} from "antd";
import {InfoCircleOutlined, UserOutlined} from '@ant-design/icons';

import BlockImages from "./BlockImages";
import {useEffect, useState} from "react";
import Api from "../../../services/Api";
import BlockForm from "../BlockForm/BlockForm";

const {Option} = Select;
const BlockCard = (props: { modelId: number }) => {


    const [isDataLoading, setIsDataLoading] = useState(false);
    const [modelData, setModelData] = useState(null);
    const [fields, setFields] = useState<any[]>([]);
    const [modelId, setModelId] = useState(props.modelId);
    useEffect(() => {
        const getModel = async () => {
            setIsDataLoading(true)
            const res = await Api.getBlock(props.modelId);
            if (res?.data) {
                setModelData(res.data)
                console.log("!!!!", res.data)

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

        getModel();


    }, [props, modelId]);

    const formItemLayout = {
        labelCol: {span: 4},
        wrapperCol: {span: 12},
    };
    return <div>
        {modelData &&
        <BlockForm modelData={modelData}/>
        }
        <Divider dashed/>
        <h4>Фото блока</h4>
        <BlockImages modelData={modelData}/>
    </div>
}

export default BlockCard