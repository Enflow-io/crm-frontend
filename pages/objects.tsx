import React, {useEffect, useRef, useState} from "react";
import MainLayout from "../components/Layout/Layout";
import {Button, Input, Select, Space, Typography} from 'antd';
import ObjectsList from "../components/Objects/ObjectsList/ObjectsList";
import Api from "../services/Api";
import {useRouter} from "next/router";
import SubMenu from "../components/tables/SubMenu/SubMenu";
import Title from "../components/Layout/Title";
import ObjectSubMenu from "../components/Objects/ObjectSubMenu/ObjectSubMenu";
import {SearchOutlined} from '@ant-design/icons';

const ObjectPage = () => {

    let inputRef = useRef();


    const [filters, setFilters] = useState<any>({});

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
                            debugger
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

    const router = useRouter();
    const defaultColumns = [
        {
            title: 'PIC',
            dataIndex: 'pics',
            sorter: false,
            dataType: 'pic',
            isVisible: true,
            width: 120,
            render: (val: any) => {
                if(val && val[0]){
                    return <img width={80} src={val[0]?.url} />

                }else{
                    return " - "
                }
            }

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
            title: 'Название',
            dataIndex: 'name',
            sorter: true,
            ...getColumnSearchProps('name'),
            dataType: "string",
            isVisible: true

        },
        {
            title: 'Название ENG',
            dataIndex: 'nameEng',
            sorter: true,
            isVisible: false,
            width: 140,
            ...getColumnSearchProps('nameEng'),
            dataType: "string",


        },
        {
            title: 'Класс',
            dataIndex: 'buildingClass',
            sorter: true,
            isVisible: true,
            width: 120,
            ...getColumnSearchProps('buildingClass'),
            dataType: "string",


        },
        {
            title: 'Площадь',
            dataIndex: 'area',
            sorter: true,
            isVisible: true,
            width: 120,


        },

        {
            title: 'На рынке?',
            dataIndex: 'isOnMarket',
            sorter: true,
            isVisible: true,
            width: 120,
            ...getBooleanColumnSearchProps('isOnMarket'),
            dataType: "boolean",
            render: renderBoolean


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
            width: 120,
            ...getColumnSearchProps('address'),
            dataType: "string",


        },
        {
            title: 'Адрес Eng',
            dataIndex: 'addressEng',
            sorter: true,
            isVisible: false,
            width: 120,
            ...getColumnSearchProps('addressEng'),
            dataType: "string",


        },
        {
            title: 'На сайте',
            dataIndex: 'showOnSite',
            sorter: true,
            isVisible: true,
            width: 120,
            ...getBooleanColumnSearchProps('showOnSite'),
            dataType: "boolean",
            render: renderBoolean


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
            width: 120,
            ...getColumnSearchProps('globalDistrict'),
            dataType: "string",


        },
        {
            title: 'Район',
            dataIndex: 'district',
            sorter: true,
            isVisible: false,
            width: 120,
            ...getColumnSearchProps('district'),
            dataType: "string",


        },


        {
            title: 'Зона',
            dataIndex: 'zone',
            sorter: true,
            isVisible: false,
            width: 120,
            ...getColumnSearchProps('zone'),
            dataType: "string",


        },

        {
            title: 'Субрынок',
            dataIndex: 'subMarket',
            sorter: true,
            isVisible: false,
            width: 120,
            ...getColumnSearchProps('subMarket'),
            dataType: "string",


        },
        {
            title: 'Налоговая',
            dataIndex: 'taxOffice',
            sorter: true,
            ...getColumnSearchProps('taxOffice'),
            dataType: 'number',
            isVisible: true,
            width: 120,


        },

        {
            title: 'Метро 1',
            dataIndex: 'station1',
            sorter: true,
            isVisible: true,
            width: 120,
            ...getColumnSearchProps('station1'),
            dataType: "string",


        },
        {
            title: 'Метро 2',
            dataIndex: 'station2',
            sorter: true,
            isVisible: true,
            width: 120,
            ...getColumnSearchProps('station2'),
            dataType: "string",


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
            isVisible: true,
            ...getColumnSearchProps('taxOffice'),
            dataType: 'number',

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
            width: 120,
            ...getColumnSearchProps('currency'),
            dataType: "string",


        },

    ];

    const [columns, setColumns] = useState(defaultColumns);
    const [buildingsList, setBuildingsList] = useState<any[] | null>(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalItems, setTotalItems] = useState(100);
    const [isDataLoading, setIsDataLoading] = useState(false);

    const [sortParams, setSortParams] = useState<any | null>(null)

    useEffect(() => {
        const getBuildings = async () => {


            let filterString = ``;
            console.log(filters)
            for (let filter in filters) {

                const col = defaultColumns.find(el => el.dataIndex === filter);
                if (!col) {
                    continue;
                }


                /*
                * range number
                * select
                * metro
                * date
                * */

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

            console.log(filterString)
            // if(buildingsList === null){
            let sortString = '';
            if (sortParams && sortParams.order) {
                sortString = `&sort=${sortParams.field},${sortParams.order === 'descend' ? 'DESC' : 'ASC'}`
            }
            setIsDataLoading(true)
            // const res = await Api.get(`/objects?take=${pageSize}&skip=${(pageNumber-1)*pageSize}${sortString}`)
            const res = await Api.get(`/objects?page=${pageNumber}&limit=${pageSize}${sortString}${filterString}`)
            if (res?.data?.data) {
                setBuildingsList(res.data.data)
                setTotalItems(res.data.total)
                console.log(res.data)

            }
            setIsDataLoading(false)
            // }
        }

        getBuildings();


    }, [pageNumber, pageSize, sortParams, filters]);
    const [selectedRows, setSelectedRows] = useState<number[]>([])
    const onRowsSelected = (ids: number[]) => {
        setSelectedRows(ids)
    }
    return <MainLayout>

        <Title title={'Объекты'}>
            <ObjectSubMenu
                onColsChanged={cols => {
                    setColumns(cols)
                }}
                columns={columns}
                selectedRows={selectedRows}/>
        </Title>

        <ObjectsList
            // columns={columns.filter(el=>el.isVisible)}
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
            isDataLoading={isDataLoading}
            currentPage={pageNumber}
            totalItems={totalItems}
            onRowClick={(id: any) => {
                router.push(`/objects/${id.toString()}`)
            }}
            onSortChange={(sortField, order) => {
                setSortParams({
                    field: sortField,
                    order
                });
            }}
            onRowsSelected={onRowsSelected}
        />

    </MainLayout>
}

export default ObjectPage