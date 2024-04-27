import React, {useEffect, useState} from "react";
import MainLayout from "../components/Layout/Layout";
import {Select, Typography} from 'antd';
import ObjectsList from "../components/Objects/ObjectsList/ObjectsList";
import Api from "../services/Api";
import FormRequestList from "../components/formRequests/FormRequestsList/FormRequestList";
import {useRouter} from "next/router";
import {FormRequestsUpdated} from "../effects/formRequest.effects";

const {Title} = Typography;

const FormRequestsPage = () => {
    const router = useRouter();

    const MODEL_PATH = 'form-request'

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            sorter: (a: any, b: any) => a.name.length - b.name.length,
            render: (val: any) => {
                return <a onClick={() => {
                    router.push(`/${MODEL_PATH}/${val.toString()}`)
                }}>{val}</a>
            }
        },
        {
            title: 'Источник',
            dataIndex: 'source',
            sorter: (a: any, b: any) => a.name.length - b.name.length,

        },
        {
            title: 'Телефон',
            dataIndex: 'phone',
            sorter: (a: any, b: any) => a.name.length - b.name.length,

        },
        {
            title: 'Email',
            dataIndex: 'email',
            sorter: (a: any, b: any) => a.name.length - b.name.length,

        },

        {
            title: 'Тема',
            dataIndex: 'subject',
            sorter: (a: any, b: any) => a.name.length - b.name.length,

        },
        {
            title: 'Дата',
            dataIndex: 'createdAt',
            sorter: (a: any, b: any) => new Date(a.createdAt).getTime() < new Date(b.createdAt).getTime() ? -1 : 1,
            render: (val: Date)=>{
                return <>{new Date(val).toLocaleDateString()} {new Date(val).toLocaleTimeString()}</>
            }
        },
        {
            title: 'Статус',
            dataIndex: 'isRead',
            sorter: (a: any, b: any) => a.isRead === b.isRead ? -1 : 1,
            render: (val: boolean, record: any)=>{
                //return <>{val ? 'Обработано' : 'Не обработано'}</>
                return <Select
                    style={{width: 150}}
                    defaultValue={val}
                    onChange={(value) => {
                        changeState(record.id, value)
                    }}
                >
                    <Select.Option value={true}>Обработано</Select.Option>
                    <Select.Option value={false}>Не обработано</Select.Option>
                </Select>
            }
        },
    ];
    const [buildingsList, setBuildingsList] = useState<any[] | null>(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalItems, setTotalItems] = useState(100);
    const [isDataLoading, setIsDataLoading] = useState(false);

    const changeState = async (id: number, status: boolean) => {
        console.log(`Change ${id} to ${status}`)
        await Api.changeFormRequestStatus(id, status);
        await FormRequestsUpdated();
    }

    useEffect(() => {
        const getBuildings = async () => {
            setIsDataLoading(true)

            // if(buildingsList === null){
            const res = await Api.get(`/${MODEL_PATH}?limit=${pageSize}&page=${pageNumber}&sort=id,DESC`)
            if (res?.data) {
                setBuildingsList(res.data.data)
                setTotalItems(res.data.total)


            }
            setIsDataLoading(false)

            // }
        }

        getBuildings();


    }, [pageSize, pageNumber]);
    return <MainLayout>

        <Title>Входящие заявки</Title>

        <FormRequestList
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
            // onRowClick={(id: any)=>{
            //     router.push(`/${MODEL_PATH}/${id.toString()}`)
            // }}
        />

    </MainLayout>
}

export default FormRequestsPage