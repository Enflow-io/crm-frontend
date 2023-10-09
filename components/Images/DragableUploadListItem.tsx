import React from "react";
import {useDrag, useDrop} from "react-dnd";
import {Tooltip} from "antd";
const type = 'DragableUploadList';

export const DragableUploadListItem = (params: { originNode: any, moveRow: any, file: any, fileList: any, openFullScreen: (index: number)=>void }) => {
    const {originNode, moveRow, file, fileList} = params;
    const ref = React.useRef();
    const index = fileList.indexOf(file);
    const [{isOver, dropClassName}, drop] = useDrop({
        accept: type,
        collect: monitor => {
            const {index: dragIndex} = monitor.getItem() || {};
            if (dragIndex === index) {
                return {};
            }
            return {
                isOver: monitor.isOver(),
                dropClassName: dragIndex < index ? ' drop-over-downward' : ' drop-over-upward',
            };
        },
        drop: (item: any) => {
            moveRow(item.index, index);
        },
    });
    const [, drag] = useDrag({
        type,
        item: {index},
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        }),
    });
    drop(drag(ref));
    const errorNode = <Tooltip title="Upload Error">{originNode.props.children}</Tooltip>;
    return (
        <div
            // @ts-ignore
            ref={ref}
            className={`ant-upload-draggable-list-item ${isOver ? dropClassName : ''}`}
            style={{cursor: 'move'}}
            onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();

                // Чтобы не реагировало на кнопку "удалить"
                // @ts-ignore
                if(e.target.tagName !== 'svg'){
                    params.openFullScreen(index);
                }
                
            }}
        >
            {file.status === 'error' ? errorNode : originNode}
        </div>
    );
};