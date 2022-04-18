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
    const defaultColumns = [
        {
            title: 'ID',
            dataIndex: 'id',
            sorter: true,
            ...getColumnSearchProps('id'),
            isVisible: true,
            width: 120
        },
        {
            title: 'Название',
            dataIndex: 'name',
            sorter: true,
            ...getColumnSearchProps('name'),
            isVisible: true

        },
        {
            title: 'Название ENG',
            dataIndex: 'nameEng',
            sorter: true,
            isVisible: false,
            width: 140


        },
        {
            title: 'Класс',
            dataIndex: 'buildingClass',
            sorter: true,
            isVisible: true,
            width: 120


        },
        {
            title: 'Площадь',
            dataIndex: 'area',
            sorter: true,
            isVisible: true,
            width: 120


        },

        {
            title: 'На рынке',
            dataIndex: 'isOnMarket',
            sorter: true,
            isVisible: true,
            width: 120


        },
        {
            title: 'Локальный ID',
            dataIndex: 'localId',
            sorter: true,
            isVisible: false,
            width: 140

        },

        {
            title: 'Адрес',
            dataIndex: 'address',
            sorter: true,
            isVisible: true,
            width: 120


        },
        {
            title: 'Адрес Eng',
            dataIndex: 'addressEng',
            sorter: true,
            isVisible: false,
            width: 120


        },
        {
            title: 'На сайте',
            dataIndex: 'showOnSite',
            sorter: true,
            isVisible: true,
            width: 120


        },
        {
            title: 'Координаты',
            dataIndex: 'location',
            sorter: true,
            isVisible: false,
            width: 120


        },
        {
            title: 'Округ',
            dataIndex: 'globalDistrict',
            sorter: true,
            isVisible: true,
            width: 120


        },
        {
            title: 'Район',
            dataIndex: 'district',
            sorter: true,
            isVisible: false,
            width: 120


        },


        {
            title: 'Зона',
            dataIndex: 'zone',
            sorter: true,
            isVisible: false,
            width: 120


        },

        {
            title: 'Субрынок',
            dataIndex: 'subMarket',
            sorter: true,
            isVisible: false,
            width: 120


        },
        {
            title: 'Налоговая',
            dataIndex: 'taxOffice',
            sorter: true,
            isVisible: true,
            width: 120


        },

        {
            title: 'Метро 1',
            dataIndex: 'station1',
            sorter: true,
            isVisible: true,
            width: 120


        },
        {
            title: 'Метро 2',
            dataIndex: 'station2',
            sorter: true,
            isVisible: true,
            width: 120


        },
        {
            title: 'Обновлен',
            dataIndex: 'updatedAt',
            sorter: true,
            isVisible: true,
            width: 120


        },
        {
            title: 'Создан',
            dataIndex: 'createdAt',
            sorter: true,
            isVisible: true,
            width: 120


        },
        {
            title: 'Год постройки',
            dataIndex: 'buildingYear',
            sorter: true,
            isVisible: true

        },
        {
            title: 'Тип парковки',
            dataIndex: 'parkingType',
            sorter: true,
            isVisible: false,
            width: 120


        },
        {
            title: 'Стадия строительства',
            dataIndex: 'constructionStatus',
            sorter: true,
            isVisible: false,
            width: 120


        },
        {
            title: 'Валюта',
            dataIndex: 'currency',
            sorter: true,
            isVisible: false,
            width: 120


        },

    ];

    const [columns, setColumns] = useState(defaultColumns);
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
            <ObjectSubMenu onColsChanged={cols=>{

                setColumns(cols)
            }}
                           columns={columns}
                           selectedRows={[]} />
        </Title>

        <ObjectsList
            columns={columns.filter(el=>el.isVisible)}
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