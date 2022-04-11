import React, {useEffect, useState} from "react";
import MainLayout from "../../components/Layout/Layout";
import {Spin, Typography} from 'antd';
import Api from "../../services/Api";
import {useRouter} from "next/router";
import {UserInterface} from "../../interfaces/user.interface";
import UserForm from "../../components/users/UserForm/UserForm";
import UserCard from "../../components/users/UserCard/UserCard";

const {Title} = Typography;

const UsersPage = () => {
    const router = useRouter();
    const id = router?.query?.id;
    const [isDataLoading, setIsDataLoading] = useState(false);
    const [user, setUser] = useState<UserInterface | null>(null);

    const getModel = async () => {
        setIsDataLoading(true)
        const res = await Api.get(`/users/${id}`)
        if (res?.data) {
            setUser(res.data)
        }
        setIsDataLoading(false)
    };

    useEffect(() => {
        if (id) {
            getModel();
        }
    }, [id]);


    return <MainLayout>
        {user && <div>
            <Title>Пользователь {user.name} #{id}</Title>
            {isDataLoading && <Spin/>}
            <UserCard model={user}/>

        </div>}

    </MainLayout>
}

export default UsersPage