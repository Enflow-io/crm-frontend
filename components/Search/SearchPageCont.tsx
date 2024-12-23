import React, { useEffect, useState } from "react";
import QueryBuilder from "./QueryBuilder";
import MainLayout from "../Layout/Layout";
import styles from "./Search.module.scss";
import {
    Badge,
    Button,
    Checkbox,
    Dropdown,
    Menu,
    Modal,
    Space,
    Spin,
    Table,
    TableColumnsType,
    Tabs,
} from "antd";
import Icon, { SearchOutlined, DownOutlined } from "@ant-design/icons";
import Api from "../../services/Api";
import { BuildingInterface } from "../../interfaces/BuildingInterface";
import { BlockCols, BuildingCols } from "./Cols";
import Title from "../Layout/Title";
import ObjectSubMenu from "../Objects/ObjectSubMenu/ObjectSubMenu";
import SearchSubMenu from "../Objects/ObjectSubMenu/SearchSubMenu";
import {
    SimpleSearch,
    Filter as SimpleSearchFilter,
} from "./SimpleSearch/SimpleSearch";
import { useEvent } from "../../hooks/core";

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
    id: string;
    key: React.Key;
    date: string;
    name: string;
    upgradeNum: string;
}

const clearFilter = (obj: any) =>
    Object.keys(obj)
        .filter((key) => {
            if (Array.isArray(obj[key])) {
                return obj[key].length > 0;
            }
            return obj[key] !== undefined;
        })
        .reduce((acc, key) => {
            acc[key] = obj[key];
            return acc;
        }, {} as any);

