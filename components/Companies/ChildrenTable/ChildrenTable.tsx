import {ICompany} from "../../../interfaces/CompanyInterface";
import React, {useEffect, useState} from "react";
import Api from "../../../services/Api";
import {Spin, Table} from "antd";
import Link from "next/link";

type Props = {
    companyId: number | null
}
const ChildrenTable = ({companyId}: Props) => {
    const [children, setChildren] = useState<ICompany[]>([])
    const [isDataLoading, setIsDataLoading] = useState(true)
    console.log('children',children)
    useEffect(() => {
        if(!companyId){
            return;
        }
        Api.getCompanyChildren(companyId).then(data => {
            setChildren(data)
            setIsDataLoading(false)
        })
    }, [companyId])
    const columns = [

        {
            dataIndex: 'name',
            title: 'Название',
            sorter: (a: ICompany, b: ICompany) => a.name.localeCompare(b.name),
            render: (val: string, record: ICompany) => {
                return <Link href={`/companies/${+record.id}`}>{val}</Link>
            }
        },
        {
            dataIndex: 'address',
            title: 'Адрес',
            sorter: (a: ICompany, b: ICompany) => {
                const aAddress = a?.address ?? '';
                const bAddress = b?.address ?? '';
                return aAddress.localeCompare(bAddress);
            },
        }
    ]
    return <div>

        <Table
            dataSource={children}
            columns={columns}
            loading={{indicator: <div><Spin /></div>, spinning: isDataLoading}}
            rowKey={'id'}
            pagination={false}
        />
    </div>
}
export default ChildrenTable;