import MainLayout from "../../components/Layout/Layout";
import {useRouter} from "next/router";
import {ICompany, IPerson} from "../../interfaces/CompanyInterface";
import {useEffect, useState} from "react";
import Api from "../../services/Api";
import PersonForm from "../../components/Companies/PersonForm/PersonForm";
import {Col, Divider, Row, Spin} from "antd";
import PersonComments from "../../components/Companies/PersonComments/PersonComments";

const ContactPage = () => {
    const router = useRouter();
    const contactId = router?.query?.id
    const [contact, setContact] = useState<IPerson | null>(null)
    const [company, setCompany] = useState<ICompany | null>(null)
    useEffect(() => {
        if (contactId) {
            Api.getPerson(+contactId).then(data => {
                setContact(data)
            })
        }
    }, [contactId])
    useEffect(() => {
        if (contact) {
            Api.getCompanyById(contact.companyId).then(data => {
                setCompany(data)
            })
        }
    }, [contact])
    return <MainLayout>
        <Row gutter={16}>
            <Col span={12}>
                {contact && company && <PersonForm company={company} personData={contact} />}
                {!contact && !company && <Spin/>}
            </Col>
            <Col span={12}>
                <Divider>Комментарии</Divider>
                {contactId && <PersonComments id={+contactId} /> }
                {!contactId && <Spin/>}
            </Col>
        </Row>

    </MainLayout>
}

export default ContactPage