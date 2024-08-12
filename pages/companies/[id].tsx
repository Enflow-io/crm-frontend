import MainLayout from "../../components/Layout/Layout";
import Title from "../../components/Layout/Title";
import React, {useEffect, useRef, useState} from "react";
import {ICompany} from "../../interfaces/CompanyInterface";
import Api from "../../services/Api";
import {useRouter} from "next/router";
import {Col, Divider, Form, Input, Row, Select, Spin} from "antd";
import CompanyForm from "../../components/Companies/CompanyForm/CompanyForm";
import ChildrenTable from "../../components/Companies/ChildrenTable/ChildrenTable";
import CompanyComments from "../../components/Companies/CompanyComments/CompanyComments";
import CompanyDocs from "../../components/Companies/CompanyDocs/CompanyDocs";
import PersonsList from "../../components/Companies/PersonsList/PersonsList";
import BlocksAndBuildings from "../../components/Companies/BlocksAndBuildings/BlocksAndBuildings";

const CompanyPage = () => {
    // const [form] = Form.useForm();
    const router = useRouter();
    const companyId = router?.query?.id
    const [company, setCompany] = useState<ICompany | null>(null)

    useEffect(() => {
        if(!companyId){
            return;
        }
        Api.getCompanyById(+companyId ?? 0).then(data => {
            setCompany(data)
        })
    }, [companyId])

    return <MainLayout>
        <Title title={company?.name ?? ''}/>
        <Row gutter={16}>
            <Col span={12}>
                {company && <CompanyForm company={company} setCompany={setCompany} />}
                {!company && <Spin/>}
                <Divider>Контакты</Divider>
                {company && <PersonsList company={company} persons={company?.participants}/>}
                <Divider>Дочерние компании</Divider>
                {company && <ChildrenTable companyId={companyId ? +companyId : null}/>}
            </Col>
            <Col span={12}>
                <Divider>Комментарии</Divider>
                {companyId && <CompanyComments companyId={+companyId}/>}
                <Divider>Здания и блоки</Divider>
                {companyId && <BlocksAndBuildings companyId={+companyId}/>}
                <Divider>Документы</Divider>
                {companyId && <CompanyDocs companyId={+companyId}/>}
                {!company && <Spin/>}
            </Col>
        </Row>
    </MainLayout>
}

export default CompanyPage