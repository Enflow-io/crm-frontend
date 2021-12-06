import React from "react";
import MainLayout from "../../components/Layout/Layout";
import ObjectsList from "../../components/ObjectsList/ObjectsList";
import { Typography } from 'antd';
import ObjectCard from "../../components/ObjectCard/ObjectCard";
import {useRouter} from "next/router";
const { Title } = Typography;


const ObjectPage = () => {
    const router = useRouter();
    const objectId = router?.query?.id
    return <MainLayout>
        {objectId &&
        <ObjectCard objectId={objectId} />
        }

    </MainLayout>
}


export default ObjectPage;