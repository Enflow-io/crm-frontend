import React from "react";
import {Table} from "antd";
import {ColumnsType} from "antd/es/table";
import classes from "./BlockListTable.module.scss"
import {BlockInterface} from "../../../interfaces/BlockInterface";
import {formatNumber} from "../../../utils/utils";


interface BlockListTableProps {
    blocks: BlockInterface[]
    onRowClick: (id: number)=>void
}

const BlockListTable = (props: BlockListTableProps)=>{

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
                return <>{(val === 'rent' || val === 'subRent') ? "аренда" : "продажа"}</>
            }


        },
        {
            title: 'Аренда',
            dataIndex: 'rentPrice',
            sorter: (a, b) => parseInt((a.rentPrice || 0)?.toString()) - parseInt((b.rentPrice || 0)?.toString()),
            render: (val, record, index) => {
                return <>{Math.round(val)}</>
            }


        },
        {
            title: 'НДС аренда',
            dataIndex: 'taxIncluded',
            sorter: (a, b) => {
                const aTax = a.taxIncluded ? a.taxIncluded.toString() : '';
                const bTax = b.taxIncluded ? b.taxIncluded.toString() : '';
                return aTax.localeCompare(bTax)
                },
            render: (val, record, index) => {
                return <>{(val && val!=="null")  ? val : "–"}</>
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
                return <>{val > 0 ? "✅" : "🚫"}</>
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

    return <div className={classes.BlockListTable}>
        <Table
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