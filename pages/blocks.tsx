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
        let newFilters = {
            ...oldFilters,
            [dataIndex]: selectedKeys[0]
        };
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
            title: 'Название',
            dataIndex: 'name',
            sorter: true,
            ...getColumnSearchProps('name'),
            dataType: 'string',
            isVisible: true,
            width: 120,

        },
        {
            title: 'Объект',
            dataIndex: 'building',
            sorter: false,
            dataType: 'string',
            isVisible: true,
            render: (val: any) => {
                return <>{val.name} [#{val.id}]</>
            },
            width: 170,

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
        {
            title: 'Объект',
            dataIndex: 'buildingId',
            sorter: true,
            ...getColumnSearchProps('buildingId'),
            dataType: 'string',
            isVisible: true,
            width: 120,
        },
        {
            title: 'На рынке?',
            dataIndex: 'isOnMarket',
            sorter: true,
            ...getColumnSearchProps('isOnMarket'),
            dataType: 'string',
            isVisible: true,
            width: 120,
        },
        {
            title: 'Коворкинг?',
            dataIndex: 'isCoworking',
            sorter: true,
            ...getColumnSearchProps('isCoworking'),
            dataType: 'boolean',
            isVisible: false,
            width: 120,
        },
        {
            title: 'Название (eng)',
            dataIndex: 'name-eng',
            sorter: true,
            ...getColumnSearchProps('name-eng'),
            dataType: 'string',
            isVisible: false,
            width: 120,
        },
        {
            title: 'БОМА/БТИ',
            dataIndex: 'bti',
            sorter: true,
            ...getColumnSearchProps('bti'),
            dataType: 'string',
            isVisible: false,
            width: 120,
        },
        {
            title: 'Бонусный %',
            dataIndex: 'bonusPercent',
            sorter: true,
            ...getColumnSearchProps('bonusPercent'),
            dataType: 'number',
            isVisible: false,
            width: 120,
        },
        {
            title: 'Отделка',
            dataIndex: 'finishing',
            sorter: true,
            ...getColumnSearchProps('finishing'),
            dataType: 'string',
            isVisible: false,
            width: 120,
        },
        {
            title: 'Арендатор',
            dataIndex: 'qfsdfsdfsdf',
            sorter: true,
            ...getColumnSearchProps('qfsdfsdfsdf'),
            dataType: 'number',
            isVisible: false,
            width: 120,
        },
        {
            title: 'Обесп. платеж',
            dataIndex: 'q',
            sorter: true,
            ...getColumnSearchProps('q'),
            dataType: 'number',
            isVisible: false,
            width: 120,
        },
        {
            title: 'Тип реализации',
            dataIndex: 'realisationType',
            sorter: true,
            ...getColumnSearchProps('realisationType'),
            dataType: 'string',
            isVisible: false,
            width: 120,
        },
        {
            title: 'Срок договора',
            dataIndex: 'agreementType',
            sorter: true,
            ...getColumnSearchProps('agreementType'),
            dataType: 'string',
            isVisible: false,
            width: 120,
        },
        {
            title: 'Арендн. каникулы',
            dataIndex: 'rentalHolidays',
            sorter: true,
            ...getColumnSearchProps('rentalHolidays'),
            dataType: 'number',
            isVisible: false,
            width: 120,
        },
        {
            title: 'Индексация',
            dataIndex: 'indexation',
            sorter: true,
            ...getColumnSearchProps('indexation'),
            dataType: 'number',
            isVisible: false,
            width: 120,
        },
        {
            title: 'НДС аренда',
            dataIndex: 'taxIncluded',
            sorter: true,
            ...getColumnSearchProps('taxIncluded'),
            dataType: 'string',
            isVisible: false,
            width: 120,
        },
        {
            title: 'НДС продажа',
            dataIndex: 'ndsSale',
            sorter: true,
            ...getColumnSearchProps('ndsSale'),
            dataType: 'string',
            isVisible: false,
            width: 120,
        },
        {
            title: 'Валюта',
            dataIndex: 'currency',
            sorter: true,
            ...getColumnSearchProps('currency'),
            dataType: 'string',
            isVisible: true,
            width: 120,
        },
        {
            title: 'Ставка аренды',
            dataIndex: 'rentPrice',
            sorter: true,
            ...getColumnSearchProps('rentPrice'),
            dataType: 'number',
            isVisible: true,
            width: 120,
        },
        {
            title: 'Стоимость при прод.',
            dataIndex: 'salePrice',
            sorter: true,
            ...getColumnSearchProps('salePrice'),
            dataType: 'number',
            isVisible: false,
            width: 120,
        },
        {
            title: 'Базовая ставка',
            dataIndex: 'baseRentPrice',
            sorter: true,
            ...getColumnSearchProps('baseRentPrice'),
            dataType: 'number',
            isVisible: false,
            width: 120,
        },
        {
            title: 'Мес. аренд. платеж',
            dataIndex: 'monthPriceAmount',
            sorter: true,
            ...getColumnSearchProps('monthPriceAmount'),
            dataType: 'number',
            isVisible: false,
            width: 120,
        },
        {
            title: 'Общая стоимость лота',
            dataIndex: 'fullPriceAmount',
            sorter: true,
            ...getColumnSearchProps('fullPriceAmount'),
            dataType: 'number',
            isVisible: false,
            width: 120,
        },
        {
            title: 'OPEX',
            dataIndex: 'opex',
            sorter: true,
            ...getColumnSearchProps('opex'),
            dataType: 'string',
            isVisible: true,
            width: 120,
        },
        {
            title: 'OPEX размер',
            dataIndex: 'opexPrice',
            sorter: true,
            ...getColumnSearchProps('opexPrice'),
            dataType: 'number',
            isVisible: true,
            width: 120,
        },
        {
            title: 'Коммун. расходы',
            dataIndex: 'commCosts',
            sorter: true,
            ...getColumnSearchProps('commCosts'),
            dataType: 'number',
            isVisible: false,
            width: 120,
        },
        {
            title: 'Мокрые точки',
            dataIndex: 'hasWetPoints',
            sorter: true,
            ...getColumnSearchProps('hasWetPoints'),
            dataType: 'boolean',
            isVisible: false,
            width: 120,
        },
        {
            title: 'Кухня/кофе-поинт',
            dataIndex: 'hasCafee',
            sorter: true,
            ...getColumnSearchProps('hasCafee'),
            dataType: 'boolean',
            isVisible: false,
            width: 120,
        },
        {
            title: 'Фальш-пол',
            dataIndex: 'hasFalseFloor',
            sorter: true,
            ...getColumnSearchProps('hasFalseFloor'),
            dataType: 'boolean',
            isVisible: false,
            width: 120,
        },
        {
            title: 'Потолки',
            dataIndex: 'ceilings',
            sorter: true,
            ...getColumnSearchProps('ceilings'),
            dataType: 'string',
            isVisible: false,
            width: 120,
        },
        {
            title: 'Описание для брифа',
            dataIndex: 'qffffsassbhh',
            sorter: true,
            ...getColumnSearchProps('qffffsassbhh'),
            dataType: 'string',
            isVisible: false,
            width: 120,
        },
        {
            title: 'Описание бриф ENG',
            dataIndex: 'qeeeefs',
            sorter: true,
            ...getColumnSearchProps('qeeeefs'),
            dataType: 'string',
            isVisible: false,
            width: 120,
        },
        {
            title: 'Выгрузить на сайт',
            dataIndex: 'isOnSite',
            sorter: true,
            ...getColumnSearchProps('isOnSite'),
            dataType: 'boolean',
            isVisible: true,
            width: 120,
        },
        {
            title: 'Выгрузить на cian.ru',
            dataIndex: 'isOnCian',
            sorter: false,
            ...getBooleanColumnSearchProps('isOnCian'),
            dataType: 'boolean',
            isVisible: false,
            width: 120,
            render: renderBoolean
        },
        {
            title: 'Выгр. на яндекс',
            dataIndex: 'isOnYandex',
            sorter: true,
            ...getColumnSearchProps('isOnYandex'),
            dataType: 'boolean',
            isVisible: false,
            width: 120,
        },
        {
            title: 'Выгрузить на avito',
            dataIndex: 'isOnAvito',
            sorter: true,
            ...getColumnSearchProps('isOnAvito'),
            dataType: 'boolean',
            isVisible: false,
            width: 120,
        },
        {
            title: 'Выход на рынок',
            dataIndex: 'comeToMarketDate',
            sorter: true,
            ...getColumnSearchProps('comeToMarketDate'),
            dataType: 'number',
            isVisible: false,
            width: 120,
        },
        {
            title: 'Дата создания',
            dataIndex: 'createdAt',
            sorter: true,
            ...getColumnSearchProps('createdAt'),
            dataType: 'number',
            isVisible: false,
            width: 120,
        },
        {
            title: 'Дата обновления',
            dataIndex: 'updatedAt',
            sorter: true,
            ...getColumnSearchProps('updatedAt'),
            dataType: 'number',
            isVisible: true,
            width: 120,
        },
        {
            title: 'Создав. пользователь',
            dataIndex: 'creator',
            sorter: true,
            ...getColumnSearchProps('creator'),
            dataType: 'string',
            isVisible: false,
            width: 120,
            render: (val: any)=>{
                // debugger
                return val ? val.email : "";

            }
        },
        {
            title: 'Обновл. пользователем',
            dataIndex: 'updatedBy',
            sorter: true,
            ...getColumnSearchProps('updatedBy'),
            dataType: 'string',
            isVisible: false,
            width: 120,
            render: (val: any)=>{
                // debugger
                return val ? val.email : "";
            }
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
    const [showMyBlocks, setShowMyBlocks] = useState(false)
    const [showMyEditedBlocks, setShowMyEditedBlocks] = useState(false)

    useEffect(() => {


        const getBlocks = async () => {


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

            if(showMyBlocks){
                filterString += `&showMyBlocks=1`

            }

           if(showMyEditedBlocks){
                filterString += `&showMyEditedBlocks=1`

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

        getBlocks();


    }, [pageSize, pageNumber, sortParams, filters, showMyBlocks, showMyEditedBlocks]);

    const [selectedRows, setSelectedRows] = useState<number[]>([])
    const onRowsSelected = (ids: number[]) => {
        setSelectedRows(ids)
    }
    return <MainLayout>

        <Title title={'Блоки'}>
            <BlockSubMenu
                selectedRows={selectedRows}

                onColsChanged={cols => {

                    setColumns(cols)
                }}
                columns={columns}

                showMyBlocks={showMyBlocks}
                onShowMyBlocks={(show: boolean) => setShowMyBlocks(show)}
                showMyEditedBlocks={showMyEditedBlocks}
                onShowMyEditedBlocks={(show: boolean) => setShowMyEditedBlocks(show)}
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
            onRowClick={id => {
                router.push(`/blocks/${id.toString()}`)

            }}
            onRightClick={id => {
                if (window) {
                    window?.open(`/blocks/${id?.toString()}`, '_blank')?.focus();
                }
            }}

            isDataLoading={isDataLoading}
            currentPage={pageNumber}
            totalItems={totalItems}
            onRowsSelected={onRowsSelected}

            onSortChange={(sortField, order) => {
                setSortParams({
                    field: sortField,
                    order
                });
            }}

        />

    </MainLayout>
}

export default BlockPage