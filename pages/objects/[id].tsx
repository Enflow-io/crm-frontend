import React from "react";
import MainLayout from "../../components/Layout/Layout";
import ObjectCard from "../../components/Objects/ObjectCard/ObjectCard";
import {useRouter} from "next/router";


const ObjectPage = () => {
    const router = useRouter();
    const objectId = router?.query?.id
    return <MainLayout>
        {objectId &&
        <ObjectCard objectId={parseInt(objectId.toString())} />
        }

    </MainLayout>
}


export default ObjectPage;