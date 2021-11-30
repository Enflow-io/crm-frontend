import { Table, Button } from 'antd';
import React, {useState} from "react";





// class ObjectsLis2t extends React.Component {
//     state = {
//         selectedRowKeys: [], // Check here to configure the default column
//         loading: false,
//     };
//
//     start = () => {
//         this.setState({ loading: true });
//         // ajax request after empty completing
//         setTimeout(() => {
//             this.setState({
//                 selectedRowKeys: [],
//                 loading: false,
//             });
//         }, 1000);
//     };
//
//
//     render() {
//
//     }
// }

interface ObjectsListProps{
    buildingsList: any[]
    columns: { title: string, dataIndex: string}[]
}
function ObjectsList(props: ObjectsListProps ) {
    const [loading, setLoading] = useState();
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const onSelectChange = (selectedRowKeys: any) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        setSelectedRowKeys(selectedRowKeys)
    };


    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
    return (
        <div>
            <div >

                    <span style={{ marginLeft: 8 }}>
            {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
          </span>
            </div>
            <Table scroll={{ y: 'calc(100vh - 382px)' }}  rowSelection={rowSelection} columns={props.columns} dataSource={props.buildingsList} />
        </div>
    );
}

export default ObjectsList
