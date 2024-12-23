import {
    Button,
    Form,
    InputNumber,
    Select,
    Space,
} from "antd";
import { Controller, useForm, FormProvider } from "react-hook-form";
import { allStations } from "../../inputs/CompactStationsInput/lines";
import { blockTypes } from "../../Blocks/BlockOptions";
import { TaxOffices } from "../../../utils/constants";
import styles from "./SimpleSearch.module.scss";
import { SalePriceField } from "./SalePriceField";
import { RentPriceField } from "./RentPriceField";

export type Filter = {
    realisationType: string;
    metro?: string[];
    type?: string[];
    isCoworking?: number;
    taxOffice?: number;
    rentType?: number;
    rentPrice?: number[];
    workingPlaces?: number[];
    saleType: string;
    salePrice?: number[];
    fullPriceAmount?: number[];
};

const metroOptions = allStations
    .reduce<string[]>((acc, value) => {
        if (acc.includes(value.label)) {
            return acc;
        }
        return [...acc, value.label];
    }, [])
    .map((value) => ({
        label: value,
        value,
    }));

const blockTypesOptions = blockTypes.map((value) => ({
    label: value,
    value,
}));

const realizationTypeOptions = [
    { value: "rent", label: "Аренда" },
    { value: "sale", label: "Продажа" },
    // { value: "subRent", label: "Субаренда" },
];

export const SimpleSearch = ({
    defaultValues,
    onChange,
}: {
    defaultValues?: Filter;
    onChange?: (data?: Filter) => void;
}) => {
    const form = useForm<Filter>({
        defaultValues: Object.assign(
            {
                realisationType: "rent",
            },
            defaultValues
        ),
        shouldUnregister: true,
    });
    const {
        watch,
        handleSubmit,
        control,
        formState: { isDirty },
    } = form;

    const onSubmit = (data: Filter) => {
        if (onChange) {
            onChange(data);
        }
    };

    const onReset = () => {
        form.reset();
        if (onChange) {
            onChange(undefined);
        }
    };

    const realizationType = watch("realisationType");

    return (
        <FormProvider {...form}>
            <Form
                layout="inline"
                className={styles.grid}
                onFinish={handleSubmit(onSubmit)}
                // labelCol={{ span: 12 }}
                // wrapperCol={{ span: 12 }}
            >
                <Form.Item label="Тип реализации">
                    <Controller
                        name="realisationType"
                        control={control}
                        render={({ field }) => (
                            <Select
                                style={{ minWidth: 110 }}
                                onChange={field.onChange}
                                options={realizationTypeOptions}
                                value={field.value}
                            />
                        )}
                    />
                </Form.Item>
                <Form.Item label="Тип помещения">
                    <Controller
                        name="type"
                        control={control}
                        render={({ field }) => (
                            <Select
                                mode="multiple"
                                style={{ minWidth: 240 }}
                                onChange={field.onChange}
                                options={blockTypesOptions}
                                value={field.value}
                                allowClear
                            />
                        )}
                    />
                </Form.Item>
                {realizationType === "rent" && (
                    <>
                        <Form.Item label="Коворкинг">
                            <Controller
                                name="isCoworking"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        style={{ width: 70 }}
                                        onChange={field.onChange}
                                        value={field.value}
                                        allowClear
                                    >
                                        <Select.Option value={1}>да</Select.Option>
                                        <Select.Option value={0}>нет</Select.Option>
                                    </Select>
                                )}
                            />
                        </Form.Item>
                        <Form.Item label="Кол-во раб. мест">
                            <Controller
                                name="workingPlaces"
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
                                                style={{ width: 70 }}
                                            />
                                            <InputNumber
                                                min={min || 0}
                                                onChange={(value) => {
                                                    field.onChange([min, value]);
                                                }}
                                                value={max}
                                                placeholder="до"
                                                style={{ width: 70 }}
                                            />
                                        </Space>
                                    );
                                }}
                            />
                        </Form.Item>
                        <RentPriceField/>
                        {/* <Form.Item label="Ставка аренды">
                            <Controller
                                name="rentPrice"
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
                                        </Space>
                                    );
                                }}
                            />
                        </Form.Item>
                        <Form.Item label="Тип ставки">
                            <Controller
                                name="rentType"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        allowClear
                                        onChange={field.onChange}
                                        value={field.value}
                                        style={{ width: 170 }}
                                    >
                                        <Select.Option value={0}>
                                            За кв.м
                                        </Select.Option>
                                        <Select.Option value={1}>
                                            За все помещение
                                        </Select.Option>
                                    </Select>
                                )}
                            />
                        </Form.Item> */}
                    </>
                )}
                {realizationType === "sale" && (
                    <>
                        {/* <Form.Item label="Цена продажи">
                            <Controller
                                name="salePrice"
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
                                        </Space>
                                    );
                                }}
                            />
                        </Form.Item> */}
                        <SalePriceField/>
                        {/* <Form.Item label="Тип цены">
                            <Controller
                                name="saleType"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        allowClear
                                        onChange={field.onChange}
                                        value={field.value}
                                        style={{ width: 170 }}
                                    >
                                        <Select.Option value={0}>
                                            За кв.м
                                        </Select.Option>
                                        <Select.Option value={1}>
                                            За все помещение
                                        </Select.Option>
                                    </Select>
                                )}
                            />
                        </Form.Item> */}
                    </>
                )}
                <Form.Item label="Метро">
                    <Controller
                        name="metro"
                        control={control}
                        render={({ field }) => (
                            <Select
                                style={{ minWidth: 240 }}
                                allowClear
                                mode="multiple"
                                onChange={field.onChange}
                                options={metroOptions}
                                value={field.value}
                            />
                        )}
                    />
                </Form.Item>
                <Form.Item label="Налоговая">
                    <Controller
                        name="taxOffice"
                        control={control}
                        render={({ field }) => (
                            <Select
                                onChange={field.onChange}
                                allowClear
                                value={field.value}
                                style={{ width: 140 }}
                            >
                                {TaxOffices.map((item) => (
                                    <Select.Option key={item} value={item}>
                                        {`ИФНС №${item}`}
                                    </Select.Option>
                                ))}
                            </Select>
                        )}
                    />
                </Form.Item>
                <Form.Item>
                    <Space>
                        <Button
                            type="primary"
                            htmlType="submit"
                            disabled={!isDirty}
                        >
                            Поиск
                        </Button>
                        <Button onClick={onReset} disabled={!isDirty}>
                            Сбросить
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </FormProvider>
    );
};
