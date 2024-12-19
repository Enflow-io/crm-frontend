import React, { useEffect } from "react";
import { Select } from "antd";
import { Field } from "../AbstractField";
import useSWR from "swr";
import Api from "../../../services/Api";

interface SelectableFieldProps {
    onChange: (value: number) => void;
}

export const UserSelectableField = ({ onChange }: SelectableFieldProps) => {
    const { data = [], isValidating } = useSWR(
        "responsible/users",
        async () => {
            return Api.getResponsibleUsers();
        }
    );

    return (
        <Select
            style={{ width: 200 }}
            loading={isValidating}
            onChange={(value) => {
                onChange(Number(value));
            }}
        >
            {data.map((user) => (
                <Select.Option key={user.id} value={user.id}>
                    {user.name}
                </Select.Option>
            ))}
        </Select>
    );
};
