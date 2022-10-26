import React from "react";
import {Table} from "antd";
import {ColumnsType} from "antd/es/table";
import classes from "./BlockListTable.module.scss"
import {BlockInterface} from "../../../interfaces/BlockInterface";


interface BlockListTableProps {
    blocks: BlockInterface[]
    onRowClick: (id: number)=>void
}

const BlockListTable = (props: BlockListTableProps)=>{

    const columns: ColumnsType<BlockInterface> = [
        {
            title: 'Площадь',
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
            sorter: (a, b) => a.finishing.localeCompare(b.finishing)

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
            title: 'Ставка аренды',
            dataIndex: 'rentPriceAmount',
            sorter: (a, b) => parseInt((a.rentPriceAmount || 0)?.toString()) - parseInt((b.rentPriceAmount || 0)?.toString())


        },
        {
            title: 'НДС аренда',
            dataIndex: 'ndsRent',
            sorter: (a, b) => a.ndsRent.localeCompare(b.ndsRent),
            render: (val, record, index) => {
                return <>{(val && val!=="null")  ? val : "–"}</>
            }


        },
        {
            title: 'OPEX',
            dataIndex: 'opex',
            sorter: (a, b) => a.opex.localeCompare(b.opex)


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
            dataSource={data}
            pagination={false}
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