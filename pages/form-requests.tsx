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
            width: 100,
            //sorter: (a: any, b: any) => a.name.length - b.name.length,
            sorter: (a: any, b: any) => false,
            // render: (val: any) => {
            //     return <a onClick={() => {
            //         router.push(`/${MODEL_PATH}/${val.toString()}`)
            //     }}>{val}</a>
            // }
        },
        {
            title: 'Тема',
            dataIndex: 'subject',
            //sorter: (a: any, b: any) => a.name.length - b.name.length,
            sorter: (a: any, b: any) => false,
            render: (val: any, record: any) => {
                return <a onClick={() => {
                    router.push(`/${MODEL_PATH}/${record.id.toString()}`)
                }}>{val}</a>
            },
            onChange: (a: any, b: any,  c: any) => {
                console.log(a, b, c)
            }
        },
        {
            title: 'Источник',
            dataIndex: 'source',
            //sorter: (a: any, b: any) => a.name.length - b.name.length,
            sorter: (a: any, b: any) => false,
        },
        {
            title: 'Телефон',
            dataIndex: 'phone',
            //sorter: (a: any, b: any) => a.name.length - b.name.length,
            sorter: (a: any, b: any) => false,
        },
        // {
        //     title: 'Email',
        //     dataIndex: 'email',
        //     sorter: (a: any, b: any) => a.name.length - b.name.length,
        //
        // },

        {
            title: 'Дата',
            dataIndex: 'createdAt',
            //sorter: (a: any, b: any) => new Date(a.createdAt).getTime() < new Date(b.createdAt).getTime() ? -1 : 1,
            sorter: (a: any, b: any) => false,
            render: (val: Date)=>{
                return <>{new Date(val).toLocaleDateString()} {new Date(val).toLocaleTimeString()}</>
            }
        },
        {
            title: 'Статус',
            dataIndex: 'isRead',
            //sorter: (a: any, b: any) => a.isRead === b.isRead ? -1 : 1,
            sorter: (a: any, b: any) => false,
            render: (val: boolean, record: any)=>{
                //return <>{val ? 'Обработано' : 'Не обработано'}</>
                return <Select
                    style={{width: 150}}
                    defaultValue={val.toString()}
                    onChange={(value) => {
                        changeState(record.id, value === 'true' ? true : false)
                    }}
                >
                    <Select.Option value={'true'}>Обработано</Select.Option>
                    <Select.Option value={'false'}>Не обработано</Select.Option>
                </Select>
            }
        },
    ];
    const [buildingsList, setBuildingsList] = useState<any[] | null>(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalItems, setTotalItems] = useState(100);
    const [ordering, setOrdering] = useState({field: 'id', order: 'DESC'});
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
            const res = await Api.get(`/${MODEL_PATH}?limit=${pageSize}&page=${pageNumber}&sort=${ordering.field ?? 'id'},${ordering.order}`)
            if (res?.data) {
                setBuildingsList(res.data.data)
                setTotalItems(res.data.total)


            }
            setIsDataLoading(false)

            // }
        }

        getBuildings();


    }, [pageSize, pageNumber, ordering]);
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
            onSortChanged={(field, order) => {
                setOrdering({field, order})
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