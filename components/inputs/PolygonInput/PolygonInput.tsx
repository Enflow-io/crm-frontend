import {Map, Placemark, YMaps, ZoomControl, Polygon} from "@pbe/react-yandex-maps";
import React, {useRef, useState} from "react";
import {Button, Form, Modal} from "antd";

interface PolygonInputProps {
        onSetCoordinates: (params: any) => void
}

export const PolygonInput = (props: PolygonInputProps) => {
    const [coordinates, setCoordinates] = useState<any>([]);
    let polygon = useRef(null)
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        // @ts-ignore
        const coords = polygon.geometry.getCoordinates()[0];
        setCoordinates(coords)
        props.onSetCoordinates(coords)
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };


    const instanceRef = ((ref: any) => {
        if (ref) {
            polygon = ref;
            ref.editor.startDrawing();
            // ref.geometry.events.add('change', (e: any) => {
            //     if(e.get('newCoordinates')[0] && e.get('newCoordinates')[0].length === 0){
            //         return;
            //     }
            //
            //
            //     // setCoordinates(e.get('newCoordinates'))
            //
            //     console.log(e.get('newCoordinates'))
            // });
        }
    });
    return <>

        <Button id={'select-stations'} style={{
            position: "relative",
            borderColor: "blueviolet"
        }} type="dashed" onClick={showModal}>
            Выбрать участок {coordinates.length > 3 ? "✅" : ""}
        </Button>


        <Modal width={'90vw'}  title="Выбор участка на карте" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>

                <div style={{
                    width: "100%",
                    // overflow: "scroll",
                    height: '60vh',
                    position: "relative"
                }}>
                    <YMaps>
                        <div>
                            <button onClick={() => {

                                // @ts-ignore
                                if (!polygon || !polygon.geometry) {
                                    debugger
                                }
                                // @ts-ignore
                                const coords = polygon.geometry.getCoordinates()[0];
                                setCoordinates(coords)
                                props.onSetCoordinates(coords)

                                console.log(coords)
                            }}>Применить
                            </button>
                            <button onClick={() => {
                                setCoordinates([])
                            }
                            }>Очистить
                            </button>
                        </div>


                        <Map instanceRef={ref => {
                            // @ts-ignore
                            ref && ref.behaviors.disable('scrollZoom');
                        }}
                             defaultState={{
                                 center: [55.75, 37.57], zoom: 14,

                             }}
                             modules={["geoObject.addon.editor"]}
                             width={'100%'}
                             height={'60vh'}
                             options={{
                                 // scrollZoom: false
                             }
                             }


                        >
                            <ZoomControl
                                // options={{float: 'left'}}
                            />
                            <Polygon
                                instanceRef={instanceRef}
                                ref={polygon}
                                geometry={[coordinates]}
                                options={{
                                    // @ts-ignore
                                    editorDrawingCursor: "crosshair",
                                    editorMaxPoints: 10,
                                    opacity: 0.2,
                                    draggable: true,
                                    fillColor: '#0000FF',
                                    // Цвет обводки.
                                    strokeColor: "#0000FF",
                                    // Ширина обводки.
                                    strokeWidth: 5
                                }}
                            />
                        </Map>

                    </YMaps>


                </div>

        </Modal>



    </>
}