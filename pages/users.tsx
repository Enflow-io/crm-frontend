import React, {useEffect, useState} from "react";
import MainLayout from "../components/Layout/Layout";
import { Typography } from 'antd';
import ObjectsList from "../components/ObjectsList/ObjectsList";
import Api from "../services/Api";

const { Title } = Typography;

const UsersPage = ()=>{
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

    useEffect( ()=>{
        const getBuildings = async ()=>{
            if(buildingsList === null){
                const res = await Api.get('/users')
                if(res?.data){
                    setBuildingsList(res.data)

                }
            }
        }

        getBuildings();


    });
    return <MainLayout>

        <Title>Пользователи</Title>

        <ObjectsList columns={columns} buildingsList={buildingsList || []} />

    </MainLayout>
}

export default UsersPage