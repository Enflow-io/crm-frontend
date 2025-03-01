import { Upload, Button, message, Progress, notification } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { InboxOutlined } from '@ant-design/icons';

import React, { useEffect, useState } from "react";
import { BuildingInterface } from "../../../interfaces/BuildingInterface";
import axios from "axios";
import Api from "../../../services/Api";
import { ImageInterface } from "../../../interfaces/ImageIntarface";
const { Dragger } = Upload;
interface BldDocsProps {
    buildingData: BuildingInterface
}

const BldDocs = (props: BldDocsProps) => {


    const [progress, setProgress] = useState(0);
    const [fileList, setFileList] = useState<any[]>([]);
    useEffect(() => {
        const docs = (props?.buildingData?.docs || []).map((item: ImageInterface, index: number) => {
            const date = new Date(item.createdAt)
            // debugger
            const dated = item.createdAt ? `${item.name} (${date.getDate()}.${date.getMonth()}.${date.getFullYear()})` : '';

            return {
                id: item.id,
                uid: item.key,
                name: dated,
                url: item.url,
                status: 'done',
                createdAt: item.createdAt
            }
        });

        console.log("DOCS", docs)
        setFileList(docs)
    }, [props])

    const uploadDoc = async (options: any) => {
        const { onSuccess, onError, file, onProgress } = options;

        const fmData = new FormData();
        const headers = await Api.getHeaders();
        const config = {
            headers: { "content-type": "multipart/form-data", ...headers },
            onUploadProgress: (event: any) => {
                const percent = Math.floor((event.loaded / event.total) * 100);
                setProgress(percent);
                if (percent === 100) {
                    setTimeout(() => setProgress(0), 1000);
                }
                onProgress({ percent: (event.loaded / event.total) * 100 });
            }
        };
        fmData.append("file", file);
        fmData.append("entityName", "building");
        fmData.append("entityId", props.buildingData.id.toString());
        fmData.append("isDoc", "true");
        try {
            const res: any = await axios.post(
                Api.apiUrl + "/files/attach-file",
                fmData,
                config
            );

            onSuccess("Ok");
            console.log("server res: ", res);
            debugger
            setFileList([...fileList, {
                id: res.data.id,
                uid: res.data.key,
                name: res.data.name,
                url: res.data.url,
                status: 'done'
            }])
        } catch (err) {
            console.log("Eroor: ", err);
            const error = new Error("Some error");
            onError({ err });
        }
    };

    const draggerProps = {
        name: 'file',
        multiple: true,
        customRequest: uploadDoc,
        onChange(info: any) {
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        onDrop(e: any) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    };
    return <div>
        <Dragger {...draggerProps}
            // accept={'.doc,.docx,.pdf'}
            fileList={fileList}
            onRemove={(async (params: any) => {

                

                try {
                    setFileList(fileList.filter((el)=>el.id!==params.id))
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
            })} 
        //  itemRender={(originNode, file)=>{
        // console.log(file)
        // return <div>{originNode} ({file.createdAt})</div>
        //  }}



        >
            <p className="ant-upload-drag-icon">
                <InboxOutlined />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
            <p className="ant-upload-hint">
                Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                band files
            </p>
            {progress > 0 ? <Progress percent={progress} /> : null}

        </Dragger>
    </div>
};

export default BldDocs