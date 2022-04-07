import React, {useEffect, useState} from "react";
import MainLayout from "../components/Layout/Layout";
import {Button, Typography} from 'antd';
import ObjectsList from "../components/ObjectsList/ObjectsList";
import Api from "../services/Api";
import SubMenu from "../components/tables/SubMenu/SubMenu";
import {registerUser, updateUsersTable} from "../effects/user";
import UsersList from "../components/tables/UsersList/UsersList";

const {Title} = Typography;

const UsersPage = () => {
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Имя',
            dataIndex: 'name',
        },
        {
            title: 'Фамилия',
            dataIndex: 'lastName',
        },
        {
            title: 'Роль',
            dataIndex: 'role',
        },

    ];
    const [buildingsList, setBuildingsList] = useState<any[] | null>(null);

    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalItems, setTotalItems] = useState(100);
    const [isDataLoading, setIsDataLoading] = useState(false);
    const [selectedRows, setSelectedRows] = useState<number[]>([])

    const onRowsSelected = (ids: number[])=>{
        setSelectedRows(ids)
    }

    registerUser.done.watch(async ({result, params}) => {
        await getBuildings()
    });
    updateUsersTable.done.watch(async ({result, params}) => {
        await getBuildings()
    });

    const getBuildings = async () => {
        setIsDataLoading(true)

        const res = await Api.get(`/users?take=${pageSize}&skip=${(pageNumber - 1) * pageSize}`)
        if (res?.data) {
            setBuildingsList(res.data.data)
            setTotalItems(res.data.total)

        }
        setIsDataLoading(false)

    }


    useEffect(() => {

        getBuildings();


    }, [pageNumber, pageSize]);
    return <MainLayout>

        <div style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between"
        }}>
            <Title>Пользователи</Title>

            <SubMenu selectedRows={selectedRows} />
        </div>




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

        />

    </MainLayout>
}

export default UsersPage