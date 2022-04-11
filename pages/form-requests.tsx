import React, {useEffect, useState} from "react";
import MainLayout from "../components/Layout/Layout";
import {Typography} from 'antd';
import ObjectsList from "../components/Objects/ObjectsList/ObjectsList";
import Api from "../services/Api";
import FormRequestList from "../components/formRequests/FormRequestsList/FormRequestList";
import {useRouter} from "next/router";

const {Title} = Typography;

const FormRequestsPage = () => {
    const router = useRouter();

    const MODEL_PATH = 'form-request'

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            sorter: (a: any, b: any) => a.name.length - b.name.length,

        },
        {
            title: 'Источник',
            dataIndex: 'source',
            sorter: (a: any, b: any) => a.name.length - b.name.length,

        },
        {
            title: 'Телефон',
            dataIndex: 'phone',
            sorter: (a: any, b: any) => a.name.length - b.name.length,

        },
        {
            title: 'Email',
            dataIndex: 'email',
            sorter: (a: any, b: any) => a.name.length - b.name.length,

        },

        {
            title: 'Тема',
            dataIndex: 'subject',
            sorter: (a: any, b: any) => a.name.length - b.name.length,

        },
    ];
    const [buildingsList, setBuildingsList] = useState<any[] | null>(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalItems, setTotalItems] = useState(100);
    const [isDataLoading, setIsDataLoading] = useState(false);


    useEffect(() => {
        const getBuildings = async () => {
            setIsDataLoading(true)

            // if(buildingsList === null){
            const res = await Api.get(`/${MODEL_PATH}?limit=${pageSize}&page=${pageNumber}`)
            if (res?.data) {
                setBuildingsList(res.data.data)
                setTotalItems(res.data.total)


            }
            setIsDataLoading(false)

            // }
        }

        getBuildings();


    }, [pageSize, pageNumber]);
    return <MainLayout>

        <Title>Входящие заявки</Title>

        <FormRequestList
            columns={columns}
            buildingsList={buildingsList || []}

            onPageChanged={(page) => {
                setPageNumber(page)
            }}
            onPageSizeChanged={pageSize => {
                setPageSize(pageSize)
            }}
            isDataLoading={isDataLoading}
            currentPage={pageNumber}
            totalItems={totalItems}
            onRowClick={(id: any)=>{
                router.push(`/${MODEL_PATH}/${id.toString()}`)
            }}
        />

    </MainLayout>
}

export default FormRequestsPage