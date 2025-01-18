import { useEffect, useState } from "react";
import Api from "../../../services/Api";
import { convertChanes, convertKeyToString, convertValueToString } from "../../../utils/utils";

interface IBlockHistory {
    id: number;
    message: string;
    createdAt: Date;
    meta: {
        isOnCian: boolean;
        isOnAvito: boolean;
        isOnMarket: boolean;
    };
    user: {
        id: number;
        name: string;
        lastName: string;
    }
}
const BlockUpdateHistory = (props: {id: number}) => {
    const [history, setHistory] = useState<IBlockHistory[]>([]);
    useEffect(() => {
        console.log(props.id)
        if (!props.id) {
            return;
        }
        Api.get(`/logger/history/Block/${props.id}`).then((res) => {
            setHistory(res.data)
            console.log(res.data)
        })
    }, [props.id])
    return (
        <div>
            <h2>История изменений блока {props.id}</h2>
            {history.length > 0 && (
                <div>
                    {history.map((item) => (
                        <div key={item.id}>
                            <h3>{new Date(item.createdAt).toLocaleString()} {item.user.name} {item.user.lastName}</h3>
                            { convertChanes(item.meta).map((metaItem: any) => { 
                                    return (
                                        /*<div key={Math.random()}><b>{convertKeyToString(metaItem.key)}:</b> {convertValueToString(metaItem.value, metaItem.key)}</div>*/
                                        <div key={Math.random()}><b>{convertKeyToString(metaItem.key)}</b></div>
                                    )
                                }) 
                            }
                                <hr />
                        </div>
                    ))}
                </div>
            )}
            {history.length === 0 && (
                <div>История не найдена</div>
            )}
        </div>
    );
};

export default BlockUpdateHistory;