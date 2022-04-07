import {Button, Divider, Form, Input, Select, Tooltip} from "antd";
import { InfoCircleOutlined, UserOutlined } from '@ant-design/icons';

import BlockImages from "./BlockImages";
import {useEffect, useState} from "react";
import Api from "../../services/Api";
const { Option } = Select;
const BlockCard = (props: {modelId: number}) =>{


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
        <Form
            {...formItemLayout}
            name="register"
            fields={[]}
            scrollToFirstError


        >
            <Form.Item
                name="localId"
                label="Local ID"

            >
                <Input disabled={true}/>
            </Form.Item>
            <Form.Item
                name="name"
                label="Название"
            >
                <Input/>
            </Form.Item>

            <Form.Item
                name="isOnRent"
                label="На рынке"
            >
                <Select defaultValue="yes" style={{ width: 120 }} >
                    <Option value="yes">Да</Option>
                    <Option value="no">Нет</Option>
                </Select>
            </Form.Item>

            <Form.Item
                name="floor"
                label="Этаж"
            >
                <Input type={"number"}/>
            </Form.Item>

            <Form.Item
                name="area"
                label="Площадь"
            >
                <Input type={"number"}/>
            </Form.Item>

            <Form.Item
                name="name-eng"
                label="Название (eng)"
            >
                <Input/>
            </Form.Item>



            <Form.Item
                name="blockType"
                label="Тип блока"
            >
                <Input/>
            </Form.Item>

            <Form.Item
                name="agreementType"
                label="Тип договора"
            >
                <Select defaultValue="yes" style={{ width: 120 }} >
                    <Option value="yes">Да</Option>
                    <Option value="no">Нет</Option>
                </Select>
            </Form.Item>

            <Form.Item
                name="cianId"
                label="ID в ЦИАН"
            >
                <Input/>
            </Form.Item>



            <Form.Item
                name="bti"
                label="БТИ"
            >
                <Input type={"number"}/>
            </Form.Item>
            <Form.Item
                name="bonusPercent"
                label="Бонусный %"
            >
                <Input type={"number"}/>
            </Form.Item>

            <Form.Item
                name="finishing"
                label="Отделка"
            >
                <Input type={"number"}/>
            </Form.Item>


            <Form.Item
                name="planType"
                label="Тип планировки"
            >
                <Input type={"number"}/>
            </Form.Item>


            <Divider dashed />

            <Form.Item
                name="price"
                label="Ставка аренды"
            >
                <Input style={{ width: 150 }}
                    placeholder="1200"
                    prefix={<span>$</span>}
                    suffix={
                        <Tooltip title="$1 = ₽100">
                            <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                        </Tooltip>
                    }
                />
                 <Input style={{ width: 150, marginLeft: '1em' }}
                    placeholder="120000"
                    prefix={<span>₽</span>}
                    suffix={
                        <Tooltip title="$1 = ₽100">
                            <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                        </Tooltip>
                    }
                />

            </Form.Item>

            <Form.Item
                name="price"
                label="Стоимость при продаже"
            >
                <Input style={{ width: 150 }}
                    placeholder="1200"
                    prefix={<span>$</span>}
                    suffix={
                        <Tooltip title="$1 = ₽100">
                            <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                        </Tooltip>
                    }
                />
                 <Input style={{ width: 150, marginLeft: '1em' }}
                    placeholder="120000"
                    prefix={<span>₽</span>}
                    suffix={
                        <Tooltip title="$1 = ₽100">
                            <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                        </Tooltip>
                    }
                />

            </Form.Item>

            <Form.Item
                name="taxIncluded"
                label="Налог включен?"
            >
                <Select defaultValue="yes" style={{ width: 150 }} >
                    <Option value="yes">Да</Option>
                    <Option value="no">Нет</Option>
                </Select>
            </Form.Item>

        </Form>
        <Divider dashed />
        <h4>Фото блока</h4>
        <BlockImages modelData={modelData} />
    </div>
}

export default BlockCard