import React from "react";
import {Table} from "antd";
import {IOffer} from "../../../interfaces/Competitors";
import moment from "moment";
import classes from "./OffersTable.module.scss";

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
            render: (val: number) => <>{+val.toLocaleString('ru-RU')}</>
        },
        {
            dataIndex: 'pricePerSquare',
            title: 'Цена за м2, руб',
            sorter: (a: IOffer, b: IOffer) => {
                const aPricePerSquare = a.pricePerSquare ?? 0;
                const bPricePerSquare = b.pricePerSquare ?? 0;
                return aPricePerSquare - bPricePerSquare;
            },
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