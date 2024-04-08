import { useEffect, useState } from "react";
import { Button, Divider, Form, Input, notification, Select, Spin, Tooltip } from "antd";
import classes from "./RentersList.module.scss";
import { replaceAt } from "../../../utils/utils";
import DateInput from "../../inputs/DateInput";
export interface Renter {
    name: string;
    map: number | undefined;
    from: string;
    to: string;
    type: string;
}
interface RentersListProps {
    renters: Renter[];
    onChangeList: (rentersList: Renter[]) => void;
}

const RentersList = ({ renters, onChangeList }: RentersListProps) => {
    const [rentersList, setRentersList] = useState<Renter[]>(renters);
    useEffect(() => {
        setRentersList(renters);
    }, [renters]);

    const onChange = (value: any, key: string, index: number) => {
        const item = rentersList[index];
        const newItem = { ...item, [key]: value };

        const newRentersList = replaceAt(rentersList, index, newItem);
        setRentersList(newRentersList);

        onChangeList(newRentersList);
    };

    const remove = (index: number) => {
        const newRentersList = rentersList.filter((_, i) => i !== index);
        setRentersList(newRentersList);
        onChangeList(newRentersList);
    };

    return (
        <>
            <Form.Item key={"rentersList"} name="rentersList" label="Арендаторы">
                <div className={classes.RentersList}>
                    {rentersList.map((renter, index) => (
                        <div className={classes.Renter} key={index}>
                            <div>
                                Имя:{" "}
                                <Input
                                    onChange={(e) => {
                                        e.preventDefault();
                                        onChange(e.target.value, "name", index);
                                    }}
                                    style={{ width: 200 }}
                                    type={"text"}
                                    value={renter.name}
                                />
                            </div>
                            <div>
                                МАП:{" "}
                                <Input
                                    onChange={(e) => {
                                        e.preventDefault();
                                        onChange(
                                            parseInt(e.target.value.replace(".", ",")),
                                            "map",
                                            index
                                        );
                                    }}
                                    style={{ width: 100 }}
                                    type={"number"}
                                    value={renter.map}
                                />
                            </div>
                            <div style={{ width: 170 }}>
                                С:{" "}
                                <DateInput
                                    value={renter.from}
                                    onChange={(dateFrom) => {
                                        onChange(dateFrom.toISOString(), "from", index);
                                    }}
                                />
                            </div>
                            <div style={{ width: 170 }}>
                                По:{" "}
                                <DateInput
                                    value={renter.to}
                                    onChange={(dateTo) => {
                                        onChange(dateTo.toISOString(), "to", index);
                                    }}
                                />
                            </div>

                            <div>
                                Тип:{" "}
                                <Select
                                    style={{ width: 150 }}
                                    defaultValue="Долгосрочный"
                                    onChange={(value) => {
                                        console.log(value);
                                    }}
                                >
                                    <Select.Option value="Долгосрочный">Долгосрочный</Select.Option>
                                    <Select.Option value="Крактосрочный">
                                        Крактосрочный
                                    </Select.Option>
                                </Select>
                            </div>
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    remove(index);
                                }}
                            >
                                -
                            </button>
                        </div>
                    ))}
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            setRentersList([
                                ...rentersList,
                                {
                                    name: "",
                                    map: undefined,
                                    from: "",
                                    to: "",
                                    type: "Долгосрочный",
                                },
                            ]);
                        }}
                    >
                        +
                    </button>
                </div>
            </Form.Item>
        </>
    );
};
export default RentersList;
