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
            res.station1 = selectedStations[0]
            res.fromStation1 = fromStationsAmount[selectedStations[0]]
        } else {
            res.station1 = undefined
            res.fromStation1 = undefined
        }

        if (selectedStations[1]) {
            res.station2 = selectedStations[1]
            res.fromStation2 = fromStationsAmount[selectedStations[1]]

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
            slctd.push(modelData?.station1)
        }
        if(modelData?.station2){
            slctd.push(modelData?.station2)
        }

        setSelectedStations(slctd)

        let fromSt: any = {}

        // console.log("props.modelData", props.modelData);
        //
        if (modelData.station1) {
            fromSt[modelData.station1] = modelData.fromStation1
            // st.push({
            //     id: modelData.station1,
            //     fromAmount: modelData.fromStation1
            // })
        }

        if (modelData.station2) {
            fromSt[modelData.station2] = modelData.fromStation2

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
    return <>

        <Form.Item
            name="stations"
            label="Метро"
        >


            <Button style={{
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

        {
            // @ts-ignore
            selectedStations.map((el: string, index: number) => {

                const station = getStationsById(el);
                if (!station) {
                    return <span key={el + '_' + index}></span>
                }

                console.log(el)
                console.log(fromStationsAmount[el])
                // return <Form.Item key={index}
                //                   name={`fromMetro${index + 1}`}
                //                   label={<span style={{
                //                       // background: `rgba(${getStationColorByLabel(station.label)}, 0.3)`
                //                   }}>{station.label}</span>}
                //
                //
                // >
                return <div className={'ant-row ant-form-item'} key={index}>
                    <div className={'ant-col ant-col-5 ant-form-item-label'}>
                        <label>{station.label}</label>
                    </div>
                    <Input
                        value={fromStationsAmount[el]}
                        suffix={<span style={{fontSize: '80%'}}>минут пешком</span>}
                        style={{width: 240}}
                        type={"number"}
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


    </>
}