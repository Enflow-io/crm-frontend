import { useEffect, useState } from "react";
import { Button, Divider, Form, Input, notification, Select, Spin, Tooltip } from "antd";
import classes from "./RentersList.module.scss";
import { replaceAt } from "../../../utils/utils";
export interface Renter {
    name: string;
    map: number | undefined;
}
interface RentersListProps {
    renters: Renter[];
    onChangeList: (rentersList: Renter[]) => void;
}

const RentersList = ({ renters, onChangeList }: RentersListProps) => {
    const [rentersList, setRentersList] = useState<Renter[]>(renters);

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
    }

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
                                    style={{ width: 240 }}
                                    type={"text"}
                                    value={renter.name}
                                />
                            </div>
                            <div>
                                МАП:{" "}
                                <Input
                                    onChange={(e) => {
                                        e.preventDefault();
                                        onChange(parseInt(e.target.value.replace('.', ',')), "map", index);
                                    }}
                                    style={{ width: 100 }}
                                    type={"number"}
                                    value={renter.map}

                                />
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
                            setRentersList([...rentersList, { name: "", map: undefined }]);
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
