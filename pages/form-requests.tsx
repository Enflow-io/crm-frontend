import React, {useEffect, useState} from "react";
import MainLayout from "../components/Layout/Layout";
import {Typography} from 'antd';
import ObjectsList from "../components/ObjectsList/ObjectsList";
import Api from "../services/Api";

const {Title} = Typography;

const ObjectPage = () => {
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
        },
        {
            title: 'Источник',
            dataIndex: 'source',
        },

        {
            title: 'Телефон',
            dataIndex: 'phone',
        },

        {
            title: 'Тема',
            dataIndex: 'subject',
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
            const res = await Api.get(`/form-request?limit=${pageSize}&page=${pageNumber}`)
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

        <ObjectsList
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
        />

    </MainLayout>
}

export default ObjectPage