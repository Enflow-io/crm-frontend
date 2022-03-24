import React, {useEffect, useState} from "react";
import MainLayout from "../components/Layout/Layout";
import {Button, Typography} from 'antd';
import ObjectsList from "../components/ObjectsList/ObjectsList";
import Api from "../services/Api";
import SubMenu from "../components/tables/SubMenu/SubMenu";

const {Title} = Typography;

const UsersPage = () => {
    const columns = [
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Имя',
            dataIndex: 'name',
        },
        {
            title: 'ID',
            dataIndex: 'id',
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

            const res = await Api.get(`/users?take=${pageSize}&skip=${(pageNumber - 1) * pageSize}`)
            if (res?.data) {
                setBuildingsList(res.data.data)
                setTotalItems(res.data.total)

            }
            setIsDataLoading(false)

        }

        getBuildings();


    }, [pageNumber, pageSize]);
    return <MainLayout>

        <div style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between"
        }}>
            <Title>Пользователи</Title>

            <SubMenu />
        </div>




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

export default UsersPage