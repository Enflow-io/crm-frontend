import React, {useEffect, useRef, useState} from "react";
import MainLayout from "../components/Layout/Layout";
import {Button, Input, Space, Typography} from 'antd';
import ObjectsList from "../components/Objects/ObjectsList/ObjectsList";
import Api from "../services/Api";
import {useRouter} from "next/router";
import SubMenu from "../components/tables/SubMenu/SubMenu";
import Title from "../components/Layout/Title";
import ObjectSubMenu from "../components/Objects/ObjectSubMenu/ObjectSubMenu";
import { SearchOutlined } from '@ant-design/icons';

const ObjectPage = ()=>{

    let inputRef = useRef()
    const getColumnSearchProps = (dataIndex: any) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: any) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => {
                        // @ts-ignore
                        inputRef = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => {}}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => {}}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button onClick={() => {}} size="small" style={{ width: 90 }}>
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({ closeDropdown: false });
                            // this.setState({
                            //     searchText: selectedKeys[0],
                            //     searchedColumn: dataIndex,
                            // });
                        }}
                    >
                        Filter
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered: any) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value: any, record: any) =>
            record[dataIndex]
                ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
                : '',
        onFilterDropdownVisibleChange: (visible: any) => {
            if (visible) {
                setTimeout(() => {}, 100);
            }
        },
        render: (text:any) => {
            return text
        }

    });
    const router = useRouter();
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            sorter: true,
            ...getColumnSearchProps('id'),
        },
        {
            title: 'Название',
            dataIndex: 'name',
            sorter: true,
            ...getColumnSearchProps('name'),

        },

        {
            title: 'Адрес',
            dataIndex: 'address',
            sorter: true

        },
        {
            title: 'На сайте',
            dataIndex: 'showOnSite',
            sorter: true

        },
        {
            title: 'Округ',
            dataIndex: 'globalDistrict',
            sorter: true

        },

        {
            title: 'Local ID',
            dataIndex: 'localId',
            sorter: true

        },

    ];
    const [buildingsList, setBuildingsList] = useState<any[] | null>(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalItems, setTotalItems] = useState(100);
    const [isDataLoading, setIsDataLoading] = useState(false);

    const [sortParams, setSortParams] = useState<any | null>(null)

    useEffect( ()=>{
        const getBuildings = async ()=>{
            // if(buildingsList === null){
            let sortString = '';
            if(sortParams && sortParams.order){
                sortString = `&sort=${sortParams.field},${sortParams.order === 'descend' ? 'DESC' : 'ASC'}`
            }
            setIsDataLoading(true)
                // const res = await Api.get(`/objects?take=${pageSize}&skip=${(pageNumber-1)*pageSize}${sortString}`)
                const res = await Api.get(`/objects?page=${pageNumber}&limit=${pageSize}${sortString}`)
                if(res?.data?.data){
                    setBuildingsList(res.data.data)
                    setTotalItems(res.data.total)
                    console.log(res.data)

                }
            setIsDataLoading(false)
            // }
        }

        getBuildings();


    }, [pageNumber, pageSize, sortParams]);

    return <MainLayout>

        <Title title={'Объекты'}>
            <ObjectSubMenu selectedRows={[]} />
        </Title>

        <ObjectsList
            columns={columns}
            buildingsList={buildingsList || []}
            onPageChanged={(page)=>{
                setPageNumber(page)
            }}
            onPageSizeChanged={pageSize => {
                setPageSize(pageSize)
            }}
            isDataLoading={isDataLoading}
            currentPage={pageNumber}
            totalItems={totalItems}
            onRowClick={(id: any)=>{
                router.push(`/objects/${id.toString()}`)
            }}
            onSortChange={(sortField, order)=>{
                setSortParams({
                    field: sortField,
                    order
                });
            }}
        />

    </MainLayout>
}

export default ObjectPage