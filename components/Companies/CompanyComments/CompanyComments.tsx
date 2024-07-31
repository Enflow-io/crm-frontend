import {useEffect, useState} from "react";
import {Button, Card, Descriptions, Form, Input, Row, Select} from "antd";
import {CompanyCommentTypesEnum, ICompanyComment} from "../../../interfaces/CompanyInterface";
import {FormInstance} from "antd/lib/form/hooks/useForm";
import Api from "../../../services/Api";
const { TextArea } = Input;
const { Option } = Select;
const CompanyComments = ({companyId}: {companyId: number}) => {
    const [comments, setComments] = useState<ICompanyComment[]>([]);
    const [form] = Form.useForm();
    useEffect(() => {
        if (companyId !== null) {
            Api.getCompanyComments(companyId).then(data => {
                console.log(data)
                setComments(data)
            });
        }
    }, [companyId])

    const submitComment = async () => {
        const values = await form.validateFields()
        const submitData = {
            companyId: companyId,
            text: values.comment,
            type: values.commentType
        }
        Api.createCompanyComment(submitData).then(data => {
            setComments([...comments, data])
            form.resetFields()
        })
    }
    //Переделать
    //const commentText = Form.useWatch('comment', form);
    //const commentType = Form.useWatch('commentType', form);

    const companyCommentsTypes: CompanyCommentTypesEnum[] = Object.values(CompanyCommentTypesEnum);

    return <>
        <div style={{maxHeight: 600, overflow: 'auto'}}>
        {
            comments.map(c => {
                return <Card key={'card' + c.id} style={{marginBottom: 10}}>
                    <Descriptions key={c.id} column={4}>
                        <Descriptions.Item label="Автор" span={2}>{c.author.name} {c.author.lastName}</Descriptions.Item>
                        <Descriptions.Item label="Тип">{c.type.charAt(0).toUpperCase() + c.type.slice(1) as CompanyCommentTypesEnum}</Descriptions.Item>
                        <Descriptions.Item label="Дата">{new Date(c.createdAt).toLocaleDateString('ru')}</Descriptions.Item>
                        <Descriptions.Item span={4}>{c.text}</Descriptions.Item>
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
            <Row style={{marginTop: 10, display: 'flex', justifyContent: 'space-between'}}>
                <Form.Item
                    name={'commentType'}
                    rules={[{required: true, message: 'Укажите тип комментария'}]}
                >
                    <Select style={{width: '240px'}} placeholder='Выберите тип'>
                        { companyCommentsTypes.map((c) => < Option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</Option>) }
                    </Select>
                </Form.Item>
                <Button
                    //disabled={!commentText || !commentType}
                    type={'primary'}
                    onClick={submitComment}
                >Сохранить комментарий</Button>
            </Row>
        </Form>
    </>
};
export default CompanyComments;