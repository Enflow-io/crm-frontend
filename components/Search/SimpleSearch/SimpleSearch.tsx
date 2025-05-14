import React, { useState, useEffect } from "react";
import {
    Button,
    Checkbox,
    Form,
    Input,
    InputNumber,
    Select,
    Space,
    Modal,
    message,
    Divider,
    Typography,
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
import Api from "../../../services/Api";
import { DeleteOutlined } from "@ant-design/icons";
import { SpecialCategoryEnum } from "../../../interfaces/BlockInterface";

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

interface SearchConfig {
    id: number;
    name: string;
    config: Filter;
}

export const SimpleSearch = ({
    defaultValues,
    onChange,
}: {
    defaultValues?: Filter;
    onChange?: (data?: Filter) => void;
}) => {
    const [isSaveModalVisible, setIsSaveModalVisible] = useState(false);
    const [configName, setConfigName] = useState("");
    const [savedConfigs, setSavedConfigs] = useState<SearchConfig[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedConfigId, setSelectedConfigId] = useState<number | null>(null);

    const form = useForm<Filter>({
        defaultValues: Object.assign(
            {
                realisationType: "rent",
                isOnMarket: true,
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
        getValues,
    } = form;

    useEffect(() => {
        loadSavedConfigs();
    }, []);

    const loadSavedConfigs = async () => {
        try {
            const configs = await Api.getSearchConfigs();
            setSavedConfigs(configs);
        } catch (error) {
            message.error("Ошибка при загрузке сохраненных фильтров");
        }
    };

    const handleSaveConfig = async () => {
        if (!configName.trim()) {
            message.error("Введите название фильтра");
            return;
        }

        try {
            setIsLoading(true);
            const currentValues = getValues();
            const response = await Api.createSearchConfig(configName, currentValues);
            if (response) {
                message.success("Фильтр успешно сохранен");
                setIsSaveModalVisible(false);
                setConfigName("");
                loadSavedConfigs();
            }
        } catch (error) {
            message.error("Ошибка при сохранении фильтра");
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteConfig = async (id: number) => {
        try {
            setIsLoading(true);
            await Api.deleteSearchConfig(id);
            message.success("Фильтр успешно удален");
            loadSavedConfigs();
        } catch (error) {
            message.error("Ошибка при удалении фильтра");
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpdateConfig = async () => {
        if (!selectedConfigId) return;

        try {
            setIsLoading(true);
            const currentValues = getValues();
            await Api.updateSearchConfig(selectedConfigId, savedConfigs.find(c => c.id === selectedConfigId)?.name || 'Новый фильтр', currentValues);
            message.success("Фильтр успешно обновлен");
            loadSavedConfigs();
        } catch (error) {
            message.error("Ошибка при обновлении фильтра");
        } finally {
            setIsLoading(false);
        }
    };

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
        setSelectedConfigId(null);
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
                        defaultValue={true}
                        render={({ field }) => (
                            <Checkbox
                                onChange={(e) =>
                                    field.onChange(e.target.checked)
                                }
                                checked={field.value}
                                defaultChecked={true}
                            />
                        )}
                    />
                </Form.Item>
                <Form.Item label="Есть на ЦИАН">
                    <Controller
                        name="isOnCian"
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
                <Form.Item label="Специальные подборки">
                    <Controller
                        name="specialCategory"
                        control={control}
                        render={({ field }) => (
                            <Select
                                onChange={field.onChange}
                                allowClear
                                value={field.value}
                                style={{ width: 260 }}
                            >
                                {/* @ts-ignore */}
                                <Select.Option value={null}>Без подборки</Select.Option>
                                <Select.Option value={SpecialCategoryEnum.ROTATION}>Расселение/ротация</Select.Option>
                                <Select.Option value={SpecialCategoryEnum.MEDICAL}>Под мед. центры</Select.Option>
                                <Select.Option value={SpecialCategoryEnum.REDEV}>Редевелопмент/реконструкция</Select.Option>
                                <Select.Option value={SpecialCategoryEnum.PRIMARY}>Первичная продажа</Select.Option>
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
                        <Button 
                            type="primary" 
                            onClick={() => setIsSaveModalVisible(true)}
                            disabled={!isDirty}
                        >
                            Сохранить фильтр
                        </Button>
                        {selectedConfigId && (
                            <Button 
                                type="primary" 
                                onClick={handleUpdateConfig}
                                disabled={!isDirty}
                            >
                                Обновить фильтр
                            </Button>
                        )}
                        {savedConfigs.length > 0 && (
                            <Select
                                style={{ width: 200 }}
                                placeholder="Загрузить фильтр"
                                //@ts-ignore
                                value={selectedConfigId || null}
                                onChange={async (value) => {
                                    if (value === null) {
                                        setSelectedConfigId(null);
                                        form.reset({
                                            realisationType: "rent",
                                            isOnMarket: true,
                                        });
                                        if (onChange) {
                                            onChange(undefined);
                                        }
                                        return;
                                    }
                                    const config = savedConfigs.find(c => c.id === value);
                                    if (config) {
                                        setSelectedConfigId(config.id);
                                        form.reset();
                                        form.reset(config.config);
                                        await new Promise(resolve => setTimeout(resolve, 0));
                                        if (onChange) {
                                            onChange(config.config);
                                        }
                                        handleSubmit(onSubmit)();
                                    }
                                }}
                                dropdownRender={(menu) => (
                                    <>
                                        <div style={{ padding: '8px', cursor: 'pointer' }} onClick={async () => {
                                            setSelectedConfigId(null);
                                            form.reset({
                                                realisationType: "rent",
                                                isOnMarket: true,
                                            });
                                            handleSubmit(onSubmit)();
                                        }}>
                                            <Typography.Text type="secondary">
                                                Без фильтра
                                            </Typography.Text>
                                        </div>
                                        <Divider style={{ margin: '8px 0' }} />
                                        {menu}
                                    </>
                                )}
                            >
                                {savedConfigs.map(config => (
                                    <Select.Option key={config.id} value={config.id}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <span>{config.name}</span>
                                            <Button
                                                type="text"
                                                danger
                                                icon={<DeleteOutlined />}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    Modal.confirm({
                                                        title: 'Удаление фильтра',
                                                        content: `Вы уверены, что хотите удалить фильтр "${config.name}"?`,
                                                        okText: 'Удалить',
                                                        cancelText: 'Отмена',
                                                        onOk: () => handleDeleteConfig(config.id)
                                                    });
                                                }}
                                            />
                                        </div>
                                    </Select.Option>
                                ))}
                            </Select>
                        )}
                    </Space>
                </Form.Item>
            </Form>

            <Modal
                title="Сохранение фильтра"
                visible={isSaveModalVisible}
                onOk={handleSaveConfig}
                onCancel={() => {
                    setIsSaveModalVisible(false);
                    setConfigName("");
                }}
                confirmLoading={isLoading}
            >
                <Input
                    placeholder="Введите название фильтра"
                    value={configName}
                    onChange={(e) => setConfigName(e.target.value)}
                />
            </Modal>
        </FormProvider>
    );
};
