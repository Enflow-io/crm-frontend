import Api from "../../services/Api";
import {useEffect, useState} from "react";
import {UserListInterface} from "../../interfaces/UserListInterface";
import {Spin, Checkbox, notification} from "antd";
import {ListsUpdated} from "../../effects/lists.effects";

interface BuildingListsSelectorProps {
    buildingId: number
}

const BuildingListsSelector = (props: BuildingListsSelectorProps) => {
    const [isListsLoading, setIsListsLoading] = useState(false);
    const [buildingsLists, setBuildingsLists] = useState<UserListInterface[]>([])

    const getLists = async () => {
        setIsListsLoading(true)

        const result = await Api.getBuildingsLists();

        setBuildingsLists(result.data)

        setIsListsLoading(false)
        setIsListsLoading(false)


    }

    useEffect(() => {
        getLists()
    }, [])


    const toggleItem = async (listId: number) => {
        const res = await Api.toggleBuildingInlist(listId, props.buildingId)

        if(res.data.buildings.map((bld:any)=>bld.id).includes(props.buildingId)){
            notification.success({
                message: `Объект добавлен в список`,
                placement: 'bottomRight'
            });
        }else{
            notification.success({
                message: `Объект удален из списка`,
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
            {buildingsLists.map((item, number) => {

                const isChecked = (item?.buildings || []).map(bld => bld.id).includes(props.buildingId);
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

export default BuildingListsSelector;