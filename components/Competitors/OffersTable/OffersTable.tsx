import React from "react";
import {Table} from "antd";
import {IOffer} from "../../../interfaces/Competitors";
import moment from "moment";

type Props = {
    offers: IOffer[]
}
const OffersTable = ({offers}: Props) => {
    const columns = [
        {
            dataIndex: 'cianId',
            title: 'Cian Id',
            sorter: (a: IOffer, b: IOffer) => a.cianId - b.cianId,
            render: (val: number, record: IOffer) => { return <a href={record.link} target="_blank" rel="noreferrer">{val}</a> }
        },
        {
            dataIndex: 'type',
            title: 'Тип',
            sorter: (a: IOffer, b: IOffer) => a.type.localeCompare(b.type),
        },
        {
            dataIndex: 'buildingName',
            title: 'Здание',
            sorter: (a: IOffer, b: IOffer) => a.buildingName.localeCompare(b.buildingName),
        },
        {
            dataIndex: 'buildingClass',
            title: 'Класс',
            sorter: (a: IOffer, b: IOffer) => a.buildingClass.localeCompare(b.buildingClass),
        },
        {
            dataIndex: 'square',
            title: 'Площадь, м2',
            sorter: (a: IOffer, b: IOffer) => a.square - b.square,
        },
        {
            dataIndex: 'price',
            title: 'Цена, руб',
            sorter: (a: IOffer, b: IOffer) => a.price - b.price,
            render: (val: number) => <>{val.toLocaleString('ru-RU')}</>
        },
        {
            dataIndex: 'pricePerSquare',
            title: 'Цена за м2, руб',
            sorter: (a: IOffer, b: IOffer) => a.pricePerSquare - b.pricePerSquare,
            render: (val: number) => <>{val.toLocaleString('ru-RU')}</>
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
        />
    </div>
}
export default OffersTable;