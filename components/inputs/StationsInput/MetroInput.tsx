import {allStations, getStationColorByLabel, groupedStations} from "./lines";
import {Form, Input, notification, Select} from "antd";
import React, {useEffect, useState} from "react";
import {useStateCallback} from "../../../hooks/useStateCallback";
import {Modal, Button} from 'antd';
import Scheme from "./Scheme";

const {Option, OptGroup} = Select;

interface MetroInputProps {
    modelData: any
    setFieldsValue: (params: any) => void
    setStations: (res: any) => void
}

const getStationsById = (id: string) => {
    const foundStation = allStations.find(item => item.id === id)
    return foundStation;
}
const getStationsByName = (name: string) => {
    const foundStation = allStations.find(item => item.label.toLowerCase() === name.toLowerCase())

    return foundStation;
}


export const MetroInput = (props: MetroInputProps) => {

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
        const res: any = {}

        console.log("STATE:")
        console.log(selectedStations)
        console.log(fromStationsAmount)

        //
        if (selectedStations[0]) {

            const found = getStationsById(selectedStations[0]);
            if(found){
                res.station1 = found.label
                res.fromStation1 = fromStationsAmount[selectedStations[0]]
            }else{
                console.log("не нашлась станци с таким id", selectedStations)
            }

        } else {
            res.station1 = undefined
            res.fromStation1 = undefined
        }

        if (selectedStations[1]) {
            const found = getStationsById(selectedStations[1]);
            if(found){
                res.station2 = found.label
                res.fromStation2 = fromStationsAmount[selectedStations[1]]
            }else{
                console.log("не нашлась станци с таким id", selectedStations)
            }


        } else {
            res.station2 = undefined
            res.fromStation2 = undefined
        }

        console.log("RESL: ", res)
        props.setStations(res);

    }, [selectedStations, fromStationsAmount])


    useEffect(() => {
        let modelData = props.modelData;

        if(!modelData){
            return;
        }


        let slctd = []

        if(modelData?.station1){
            const found = getStationsByName(modelData?.station1);
            if(found){
                slctd.push(found.id)
            }
        }
        if(modelData?.station2){
            const found = getStationsByName(modelData?.station2);
            if(found){
                slctd.push(found.id)
            }
        }

        setSelectedStations(slctd)

        let fromSt: any = {}

        // console.log("props.modelData", props.modelData);
        //
        if (modelData.station1) {
            const found = getStationsByName(modelData?.station1);
            if(found){
                fromSt[found.id] = modelData.fromStation1
            }
            // st.push({
            //     id: modelData.station1,
            //     fromAmount: modelData.fromStation1
            // })
        }

        if (modelData.station2) {
            const found = getStationsByName(modelData?.station2);
            if(found){
                fromSt[found.id] = modelData.fromStation2

            }

            // st.push({
            //     id: modelData.station2,
            //     fromAmount: modelData.fromStation2
            // })
        }

        setFromStationsAmount(fromSt)



    }, [props.modelData])
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
            label="Метро"
        >


            <Button id={'select-stations'} style={{
                position: "relative",
                borderColor: "blueviolet"
            }} type="dashed" onClick={showModal}>
                Выбрать станции
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
        </Form.Item>

        {/*{selectedStations.toString()}*/}
        {
            // @ts-ignore
            selectedStations.map((el: string, index: number) => {


                const station = getStationsById(el);
                console.log("station", station)
                console.log("station", el)
                if (!station) {
                    return <span key={el + '_' + index}></span>
                }

                // return <Form.Item key={index}
                //                   name={`fromMetro${index + 1}`}
                //                   label={<span style={{
                //                       // background: `rgba(${getStationColorByLabel(station.label)}, 0.3)`
                //                   }}>{station.label}</span>}
                //
                //
                // >
                return <div className={'ant-row ant-form-item amount-list'} key={index}>
                    <div className={'ant-col ant-col-5 ant-form-item-label'}>
                        <label>{station.label}</label>
                    </div>
                    <Input
                        value={fromStationsAmount[el]}
                        suffix={<span style={{fontSize: '80%'}}>минут пешком</span>}
                        style={{width: 240}}
                        type={"number"}
                        className={'metro-station-from-amount'}
                        onChange={(input: any) => {
                            // @ts-ignore
                            setFromStationsAmount({
                                ...fromStationsAmount,
                                [el]: input.target.value
                            })

                            // const newStations = [...stations];
                            // const stationToChangeIndex = newStations.findIndex(st=>st.id === el.id);
                            // const stationToChange = newStations.find(st=>st.id === el.id);
                            //
                            // newStations[stationToChangeIndex] = {
                            //     id: stationToChange.id,
                            //     fromAmount: input.target.value
                            // }
                            //
                            // setStations(newStations)

                        }}
                    />
                </div>
                {/*</Form.Item>*/
                }
            })}


    </div>
}