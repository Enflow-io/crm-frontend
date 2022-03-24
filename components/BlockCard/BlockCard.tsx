import {Button, Divider, Form, Input} from "antd";
import BlockImages from "./BlockImages";

const BlockCard = () =>{
    const formItemLayout = {
        labelCol: {span: 4},
        // wrapperCol: {span: 12},
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

        </Form>
        <Divider dashed />
        <h4>Фото блока</h4>
        <BlockImages />
    </div>
}

export default BlockCard