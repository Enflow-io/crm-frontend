import React, {useEffect, useState} from "react";
import MainLayout from "../../components/Layout/Layout";
import {Typography} from 'antd';
import ObjectsList from "../../components/Objects/ObjectsList/ObjectsList";
import Api from "../../services/Api";
import {useRouter} from "next/router";
import BlockCard from "../../components/Blocks/BlockCard/BlockCard";

const {Title} = Typography;

const ObjectPage = () => {
    const router = useRouter();
    const blockId = router?.query?.id


    return <MainLayout>

        <Title>Блок #{blockId}</Title>

        {blockId &&
        <BlockCard modelId={parseInt((blockId || 0).toString())}/>

        }

    </MainLayout>
}

export default ObjectPage