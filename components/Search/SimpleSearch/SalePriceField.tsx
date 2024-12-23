import { Form, Space, InputNumber, Select } from "antd";
import { FC, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

export const SalePriceField = () => {
    const [type, setType] = useState(0);
    const { control } = useFormContext();
    return (
        <Form.Item label="Цена продажи">
            <Controller
                name={type === 0 ? "salePrice" : "fullPriceAmount"}
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
                                <Select.Option value={0}>За кв.м</Select.Option>
                                <Select.Option value={1}>
                                    За все помещение
                                </Select.Option>
                            </Select>
                        </Space>
                    );
                }}
            />
        </Form.Item>
    );
};
