import {useRef, useState} from "react";
import {Map, Placemark, SearchControl, YMaps} from "react-yandex-maps";
import {Form} from "antd";

interface MapSelectorProps {
    onSelected: (addressLine: string, coords: any[]) => void
    initialPoint: any
}

const MapSelector = (props: MapSelectorProps)=>{
    const [addressLine, setAddressLine] = useState()
    const [coords, setCoords] = useState<any[]>()
    const mapState = {
        center: (props.initialPoint[0] && props.initialPoint[1]) ? props.initialPoint : [55.770223, 37.594611],
        zoom: 16
    };

    const searchRef = useRef(null);

    return <div style={{marginBottom: '2em'}}>
        <h3>Локация объекта</h3>
        <YMaps query={{
            apikey: "fadec2a9-1f11-4c28-97fc-2bbb59cddbc3",
            lang: "ru_RU",
            // load: "package.full",
        }}>
            <Map width={'100%'} height={400} defaultState={mapState}>
                <SearchControl options={{
                    // float: 'right'
                    // noPlacemark: true

                }}
                               instanceRef={ref => {
                                   if (ref) {
                                       // @ts-ignore
                                       searchRef.current = ref;
                                       const searchControl = searchRef.current
                                       // @ts-ignore
                                       searchControl.events.add('resultselect', params=>{
                                           const selected = params.get('index');
                                           // @ts-ignore
                                           const results = searchControl.getResultsArray()
                                           const result = results[selected]
                                           const addressLine = result.getAddressLine();
                                           const coords = result.geometry.getCoordinates();
                                           setAddressLine(addressLine)
                                           setCoords(coords)
                                           props.onSelected(addressLine, coords)
                                       })
                                   }
                               }}
                />
                {props.initialPoint[0] && props.initialPoint[1] &&
                <Placemark geometry={props.initialPoint} />

                }
            </Map>
        </YMaps>

        {/*{addressLine && coords &&*/}
        {/*    <>*/}
        {/*        Выбран адрес:*/}
        {/*        {addressLine && <span>{addressLine}</span>}*/}
        {/*        {coords && <span>{coords.toString()}</span>}*/}
        {/*    </>*/}
        {/*}*/}
    </div>
}

export default MapSelector