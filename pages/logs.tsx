import React, {useEffect, useState} from "react";
import MainLayout from "../components/Layout/Layout";
import {Button, Typography} from 'antd';
import ObjectsList from "../components/Objects/ObjectsList/ObjectsList";
import Api from "../services/Api";
import SubMenu from "../components/tables/SubMenu/SubMenu";
import {registerUser, updateUsersTable} from "../effects/user";
import UsersList from "../components/tables/UsersList/UsersList";
import Title from "../components/Layout/Title";
import BlocksList from "../components/Blocks/BlocksList/BlocksList";
import {useRouter} from "next/router";
import LogsList from "../components/tables/LogsList";


const LogsPage = () => {
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            sorter: (a: any, b: any) => a.name.length - b.name.length,


        },
        {
            title: 'Описание',
            dataIndex: 'message',
            sorter: (a: any, b: any) => a.name.length - b.name.length,

        },
        {
            title: 'Пользователь',
            dataIndex: 'user',
            render: (val: any)=>{

                return val ? `${val.name} ${val.lastName} [${val.id}]` : '–'
            },

        },
        {
            title: 'Дата/Время',
            dataIndex: 'createdAt',
            render: (val: string)=>{
                return (new Date(val)).toDateString() + ' | ' +(new Date(val)).toLocaleTimeString();
            },

        },
        {
            title: 'Модуль',
            dataIndex: 'moduleName',

        },
        {
            title: 'ID события',
            dataIndex: 'eventId',

        },
        {
            title: 'ID Сущности',
            dataIndex: 'entityId',

        },
        {
            title: 'Тип сущности',
            dataIndex: 'entityName',

        },

        {
            title: 'Уровень',
            dataIndex: 'logLevel',

        },


    ];
    const [modelList, setModelList] = useState<any[] | null>(null);

    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalItems, setTotalItems] = useState(100);
    const [isDataLoading, setIsDataLoading] = useState(false);




    const getModel = async () => {
        setIsDataLoading(true)

        const res = await Api.get(`/logger?page=${pageNumber}&limit=10`)
        if (res?.data) {
            console.log(res.data)
            setModelList(res.data.data)
            setTotalItems(res.data.total)

        }
        setIsDataLoading(false)

    }


    useEffect(() => {

        getModel();


    }, [pageNumber, pageSize]);
    return <MainLayout>
        <Title title={'Логи'}>
            {/*<SubMenu selectedRows={selectedRows} />*/}
        </Title>



        <LogsList
            columns={columns}
            buildingsList={modelList || []}

            onPageChanged={(page) => {
                setPageNumber(page)
            }}
            onPageSizeChanged={pageSize => {
                setPageSize(pageSize)
            }}
            isDataLoading={isDataLoading}
            currentPage={pageNumber}
            totalItems={totalItems}
            // onRowClick={async id=>{
            //     await router.push(`/users/${id.toString()}`)
            //
            // }}

        />

    </MainLayout>
}

export default LogsPage