import {useEffect, useState} from "react";
import Api from "../../../services/Api";
import {Table} from "antd";
import {useRouter} from "next/router";

interface BlocksAndBuildingsProps {
    companyId: number
}
const BlocksAndBuildings = ({companyId}: BlocksAndBuildingsProps) => {
    const [blocks, setBlocks] = useState<any[]>([])
    const [buildings, setBuildings] = useState<any[]>([])
    const router = useRouter();
    useEffect(()=> {
        if (!companyId) return
        Api.getCompanyRefs(companyId).then(data => {
            const refBlocks = data.filter((ref: any) => ref.blockId !== null)
            const refBuildings = data.filter((ref: any) => ref.blockId === null)
            setBlocks(refBlocks)
            setBuildings(refBuildings)
        })
    }, [companyId])
    const blocksTableColumns = [
        // {
        //     title: 'Блок',
        //     dataIndex: 'block',
        //     key: 'block',
        //     render: (block: any) => <a onClick={() => router.push(`/blocks/${block.id}`)}>{block?.name}</a>,
        // },
        {
            title: 'Здание',
            dataIndex: 'building',
            key: 'building',
            render: (building: any) => <a href={`/objects/${building.id}`} target={"_blank"} rel="noreferrer">{building?.name}</a>,
        },
        {
            title: 'Этаж',
            dataIndex: 'block',
            key: 'floor',
            render: (block: any) => block?.floor,
        },
        {
            title: 'Площадь',
            dataIndex: 'block',
            key: 'area',
            render: (block: any) => <a href={`/blocks/${block.id}`} target={"_blank"} rel="noreferrer">{block?.area}</a>,
        },
        {
            title: 'Тип',
            dataIndex: 'type',
            key: 'type',
            render: (type: any) => type,
        },
    ]
    const buildingsTableColumns = [
        {
            title: 'Здание',
            dataIndex: 'building',
            key: 'building',
            render: (building: any) => <a href={`/objects/${building.id}`} target={"_blank"} rel="noreferrer">{building?.name}</a>,
        },
        {
            title: 'Площадь',
            dataIndex: 'building',
            key: 'area',
            render: (building: any) => building?.area,
        },
        {
            title: 'Тип',
            dataIndex: 'type',
            key: 'type',
            render: (type: any) => type,
        },
    ]
    return <div>
        <div>Блоки</div>
        {blocks && <Table columns={blocksTableColumns} dataSource={blocks} pagination={false}/>}
        <br />
        <div>Здания</div>
        {buildings && <Table columns={buildingsTableColumns} dataSource={buildings} pagination={false}/>}
    </div>;
};
export default BlocksAndBuildings