import { Avatar, List, Tooltip } from 'antd';
import { useDrag, useDrop } from 'react-dnd';
import { BuildingInterface } from '../../interfaces/BuildingInterface';
import {
    DeleteOutlined,
    DownloadOutlined,
} from '@ant-design/icons';
import React from 'react';
import Api from '../../services/Api';
interface DragableListItemProps {
    index: number
    item: BuildingInterface
    onDelete: () => void
    onMove: (oldIndex: number, newIndex: number, item: any) => void
}
const DragableListItem = (props: DragableListItemProps) => {
    const itemBld = props.item;
    const index = props.index;
    const ref = React.useRef();

    const [{ isDragging }, drag] = useDrag(() => ({
        type: "LISTITEM",
        item: { index },
        collect: monitor => ({
            isDragging: !!monitor.isDragging(),
        }),
    }))


    const [{ isOver, dropClassName }, drop] = useDrop({
        accept: "LISTITEM",
        collect: monitor => {
            const { index: dragIndex } = monitor.getItem() || {};
            if (dragIndex === index) {
                return {};
            }
            return {
                isOver: monitor.isOver(),
                dropClassName: dragIndex < index ? ' drop-over-downward' : ' drop-over-upward',
            };
        },
        drop: (item: any) => {
            props.onMove(item.index, index, item)
            // moveRow(item.index, index);
            // alert(`Move ${item.index} to ${index}`)
        },
    });

    drop(drag(ref));
    return <div
        // @ts-ignore
        ref={ref}
        className={`ant-upload-draggable-list-item ${isOver ? dropClassName : ''}`}
        style={{ cursor: 'move' }}
    >

        <List.Item >

            <List.Item.Meta

                avatar={<Avatar size={60} src={itemBld?.pics[0]?.url} />}
                title={<div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}>
                    <a rel={'noreferrer'} href={`/objects/${itemBld.id}`}
                        target={'_blank'}>{itemBld.name}</a>
                    <div>
                        <Tooltip title="Удалить">
                            <a style={{
                                color: '#262626',

                            }}
                                onClick={async (event: any) => {

                                    await props.onDelete()


                                }
                                }
                                href={'#'}><DeleteOutlined /></a>
                        </Tooltip>
                        <Tooltip title="Скачать бриф">
                            <a onClick={(e) => {
                                e.preventDefault();
                                open(`${Api.apiUrl}/exports/one-brief/` + itemBld?.id)

                            }
                            } style={{
                                color: '#262626',
                                marginLeft: '.3em'
                            }} href='#'><DownloadOutlined /></a>
                        </Tooltip>
                    </div>
                </div>}
                description={`#${itemBld.id}, ${itemBld.address}`}
            />
        </List.Item>
    </div >
}

export default DragableListItem;