import Api from "../../services/Api";
import {useEffect, useState} from "react";
import {UserListInterface} from "../../interfaces/UserListInterface";
import {Spin, Checkbox, notification} from "antd";
import {ListsUpdated} from "../../effects/lists.effects";

interface BlocksListsSelectorProps {
    blockId: number
}

const BlockListsSelector = (props: BlocksListsSelectorProps) => {
    const [isListsLoading, setIsListsLoading] = useState(false);
    const [blocksLists, setBlocksLists] = useState<UserListInterface[]>([])

    const getLists = async () => {
        setIsListsLoading(true)

        const result = await Api.getBlocksLists();

        setBlocksLists(result.data)

        setIsListsLoading(false)
        setIsListsLoading(false)


    }

    useEffect(() => {
        getLists()
    }, [])


    const toggleItem = async (listId: number) => {
        const res = await Api.toggleBlockInlist(listId, props.blockId)

        if(res.data.blocks.map((blc:any)=>blc.id).includes(props.blockId)){
            notification.success({
                message: `Блок добавлен в список`,
                placement: 'bottomRight'
            });
        }else{
            notification.success({
                message: `Блок удален из списка`,
                placement: 'bottomRight'
            });
        }

        getLists()
        await ListsUpdated()

    }

    return <>

        <ul style={{
            marginLeft: '0em',
            paddingLeft: '0em',
            marginTop: '1em',
            listStyle: 'none'
        }}>
            {blocksLists.map((item, number) => {

                const isChecked = (item?.blocks || []).map(blc => blc.id).includes(props.blockId);
                return <li key={number}>
                    <Checkbox checked={isChecked} onChange={async () => {
                        await toggleItem(item.id)
                    }}>
                        {item.name}
                    </Checkbox>
                </li>
            })}
        </ul>
        {isListsLoading && <Spin/>}

    </>

}

export default BlockListsSelector;