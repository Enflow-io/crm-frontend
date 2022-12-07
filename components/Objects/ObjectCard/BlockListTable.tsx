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
                return <>{val === 'rent' ? "аренда" : "продажа"}</>
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
            sorter: (a, b) => a.taxIncluded.localeCompare(b.taxIncluded),
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
                // @ts-ignore
                const className = record.isOnMarket === 'есть на рынке' ? classes.GreenRow : classes.RedRow;
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