import QueryBuilder from "./QueryBuilder";
import MainLayout from "../Layout/Layout";
import React, {useEffect, useState} from "react";
import styles from "./Search.module.scss";
import {Badge, Button, Checkbox, Dropdown, Menu, Modal, Space, Spin, Table, TableColumnsType} from "antd";
import Icon, {SearchOutlined, DownOutlined} from '@ant-design/icons';
import Api from "../../services/Api";
import {BuildingInterface} from "../../interfaces/BuildingInterface";
import {BlockCols, BuildingCols} from "./Cols";
import Title from "../Layout/Title";
import ObjectSubMenu from "../Objects/ObjectSubMenu/ObjectSubMenu";
import SearchSubMenu from "../Objects/ObjectSubMenu/SearchSubMenu";

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

const renderBoolean = (val: any) => {
    if (val === null) {
        return <>–</>
    }
    return <>{val ? 'да' : 'нет'}</>
}
const SearchPageCont = () => {


    const configString = '{"blockQuery":{"isOnMarket":{"name":"На рынке?","type":"selectable","fieldId":"isOnMarket","options":["есть на рынке","нет на рынке","продан"],"visible":true,"value":"есть на рынке"}},"bldQuery":{"buildingClass":{"name":"Класс","type":"selectable","fieldId":"buildingClass","options":["A","B","B+","C"],"visible":true,"width":60,"value":"A"}},"bldColumns":["name","station1","address","buildingClass","area","isOnMarket","showOnSite","buildingYear","floorsQnt"],"blcColumns":["name","blockType","isOnMarket","phone","floor","area","isRent","isOnSite"]}';
    const parsedConfig = JSON.parse(configString);
    const [bldColumns, setBldColumns] = useState(parsedConfig.bldColumns || BuildingCols.filter(el => !!el.visible).map(el => el.fieldId))
    const [blcColumns, setBlcColumns] = useState(parsedConfig.blcColumns || BlockCols.filter(el => !!el.visible).map(el => el.fieldId))

    const expandedRowRender = (record: any, index: number, indent: any, expanded: boolean) => {
        const columns: TableColumnsType<ExpandedDataType> = BlockCols.filter(el => blcColumns.includes(el.fieldId)).map(el => {
            return {
                title: el.name,
                dataIndex: el.fieldId,
                key: el.fieldId,
                render: el.type === 'boolean' ? renderBoolean : undefined
            };
        })
        return <Table
            columns={columns}
            dataSource={record.blocks}
            pagination={false}
            className={`${styles.BlockTable} block-table-search`}

        />;
    };

    const columns: TableColumnsType<DataType> = BuildingCols.filter(el => bldColumns.includes(el.fieldId)).map(el => {
        return {
            title: el.name,
            dataIndex: el.fieldId,
            key: el.fieldId,
            render: el.type === 'boolean' ? renderBoolean : undefined,
            width: el.minWidth ? el.minWidth : 110
        };
    })

    const [isSettingsBldVisible, setIsSettingsBldVisible] = useState(false)
    const [isSettingsBlockVisible, setIsSettingsBlockVisible] = useState(false)

    const [results, setResults] = useState<any[]>([])
    const [total, setTotal] = useState(0);

    const [isLoading, setIsLoading] = useState(false)

    const [bldQuery, setBldQuery] = useState<any>(parsedConfig.bldQuery || {});
    const [blockQuery, setBlockQuery] = useState<any>(parsedConfig.blockQuery || {});
    const onSearch = async () => {
        setIsLoading(true)
        const results = await Api.elasticSearch(bldQuery, blockQuery);


        const formattedResults: BuildingInterface[] = [];

        for (let result of results.res.hits.hits) {
            const building = result._source;
            if (result?.inner_hits?.blocks) {
                building.blocks = result.inner_hits.blocks.hits.hits.map((el: any) => el._source);
            }
            formattedResults.push(building)
        }

        console.log(results.res.hits);
        setIsLoading(false)

        setTotal(results.res.hits.total.value);
        setResults(formattedResults)
    }

    const onBuildingQueryChanged = (query: any) => {
        setBldQuery(query)
    }
    const onBlockQueryChanged = (query: any) => {
        setBlockQuery(query)

    }


    useEffect(()=>{
        const config = {
            blockQuery,
            bldQuery,
            bldColumns,
            blcColumns
        }

        const serialized = JSON.stringify(config);
        console.log(config);
        console.log(serialized);
    }, [blockQuery, bldQuery, bldColumns, blcColumns])

    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const onSelectChange = (selectedRowKeys: any) => {
        setSelectedRowKeys(selectedRowKeys)
        // props.onRowsSelected(selectedRowKeys)

    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    return <div>
        <Title title={'Поиск'}>
            <SearchSubMenu
                selectedRows={selectedRowKeys}/>
        </Title>
        <div className={styles.Container}>
            <div>
                <div className={styles.MiniHeader}>
                    <h3>Свойства объекта</h3>
                    <a href={'#'} onClick={(e)=>{
                        e.preventDefault()
                        setIsSettingsBldVisible(true)
                    }}>Настроить</a>
                </div>
                <QueryBuilder
                    query={bldQuery}
                    cols={BuildingCols}
                    onQueryChanged={onBuildingQueryChanged}/>

            </div>
            <div>
                <div className={styles.MiniHeader}>
                    <h3>Свойства блока</h3>
                    <a onClick={(e)=>{
                        e.preventDefault()
                        setIsSettingsBlockVisible(true)
                    }} href={'#'}>Настроить</a>
                </div>
                <QueryBuilder
                    query={blockQuery}

                    prefix={'blocks'}
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

        <Modal
            title="Колонки объекта"
            visible={isSettingsBldVisible}
            onOk={() => {
                setIsSettingsBldVisible(false)
            }}
            onCancel={() => {
                setIsSettingsBldVisible(false)
            }}

            okText="Подтвердить"
            cancelText="Закрыть"
        >
            <Checkbox.Group
                className={styles.CheckBoxGroup}
                options={BuildingCols.map(column => {
                    // const foundCol = BuildingCols.find(el=>el.fieldId === column)
                    return {
                        label: column?.name || "column", value: column?.fieldId || "columnVal"
                    }
                })}

                value={bldColumns}
                onChange={(params: any[]) => {
                   setBldColumns(params)
                }}
            />

        </Modal>
        <Modal
            title="Колонки блока"
            visible={isSettingsBlockVisible}
            onOk={() => {
                setIsSettingsBlockVisible(false)
            }}
            onCancel={() => {
                setIsSettingsBlockVisible(false)
            }}

            okText="Подтвердить"
            cancelText="Закрыть"
        >
            <Checkbox.Group
                className={styles.CheckBoxGroup}
                options={BlockCols.map(column => {
                    // const foundCol = BuildingCols.find(el=>el.fieldId === column)
                    return {
                        label: column?.name || "column", value: column?.fieldId || "columnVal"
                    }
                })}

                value={blcColumns}
                onChange={(params: any[]) => {
                   setBlcColumns(params)
                }}
            />

        </Modal>

        <div className={styles.ResultsContainer}>
            <Table
                scroll={{y: 'calc(100vh - 530px)', x: 'max-content'}}
                rowKey="id"
                columns={columns}
                loading={isLoading}
                className={`${styles.BldTable} bld-table-search`}
                // loading={{indicator: <div><Spin/></div>, spinning: props.isDataLoading}}
                rowSelection={rowSelection}

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