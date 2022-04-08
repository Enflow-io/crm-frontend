import React, {useEffect, useState} from "react";
import MainLayout from "../components/Layout/Layout";
import { Typography } from 'antd';
import ObjectsList from "../components/ObjectsList/ObjectsList";
import Api from "../services/Api";
import {useRouter} from "next/router";
import SubMenu from "../components/tables/SubMenu/SubMenu";
import Title from "../components/Layout/Title";
import ObjectSubMenu from "../components/objects/ObjectSubMenu/ObjectSubMenu";


const ObjectPage = ()=>{

    const router = useRouter();
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

        <Title title={'Объекты'}>
            <ObjectSubMenu selectedRows={[]} />
        </Title>

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
            onRowClick={(id: any)=>{
                router.push(`/objects/${id.toString()}`)
            }}
        />

    </MainLayout>
}

export default ObjectPage