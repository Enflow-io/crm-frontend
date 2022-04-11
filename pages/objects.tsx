import React, {useEffect, useState} from "react";
import MainLayout from "../components/Layout/Layout";
import { Typography } from 'antd';
import ObjectsList from "../components/Objects/ObjectsList/ObjectsList";
import Api from "../services/Api";
import {useRouter} from "next/router";
import SubMenu from "../components/tables/SubMenu/SubMenu";
import Title from "../components/Layout/Title";
import ObjectSubMenu from "../components/Objects/ObjectSubMenu/ObjectSubMenu";


const ObjectPage = ()=>{

    const router = useRouter();
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            sorter: (a: any, b: any) => a.name.length - b.name.length,
        },
        {
            title: 'Название',
            dataIndex: 'name',
            sorter: (a: any, b: any) => a.name.length - b.name.length,
        },

        {
            title: 'Адрес',
            dataIndex: 'address',
            sorter: (a: any, b: any) => a.name.length - b.name.length,
        },
        {
            title: 'На сайте',
            dataIndex: 'showOnSite',
            sorter: (a: any, b: any) => a.name.length - b.name.length,
        },
        {
            title: 'Округ',
            dataIndex: 'globalDistrict',
            sorter: (a: any, b: any) => a.name.length - b.name.length,
        },

        {
            title: 'Local ID',
            dataIndex: 'localId',
            sorter: (a: any, b: any) => a.name.length - b.name.length,
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