import {
    Button,
    Checkbox,
    Form,
    Input,
    InputNumber,
    Select,
    Space,
} from "antd";
import { Controller, useForm, FormProvider } from "react-hook-form";
import { allStations } from "../../inputs/CompactStationsInput/lines";
import { blockTypes } from "../../Blocks/BlockOptions";
import { Districts, TaxOffices } from "../../../utils/constants";
import styles from "./SimpleSearch.module.scss";
import { SalePriceField } from "./SalePriceField";
import { RentPriceField } from "./RentPriceField";
import { PolygonInput } from "../../inputs/PolygonInput/PolygonInput";
import { PolygonField } from "./PolygonField";
import MetroIcon from "../../svg/MetroIcon";
import { allStationsData } from "../../inputs/StationsInput/lines";
import { Filter } from "./context";

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

const districtsOptions = Districts.sort((a, b) => a.localeCompare(b, "ru")).map(
    (item) => ({
        label: item,
        value: item,
    })
);

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
                <Form.Item label="Адрес или название">
                    <Controller
                        name="address"
                        control={control}
                        render={({ field }) => (
                            <Input
                                style={{ minWidth: 140 }}
                                onChange={field.onChange}
                                value={field.value}
                                allowClear
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
                <Form.Item label="Площадь">
                    <Controller
                        name="area"
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
                                        style={{ width: 90 }}
                                    />
                                    <InputNumber
                                        min={min || 0}
                                        onChange={(value) => {
                                            field.onChange([min, value]);
                                        }}
                                        value={max}
                                        placeholder="до"
                                        style={{ width: 90 }}
                                    />
                                </Space>
                            );
                        }}
                    />
                </Form.Item>
                <Form.Item label="Есть на рынке">
                    <Controller
                        name="isOnMarket"
                        control={control}
                        render={({ field }) => (
                            <Checkbox
                                onChange={(e) =>
                                    field.onChange(e.target.checked)
                                }
                                checked={field.value}
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
                                        <Select.Option value={1}>
                                            да
                                        </Select.Option>
                                        <Select.Option value={0}>
                                            нет
                                        </Select.Option>
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
                                                    field.onChange([
                                                        value,
                                                        max,
                                                    ]);
                                                }}
                                                value={min}
                                                placeholder="от"
                                                style={{ width: 70 }}
                                            />
                                            <InputNumber
                                                min={min || 0}
                                                onChange={(value) => {
                                                    field.onChange([
                                                        min,
                                                        value,
                                                    ]);
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
                        <RentPriceField />
                    </>
                )}
                {realizationType === "sale" && (
                    <>
                        <SalePriceField />
                    </>
                )}
                <Form.Item label="Округ">
                    <Controller
                        name="globalDistrict"
                        control={control}
                        render={({ field }) => (
                            <Select
                                style={{ minWidth: 120 }}
                                allowClear
                                mode="multiple"
                                onChange={field.onChange}
                                value={field.value}
                            >
                                <Select.Option value="ЦАО">ЦАО</Select.Option>
                                <Select.Option value="САО">САО</Select.Option>
                                <Select.Option value="СВАО">СВАО</Select.Option>
                                <Select.Option value="ВАО">ВАО</Select.Option>
                                <Select.Option value="ЮВАО">ЮВАО</Select.Option>
                                <Select.Option value="ЮАО">ЮАО</Select.Option>
                                <Select.Option value="ЮЗАО">ЮЗАО</Select.Option>
                                <Select.Option value="ЗАО ">ЗАО</Select.Option>
                                <Select.Option value="СЗАО">СЗАО</Select.Option>
                                <Select.Option value="ЗелАО">
                                    ЗелАО
                                </Select.Option>
                            </Select>
                        )}
                    />
                </Form.Item>
                <Form.Item label="Район">
                    <Controller
                        name="district"
                        control={control}
                        render={({ field }) => (
                            <Select
                                style={{ minWidth: 120 }}
                                allowClear
                                mode="multiple"
                                onChange={field.onChange}
                                value={field.value}
                                options={districtsOptions}
                            />
                        )}
                    />
                </Form.Item>
                <Form.Item label="Метро">
                    <Controller
                        name="metro"
                        control={control}
                        render={({ field }) => (
                            <Select
                                style={{ minWidth: 240, maxWidth: 400 }}
                                allowClear
                                mode="multiple"
                                onChange={field.onChange}
                                value={field.value}
                            >
                                {allStationsData
                                    .sort((a, b) =>
                                        a.label.localeCompare(b.label, "ru")
                                    )
                                    .map((station) => {
                                        return (
                                            <Select.Option
                                                key={station.id}
                                                value={station.label}
                                            >
                                                <MetroIcon
                                                    color={
                                                        station.color ||
                                                        undefined
                                                    }
                                                    height={17}
                                                    width={17}
                                                />
                                                <span className={styles.metro}>
                                                    {station.label}
                                                </span>
                                            </Select.Option>
                                        );
                                    })}
                            </Select>
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
                <PolygonField />
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
