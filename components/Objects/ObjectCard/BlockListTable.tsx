import React, {useState} from "react";
import {Table} from "antd";
import {ColumnsType} from "antd/es/table";
import classes from "./BlockListTable.module.scss"
import {BlockInterface} from "../../../interfaces/BlockInterface";
import {formatNumber} from "../../../utils/utils";


interface BlockListTableProps {
    blocks: BlockInterface[]
    onRowClick: (id: number)=>void
    onRowsSelected: (ids: number[])=>void
}

const BlockListTable = (props: BlockListTableProps)=>{

    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const onSelectChange = (selectedRowKeys: any) => {
        setSelectedRowKeys(selectedRowKeys)
        props.onRowsSelected(selectedRowKeys)
    };
    const columns: ColumnsType<BlockInterface> = [
        {
            title: 'На рынке',
            dataIndex: 'isOnMarket',
            sorter: (a, b) => {
                const x = a.isOnMarket === 'есть на рынке';
                const y = b.isOnMarket === 'есть на рынке';
                return Number(x) - Number(y);

            },
            render: (val, record, index) => {
                return <>{record.isOnMarket === 'есть на рынке' ? "✅" : "🚫"}</>
            }
            // sortDirections: ['descend'],
        },{
            title: 'Пл.м²',
            dataIndex: 'area',
            sorter: (a, b) => parseInt(a.area.toString()) - parseInt(b.area.toString()),
            // sortDirections: ['descend'],
        },
        {
            title: 'Этаж',
            dataIndex: 'floor',
            // defaultSortOrder: 'descend',
            sorter: (a, b) => a.floor-b.floor
        },
        {
            title: 'Отделка',
            dataIndex: 'finishing',
            width: 120,
            sorter: (a, b) => (a.finishing || "").localeCompare(b.finishing)
            

        },
        {
            title: 'Тип реализации',
            dataIndex: 'realisationType',
            sorter: (a, b) => a.realisationType.localeCompare(b.realisationType),
            render: (val, record, index) => {
                return <>{(val === 'rent') ? "аренда" : val === 'subRent' ? 'субаренда' : "продажа"}</>
            }


        },
        {
            title: 'Ставка',
            dataIndex: 'rentPrice',
            sorter: (a, b) => {
                const aPrice = a.realisationType === 'rent' ? a.rentPrice : a.salePrice;
                const bPrice = b.realisationType === 'rent' ? b.rentPrice : b.salePrice;
                return parseInt((aPrice || 0)?.toString()) - parseInt((bPrice || 0)?.toString())},
            render: (val, record, index) => {
                const price = record.realisationType === 'rent' ? record.rentPrice : record.salePrice;
                return <>{Math.round(price)}</>
            }


        },
        {
            title: 'Налоги',
            dataIndex: 'taxIncluded',
            sorter: (a, b) => {
                const aTax = a.realisationType === 'rent' ? (a.taxIncluded ? a.taxIncluded.toString() : '') : (a.ndsSale ? a.ndsSale.toString() : '');
                const bTax = b.realisationType === 'rent' ? (b.taxIncluded ? b.taxIncluded.toString() : '') : (b.ndsSale ? b.ndsSale.toString() : '');
                return aTax.localeCompare(bTax)
                },
            render: (val, record, index) => {
                const tax = record.realisationType === 'rent' ? record.taxIncluded : record.ndsSale;
                return <>{(tax && tax!=="null")  ? tax : "–"}</>
            }


        },
        {
            title: 'OPEX',
            dataIndex: 'opex',
            sorter: (a, b) => a.opex.localeCompare(b.opex),
            render: (val, record, index) => {
                return <>{val} {record.opexPrice ? `(${formatNumber(parseInt(record.opexPrice))})` : ""}</>
            }
        },
        {
            title: 'Фото?',
            dataIndex: 'picsQnt',
            sorter: (a, b) => a.picsQnt > b.picsQnt ? 1 : -1,
            render: (val, record, index) => {
                const plans = record.pics.filter((pic: any) => pic.isPlan === true)
                return <>{record.pics.length > 0 && record.pics.length > plans.length ? "✅" : "🚫"}</>
            }
        },
        {
            title: 'Циан?',
            dataIndex: 'cianDescription',
            sorter: (a, b) => {
                const alength = a.cianDescription?.length || 0;
                const blength = b.cianDescription?.length || 0;
                return   (alength > blength) ? 1 : -1;
            },
            render: (val, record, index) => {
                return <>{(val || "").length > 0 ? "✅" : "🚫"}</>
            }
        },
        {
            title: 'Yand?',
            dataIndex: 'yandexDescription',
            sorter: (a, b) => {
                const alength = a.yandexDescription?.length || 0;
                const blength = b.yandexDescription?.length || 0;
                return   (alength > blength) ? 1 : -1;
            },
            render: (val, record, index) => {
                return <>{(val || "").length > 0 ? "✅" : "🚫"}</>
            }
        },
        {
            title: 'Тип блока',
            dataIndex: 'blockType',
            sorter: (a, b) => {
                const aBlock = a.blockType ? a.blockType.toString() : '';
                const bBlock = b.blockType ? b.blockType.toString() : '';
                return aBlock.localeCompare(bBlock)
            },
            render: (val, record, index) => {
                return <>{val || "–"}</>
            }


        },
    ];


    const data = props.blocks.map(block=>{
        return {
            key: block.id,
            ...block
        }
    })

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    return <div className={classes.BlockListTable}>
        <Table
            rowSelection={rowSelection}
            columns={columns}
            className={classes.Table}
            dataSource={data}
            pagination={false}
            rowClassName={(record: BlockInterface, index) => {
                const daysDiff = Math.floor((Date.now() - new Date(record.updatedAt).getTime()) / 86400000);
                // @ts-ignore
                const className =  record.isOnMarket === 'есть на рынке' ?  (daysDiff > 30 ? classes.YelowRow : classes.GreenRow) : classes.RedRow;
                return className;
            }}
            onRow={(record)=>{
                return {
                    onClick: event => {
                        props.onRowClick(record.id);
                    }, // click row
                };
            }}
        />
    </div>
}

interface DataType {
    key: React.Key;
}

export default BlockListTable;