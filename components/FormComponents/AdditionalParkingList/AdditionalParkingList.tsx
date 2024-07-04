import {Button, Checkbox, Divider, Form, Input, notification, Select, Spin, Tooltip} from "antd";
import React, {useEffect, useState} from "react";
import {replaceAt} from "../../../utils/utils";
import classes from "./AdditionalParkingList.module.scss";

const { Option } = Select;

export interface AdditionalParking {
    type: string;
    count: number;
    price: number;
    tax?: string;
    parkingIncluded?: boolean;
}
interface AdditionalParkingListProps {
    additionalParkingList: AdditionalParking[];
    onChangeList: (additionalParkingList: AdditionalParking[]) => void;
}

const AdditionalParkingList = ({ additionalParkingList, onChangeList }: AdditionalParkingListProps) => {
    const [additionalParkingListData, setAdditionalParkingListData] = useState<AdditionalParking[]>(additionalParkingList);
    useEffect(() => {
        setAdditionalParkingListData(additionalParkingList);
    }, [additionalParkingList]);

    const onChange = (value: any, key: string, index: number) => {
        const item = additionalParkingListData[index];
        const newItem = { ...item, [key]: value };
        const newAdditionalParkingList = replaceAt(additionalParkingListData, index, newItem);
        console.log(newAdditionalParkingList);
        setAdditionalParkingListData(newAdditionalParkingList);
        onChangeList(newAdditionalParkingList);
    };
    const remove = (index: number) => {
        const newAdditionalParkingList = additionalParkingListData.filter((_, i) => i !== index);
        setAdditionalParkingListData(newAdditionalParkingList);
        onChangeList(newAdditionalParkingList);
    };

    return (
        <>
            <Form.Item key={"additionalParkingList"} name="additionalParkingList" label="Доп. парковочные места">
                <div className={classes.AdditionalParkingList}>
                    {additionalParkingListData.map((additionalParking, index) => (
                        <div className={classes.AdditionalParking} key={index}>
                            <div>
                                Тип:{" "}
                                <Select
                                    defaultValue={additionalParking.type || "Наземный"}
                                    onChange={(value, option) => {
                                        onChange(value, "type", index);
                                    }}
                                    style={{ width: 150 }}
                                >
                                    <Option value="Наземный">Наземный</Option>
                                    <Option value="Подземный">Подземный</Option>
                                    <Option value="Многоуровневый">Многоуровневый</Option>
                                    <Option value="неизвестно">неизвестно</Option>
                                </Select>
                            </div>
                            <div>
                                Кол-во:{" "}
                                <Input
                                    onChange={(e) => {
                                        e.preventDefault();
                                        onChange(+e.target.value, "count", index);
                                    }}
                                    style={{ width: 100 }}
                                    type={"number"}
                                    value={additionalParking.count || 0}
                                />
                            </div>
                            <div>
                                Цена:{" "}
                                <Input
                                    onChange={(e) => {
                                        e.preventDefault();
                                        onChange(+e.target.value, "price", index);
                                    }}
                                    style={{ width: 90 }}
                                    type={"number"}
                                    value={additionalParking.price || 0}
                                    disabled={additionalParking?.parkingIncluded || false}
                                />
                            </div>
                            <div>
                                Вкл. в ст-ть:{" "}
                                <Checkbox
                                    checked={additionalParking?.parkingIncluded || false}
                                    onChange={(e) => {
                                        onChange(e.target.checked, "parkingIncluded", index);
                                    }}
                                    value={additionalParking.parkingIncluded || false}
                                />
                            </div>
                            <div>
                                НДС:{" "}
                                <Select
                                    defaultValue={additionalParking.tax || "Неизвестно"}
                                    onChange={(value, option) => {
                                        onChange(value, "tax", index);
                                    }}
                                    style={{ width: 120 }}
                                >
                                    <Option value="Неизвестно">Неизвестно</Option>
                                    <Option value="Включен">Включен</Option>
                                    <Option value="Не включен">Не включен</Option>
                                    <Option value="УСН">УСН</Option>
                                </Select>
                            </div>
                            <Button
                                danger
                                onClick={() => remove(index)}
                            >
                                Удалить
                            </Button>
                        </div>
                    ))}

                    <Button
                        onClick={() => {
                            setAdditionalParkingListData([...additionalParkingListData, { type: "", count: 0, price: 0 }]);
                            onChangeList([...additionalParkingListData, { type: "", count: 0, price: 0 }]);
                        }}
                    >
                        Добавить
                    </Button>
                </div>
            </Form.Item>
        </>
    );
}

export default AdditionalParkingList;