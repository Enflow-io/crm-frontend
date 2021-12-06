import React, {useEffect, useState} from "react";
import MainLayout from "../components/Layout/Layout";
import { Typography } from 'antd';
import ObjectsList from "../components/ObjectsList/ObjectsList";
import Api from "../services/Api";

const { Title } = Typography;

const ObjectPage = ()=>{

    const columns = [
        {
            title: 'Название',
            dataIndex: 'name',
        },
        {
            title: 'ID',
            dataIndex: 'id',
        },
        {
            title: 'Адрес',
            dataIndex: 'address',
        },
    ];
    const [buildingsList, setBuildingsList] = useState<any[] | null>(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalItems, setTotalItems] = useState(100);
    const [isDataLoading, setIsDataLoading] = useState(false);
    useEffect( ()=>{
        const getBuildings = async ()=>{
            // if(buildingsList === null){
            setIsDataLoading(true)
                const res = await Api.get(`/buildings?take=${pageSize}&skip=${(pageNumber-1)*pageSize}`)
                if(res?.data?.data){
                    setBuildingsList(res.data.data)
                    setTotalItems(res.data.total)
                    console.log(res.data)

                }
            setIsDataLoading(false)
            // }
        }

        getBuildings();


    }, [pageNumber, pageSize]);

    return <MainLayout>

        <Title>Объекты</Title>

        <ObjectsList
            columns={columns}
            buildingsList={buildingsList || []}
            onPageChanged={(page)=>{
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