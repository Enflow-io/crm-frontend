import {allStations, getStationColorByLabel, groupedStations} from "./lines";
import {Form, Input, notification, Select} from "antd";
import React, {useEffect, useState} from "react";
import {useStateCallback} from "../../../hooks/useStateCallback";
import {Modal, Button} from 'antd';
import Scheme from "./Scheme";

const {Option, OptGroup} = Select;

interface CompactMetroInputProps {
    modelData: any
    setFieldsValue: (params: any) => void
    setStations: (res: any) => void
    dontShowFrom?: boolean
}

const getStationsById = (id: string) => {
    const foundStation = allStations.find(item => item.id === id)
    return foundStation;
}
const getStationsByName = (name: string) => {
    const foundStation = allStations.find(item => item.label.toLowerCase() === name.toLowerCase())

    return foundStation;
}


export const CompactMetroInput = (props: CompactMetroInputProps) => {

    const notShowFrom = props.dontShowFrom === true;
    const [selectedStations, setSelectedStations] = useState<string[]>([])
    const [fromStationsAmount, setFromStationsAmount] = useState<{ [id: string]: number }>({})

    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };


    useEffect(() => {
        console.log("STATE:")
        console.log(selectedStations)


        const res = selectedStations.map(el=>{
            return getStationsById(el)
        })
        console.log("RESL: ", res)
        props.setStations(res);

    }, [selectedStations])


    const handleShowError = () => {
        notification.error({
            message: 'Вы можете выбрать только 2 станции',
            placement: 'bottomRight'
        });
    }


    // @ts-ignore
    return <div id={'stations-selector'}>

        <Form.Item
            name="stations"
            label={notShowFrom ? undefined : "Метро"}
        >


            <Button id={'select-stations'} style={{
                position: "relative",
                borderColor: "blueviolet"
            }} type="dashed" onClick={showModal}>
                Выбрать станции {selectedStations.length > 0 ? `(${selectedStations.length})` : ""}
            </Button>
            <Modal width={'90vw'} title="Выбор метро" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <div style={{
                    overflow: 'scroll'
                }}>
                    <Scheme onStationsChange={(stations)=>{
                        setSelectedStations(stations)
                    }}
                            close={()=>{
                                handleOk()
                            }}
                    onError={handleShowError}
                            selectedStations={selectedStations}
                    />
                </div>
            </Modal>


            {!notShowFrom &&
            <Select
                mode="multiple"
                // size={'large'}
                placeholder="выбранные станции метро"
                disabled={true}
                value={selectedStations}
                onChange={(options: string[]) => {
                    // @ts-ignore
                    setSelectedStations(options)
//                 {/*{...(isMaxValues && {open: false, onDropdownVisibleChange: handleShowError})}*/}

                    // console.log(options)
                    // setStations(options.map((el: string) => {
                    //     return {
                    //         id: el,
                    //         fromAmount: undefined
                    //     }
                    // }))

                }}
                style={{width: 400, marginLeft: '1em'}}
            >

                {groupedStations.map((group, index) => {
                    return <OptGroup key={group.name + '_' + index} label={group.name}>
                        {group.stations.map(station => {
                            return <Option key={station.id + group.name} value={station.id}>{station.label}</Option>
                        })}
                    </OptGroup>
                })}

            </Select>
            }
        </Form.Item>

        {/*{selectedStations.toString()}*/}


    </div>
}