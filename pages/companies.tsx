import MainLayout from "../components/Layout/Layout";
import React, {useEffect, useState} from "react";
import Api from "../services/Api";
import Title from "../components/Layout/Title";
import {Button, Modal, Spin, Table} from "antd";
import {ICompany} from "../interfaces/CompanyInterface";
import {useRouter} from "next/router";
import {PlusOutlined} from "@ant-design/icons";
import CompanyForm from "../components/Companies/CompanyForm/CompanyForm";

const CompaniesPage = () => {
    const [companies, setCompanies] = useState<ICompany[]>([])
    const [isDataLoading, setIsDataLoading] = useState(true)
    const [isOpenCreateModal, setIsOpenCreateModal] = useState(false)
    const router = useRouter();
    const pushToCompany = (id: number) => {
        router.push(`/companies/${id}`)
    }
    useEffect(() => {
        Api.getCompaniesList().then(data => {
            setCompanies(data)
            setIsDataLoading(false)
        })
    }, [isDataLoading])

    const showCreateModal = () => {
        setIsOpenCreateModal(true)
    }
    const columns = [
        {
            dataIndex: 'companyId',
            title: 'ID',
            sorter: (a: ICompany, b: ICompany) => a.id - b.id,
        },
        {
            dataIndex: 'name',
            title: 'Название',
            sorter: (a: ICompany, b: ICompany) => a.name.localeCompare(b.name),
        },
        {
            dataIndex: 'type',
            title: 'Тип',
            sorter: (a: ICompany, b: ICompany) => a.type.localeCompare(b.type),
        },
        {
            dataIndex: 'isClient',
            title: 'Клиент',
            sorter: (a: ICompany, b: ICompany) => (a.isClient ? 1 : 0) - (b.isClient ? 1 : 0),
            render: (val: any) => {
                return <>{val ? "✅" : "🚫"}</>
            },
        },
        {
            dataIndex: 'responsible',
            title: 'Ответственный',
            sorter: (a: ICompany, b: ICompany) => {
                const aName = a.responsible?.name + ' ' + a.responsible?.lastName;
                const bName = b.responsible?.name + ' ' + b.responsible?.lastName;
                return aName.localeCompare(bName);
            },
            render: (val: any) => {
                return <>{val?.name} {val?.lastName}</>
            },
        }
    ]
    return <MainLayout>
        <Title title="Компании"/>
        <Button icon={<PlusOutlined/>} onClick={showCreateModal}>Добавить компанию</Button>
        <Table
            dataSource={companies}
            columns={columns}
            loading={{indicator: <div><Spin /></div>, spinning: isDataLoading}}
            rowKey={'id'}
            onRow={(record) => {
                return {
                    onClick: event => {
                        pushToCompany(record.id)
                    },
                };
            }}
        />
        <Modal
            open={isOpenCreateModal}
            onCancel={() => setIsOpenCreateModal(false)}
            okButtonProps={{disabled: true, style: {display: 'none'}}}
            //onOk={() => setIsOpenCreateModal(false)}
        >
            <CompanyForm company={{} as ICompany} setCompany={{}} setIsOpenCreateModal={setIsOpenCreateModal} setIsDataLoading = {setIsDataLoading} isCreate></CompanyForm>
        </Modal>
    </MainLayout>
}
export default CompaniesPage