import {Table, Button, Spin, Input, Space} from 'antd';
import React, {useRef, useState} from "react";
import { SearchOutlined } from '@ant-design/icons';


interface ObjectsListProps {
    buildingsList: any[]
    columns: { title: string, dataIndex: string }[]
    onPageChanged?: (pageNumber: number) => void
    onPageSizeChanged?: (pageNumber: number) => void
    currentPage: number
    totalItems: number
    isDataLoading: boolean
    onRowClick?: (id: any) => void
    onSortChange?: (fieldId: string, order: string) => void
    onRowsSelected: (ids: number[])=>void
    onRightClick?: (id: any) => void
}

function ObjectsList(props: ObjectsListProps) {
    const [loading, setLoading] = useState();
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);








    const onSelectChange = (selectedRowKeys: any) => {
        setSelectedRowKeys(selectedRowKeys)
        props.onRowsSelected(selectedRowKeys)

    };


    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
    return (
        <div>
            <div>

                    <span style={{marginLeft: 8}}>
            {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
          </span>
            </div>
            <Table
                scroll={{y: 'calc(100vh - 360px)', x: 'max-content'}}
                rowSelection={rowSelection}
                columns={props.columns}
                dataSource={props.buildingsList}

                rowKey="id"
                onRow={(record, rowIndex) => {
                    return {
                        onClick: event => {
                            if (props.onRowClick) {
                                props.onRowClick(record.id)
                            }
                        },
                        onContextMenu: event =>{
                            event.preventDefault()
                            if (props.onRightClick) {
                                props.onRightClick(record.id)
                            }
                        }
                    };
                }}
                loading={{indicator: <div><Spin/></div>, spinning: props.isDataLoading}}
                pagination={{
                    total: props.totalItems,
                    current: props.currentPage,
                    onChange: (page, pageSize) => {
                        console.log('current page: ', page)
                        if (props.onPageChanged) {
                            props.onPageChanged(page)
                        }
                        if (props.onPageSizeChanged) {
                            props.onPageSizeChanged(pageSize)
                        }

                    }
                }}
                onChange={(pagination, filters, sorter, extra) => {
                    console.log(sorter)

                    // @ts-ignore
                    if (sorter?.field) {
                        // @ts-ignore
                        const sortField = sorter.field
                        // @ts-ignore
                        const order = sorter.order

                        if(props.onSortChange){
                            props.onSortChange(sortField, order)
                        }
                    }
                }}
            />
        </div>
    );
}

export default ObjectsList
