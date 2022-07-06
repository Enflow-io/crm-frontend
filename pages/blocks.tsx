import React, {useEffect, useRef, useState} from "react";
import MainLayout from "../components/Layout/Layout";
import {Button, Input, Select, Space, Typography} from 'antd';
import ObjectsList from "../components/Objects/ObjectsList/ObjectsList";
import Api from "../services/Api";
import {useRouter} from "next/router";
import BlocksList from "../components/Blocks/BlocksList/BlocksList";
import ObjectSubMenu from "../components/Objects/ObjectSubMenu/ObjectSubMenu";
import BlockSubMenu from "../components/Blocks/BlockSubMenu/BlockSubMenu";

import Title from "../components/Layout/Title";
import {SearchOutlined} from '@ant-design/icons';


const BlockPage = () => {
    let inputRef = useRef();

    const [filters, setFilters] = useState<any>({});

    const handleSearch = (selectedKeys: any, confirm: any, dataIndex: any, oldFilters: any) => {
        console.log(selectedKeys)
        console.log(dataIndex)
        console.log("old filters", filters)
        console.log("old filters", oldFilters)
        console.log("new filters index", dataIndex)
        let newFilters = {
            ...oldFilters,
            [dataIndex]: selectedKeys[0]
        };
        console.log("new filters", newFilters)
        setFilters(newFilters)
        confirm()
    };

    const renderBoolean = (val: any) => {
        if (val === null) {
            return <>–</>
        }
        return <>{val ? 'да' : 'нет'}</>
    }

    const handleReset = (selectedKeys: any, confirm: any, dataIndex: any, setSelectedKeys: any) => {
        let newFilters = {...filters}
        delete filters[dataIndex];
        delete newFilters[dataIndex];
        setFilters(newFilters)
        // console.log(inputRef)

        setSelectedKeys([])
        // debugger

        confirm()

    };
    const getBooleanColumnSearchProps = (dataIndex: any) => ({
        filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters}: any) => (
            <div style={{padding: 8}}>

                <Select
                    ref={node => {
                        // @ts-ignore
                        inputRef = node;
                    }}
                    defaultValue="null"
                    value={selectedKeys[0]}
                    style={{width: 120}}
                    onChange={value => setSelectedKeys([value])}
                >
                    <Select.Option value="null">Неизвестно</Select.Option>
                    <Select.Option value="true">Да</Select.Option>
                    <Select.Option value="false">
                        Нет
                    </Select.Option>
                </Select>

                <Space>
                    <Button
                        type="primary"
                        onClick={() => {
                            handleSearch(selectedKeys, confirm, dataIndex, filters)
                        }
                        }
                        icon={<SearchOutlined/>}
                        size="small"
                        style={{width: 90}}
                    >
                        Search
                    </Button>
                    <Button onClick={() => handleReset(selectedKeys, confirm, dataIndex, setSelectedKeys)} size="small"
                            style={{width: 90}}>
                        Reset
                    </Button>

                </Space>
            </div>
        ),
        filterIcon: (filtered: any) => <SearchOutlined style={{color: filtered ? '#1890ff' : undefined}}/>,


    });

    const getColumnSearchProps = (dataIndex: any) => ({
        filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters}: any) => (
            <div style={{padding: 8}}>
                <Input
                    ref={node => {
                        // @ts-ignore
                        inputRef = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => {
                    }}
                    style={{marginBottom: 8, display: 'block'}}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => {
                            console.log(filters)
                            handleSearch(selectedKeys, confirm, dataIndex, filters)
                        }
                        }
                        icon={<SearchOutlined/>}
                        size="small"
                        style={{width: 90}}
                    >
                        Search
                    </Button>
                    <Button onClick={() => handleReset(selectedKeys, confirm, dataIndex, setSelectedKeys)} size="small"
                            style={{width: 90}}>
                        Reset
                    </Button>

                </Space>
            </div>
        ),
        filterIcon: (filtered: any) => <SearchOutlined style={{color: filtered ? '#1890ff' : undefined}}/>,


    });

    const defaultColumns = [
        {
            title: 'Название',
            dataIndex: 'name',
            sorter: true,
            ...getColumnSearchProps('name'),
            dataType: 'string',
            isVisible: true,
            width: 120,

        },
        {
            title: 'ID',
            dataIndex: 'id',
            sorter: true,
            ...getColumnSearchProps('id'),
            dataType: 'number',
            isVisible: true,
            width: 120,
        },
        {
            title: 'Площадь',
            dataIndex: 'area',
            sorter: true,
            ...getColumnSearchProps('id'),
            dataType: 'number',
            isVisible: true,
            width: 120,

        },
        {
            title: 'На сайте',
            dataIndex: 'isOnMarket',
            sorter: true,
            isVisible: true,
            width: 120,
            ...getColumnSearchProps('isOnMarket'),
            dataType: "string",

        },
        {
            title: 'Тип блока',
            dataIndex: 'blockType',
            sorter: true,
            ...getColumnSearchProps('blockType'),
            dataType: 'number',
            isVisible: true,
            width: 120,

        },
        {
            title: 'Этаж',
            dataIndex: 'floor',
            sorter: true,
            ...getColumnSearchProps('floor'),
            dataType: 'number',
            isVisible: true,
            width: 120,

        },
    ];
    const [columns, setColumns] = useState(defaultColumns);

    const router = useRouter();

    const [buildingsList, setBuildingsList] = useState<any[] | null>(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalItems, setTotalItems] = useState(100);
    const [isDataLoading, setIsDataLoading] = useState(false);
    const [sortParams, setSortParams] = useState<any | null>(null)


    useEffect(() => {
        // const getBuildings = async () => {
        //     setIsDataLoading(true)
        //
        //     // if(buildingsList === null){
        //     const res = await Api.get(`/blocks?take=${pageSize}&skip=${(pageNumber - 1) * pageSize}`)
        //     if (res?.data) {
        //         setBuildingsList(res.data.data)
        //         setTotalItems(res.data.total)
        //
        //
        //     }
        //     setIsDataLoading(false)
        //
        //     // }
        // }


        const getBuildings = async () => {


            let filterString = ``;
            for (let filter in filters) {

                const col = defaultColumns.find(el => el.dataIndex === filter);
                if (!col) {
                    continue;
                }

                if ("dataType" in col && col.dataType === 'number') {
                    filterString += `&filter=${filter}||$eq||${filters[filter]}`
                }

                if ("dataType" in col && col.dataType === 'string') {
                    filterString += `&filter=${filter}||$contL||${filters[filter]}`
                }
                if ("dataType" in col && col.dataType === 'boolean') {
                    if (filters[filter] === 'null') {
                        filterString += `&filter=${filter}||isnull||${filters[filter]}`

                    } else {
                        filterString += `&filter=${filter}||$eq||${filters[filter]}`

                    }
                }
            }

            // if(buildingsList === null){
            let sortString = '';
            if (sortParams && sortParams.order) {
                sortString = `&sort=${sortParams.field},${sortParams.order === 'descend' ? 'DESC' : 'ASC'}`
            }
            setIsDataLoading(true)
            const res = await Api.get(`/offices?page=${pageNumber}&limit=${pageSize}${sortString}${filterString}`)
            if (res?.data?.data) {
                setBuildingsList(res.data.data)
                setTotalItems(res.data.total)
                console.log(res.data)

            }
            setIsDataLoading(false)
            // }
        }

        getBuildings();


    }, [pageSize, pageNumber, sortParams, filters]);
    return <MainLayout>

        <Title title={'Блоки'}>
            <BlockSubMenu
                selectedRows={[]}
                onColsChanged={cols => {

                    setColumns(cols)
                }}
                columns={columns}
            />
        </Title>

        <BlocksList
            columns={defaultColumns.filter(el => {
                const found = columns.find(item => {
                    return item.dataIndex === el.dataIndex && item.isVisible === true
                })
                return found
            })}
            buildingsList={buildingsList || []}

            onPageChanged={(page) => {
                setPageNumber(page)
            }}
            onPageSizeChanged={pageSize => {
                setPageSize(pageSize)
            }}
            onRowClick={id=>{
                router.push(`/blocks/${id.toString()}`)

            }}
            isDataLoading={isDataLoading}
            currentPage={pageNumber}
            totalItems={totalItems}
        />

    </MainLayout>
}

export default BlockPage