import {useState} from "react";
import {Button, Card, Descriptions, Form, Input, Row, Select} from "antd";
import {CompanyCommentTypesEnum} from "../../../interfaces/CompanyInterface";
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
    const [form] = Form.useForm();
    const commentText = Form.useWatch('comment', form);
    const commentType = Form.useWatch('commentType', form);
    const companyCommentsTypes: CompanyCommentTypesEnum[] = Object.values(CompanyCommentTypesEnum);

    return <>
        <div style={{maxHeight: 600, overflow: 'auto'}}>
        {
            comments.map(c => {
                return <Card key={'card' + c.id} style={{marginBottom: 10}}>
                    <Descriptions key={c.id} column={3}>
                        <Descriptions.Item label="Автор">{c.author.name} {c.author.lastName}</Descriptions.Item>
                        <Descriptions.Item label="Тип">{c.type.charAt(0).toUpperCase() + c.type.slice(1) as CompanyCommentTypesEnum}</Descriptions.Item>
                        <Descriptions.Item label="Дата">{c.date.toLocaleDateString('ru')}</Descriptions.Item>
                        <Descriptions.Item span={3}>{c.text}</Descriptions.Item>
                    </Descriptions>
                </Card>
            })
        }
        </div>
        <Form name={'newComment'} layout={'vertical'} form={form}>
            <Form.Item name={'comment'} >
                <TextArea rows={4} placeholder={'Текст комментария'} />
            </Form.Item>
            <Row style={{marginTop: 10, display: 'flex', justifyContent: 'space-between'}}>
                <Form.Item name={'commentType'} >
                    <Select style={{width: '240px'}} placeholder='Выберите тип'>
                        { companyCommentsTypes.map((c) => < Option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</Option>) }
                    </Select>
                </Form.Item>
                <Button disabled={!commentText || !commentType} type={'primary'}>Сохранить комментарий</Button>
            </Row>
        </Form>
    </>
};
export default CompanyComments;