import { Button, Form, Modal } from "antd";
import { useRef, useState } from "react";
import { Map, YMaps, ZoomControl, Polygon } from "@pbe/react-yandex-maps";
import styles from "./SimpleSearch.module.scss";
import { Controller } from "react-hook-form";
import { useFormFilter } from "./context";

type Coordinates = [number, number][];

export const PolygonMap = ({
    value = [],
    onChange,
}: {
    value?: Coordinates;
    onChange?: (value: number[][]) => void;
}) => {
    const [visible, setVisible] = useState(false);
    const polygon = useRef<any>(null);
    const onOk = () => {
        if (!polygon.current) {
            return;
        }
        const coords = polygon.current.geometry.getCoordinates()[0];
        onChange?.(coords);
        setVisible(false);
    };

    const onCancel = () => {
        setVisible(false);
    };

    const onClear = () => {
        onChange?.([]);
    };

    const instanceRef = (ref: any) => {
        if (ref) {
            polygon.current = ref;
            ref.editor.startDrawing();
        }
    };

    const showModal = () => {
        setVisible(true);
    };

    return (
        <>
            <Button
                style={{
                    borderColor: "blueviolet",
                }}
                type="dashed"
                onClick={showModal}
            >
                Выбрать участок {value.length > 3 ? "✅" : ""}
            </Button>
            <Modal
                width={"90vw"}
                title="Выбор участка на карте"
                visible={visible}
                footer={null}
                onCancel={onCancel}
            >
                <YMaps>
                    <Map
                        instanceRef={(ref) => {
                            // @ts-ignore
                            ref && ref.behaviors.disable("scrollZoom");
                        }}
                        defaultState={{
                            center: [55.75, 37.57],
                            zoom: 14,
                        }}
                        modules={["geoObject.addon.editor"]}
                        width={"100%"}
                        height={"60vh"}
                    >
                        <ZoomControl />
                        <Polygon
                            instanceRef={instanceRef}
                            geometry={[value]}
                            options={{
                                // @ts-ignore
                                editorDrawingCursor: "crosshair",
                                editorMaxPoints: 10,
                                opacity: 0.2,
                                draggable: true,
                                fillColor: "#0000FF",
                                // Цвет обводки.
                                strokeColor: "#0000FF",
                                // Ширина обводки.
                                strokeWidth: 5,
                            }}
                        />
                    </Map>
                </YMaps>
                <div className={styles.space}>
                    <Button onClick={onClear} disabled={!value.length}>
                        Очистить
                    </Button>
                    <Button onClick={onOk} type="primary">
                        Применить
                    </Button>
                </div>
            </Modal>
        </>
    );
};

export const PolygonField = () => {
    const { control } = useFormFilter();
    return (
        <Form.Item>
            <Controller
                name="polygon"
                control={control}
                render={({ field }) => (
                    <PolygonMap value={field.value} onChange={field.onChange} />
                )}
            />
        </Form.Item>
    );
};
