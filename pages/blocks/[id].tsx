import React, {useEffect, useState} from "react";
import MainLayout from "../../components/Layout/Layout";
import {Typography} from 'antd';
import ObjectsList from "../../components/ObjectsList/ObjectsList";
import Api from "../../services/Api";
import {useRouter} from "next/router";
import BlockCard from "../../components/BlockCard/BlockCard";

const {Title} = Typography;

const ObjectPage = () => {


    const [block, setBlock] = useState<any[] | null>(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalItems, setTotalItems] = useState(100);
    const [isDataLoading, setIsDataLoading] = useState(false);
    const router = useRouter();
    const blockId = router?.query?.id



    useEffect(() => {
        const getBlock = async () => {
            setIsDataLoading(true)

            const res = await Api.get(`/blocks/${blockId}`)
            if (res?.data) {
                setBlock(res.data.data)
                setTotalItems(res.data.total)


            }
            setIsDataLoading(false)
        }

        getBlock();


    }, [pageSize, pageNumber]);
    return <MainLayout>

        <Title>Блок #{blockId}</Title>

        {blockId &&
        <BlockCard modelId={parseInt((blockId || 0).toString())}/>

        }

    </MainLayout>
}

export default ObjectPage