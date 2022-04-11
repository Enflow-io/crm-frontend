import React, {useEffect, useState} from "react";
import MainLayout from "../components/Layout/Layout";
import {Typography} from 'antd';
import ObjectsList from "../components/Objects/ObjectsList/ObjectsList";
import Api from "../services/Api";
import {useRouter} from "next/router";
import BlocksList from "../components/Blocks/BlocksList/BlocksList";
import ObjectSubMenu from "../components/Objects/ObjectSubMenu/ObjectSubMenu";
import BlockSubMenu from "../components/Blocks/BlockSubMenu/BlockSubMenu";

import Title from "../components/Layout/Title";


const BlockPage = () => {
    const columns = [
        {
            title: 'Название',
            dataIndex: 'name',
            sorter: (a: any, b: any) => a.name.length - b.name.length,

        },
        {
            title: 'ID',
            dataIndex: 'id',
            sorter: (a: any, b: any) => a.name.length - b.name.length,

        },
        {
            title: 'Площадь',
            dataIndex: 'area',
            sorter: (a: any, b: any) => a.name.length - b.name.length,

        },
        {
            title: 'На сайте',
            dataIndex: 'isOnMarket',
            sorter: (a: any, b: any) => a.name.length - b.name.length,

        },
        {
            title: 'Тип блока',
            dataIndex: 'blockType',
            sorter: (a: any, b: any) => a.name.length - b.name.length,

        },
        {
            title: 'Этаж',
            dataIndex: 'floor',
            sorter: (a: any, b: any) => a.name.length - b.name.length,

        },
    ];
    const router = useRouter();

    const [buildingsList, setBuildingsList] = useState<any[] | null>(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalItems, setTotalItems] = useState(100);
    const [isDataLoading, setIsDataLoading] = useState(false);


    useEffect(() => {
        const getBuildings = async () => {
            setIsDataLoading(true)

            // if(buildingsList === null){
            const res = await Api.get(`/blocks?take=${pageSize}&skip=${(pageNumber - 1) * pageSize}`)
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

        <Title title={'Блоки'}>
            <BlockSubMenu selectedRows={[]} />
        </Title>

        <BlocksList
            columns={columns}
            buildingsList={buildingsList || []}

            onPageChanged={(page) => {
                setPageNumber(page)
            }}
            onPageSizeChanged={pageSize => {
                setPageSize(pageSize)
            }}
            onRowClick={id=>{
                router.push(`/blocks/${id.toString()}`)

            }}
            isDataLoading={isDataLoading}
            currentPage={pageNumber}
            totalItems={totalItems}
        />

    </MainLayout>
}

export default BlockPage