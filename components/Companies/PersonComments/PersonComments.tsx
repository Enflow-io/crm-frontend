import {useEffect, useState} from "react";
import {CompanyCommentTypesEnum, IPersonComment} from "../../../interfaces/CompanyInterface";
import Api from "../../../services/Api";
import {Button, Card, Descriptions, Form, Input, notification, Row} from "antd";
const { TextArea } = Input;
type PersonCommentsProps = {
    id: number
}
const PersonComments = ({id}: PersonCommentsProps) => {
    const [comments, setComments] = useState<IPersonComment[]>([])
    const [form] = Form.useForm();
    const submitComment = async () => {
        const values = await form.validateFields()
        const submitData = {
            participantId: id,
            text: values.comment
        }
        Api.createPersonComment(submitData).then(data => {
            setComments([...comments, data])
            form.resetFields()
            notification.success({message: 'Комментарий добавлен'})
        })
    }
    useEffect(() => {
        if (id !== null) {
            Api.getPersonComments(id).then(data => {
                setComments(data)
            });
        }
    }, [id])
    return <>
        <div style={{maxHeight: 600, overflow: 'auto'}}>
            {
                comments.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()).map(c => {
                    return <Card key={'card' + c.id} style={{marginBottom: 10}}>
                        <Descriptions key={c.id} column={3}>
                            <Descriptions.Item label="Автор" span={2}>{c.author.name} {c.author.lastName}</Descriptions.Item>
                            <Descriptions.Item label="Дата">{new Date(c.createdAt).toLocaleDateString('ru')}</Descriptions.Item>
                            <Descriptions.Item span={3}>{c.text}</Descriptions.Item>
                        </Descriptions>
                    </Card>
                })
            }
        </div>
        <Form name={'newComment'} layout={'vertical'} form={form}>
            <Form.Item
                name={'comment'}
                rules={[{required: true, message: 'Укажите текст комментария'}]}
            >
                <TextArea rows={4} placeholder={'Текст комментария'} />
            </Form.Item>
            <Row style={{marginTop: 10, display: 'flex', justifyContent: 'center'}}>
                <Button
                    //disabled={!commentText || !commentType}
                    type={'primary'}
                    onClick={submitComment}
                >Сохранить комментарий</Button>
            </Row>
        </Form>
    </>
}
export default PersonComments