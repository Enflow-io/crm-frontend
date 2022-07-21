import QueryBuilder from "./QueryBuilder";
import MainLayout from "../Layout/Layout";
import React, {useState} from "react";
import styles from "./Search.module.scss";
import {Badge, Button, Dropdown, Menu, Space, Table, TableColumnsType} from "antd";
import Icon, {SearchOutlined, DownOutlined} from '@ant-design/icons';
import Api from "../../services/Api";
import {BuildingInterface} from "../../interfaces/BuildingInterface";
import {BlockCols, BuildingCols} from "./Cols";

interface DataType {
    key: React.Key;
    name: string;
    platform: string;
    version: string;
    upgradeNum: number;
    creator: string;
    createdAt: string;
}

interface ExpandedDataType {
    key: React.Key;
    date: string;
    name: string;
    upgradeNum: string;
}


const SearchPageCont = () => {
    const expandedRowRender = (record: any, index: number, indent: any, expanded: boolean) => {
        const columns: TableColumnsType<ExpandedDataType> =  BlockCols.map(el=>{
            return {title: el.name, dataIndex: el.fieldId, key: el.fieldId};
        })
        // debugger
        return <Table columns={columns} dataSource={record.blocks} pagination={false}/>;
    };

    const columns: TableColumnsType<DataType> = BuildingCols.map(el=>{
        return {title: el.name, dataIndex: el.fieldId, key: el.fieldId};
    })
    //     [
    //     {title: 'Name', dataIndex: 'name', key: 'name'},
    //     {title: 'buildingClass', dataIndex: 'buildingClass', key: 'buildingClass'},
    //     {title: 'area', dataIndex: 'area', key: 'area'},
    //     {title: 'Address', dataIndex: 'address', key: 'address'},
    // ];


    const [results, setResults] = useState<any[]>([])
    const [total, setTotal] = useState(0);
    const [bldQuery, setBldQuery] = useState<any>({});
    const [blockQuery, setBlockQuery] = useState<any>({});
    const onSearch = async ()=>{
            const results = await Api.elasticSearch(bldQuery, blockQuery);


            const formattedResults: BuildingInterface[] = [];

            for(let result of results.res.hits.hits){
                const building = result._source;
                if(result?.inner_hits?.blocks){
                    building.blocks = result.inner_hits.blocks.hits.hits.map((el: any)=>el._source);
                }
                formattedResults.push(building)
            }

            console.log(results.res.hits);
            setTotal(results.res.hits.total.value);
            setResults(formattedResults)
    }

    const onBuildingQueryChanged = (query: any) =>{
        setBldQuery(query)
    }
    const onBlockQueryChanged = (query: any) =>{
        setBlockQuery(query)

    }
    return <div>
        <div className={styles.Container}>
            <div>
                <h3>Свойства объекта</h3>
                <QueryBuilder
                    cols={BuildingCols}
                    onQueryChanged={onBuildingQueryChanged}/>

            </div>
            <div>
                <h3>Свойства блока</h3>
                <QueryBuilder
                    cols={BlockCols}
                    onQueryChanged={onBlockQueryChanged}/>

            </div>

            <div className={styles.IconCont}>
                <Button
                    type={'primary'}
                    icon={<SearchOutlined/>}
                    onClick={onSearch}
                >Искать</Button>
            </div>
        </div>
        <div className={styles.ResultsContainer}>
            <Table
                rowKey="id"
                columns={columns}
                expandable={{
                    expandedRowRender,
                    // defaultExpandedRowKeys: ['0']
                }}
                dataSource={results}
            />

        </div>
    </div>

}


export default SearchPageCont;