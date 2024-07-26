import React, {useEffect, useState} from "react";
import Api from "../../../services/Api";
import {IFileInterface} from "../../../interfaces/FileInterface";
import {message, notification, Progress, Upload} from "antd";
import axios from "axios";
import {InboxOutlined} from "@ant-design/icons";
const { Dragger } = Upload;

type CompanyDocsProps = {
    companyId: number;
}

interface IDoc extends IFileInterface {
    status: string;
    uid: string;
}

const CompanyDocs = ({companyId}: CompanyDocsProps) => {
    const [progress, setProgress] = useState(0);
    const [docs, setDocs] = useState<IDoc[]>([])
    useEffect(()=> {
        Api.getFilesList(companyId, 'company').then(data => {
            const files: IDoc[] = data.map((item: IFileInterface) => {
                return {
                    ...item,
                    uid: item.key,
                    status: 'done',
                }
            })
            setDocs(files)
        })
    }, [companyId])

    const uploadDoc = async (options: any) => {
        const { onSuccess, onError, file, onProgress } = options;

        const fmData = new FormData();
        const config = {
            headers: { "content-type": "multipart/form-data" },
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
        fmData.append("entityName", "company");
        fmData.append("entityId", companyId.toString());
        fmData.append("isDoc", "true");
        try {
            const res: any = await axios.post(
                Api.apiUrl + "/files/attach-file",
                fmData,
                config
            );

            onSuccess("Ok");
            debugger
            setDocs([...docs, {
                ...res.data,
                uid: res.data.key,
                status: 'done'
            }])
        } catch (err) {
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
                 fileList={docs as any}
                 onRemove={(async (params: any) => {
                     try {
                         setDocs(docs.filter((el)=>el.id!==params.id))
                         console.log('Delete: ', params.id)
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
        >
            <p className="ant-upload-drag-icon">
                <InboxOutlined />
            </p>
            <p className="ant-upload-text">Нажмите или перетащате файл</p>
            {progress > 0 ? <Progress percent={progress} /> : null}
        </Dragger>
    </div>
}
export default CompanyDocs;