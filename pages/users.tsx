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


const UsersPage = () => {
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            sorter: (a: any, b: any) => a.name.length - b.name.length,

        },
        {
            title: 'Email',
            dataIndex: 'email',
            sorter: (a: any, b: any) => a.name.length - b.name.length,

        },
        {
            title: 'Телефон',
            dataIndex: 'phone',
            sorter: (a: any, b: any) => {
                const aPhone = a.phone ? +a.phone.replace(/[^0-9]/g, '') : 0;
                const bPhone = b.phone ? +b.phone.replace(/[^0-9]/g, '') : 0;
                return aPhone  - bPhone
            },

        },
        {
            title: 'Имя',
            dataIndex: 'name',
            sorter: (a: any, b: any) => a.name.length - b.name.length,

        },
        {
            title: 'Фамилия',
            dataIndex: 'lastName',
            sorter: (a: any, b: any) => a.name.length - b.name.length,

        },
        {
            title: 'Роль',
            dataIndex: 'role',
            sorter: (a: any, b: any) => a.name.length - b.name.length,

        },

    ];
    const [buildingsList, setBuildingsList] = useState<any[] | null>(null);
    const router = useRouter();

    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalItems, setTotalItems] = useState(100);
    const [isDataLoading, setIsDataLoading] = useState(false);
    const [selectedRows, setSelectedRows] = useState<number[]>([])

    const onRowsSelected = (ids: number[])=>{
        setSelectedRows(ids)
    }

    registerUser.done.watch(async ({result, params}) => {
        await getModel()
    });
    updateUsersTable.done.watch(async ({result, params}) => {
        await getModel()
    });

    const getModel = async () => {
        setIsDataLoading(true)

        const res = await Api.get(`/users?take=${pageSize}&skip=${(pageNumber - 1) * pageSize}`)
        if (res?.data) {
            setBuildingsList(res.data.data)
            setTotalItems(res.data.total)

        }
        setIsDataLoading(false)

    }


    useEffect(() => {

        getModel();


    }, [pageNumber, pageSize]);
    return <MainLayout>
        <Title title={'Пользователи'}>
            <SubMenu selectedRows={selectedRows} />
        </Title>



        <UsersList
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
            onRowsSelected={onRowsSelected}
            onRowClick={async id=>{
                await router.push(`/users/${id.toString()}`)

            }}

        />

    </MainLayout>
}

export default UsersPage