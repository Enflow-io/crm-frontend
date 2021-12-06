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
import {useEffect, useState} from "react";
import Api from "../../services/Api";

const {Title} = Typography;

interface ObjectCardProps {
    objectId: number
}

const formItemLayout = {
    labelCol: {span: 3},
    wrapperCol: {span: 14},
};
const ObjectCard = (props: ObjectCardProps) => {
    const [isDataLoading, setIsDataLoading] = useState(false);
    const [buildingData, setBuildingData] = useState(null);
    const [fields, setFields] = useState<any[]>([]);
    useEffect(() => {
        const getBuildings = async () => {
            setIsDataLoading(true)
            const res = await Api.get(`/buildings/${props.objectId}`)
            if (res?.data) {
                setBuildingData(res.data)
                console.log(res.data)

                let fields = []
                for(let field of Object.entries(res.data)){
                    fields.push({
                        name: field[0],
                        value: field[1]
                    })
                }
                setFields(fields)
            }
            setIsDataLoading(false)
        }

        getBuildings();


    }, [props.objectId]);

    return <>
        <Title>Объект Тестовый</Title>

        <Form
            {...formItemLayout}
            name="register"
            fields={fields}

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
                name="name-eng"
                label="Название (eng)"
            >
                <Input/>
            </Form.Item>

            <Form.Item
                name="address"
                label="Адрес"
            >
                <Input/>
            </Form.Item>

            <Form.Item
                name="addressEng"
                label="Адрес (eng)"
            >
                <Input/>
            </Form.Item>

            <Form.Item
                name="latitude"
                label="Долгота"
            >
                <Input/>
            </Form.Item>

            <Form.Item
                name="longitude"
                label="Широта"
            >
                <Input/>
            </Form.Item>

            <Form.Item
                name="buildingYear"
                label="Год постройки"
            >
                <Input/>
            </Form.Item>


            <Form.Item
                name="buildingClass"
                label="Класс"
            >
                <Input/>
            </Form.Item>

            <Form.Item
                name="area"
                label="площадь"
            >
                <Input/>
            </Form.Item>

            <Form.Item
                name="fireSystem"
                label="Пожарная система"
            >
                <Input/>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Сохранить
                </Button>
            </Form.Item>
        </Form>
    </>
}

export default ObjectCard;