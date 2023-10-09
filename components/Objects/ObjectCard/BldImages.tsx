import {Upload, Button, Spin, notification, Progress} from 'antd';
import {UploadOutlined, DoubleLeftOutlined, DoubleRightOutlined} from '@ant-design/icons';
import React, {useCallback, useEffect, useState} from "react";
import {BuildingInterface} from "../../../interfaces/BuildingInterface";
import {ImageInterface} from "../../../interfaces/ImageIntarface";
import update from "immutability-helper";
import axios from "axios";
import Api from "../../../services/Api";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {DragableUploadListItem} from "../../Images/DragableUploadListItem";
import Lightbox from "react-spring-lightbox";
import classes from '/components/Blocks/BlockCard/BlockCard.module.scss'

interface BldImagesProps {
    buildingData: BuildingInterface
    mainImageUpdated: (imgSrc: string) => void
}
export interface OrderMapItem {
    id: number
    order: number
}

const BldImages = (props: BldImagesProps) => {
    const [fileList, setFileList] = useState<any[]>([]);
    const [progress, setProgress] = useState(0);


    const updateFilesOrder = async (ordersMap: OrderMapItem[], firstImg: ImageInterface) => {
        await Api.updateFilesOrder(ordersMap);
        await props.mainImageUpdated(firstImg.url)
        
    }

    const [isFullscreen, setIsFullscreen] = useState(false);

    useEffect(() => {
        const pics = (props?.buildingData?.pics || []).map((item: ImageInterface, index: number) => {
            return {
                id: item.id,
                uid: item.key,
                name: `${item.entityType}#${item.entityId} (${index})`,
                url: item.url,
                status: 'done'

            }
        });

        console.log("PICS", pics)
        setFileList(pics)
    }, [props.buildingData])


    const moveRow = useCallback(
         (dragIndex: any, hoverIndex: any) => {
            const dragRow = fileList[dragIndex];
            
            console.log("dragIndex", dragIndex)
            console.log("dragIndex", hoverIndex)

            const updated = update(fileList, {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, dragRow],
                ],
            })
            setFileList(
                updated,
            );


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
        fmData.append("entityName", "building");
        fmData.append("entityId", props.buildingData.id.toString());
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

    const [currentImageIndex, setCurrentIndex] = useState(0);
    if (!props.buildingData) {
        return <Spin/>
    }

    
    const gotoPrevious = () => currentImageIndex > 0 && setCurrentIndex(currentImageIndex - 1);

    const gotoNext = () =>
        currentImageIndex + 1 < images.length && setCurrentIndex(currentImageIndex + 1);
    const images: any[] = props?.buildingData?.pics;

    return <div>
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
                        
                        openFullScreen={(index: number)=>{
                            setCurrentIndex(index);
                            setIsFullscreen(true);
                        }}
                    />
                )}
            >
                <Button icon={<UploadOutlined/>}>Upload</Button>
                {progress > 0 ? <Progress percent={progress}/> : null}
            </Upload>
        </DndProvider>


        {images.length > 0 && (
                <Lightbox
                    isOpen={isFullscreen}
                    onPrev={gotoPrevious}
                    onNext={gotoNext}
                    images={images.map((image) => {
                        console.log(image)
                    
                        return {
                            src: image.url,
                            loading: "eager",
                            alt: image.name,
                        };
                    })}
                    currentIndex={currentImageIndex}
                    style={{
                        backdropFilter: "blur(5px) brightness(40%)",
                        // @ts-ignore
                        webKitBackdropFilter: "blur(5px) brightness(40%)",
                        zIndex: 4000
                    }}
                    onClose={() => setIsFullscreen(false)}
                    renderHeader={() => (
                        <div className={classes.FullscreenImageIndex}>
                            <div className={classes.ImageIndex}>
                                {currentImageIndex + 1} / {images.length}
                            </div>
                            <div
                                onClick={() => setIsFullscreen(false)}
                                className={classes.CloseIconCont}
                            >
                                <div className={classes.CloseIcon}></div>
                            </div>
                        </div>
                    )}
                    renderPrevButton={() => (
                        <div className={classes.PrevBtn} onClick={gotoPrevious}>
                            <DoubleLeftOutlined style={{ fontSize: '300%'}}  />
                        </div>
                    )}
                    renderNextButton={() => (
                        <div className={classes.NextBtn} onClick={gotoNext}>
                            <DoubleRightOutlined  style={{ fontSize: '300%'}} />
                        </div>
                    )}
                />
            )}

    </div>
};

export default BldImages