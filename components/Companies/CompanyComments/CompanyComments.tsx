import {useState} from "react";
import {Button, Card, Col, Descriptions, DescriptionsProps, Input, Row, Select} from "antd";
const { TextArea } = Input;
const { Option } = Select;
const CompanyComments = ({companyId}: {companyId: number}) => {
    const testComments = [
        {
            id: 1,
            text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur, assumenda, dicta dolorum',
            authorId: 17,
            author: {
                id: 17,
                name: 'Вася',
                lastName: 'Пупкин',
                email: 'K4Zt7@example.com'
            },
            date: new Date(),
            type: 'comment'
        },
        {
            id: 2,
            text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur, assumenda, dicta dolorum',
            authorId: 18,
            author: {
                id: 18,
                name: 'Петя',
                lastName: 'Пупкин',
                email: 'K4Zt7@example.com'
            },
            date: new Date(),
            type: 'email'
        },
        {
            id: 3,
            text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur, assumenda, dicta dolorum',
            authorId: 17,
            author: {
                id: 17,
                name: 'Вася',
                lastName: 'Пупкин',
                email: 'K4Zt7@example.com'
            },
            date: new Date(),
            type: 'call'
        },
        {
            id: 4,
            text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur, assumenda, dicta dolorum',
            authorId: 18,
            author: {
                id: 18,
                name: 'Петя',
                lastName: 'Пупкин',
                email: 'K4Zt7@example.com'
            },
            date: new Date(),
            type: 'messenger'
        },
        {
            id: 5,
            text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur, assumenda, dicta dolorum',
            authorId: 17,
            author: {
                id: 17,
                name: 'Вася',
                lastName: 'Пупкин',
                email: 'K4Zt7@example.com'
            },
            date: new Date(),
            type: 'call'
        },
        {
            id: 6,
            text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur, assumenda, dicta dolorum',
            authorId: 18,
            author: {
                id: 18,
                name: 'Петя',
                lastName: 'Пупкин',
                email: 'K4Zt7@example.com'
            },
            date: new Date(),
            type: 'email'
        },
    ]

    const [comments, setComments] = useState(testComments);

    return <>
        <div style={{maxHeight: 600, overflow: 'auto'}}>
        {
            comments.map(c => {
                return <Card key={'card' + c.id} style={{marginBottom: 10}}>
                    <Descriptions key={c.id} column={3}>
                        <Descriptions.Item label="Автор">{c.author.name} {c.author.lastName}</Descriptions.Item>
                        <Descriptions.Item label="Тип">{c.type}</Descriptions.Item>
                        <Descriptions.Item label="Дата">{c.date.toLocaleDateString()}</Descriptions.Item>
                        <Descriptions.Item span={3}>{c.text}</Descriptions.Item>
                    </Descriptions>
                </Card>
            })
        }
        </div>
        <TextArea size={'middle'} name={'comment'} rows={4}/>
        <Row style={{marginTop: 10, display: 'flex', justifyContent: 'space-between'}}>
            {/*<Col span={12}>*/}
                <Select style={{width: '240px'}} placeholder='Выберите тип'>
                    <Option value={'call'}>Звонок</Option>
                    <Option value={'email'}>Email</Option>
                    <Option value={'messenger'}>Мессенджер</Option>
                </Select>
            {/*</Col>*/}
            {/*<Col span={12}>*/}
                <Button type={'primary'}>Сохранить комментарий</Button>
            {/*</Col>*/}
        </Row>
    </>
};
export default CompanyComments;