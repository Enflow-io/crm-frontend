import MainLayout from "../components/Layout/Layout";
import Title from "../components/Layout/Title";
import {useEffect, useState} from "react";
import Api from "../services/Api";
import moment from "moment";
import {Table} from "antd";

const CianReports = () => {
    const [lastOrderInfo, setLastOrderInfo] = useState<any>(null);
    const [orders, setOrders] = useState<any>(null);
    const columns = [

        {
            title: 'Block id',
            dataIndex: 'externalId',
            render: (val: any) => {
                return <a href={`/blocks/${val}`} target={'_blank'} rel="noreferrer">{val}</a>
            }
        },
        {
            title: 'Cian ID',
            dataIndex: 'offerId',
            render: (val: any, record: any) => {
                return <a href={record.url}>{val}</a>
            }
        },
        {
            title: 'Status',
            dataIndex: 'status',
        },
        {
            title: 'Errors',
            dataIndex: 'errors',
            render: (val: any) => {
                return val.join(', \n ')
            }
        },
        {
            title: 'Warnings',
            dataIndex: 'warnings',
            render: (val: any) => {
                return val.join(', \n ')
            }
        }
    ]
    useEffect(() => {
        const fetchLastOrderInfo = async () => {
            Api.getCianLastReportInfo().then((data: any) => {
                if (data) {
                    setLastOrderInfo(data)
                }
            })
        }
        fetchLastOrderInfo()

        const fetchOrders = async () => {
            Api.getCianOrder().then((data: any) => {
                if (data?.result?.offers) {
                    setOrders(data.result.offers.sort((a: any, b: any) => a.externalId - b.externalId))
                }
            })
        }
        fetchOrders()
    }, [])
    return <MainLayout>

        <Title title={'Отчёты Cian'} />
        <div>
            Дата последней проверки фида: {lastOrderInfo?.result?.lastFeedCheckDate ?
                moment(lastOrderInfo?.result?.lastFeedCheckDate).format('DD.MM.YYYY HH:mm')
                : '-'
            }
        </div>
        <div>
            Дата последней обработки фида: {lastOrderInfo?.result?.lastProcessDate ?
                moment(lastOrderInfo?.result?.lastProcessDate).format('DD.MM.YYYY HH:mm')
                : '-'
            }
        </div>
        <div>
            <Table
                dataSource={orders}
                columns={columns}
                rowKey="offerId"

            ></Table>
        </div>
    </MainLayout>
}

export default CianReports;