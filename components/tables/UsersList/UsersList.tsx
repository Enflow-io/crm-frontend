import {Table, Button, Spin} from 'antd';
import React, {useState} from "react";
import {updateUsersTable} from "../../../effects/user";


interface ObjectsListProps {
    buildingsList: any[]
    columns: { title: string, dataIndex: string }[]
    onPageChanged?: (pageNumber: number) => void
    onPageSizeChanged?: (pageNumber: number) => void
    currentPage: number
    totalItems: number
    isDataLoading: boolean
    onRowClick?: (id: any) => void
    onRowsSelected: (ids: number[])=>void
}

function UsersList(props: ObjectsListProps) {
    const [loading, setLoading] = useState();
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    updateUsersTable.done.watch(async ({result, params}) => {
        setSelectedRowKeys([]);
        props.onRowsSelected([])
    });

    const onSelectChange = (selectedRowKeys: any) => {
        setSelectedRowKeys(selectedRowKeys);
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
                scroll={{y: 'calc(100vh - 382px)'}}
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
                    };
                }}
                loading={{indicator: <div><Spin /></div>, spinning: props.isDataLoading}}
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
            />
        </div>
    );
}

export default UsersList
