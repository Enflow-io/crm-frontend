import { Form, Space, InputNumber, Select } from "antd";
import { FC, useState, useEffect } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";

export const RentPriceField = () => {
    const [type, setType] = useState(0);
    const { control } = useFormContext();
    
    // Отслеживаем оба поля для определения правильного типа
    const fullRentPrice = useWatch({ control, name: "fullRentPrice" });
    const monthPriceAmount = useWatch({ control, name: "monthPriceAmount" });
    
    useEffect(() => {
        if (monthPriceAmount && !fullRentPrice) {
            setType(1);
        } else if (fullRentPrice && !monthPriceAmount) {
            setType(0);
        }
    }, [fullRentPrice, monthPriceAmount]);
    
    return (
        <Form.Item label="Ставка аренды">
            <Controller
                name={type === 0 ? "fullRentPrice" : "monthPriceAmount"}
                control={control}
                render={({ field }) => {
                    const [min, max] = field.value || [];
                    return (
                        <Space>
                            <InputNumber
                                min={0}
                                max={max}
                                onChange={(value) => {
                                    field.onChange([value, max]);
                                }}
                                value={min}
                                placeholder="от"
                                style={{ width: 140 }}
                            />
                            <InputNumber
                                min={min || 0}
                                onChange={(value) => {
                                    field.onChange([min, value]);
                                }}
                                value={max}
                                placeholder="до"
                                style={{ width: 140 }}
                            />
                            <Select
                                onChange={setType}
                                value={type}
                                style={{ width: 170 }}
                            >
                                <Select.Option value={0}>
                                    Полная ставка
                                </Select.Option>
                                <Select.Option value={1}>
                                    Мес. аренд. платеж
                                </Select.Option>
                            </Select>
                        </Space>
                    );
                }}
            />
        </Form.Item>
    );
};
