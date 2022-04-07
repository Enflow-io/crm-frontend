import React, {useEffect, useState} from "react";
import MainLayout from "../../components/Layout/Layout";
import {Spin, Typography} from 'antd';
import ObjectsList from "../../components/ObjectsList/ObjectsList";
import Api from "../../services/Api";
import {useRouter} from "next/router";
import BlockCard from "../../components/BlockCard/BlockCard";
import FormRequestCard from "../../components/formRequests/FormRequestCard/FormRequestCard";

const {Title} = Typography;

const FormRequestPage = () => {

    const MODEL_PATH = 'form-request'
    const [model, setModel] = useState<any[] | null>(null);
    const [isDataLoading, setIsDataLoading] = useState(false);
    const router = useRouter();
    const modelId = router?.query?.id
    const [fields, setFields] = useState<any[]>([]);

    console.log(modelId)

    useEffect(() => {
        const getModel = async () => {
            if(!modelId){
                return
            }
            setIsDataLoading(true)

            const res = await Api.get(`/${MODEL_PATH}/${modelId}`)
            if (res?.data) {
                setModel(res.data)
            }

            let fields = []
            for (let field of Object.entries(res?.data || {})) {
                fields.push({
                    name: field[0],
                    value: field[1]
                })
            }
            setFields(fields)

            setIsDataLoading(false)
        }

        getModel();


    }, [modelId]);

    if(!modelId){
        return <Spin />
    }

    console.log("1 fields", fields)
    console.log("1 model" , model)

    return <MainLayout>

        <Title>Запрос #{modelId}</Title>

        <FormRequestCard fields={fields} model={model} />
    </MainLayout>
}

export default FormRequestPage;