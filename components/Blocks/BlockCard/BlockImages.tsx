import {Upload, Button, Spin, Tooltip, Progress, Modal, notification} from 'antd';
import {UploadOutlined} from '@ant-design/icons';
import {HTML5Backend} from 'react-dnd-html5-backend';
import {DndProvider, useDrag, useDrop} from 'react-dnd';
import React, {useCallback, useEffect, useState} from "react";
import {ImageInterface} from "../../../interfaces/ImageIntarface";
import update from 'immutability-helper';
import axios from "axios";
import Api from "../../../services/Api";
import classes from "./BlockCard.module.scss"
import { OrderMapItem } from '../../Objects/ObjectCard/BldImages';


const type = 'DragableUploadList';

const DragableUploadListItem = (params: { originNode: any, moveRow: any, file: any, fileList: any }) => {
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
            className={`ant-upload-draggable-list-item ${isOver ? dropClassName : ''} ${classes.ListItem}`}
            style={{cursor: 'move'}}
        >
            {file.status === 'error' ? errorNode : originNode}
        </div>
    );
};

const BlockImages = (props: { modelData: any, isPlans?: boolean }) => {

    const [fileList, setFileList] = useState([]);
    const [progress, setProgress] = useState(0);
    const [isOrderUpdating, setIsOrderUpdating] = useState(false);

    const updateFilesOrder = async (ordersMap: OrderMapItem[], firstImg: ImageInterface) => {
        setIsOrderUpdating(true);
        await Api.updateFilesOrder(ordersMap);

        notification.success({
            message: `Порядок изображений обновлен`,
            placement: 'bottomRight'
        });
        setIsOrderUpdating(false);

        // await props.mainImageUpdated(firstImg.url)
        
    }

    useEffect(() => {
        if(!props.isPlans){
            const pics = (props?.modelData?.pics || []).filter((el: ImageInterface)=>!el.isPlan).map((item: ImageInterface, index: number) => {
                return {
                    id: item.id,
                    uid: item.key,
                    name: `${item.entityType}#${item.entityId} (${index})`,
                    url: item.url,
                    status: 'done'

                }
            });
            setFileList(pics)

        }else{
            const pics = (props?.modelData?.pics || []).filter((el: ImageInterface)=>el.isPlan).map((item: ImageInterface, index: number) => {
                return {
                    id: item.id,
                    uid: item.key,
                    name: `${item.entityType}#${item.entityId} (${index})`,
                    url: item.url,
                    status: 'done'

                }
            });
            setFileList(pics)

        }


    }, [props.modelData])


    const moveRow = useCallback(
        (dragIndex: any, hoverIndex: any) => {
            const dragRow = fileList[dragIndex];

            const updated = update(fileList, {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, dragRow],
                ],
            })


            setFileList(updated);

            const orderMap = updated.map((el, index)=>{
                return {
                    id: el.id,
                    order: index
                }
            })

            updateFilesOrder(orderMap, updated[0])
        },
        [fileList],
    );


    // @ts-ignore
    const onChange = ({fileList: newFileList}) => {

        setFileList(newFileList);
    };

    const uploadImage = async (options: any) => {
        const {onSuccess, onError, file, onProgress} = options;

        const fmData = new FormData();
        const config = {
            headers: {"content-type": "multipart/form-data"},
            onUploadProgress: (event: any) => {
                const percent = Math.floor((event.loaded / event.total) * 100);
                setProgress(percent);
                if (percent === 100) {
                    setTimeout(() => setProgress(0), 1000);
                }
                onProgress({percent: (event.loaded / event.total) * 100});
            }
        };
        fmData.append("file", file);
        fmData.append("entityName", "block");
        fmData.append("entityId", props.modelData.id);
        if(props.isPlans){
            fmData.append("isPlan", "true");

        }

        try {
            const res = await axios.post(
                Api.apiUrl + "/files/attach-file",
                fmData,
                config
            );

            onSuccess("Ok");
            console.log("server res: ", res);
        } catch (err) {
            console.log("Eroor: ", err);
            const error = new Error("Some error");
            onError({err});
        }
    };

    if (!props.modelData) {
        return <Spin/>
    }


    return <div className={isOrderUpdating ? classes.isOrderUpdating : undefined}>
        <DndProvider backend={HTML5Backend}>
            <Upload
                // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture"
                multiple={true}
                customRequest={uploadImage}
                // @ts-ignore
                defaultFileList={[...fileList]}
                onChange={onChange}
                fileList={fileList}

                onRemove={async (params) => {
                    try {
                        // @ts-ignore
                        await Api.deleteImage(params.id)
                        notification.success({
                            message: `Файл удален`,
                            placement: 'bottomRight'
                        });
                    } catch (e: any) {
                        notification.error({
                            message: `Ошибка при удалении файла: ${e.message}`,
                            placement: 'bottomRight'
                        });
                    }
                }}
                itemRender={(originNode, file, currFileList) => (
                    <DragableUploadListItem
                        originNode={originNode}
                        file={file}
                        fileList={currFileList}
                        moveRow={moveRow}
                    />
                )}
            >
                <Button icon={<UploadOutlined/>}>Upload</Button>
                {progress > 0 ? <Progress percent={progress}/> : null}
            </Upload>
        </DndProvider>

    </div>
};

export default BlockImages


