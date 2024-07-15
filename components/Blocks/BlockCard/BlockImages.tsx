import {Upload, Button, Spin, Tooltip, Progress, Modal, notification} from 'antd';
import {
  UploadOutlined,
  DoubleLeftOutlined,
  DoubleRightOutlined,
  RotateRightOutlined,
  SaveFilled
} from '@ant-design/icons';
import {HTML5Backend} from 'react-dnd-html5-backend';
import {DndProvider, useDrag, useDrop} from 'react-dnd';
import React, {useCallback, useEffect, useState} from "react";
import {ImageInterface} from "../../../interfaces/ImageIntarface";
import update from 'immutability-helper';
import axios from "axios";
import Api from "../../../services/Api";
import classes from "./BlockCard.module.scss"
import { OrderMapItem } from '../../Objects/ObjectCard/BldImages';
import Lightbox, { ImagesListType } from "react-spring-lightbox";
import {fontSize} from "html2canvas/dist/types/css/property-descriptors/font-size";

const type = 'DragableUploadList';

const DragableUploadListItem = (params: { originNode: any, moveRow: any, file: any, fileList: any, openFullScreen: (index: number)=>void }) => {
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

const BlockImages = (props: { modelData: any, isPlans?: boolean }) => {

  const [fileList, setFileList] = useState([]);
  const [progress, setProgress] = useState(0);
  const [isOrderUpdating, setIsOrderUpdating] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [degrees, setDegrees] = useState(0);
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
    const imgArray = Array.from(document.getElementsByClassName('lightbox-image') as HTMLCollectionOf<HTMLElement>)
    if (imgArray[currentImageIndex]) {
      imgArray.map((el, index) => {
        if (index !== currentImageIndex) {
          el.style.transform = `rotate(0deg)`
        }
      })
      imgArray[currentImageIndex].style.transform = `rotate(${degrees}deg)`
    }
  }, [degrees])

  const updateImageDegrees = async () => {
    const file = images[currentImageIndex];
    if (file && degrees !== 0) {

      const newImg = await Api.rotateImage(file.id, degrees);
      images[currentImageIndex].url = newImg.url;
      notification.success({
        message: `Изображение сохранено`,
        placement: 'bottomRight'
      });
    }
  }

  useEffect(() => {
    if(!props.isPlans){
      const pics = (props?.modelData?.pics || []).filter((el: ImageInterface)=>!el.isPlan).map((item: ImageInterface, index: number) => {
        return {
          id: item.id,
          uid: item.key,
          name: `${item.entityType}#${item.entityId} (${+index+1})`,
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
          name: `${item.entityType}#${item.entityId} (${+index+1})`,
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

        const orderMap = updated.map((el: any, index)=>{
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

  const [currentImageIndex, setCurrentIndex] = useState(0);

  if (!props.modelData) {
    return <Spin/>
  }





  const gotoPrevious = () => {setDegrees(0); currentImageIndex > 0 && setCurrentIndex(currentImageIndex - 1);}

  const images: any[] = props?.modelData?.pics;
  const gotoNext = () =>
  { setDegrees(0); currentImageIndex + 1 < images.length && setCurrentIndex(currentImageIndex + 1);}

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
                  openFullScreen={(index: number)=>{
                    if(props.isPlans){
                      const qnt  = (props?.modelData?.pics || []).filter((el: ImageInterface)=>!el.isPlan).length
                      setCurrentIndex(qnt + index);
                    }else{
                      setCurrentIndex(index);
                    }

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
            wrapperClassName={'LightboxWrapper'}
            isOpen={isFullscreen}
            onPrev={gotoPrevious}
            onNext={gotoNext}
            images={images.map((image) => {
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
            renderFooter={() => (
                <div
                    className={classes.RotateIcon}
                >
                    <RotateRightOutlined style={{ fontSize: '300%', marginRight: '30px', marginBottom: '30px'}} onClick={() => setDegrees(degrees === 270 ? 0 : degrees + 90)} />
                    <Button icon={<SaveFilled />} disabled={degrees === 0} onClick={updateImageDegrees}>Сохранить</Button>
                </div>
            )}
        />
    )}
    </div>
};

export default BlockImages


