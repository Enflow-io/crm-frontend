import Api from "../../services/Api";
import {useEffect, useState} from "react";
import {UserListInterface} from "../../interfaces/UserListInterface";
import {Spin, Checkbox, notification} from "antd";
import {ListsUpdated} from "../../effects/lists.effects";
import {BuildingInterface} from "../../interfaces/BuildingInterface";
import {BlockInterface} from "../../interfaces/BlockInterface";

interface BlocksListsSelectorProps {
    blockId: number | number[]
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

        if (Array.isArray(props.blockId)) {

            const res = await Api.toggleBlocksInlist(listId, props.blockId)

            const idsArr = res.data.blocks.map((el: BlockInterface)=>el.id)

            const isInList = props.blockId.every((el)=>{
                return idsArr.includes(el)
            })


            if(isInList){
                notification.success({
                    message: `Блоки добавлены в список`,
                    placement: 'bottomRight'
                });
            }else{
                notification.success({
                    message: `Блоки удалены из списка`,
                    placement: 'bottomRight'
                });
            }


        } else {
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
                let isChecked = false;
                if(Array.isArray(props.blockId)){
                    const idsArr = (item?.blocks || []).map((el: BlockInterface)=>el.id)

                    isChecked = props.blockId.every((el)=>{
                        return idsArr.includes(el)
                    })
                }else{
                    isChecked = (item?.blocks || []).map(blc => blc.id).includes(props.blockId);

                }

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