const renderBoolean = (val: any) => {
    if (val === null) {
        return <>–</>;
    }
    return <>{val ? "да" : "нет"}</>;
};
const SearchPageCont = () => {
    // const configString = '{"blockQuery":{"isOnMarket":{"name":"На рынке?","type":"selectable","fieldId":"isOnMarket","options":["есть на рынке","нет на рынке","продан"],"visible":true,"value":"есть на рынке"}},"bldQuery":{"buildingClass":{"name":"Класс","type":"selectable","fieldId":"buildingClass","options":["A","B","B+","C"],"visible":true,"width":60,"value":"B"},"isOnMarket":{"name":"На рынке?","type":"boolean","fieldId":"isOnMarket","visible":true,"minWidth":110,"value":{"term":{"isOnMarket":false}}}},"bldColumns":["name","station1","address","buildingClass","area","isOnMarket","showOnSite","buildingYear","floorsQnt"],"blcColumns":["name","blockType","isOnMarket","phone","floor","area","isRent","isOnSite"]}';
    const configString = "{}";
    const parsedConfig = JSON.parse(configString);
    const [bldColumns, setBldColumns] = useState(
        parsedConfig.bldColumns ||
            BuildingCols.filter((el) => !!el.visible).map((el) => el.fieldId)
    );
    const [blcColumns, setBlcColumns] = useState(
        parsedConfig.blcColumns ||
            BlockCols.filter((el) => !!el.visible).map((el) => el.fieldId)
    );

    const expandedRowRender = (
        record: any,
        index: number,
        indent: any,
        expanded: boolean
    ) => {
        const columns: TableColumnsType<ExpandedDataType> = BlockCols.filter(
            (el) => blcColumns.includes(el.fieldId)
        ).map((el) => {
            return {
                title: el.name,
                dataIndex: el.fieldId,
                key: el.fieldId,
                render: el.type === "boolean" ? renderBoolean : undefined,
            };
        });
        return (
            <Table
                columns={columns}
                dataSource={record.blocks}
                pagination={false}
                className={`${styles.BlockTable} block-table-search`}
                key={record.id}
                onRow={(record, rowIndex) => {
                    return {
                        onContextMenu: (event) => {
                            event.preventDefault();
                            if (window) {
                                // @ts-ignore
                                window
                                    ?.open(
                                        `/blocks/${record?.id?.toString()}`,
                                        "_blank"
                                    )
                                    ?.focus();
                            }
                        },
                    };
                }}
            />
        );
    };

    // @ts-ignore
    const columns: TableColumnsType<DataType> = BuildingCols.filter((el) =>
        bldColumns.includes(el.fieldId)
    ).map((el) => {
        return {
            title: el.name,
            dataIndex: el.fieldId,
            key: el.fieldId,
            render: el.render
                ? el.render
                : el.type === "boolean"
                ? renderBoolean
                : undefined,
            width: el.minWidth ? el.minWidth : 110,
        };
    });

    const [isSettingsBldVisible, setIsSettingsBldVisible] = useState(false);
    const [isSettingsBlockVisible, setIsSettingsBlockVisible] = useState(false);

    const [results, setResults] = useState<any[]>([]);
    const [buildingsTotal, setBuildingsTotal] = useState(0);
    const [blocksTotal, setBlocksTotal] = useState(0);

    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    const [bldQuery, setBldQuery] = useState<any>(parsedConfig.bldQuery || {});
    const [blockQuery, setBlockQuery] = useState<any>(
        parsedConfig.blockQuery || {}
    );
    const [tab, setTab] = useState("advanced"); //"simple" or "advanced"
    const [simpleFilter, setSimpleFilter] = useState<
        SimpleSearchFilter | undefined
    >();

    const onSearch = useEvent(async (page = 1) => {
        setIsLoading(true);
        const queryParams: {
            building?: any;
            block?: any;
            simple?: any;
            page: number;
        } = {
            page,
        };

        if (tab === "simple") {
            queryParams.simple = simpleFilter;
        } else {
            queryParams.building = bldQuery;
            queryParams.block = blockQuery;
        }

        console.log({
            queryParams
        });

        const results = await Api.elasticSearch(queryParams);

        const formattedResults: BuildingInterface[] = [];
        for (let result of results.res.data) {
            const building = result;
            // if (result?.inner_hits?.blocks) {
            //     building.blocks = result.inner_hits.blocks.hits.hits.map((el: any) => el._source);
            // }
            formattedResults.push(building);
        }

        setIsLoading(false);

        //setBuildingsTotal(results.res.hits.total.value);
        setBuildingsTotal(results.res.count);
        //setBlocksTotal(results.res?.aggregations?.blocks_qnt?.bool_aggs?.doc_count)
        setBlocksTotal(results.res?.blocksCount);

        setResults(formattedResults);
    });

    const onSimpleFilterChange = async (data?: SimpleSearchFilter) => {
        setSimpleFilter(data ? clearFilter(data) : undefined);
        setCurrentPage(1);
        onSearch();
    };

    const onBuildingQueryChanged = (query: any) => {
        setBldQuery(query);
    };
    const onBlockQueryChanged = (query: any) => {
        setBlockQuery(query);
    };

    const onTabChange = (key: string) => {
        setTab(key);
    };

    useEffect(() => {
        const config = {
            blockQuery,
            bldQuery,
            bldColumns,
            blcColumns,
        };

        const serialized = JSON.stringify(config);
        console.log(config);
        console.log(serialized);
    }, [blockQuery, bldQuery, bldColumns, blcColumns]);

    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const onSelectChange = (selectedRowKeys: any) => {
        setSelectedRowKeys(selectedRowKeys);
        // props.onRowsSelected(selectedRowKeys)
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    return (
        <div>
            <Title title={"Поиск"}>
                <SearchSubMenu selectedRows={selectedRowKeys} />
            </Title>
            <Tabs activeKey={tab} onChange={onTabChange}>
                <Tabs.TabPane tab="Простой поиск" key="simple">
                    <SimpleSearch
                        defaultValues={simpleFilter}
                        onChange={onSimpleFilterChange}
                    />
                </Tabs.TabPane>
                <Tabs.TabPane tab="Расширенный поиск" key="advanced">
                    <div className={styles.Container}>
                        <div>
                            <div className={styles.MiniHeader}>
                                <h3>Свойства объекта</h3>
                                <a
                                    href={"#"}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setIsSettingsBldVisible(true);
                                    }}
                                >
                                    Настроить
                                </a>
                            </div>
                            <QueryBuilder
                                query={bldQuery}
                                cols={BuildingCols}
                                onQueryChanged={onBuildingQueryChanged}
                            />
                        </div>
                        <div>
                            <div className={styles.MiniHeader}>
                                <h3>Свойства блока</h3>
                                <a
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setIsSettingsBlockVisible(true);
                                    }}
                                    href={"#"}
                                >
                                    Настроить
                                </a>
                            </div>
                            <QueryBuilder
                                query={blockQuery}
                                prefix={"blocks"}
                                cols={BlockCols}
                                onQueryChanged={onBlockQueryChanged}
                            />
                        </div>

                        <div className={styles.IconCont}>
                            <Button
                                type={"primary"}
                                icon={<SearchOutlined />}
                                onClick={async () => {
                                    setCurrentPage(1);
                                    await onSearch();
                                }}
                                disabled={
                                    Object.keys(blockQuery).length === 0 &&
                                    Object.keys(bldQuery).length === 0
                                }
                            >
                                Искать
                            </Button>
                        </div>
                    </div>
                </Tabs.TabPane>
            </Tabs>

            <Modal
                title="Колонки объекта"
                visible={isSettingsBldVisible}
                onOk={() => {
                    setIsSettingsBldVisible(false);
                }}
                onCancel={() => {
                    setIsSettingsBldVisible(false);
                }}
                okText="Подтвердить"
                cancelText="Закрыть"
            >
                <Checkbox.Group
                    className={styles.CheckBoxGroup}
                    options={BuildingCols.map((column) => {
                        // const foundCol = BuildingCols.find(el=>el.fieldId === column)
                        return {
                            label: column?.name || "column",
                            value: column?.fieldId || "columnVal",
                        };
                    })}
                    value={bldColumns}
                    onChange={(params: any[]) => {
                        setBldColumns(params);
                    }}
                />
            </Modal>
            <Modal
                title="Колонки блока"
                visible={isSettingsBlockVisible}
                onOk={() => {
                    setIsSettingsBlockVisible(false);
                }}
                onCancel={() => {
                    setIsSettingsBlockVisible(false);
                }}
                okText="Подтвердить"
                cancelText="Закрыть"
            >
                <Checkbox.Group
                    className={styles.CheckBoxGroup}
                    options={BlockCols.map((column) => {
                        // const foundCol = BuildingCols.find(el=>el.fieldId === column)
                        return {
                            label: column?.name || "column",
                            value: column?.fieldId || "columnVal",
                        };
                    })}
                    value={blcColumns}
                    onChange={(params: any[]) => {
                        setBlcColumns(params);
                    }}
                />
            </Modal>

            <div className={styles.Info}>
                <i>Объектов найдено:</i> <b>{buildingsTotal}</b>,{" "}
                <i>Блоков найдено:</i> <b>{blocksTotal}</b>
            </div>
            <div className={styles.ResultsContainer}>
                <Table
                    scroll={{ y: "calc(100vh - 530px)", x: "max-content" }}
                    rowKey="id"
                    columns={columns}
                    loading={isLoading}
                    className={`${styles.BldTable} bld-table-search`}
                    // loading={{indicator: <div><Spin/></div>, spinning: props.isDataLoading}}
                    rowSelection={rowSelection}
                    onRow={(record, rowIndex) => {
                        return {
                            onContextMenu: (event) => {
                                event.preventDefault();
                                if (window) {
                                    window
                                        ?.open(
                                            `/objects/${record?.id?.toString()}`,
                                            "_blank"
                                        )
                                        ?.focus();
                                }
                            },
                        };
                    }}
                    pagination={{
                        total: buildingsTotal || 10,
                        current: currentPage,
                        pageSize: 20,
                        onChange: async (page, pageSize) => {
                            console.log("current page: ", page);
                            setCurrentPage(page);
                            await onSearch(page);
                        },
                    }}
                    expandable={{
                        expandedRowRender,
                        // defaultExpandedRowKeys: ['0']
                    }}
                    dataSource={results}
                />
            </div>
        </div>
    );
};

export default SearchPageCont;
