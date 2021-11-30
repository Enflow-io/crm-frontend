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
            title: 'Площадь',
            dataIndex: 'area',
        },
    ];
    const [buildingsList, setBuildingsList] = useState<any[] | null>(null);

    useEffect( ()=>{
        const getBuildings = async ()=>{
            if(buildingsList === null){
                const res = await Api.get('/blocks')
                if(res?.data){
                    setBuildingsList(res.data)

                }
            }
        }

        getBuildings();


    });
    return <MainLayout>

        <Title>Блоки</Title>

        <ObjectsList columns={columns} buildingsList={buildingsList || []} />

    </MainLayout>
}

export default ObjectPage