import React, {useRef, useState} from "react";
import {Button, Input, Space, Table, TableColumnType} from "antd";
import {IOffer} from "../../../interfaces/Competitors";
import moment from "moment";
import classes from "./OffersTable.module.scss";
import {SearchOutlined} from "@ant-design/icons";
import {FilterDropdownProps} from "antd/es/table/interface";

type Props = {
    offers: IOffer[]
}
type DataIndex = keyof IOffer;
const OffersTable = ({offers}: Props) => {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef<any>(null);
    const handleSearch = (
        selectedKeys: string[],
        confirm: FilterDropdownProps['confirm'],
        dataIndex: DataIndex,
    ) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters: () => void, confirm: FilterDropdownProps['confirm']) => {
        clearFilters();
        setSearchText('');
        confirm();
    };
    const getColumnSearchProps = (dataIndex: DataIndex): TableColumnType<IOffer> => ({
        // @ts-ignore
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters, confirm)}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({ closeDropdown: false });
                            setSearchText((selectedKeys as string[])[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered: boolean) => (
            <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
        ),
        onFilter: (value: any, record: any) => {
            const req = record[dataIndex] ? record[dataIndex].toString() : null
            return req ? req
                .toLowerCase()
                .includes((value as string).toLowerCase()) : false
        },
        // @ts-ignore
        onFilterDropdownOpenChange: (visible: any) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
    });
    const columns = [
        {
            dataIndex: 'cianId',
            title: 'Cian Id',
            sorter: (a: IOffer, b: IOffer) => a.cianId - b.cianId,
            render: (val: number, record: IOffer) => { return <a href={record.link} target="_blank" rel="noreferrer">{val}</a> },
            ...getColumnSearchProps('cianId')
        },
        {
            dataIndex: 'type',
            title: 'Тип',
            sorter: (a: IOffer, b: IOffer) => {
                const aType = a.type ?? '';
                const bType = b.type ?? '';
                return aType.localeCompare(bType);
            },
        },
        {
            dataIndex: 'buildingName',
            title: 'Здание',
            sorter: (a: IOffer, b: IOffer) => {
                const aName = a.buildingName ?? '';
                const bName = b.buildingName ?? '';
                return aName.localeCompare(bName);
            },
        },
        {
            dataIndex: 'buildingClass',
            title: 'Класс',
            sorter: (a: IOffer, b: IOffer) => {
                const aClass = a.buildingClass ?? '';
                const bClass = b.buildingClass ?? '';
                return aClass.localeCompare(bClass);
            },
        },
        {
            dataIndex: 'square',
            title: 'Площадь, м2',
            sorter: (a: IOffer, b: IOffer) => {
                const aSquare = a.square ?? 0;
                const bSquare = b.square ?? 0;
                return aSquare - bSquare;
            },
        },
        {
            dataIndex: 'price',
            title: 'Цена, руб',
            sorter: (a: IOffer, b: IOffer) => {
                const aPrice = a.price ?? 0;
                const bPrice = b.price ?? 0;
                return aPrice - bPrice;
            },
            render: (val: number) => {
                const price = +val;
                return <>{price.toLocaleString('ru-RU')}</>;
            }
        },
        {
            dataIndex: 'pricePerSquare',
            title: 'Цена за м2, руб',
            sorter: (a: IOffer, b: IOffer) => {
                const aPricePerSquare = a.pricePerSquare ?? 0;
                const bPricePerSquare = b.pricePerSquare ?? 0;
                return aPricePerSquare - bPricePerSquare;
            },
            render: (val: number) => {
                const price = +val;
                return <>{price.toLocaleString('ru-RU')}</>;
            }
        },
        {
            dataIndex: 'tax',
            title: 'Налог',
            sorter: (a: IOffer, b: IOffer) => {
                const aTax = a.tax ? a.tax : '';
                const bTax = b.tax ? b.tax : '';
                return aTax.localeCompare(bTax);
            },
        },
        {
            dataIndex: 'rentPlan',
            title: 'Тип аренды/продажи',
            sorter: (a: IOffer, b: IOffer) => {
                const aRentPlan = a.rentPlan ? a.rentPlan : '';
                const bRentPlan = b.rentPlan ? b.rentPlan : '';
                return aRentPlan.localeCompare(bRentPlan);
            },
        },
        {
            dataIndex: 'createdAt',
            title: 'Создан',
            sorter: (a: IOffer, b: IOffer) => moment(a.createdAt).diff(moment(b.createdAt)),
            render: (val: Date) => <>{moment(val).format('YYYY-MM-DD HH:mm').toString()}</>
        }
    ]
    return <div style={{marginRight: '20px', marginTop: '20px'}}>

        <Table
            dataSource={offers}
            columns={columns}
            rowKey={'id'}
            pagination={{
                total: offers.length,
                defaultCurrent: 1,
                defaultPageSize: 20,
            }}
            rowClassName={(record: IOffer, index) => {
                const daysDiff = (Date.now() - new Date(record.createdAt).getTime()) - (3600*24*1000);
                // @ts-ignore
                const className =
                     daysDiff < 0
                            ? classes.GreenRow
                            : '';
                return className;
            }}
        />
    </div>
}
export default OffersTable;