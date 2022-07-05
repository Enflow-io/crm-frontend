import classes from './SearchForm.module.scss'
import React, {useState} from "react";
import {Divider, Form, Input, Select} from "antd";

const {Option, OptGroup} = Select;
const {TextArea} = Input;

import MapSelector from "../Objects/MapSelector";
import CoordinatesInput from "../inputs/CoordinatesInput/CoordinatesInput";
import {Districts, TaxOffices} from "../../utils/constants";
import PriceInput from "../inputs/PriceInput/PriceInput";
import {MetroInput} from "../inputs/StationsInput/MetroInput";
import BooleanSelect from "../inputs/BooleanSelect";
import InfrastructureInput from "../inputs/InfrastructureInput";
import DateInput from "../inputs/DateInput";
import UserInput from "../inputs/UserInput/UserInput";
import BuildingInput from "../inputs/BuildingInput/BuildingInput";
import RangeInput from "./RangeInput";

const SearchForm = () => {

    const [isOpen, setIsOpen] = useState<boolean>(true)
    const toggleIsOpen = ()=>{
        setIsOpen(!isOpen)
    }
    return <div className={isOpen ? classes.Opened : classes.Closed}>
        <button onClick={toggleIsOpen}>скрыть/развернуть</button>
        <div className={classes.HeadersCont}>
            <h2>Здания</h2>
            <h2>Блоки</h2>
        </div>
        <div className={classes.SearchForm}>
            <div className={classes.SearchSubForm}>
                <Form
                    // layout="vertical"
                    labelCol={{span: 6}}
                    size={'small'}
                    labelAlign={'left'}
                >


                    <Form.Item
                        name="name"
                        label="Название"

                        rules={[
                            {
                                required: true,
                                message: 'название объекта должно быть указано',
                            },
                            {min: 15, message: 'Название не может быть короче 15 символов'},
                        ]}
                    >
                        <Input style={{width: 240}}/>
                    </Form.Item>

                    <Form.Item
                        name="name-eng"
                        label="Название (eng)"
                    >
                        <Input style={{width: 240}}/>
                    </Form.Item>

                    <Form.Item
                        name="area"
                        label="Площадь, м²"
                        rules={[
                            {
                                required: true,
                                message: 'укажите площадь',
                            }
                        ]}
                    >
                        <Input style={{width: 240}} type={"number"}/>
                    </Form.Item>
                    <Form.Item
                        name="freeRentArea"
                        label="Пл. в аренду, м²"

                    >
                        <Input disabled={true} style={{width: 240}} type={"string"}/>
                    </Form.Item>

                    <Form.Item
                        name="freeSaleArea"
                        label="Пл. на продажу, м²"

                    >
                        <Input disabled={true} style={{width: 240}} type={"string"}/>
                    </Form.Item>

                    <Form.Item
                        name="buildingType"
                        label="Тип здания"
                    >
                        <Select style={{width: 240}}>
                            <Option value="Бизнес-центр">Бизнес-центр</Option>
                            <Option value="Бизнес-парк">Бизнес-парк</Option>
                            <Option value="Административное здание">Административное здание</Option>
                            <Option value="МФК">МФК</Option>
                            <Option value="Особняк">Особняк</Option>
                            <Option value="ТЦ">ТЦ</Option>
                            <Option value="ЖК">ЖК</Option>
                            <Option value="Офисно-складской комплекс">Офисно-складской комплекс</Option>
                            <Option value="Складской комплекс">Складской комплекс</Option>
                        </Select>


                    </Form.Item>

                    <Form.Item
                        name="buildingClass"
                        label="Класс"
                        initialValue={'A'}

                    >
                        <Select defaultValue="A" style={{width: 240}} onChange={e => {
                            // form.setFieldsValue({
                            //     buildingClass: e
                            // })
                        }}>
                            <Option value="A">A</Option>
                            <Option value="B+">B+</Option>
                            <Option value="B">
                                B
                            </Option>
                            <Option value="C">C</Option>
                        </Select>
                    </Form.Item>

                    <Divider dashed/>

                    <div style={{
                        marginRight: '1em'
                    }}>
                        <MapSelector
                            initialPoint={[0, 0]}
                            onSelected={((addressLine, coords) => {
                                // form.setFieldsValue({
                                //     address: addressLine
                                // })
                                //
                                // form.setFieldsValue({
                                //     coords: coords
                                // })


                            })}/>
                    </div>

                    <Form.Item
                        name="address"
                        label="Адрес"
                    >
                        <Input style={{width: 240}}/>
                    </Form.Item>


                    <Form.Item
                        name="addressEng"
                        label="Адрес (eng)"
                    >
                        <Input style={{width: 240}}/>
                    </Form.Item>


                    <Form.Item
                        name="globalDistrict"
                        label="Округ"
                    >
                        <Select mode={'multiple'} style={{width: 240}}>
                            <Option value="ЦАО">ЦАО</Option>
                            <Option value="САО">САО</Option>
                            <Option value="СВАО">СВАО</Option>
                            <Option value="ВАО">ВАО</Option>
                            <Option value="ЮВАО">ЮВАО</Option>
                            <Option value="ЮАО">ЮАО</Option>
                            <Option value="ЮЗАО">ЮЗАО</Option>
                            <Option value="ЗАО ">ЗАО </Option>

                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="district"
                        label="Район"
                    >
                        <Select mode={'multiple'} style={{width: 240}}>
                            {Districts.map(item => {
                                return <Option key={item} value={item}>{item}</Option>
                            })}

                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="taxOffice"
                        label="Налоговая"
                    >
                        <Select mode={'multiple'} style={{width: 240}}>
                            {TaxOffices.map(item => {
                                return <Option key={item} value={item}>ИФНС №{item}</Option>
                            })}

                        </Select>
                    </Form.Item>

                    <Divider/>
                    <h3>Цены</h3>

                    <Form.Item
                        name="currency"
                        label="Валюта"
                    >
                        <Select id={'currency-selector'} defaultValue={'RUB'} style={{width: 240}}>
                            <Option value="RUB">Рубль (₽)</Option>
                            <Option value="USD">Доллар ($)</Option>
                            <Option value="EUR">Евро (€)</Option>
                        </Select>
                    </Form.Item>


                    <Form.Item
                        name="parkingLandPrice"
                        label="Назем. паркинг"
                    >
                        <Input.Group compact>
                            <Select defaultValue="1">
                                <Option value="1">$</Option>
                                <Option value="2">EU</Option>
                                <Option value="2">Р</Option>
                            </Select>
                            <Input style={{width: 100, textAlign: 'center'}} placeholder="Minimum"/>
                            <Input
                                className="site-input-split"
                                style={{
                                    width: 30,
                                    borderLeft: 0,
                                    borderRight: 0,
                                    pointerEvents: 'none',
                                }}
                                placeholder="~"
                                disabled
                            />
                            <Input
                                className="site-input-right"
                                style={{
                                    width: 100,
                                    textAlign: 'center',
                                }}
                                placeholder="Maximum"
                            />
                        </Input.Group>
                    </Form.Item>


                    <Form.Item
                        name="parkingMultiLevelPrice"
                        label="Мультиуровн. паркинг"
                    >
                        <Input.Group compact>
                            <Select defaultValue="1">
                                <Option value="1">$</Option>
                                <Option value="2">EU</Option>
                                <Option value="2">Р</Option>
                            </Select>
                            <Input style={{width: 100, textAlign: 'center'}} placeholder="Minimum"/>
                            <Input
                                className="site-input-split"
                                style={{
                                    width: 30,
                                    borderLeft: 0,
                                    borderRight: 0,
                                    pointerEvents: 'none',
                                }}
                                placeholder="~"
                                disabled
                            />
                            <Input
                                className="site-input-right"
                                style={{
                                    width: 100,
                                    textAlign: 'center',
                                }}
                                placeholder="Maximum"
                            />
                        </Input.Group>
                    </Form.Item>


                    <Form.Item
                        name="parkingSubwayPrice"
                        label="Подземн. паркинг"
                    >
                        <Input.Group compact>
                            <Select defaultValue="1">
                                <Option value="1">$</Option>
                                <Option value="2">EU</Option>
                                <Option value="2">Р</Option>
                            </Select>
                            <Input style={{width: 100, textAlign: 'center'}} placeholder="Minimum"/>
                            <Input
                                className="site-input-split"
                                style={{
                                    width: 30,
                                    borderLeft: 0,
                                    borderRight: 0,
                                    pointerEvents: 'none',
                                }}
                                placeholder="~"
                                disabled
                            />
                            <Input
                                className="site-input-right"
                                style={{
                                    width: 100,
                                    textAlign: 'center',
                                }}
                                placeholder="Maximum"
                            />
                        </Input.Group>
                    </Form.Item>


                    <Divider dashed/>


                    <Form.Item
                        name="fireSystem"
                        label="Пожарная система"
                    >
                        <Select mode={'tags'} defaultValue={'null'} style={{width: 240}} onChange={e => {
                            console.log(e)
                        }}>
                            <Option value="true">Да</Option>
                            <Option value="false">Нет</Option>
                            <Option value="null">Неизвестно</Option>

                        </Select>
                    </Form.Item>


                    <Divider/>


                    <MetroInput
                        setFieldsValue={() => {
                        }}
                        modelData={{}}
                        setStations={params => {
                            console.log("set stationms", params)
                            // setMetroStations(params)
                        }}
                    />


                    <Divider/>

                    <Form.Item
                        name="zone"
                        label="Зона"
                    >
                        <Select mode={'tags'} placeholder={'Выберите зону'} style={{width: 240}}>
                            <Option value="ЦДР">ЦДР</Option>
                            <Option value="СК-ТТК">СК-ТТК</Option>
                            <Option value="ТТК-МКАД">ТТК-МКАД</Option>
                            <Option value="За МКАД">За МКАД</Option>
                        </Select>

                    </Form.Item>

                    <Form.Item
                        name="subMarket"
                        label="Субрынок"
                    >
                        <Select mode={'tags'} placeholder={'Выберите субрынок'} style={{width: 240}}>
                            <Option value="СК Юг">СК Юг</Option>
                            <Option value="СК Север">СК Север</Option>
                            <Option value="СК Запад">СК Запад</Option>
                            <Option value="СК Восток">СК Восток</Option>
                            <Option value="СК-ТТК Юг">СК-ТТК Юг</Option>
                            <Option value="СК-ТТК Север">СК-ТТК Север</Option>
                            <Option value="СК-ТТК Запад">СК-ТТК Запад</Option>
                            <Option value="СК-ТТК Восток">СК-ТТК Восток</Option>
                            <Option value="ТТК-МКАД Юг">ТТК-МКАД Юг</Option>
                            <Option value="ТТК-МКАД Север">ТТК-МКАД Север</Option>
                            <Option value="ТТК-МКАД Запад">ТТК-МКАД Запад</Option>
                            <Option value="ТТК-МКАД Восток">ТТК-МКАД Восток</Option>
                            <Option value="ТТК-МКАД Юг">ТТК-МКАД Юг</Option>
                            <Option value="ТТК-МКАД Север">ТТК-МКАД Север</Option>
                            <Option value="ТТК-МКАД Запад">ТТК-МКАД Запад</Option>
                            <Option value="За МКАД">За МКАД</Option>
                            <Option value="Новая Москва">Новая Москва</Option>
                            <Option value="Химки">Химки</Option>
                            <Option value="Москва-Сити">Москва-Сити</Option>
                            <Option value="Павелецкий">Павелецкий</Option>
                            <Option value="Белорусский">Белорусский</Option>
                            <Option value="Ленинградский">Ленинградский</Option>

                        </Select>

                    </Form.Item>


                    <Form.Item
                        name="buildingYear"
                        label="Год постройки"
                        rules={[
                            {
                                required: true,
                                message: 'укажите год постройки',
                            }
                        ]}
                    >
                        <Input.Group compact>

                            <Input style={{width: 100, textAlign: 'center'}} placeholder="Minimum"/>
                            <Input
                                className="site-input-split"
                                style={{
                                    width: 30,
                                    borderLeft: 0,
                                    borderRight: 0,
                                    pointerEvents: 'none',
                                }}
                                placeholder="~"
                                disabled
                            />
                            <Input
                                className="site-input-right"
                                style={{
                                    width: 100,
                                    textAlign: 'center',
                                }}
                                placeholder="Maximum"
                            />
                        </Input.Group>
                    </Form.Item>

                    <Form.Item
                        name="reconstructionYear"
                        label="Год реконструкции"
                        rules={[
                            {min: 4, message: 'must be minimum 4 characters.'},
                            {max: 4, message: 'must be maximum 4 characters.'},
                        ]}
                    >
                        <Input.Group compact>

                            <Input style={{width: 100, textAlign: 'center'}} placeholder="Minimum"/>
                            <Input
                                className="site-input-split"
                                style={{
                                    width: 30,
                                    borderLeft: 0,
                                    borderRight: 0,
                                    pointerEvents: 'none',
                                }}
                                placeholder="~"
                                disabled
                            />
                            <Input
                                className="site-input-right"
                                style={{
                                    width: 100,
                                    textAlign: 'center',
                                }}
                                placeholder="Maximum"
                            />
                        </Input.Group>
                    </Form.Item>


                    <Form.Item
                        name="constructionStatus"
                        label="Стадия строит."
                    >
                        <Select mode={'tags'} style={{width: 240}}>
                            <Option value="project">Проект</Option>
                            <Option value="frozen">Заморожен</Option>
                            <Option value="inprogress">Строится</Option>
                            <Option value="done">Построен</Option>
                            <Option value="null">неизвестно</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item

                        name="constructionStartDate"
                        label="Дата начала строит."
                    >
                        <Input.Group compact>

                            <Input style={{width: 100, textAlign: 'center'}} placeholder="Minimum"/>
                            <Input
                                className="site-input-split"
                                style={{
                                    width: 30,
                                    borderLeft: 0,
                                    borderRight: 0,
                                    pointerEvents: 'none',
                                }}
                                placeholder="~"
                                disabled
                            />
                            <Input
                                className="site-input-right"
                                style={{
                                    width: 100,
                                    textAlign: 'center',
                                }}
                                placeholder="Maximum"
                            />
                        </Input.Group>
                    </Form.Item>


                    <Form.Item
                        name="bts"
                        label="БТС"
                    >
                        <BooleanSelect>
                            <Option value="null">неизвестно</Option>
                            <Option value="true">да</Option>
                            <Option value="false">нет</Option>
                        </BooleanSelect>
                    </Form.Item>


                    <Form.Item
                        name="isNewConstruction"
                        label="Новое строит.?"
                    >
                        <Select mode={'tags'} style={{width: 240}}>
                            <Option value="Бизнес центр2">неизвестно</Option>
                            <Option value="Бизнес центр">Новое строительство</Option>
                            <Option value="Бизнес центр2">Реконструкция</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="mfrBuildingClass"
                        label="Класс здания MRF"
                    >
                        <Select mode={'tags'} style={{width: 240}} onChange={e => {
                            // form.setFieldsValue({
                            //     buildingClass: e
                            // })
                        }}>
                            <Option value="null">неизвестно</Option>
                            <Option value="A">A</Option>
                            <Option value="B+">B+</Option>
                            <Option value="B">B</Option>
                            <Option value="C">C</Option>

                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="officesArea"
                        label="Площадь офисов, м²"
                    >
                        <Input.Group compact>

                            <Input style={{width: 100, textAlign: 'center'}} placeholder="Minimum"/>
                            <Input
                                className="site-input-split"
                                style={{
                                    width: 30,
                                    borderLeft: 0,
                                    borderRight: 0,
                                    pointerEvents: 'none',
                                }}
                                placeholder="~"
                                disabled
                            />
                            <Input
                                className="site-input-right"
                                style={{
                                    width: 100,
                                    textAlign: 'center',
                                }}
                                placeholder="Maximum"
                            />
                        </Input.Group>
                    </Form.Item>


                    <Form.Item
                        name="isCoworking"
                        label="Коворкинг?"
                    >
                        <BooleanSelect disabled={true}>
                            <Option key={'true'} value={'true'}>да</Option>
                            <Option key={'false'} value={'false'}>нет</Option>
                        </BooleanSelect>

                    </Form.Item>

                    <Form.Item
                        name="coworkingName"
                        label="Название коворк."
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        name="coworkingArea"
                        label="Площадь коворк."
                    >
                        <Input.Group compact>

                            <Input style={{width: 100, textAlign: 'center'}} placeholder="Minimum"/>
                            <Input
                                className="site-input-split"
                                style={{
                                    width: 30,
                                    borderLeft: 0,
                                    borderRight: 0,
                                    pointerEvents: 'none',
                                }}
                                placeholder="~"
                                disabled
                            />
                            <Input
                                className="site-input-right"
                                style={{
                                    width: 100,
                                    textAlign: 'center',
                                }}
                                placeholder="Maximum"
                            />
                        </Input.Group>
                    </Form.Item>


                    <Form.Item
                        name="notes"
                        label="Заметки"
                    >
                        <TextArea rows={4}/>
                    </Form.Item>

                    <Form.Item
                        name="hasAgencyContract"
                        label="Агентский договор"
                    >
                        <BooleanSelect>
                            <Option value="null">неизвестно</Option>
                            <Option value="true">да</Option>
                            <Option value="false">нет</Option>
                        </BooleanSelect>
                    </Form.Item>


                    <Form.Item
                        name="feePercentRent"
                        label="Бонус аренда"
                    >
                        <Input.Group compact>

                            <Input style={{width: 100, textAlign: 'center'}} placeholder="Minimum"/>
                            <Input
                                className="site-input-split"
                                style={{
                                    width: 30,
                                    borderLeft: 0,
                                    borderRight: 0,
                                    pointerEvents: 'none',
                                }}
                                placeholder="~"
                                disabled
                            />
                            <Input
                                className="site-input-right"
                                style={{
                                    width: 100,
                                    textAlign: 'center',
                                }}
                                placeholder="Maximum"
                            />
                        </Input.Group>
                    </Form.Item>


                    <Form.Item
                        name="feePercentSale"
                        label="Бонус продажа"
                    >
                        <Input.Group compact>

                            <Input style={{width: 100, textAlign: 'center'}} placeholder="Minimum"/>
                            <Input
                                className="site-input-split"
                                style={{
                                    width: 30,
                                    borderLeft: 0,
                                    borderRight: 0,
                                    pointerEvents: 'none',
                                }}
                                placeholder="~"
                                disabled
                            />
                            <Input
                                className="site-input-right"
                                style={{
                                    width: 100,
                                    textAlign: 'center',
                                }}
                                placeholder="Maximum"
                            />
                        </Input.Group>

                    </Form.Item>

                    <Form.Item
                        name="isExclusive"
                        label="Эксклюзивность"
                    >
                        <Select mode={'tags'} defaultValue={'null'} style={{width: 240}}>
                            <Option value="null">неизвестно</Option>
                            <Option value="Бизнес центр">Нет эксклюзива</Option>
                            <Option value="Бизнес центр2">Эксклюзив</Option>
                            <Option value="Бизнес центр2">Ко-эксклюзив</Option>
                        </Select>
                    </Form.Item>


                    <Form.Item
                        name="isOnMarket"
                        label="Статус объекта"
                    >
                        <BooleanSelect disabled={true}>
                            <Option value="true">На рынке</Option>
                            <Option value="false">Нет на рынке</Option>
                        </BooleanSelect>
                    </Form.Item>

                    <Form.Item
                        label="Тип реализации"
                    >
                        <Input style={{width: 240}} disabled={true} value={''}/>

                    </Form.Item>

                    <Form.Item
                        // name="finishing"
                        label="Отделка"
                    >
                        <Input style={{width: 240}} disabled={true} value={''}/>

                    </Form.Item>


                    <Form.Item
                        label="Тип планировки"
                    >
                        <Input style={{width: 240}} disabled={true} value={''}/>

                    </Form.Item>


                    <Form.Item
                        name="parkingType"
                        label="Паркинг тип"
                    >
                        <Select mode={'tags'} defaultValue={'Наземный'} style={{width: 240}}>
                            <Option value="Наземный">Наземный</Option>
                            <Option value="Подземный">Подземный</Option>
                            <Option value="Многоуровневый">Многоуровневый</Option>
                            <Option value="неизвестно">неизвестно</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="parkingQnt"
                        label="Парк. кол-во, наземн."
                    >
                        <Input.Group compact>

                            <Input style={{width: 100, textAlign: 'center'}} placeholder="Minimum"/>
                            <Input
                                className="site-input-split"
                                style={{
                                    width: 30,
                                    borderLeft: 0,
                                    borderRight: 0,
                                    pointerEvents: 'none',
                                }}
                                placeholder="~"
                                disabled
                            />
                            <Input
                                className="site-input-right"
                                style={{
                                    width: 100,
                                    textAlign: 'center',
                                }}
                                placeholder="Maximum"
                            />
                        </Input.Group>
                    </Form.Item>
                    <Form.Item
                        name="parkingQnt2"
                        label="Парк. кол-во, подземн."
                    >
                        <Input.Group compact>

                            <Input style={{width: 100, textAlign: 'center'}} placeholder="Minimum"/>
                            <Input
                                className="site-input-split"
                                style={{
                                    width: 30,
                                    borderLeft: 0,
                                    borderRight: 0,
                                    pointerEvents: 'none',
                                }}
                                placeholder="~"
                                disabled
                            />
                            <Input
                                className="site-input-right"
                                style={{
                                    width: 100,
                                    textAlign: 'center',
                                }}
                                placeholder="Maximum"
                            />
                        </Input.Group>

                    </Form.Item>
                    <Form.Item
                        name="parkingQnt3"
                        label="Паркинг, многоуровн."
                    >
                        <Input.Group compact>

                            <Input style={{width: 100, textAlign: 'center'}} placeholder="Minimum"/>
                            <Input
                                className="site-input-split"
                                style={{
                                    width: 30,
                                    borderLeft: 0,
                                    borderRight: 0,
                                    pointerEvents: 'none',
                                }}
                                placeholder="~"
                                disabled
                            />
                            <Input
                                className="site-input-right"
                                style={{
                                    width: 100,
                                    textAlign: 'center',
                                }}
                                placeholder="Maximum"
                            />
                        </Input.Group>

                    </Form.Item>
                    <Form.Item
                        name="parkingPrice"
                        label="Парк. назем."
                    >
                        <Input.Group compact>

                            <Input style={{width: 100, textAlign: 'center'}} placeholder="Minimum"/>
                            <Input
                                className="site-input-split"
                                style={{
                                    width: 30,
                                    borderLeft: 0,
                                    borderRight: 0,
                                    pointerEvents: 'none',
                                }}
                                placeholder="~"
                                disabled
                            />
                            <Input
                                className="site-input-right"
                                style={{
                                    width: 100,
                                    textAlign: 'center',
                                }}
                                placeholder="Maximum"
                            />
                        </Input.Group>

                    </Form.Item>
                    <Form.Item
                        name="parkingPrice2"

                        label="Парк. подземн."
                    >
                        <Input.Group compact>

                            <Input style={{width: 100, textAlign: 'center'}} placeholder="Minimum"/>
                            <Input
                                className="site-input-split"
                                style={{
                                    width: 30,
                                    borderLeft: 0,
                                    borderRight: 0,
                                    pointerEvents: 'none',
                                }}
                                placeholder="~"
                                disabled
                            />
                            <Input
                                className="site-input-right"
                                style={{
                                    width: 100,
                                    textAlign: 'center',
                                }}
                                placeholder="Maximum"
                            />
                        </Input.Group>

                    </Form.Item>

                    <Form.Item
                        name="parkingPrice3"
                        label="Паркинг многоуровн."
                    >
                        <Input.Group compact>

                            <Input style={{width: 100, textAlign: 'center'}} placeholder="Minimum"/>
                            <Input
                                className="site-input-split"
                                style={{
                                    width: 30,
                                    borderLeft: 0,
                                    borderRight: 0,
                                    pointerEvents: 'none',
                                }}
                                placeholder="~"
                                disabled
                            />
                            <Input
                                className="site-input-right"
                                style={{
                                    width: 100,
                                    textAlign: 'center',
                                }}
                                placeholder="Maximum"
                            />
                        </Input.Group>
                    </Form.Item>

                    <Form.Item
                        name="parkingNds"
                        label="Парк. НДС наземн."
                    >
                        <BooleanSelect>
                            <Option value="null">неизвестно</Option>
                            <Option value="true">да</Option>
                            <Option value="false">нет</Option>
                        </BooleanSelect>
                    </Form.Item>

                    <Form.Item
                        name="parkingNdsSubway"
                        label="Парк. НДС, подземн."
                    >
                        <BooleanSelect>
                            <Option value="null">неизвестно</Option>
                            <Option value="true">да</Option>
                            <Option value="false">нет</Option>
                        </BooleanSelect>
                    </Form.Item>

                    <Form.Item
                        name="parkingNdsMulti"
                        label="Парк. НДС, многоуровн."
                    >
                        <BooleanSelect>
                            <Option value="null">неизвестно</Option>
                            <Option value="true">да</Option>
                            <Option value="false">нет</Option>
                        </BooleanSelect>

                    </Form.Item>

                    <Form.Item
                        name="floorsHeight"
                        label="Высота потолков, м"
                    >
                        <Input.Group compact>

                            <Input style={{width: 100, textAlign: 'center'}} placeholder="Minimum"/>
                            <Input
                                className="site-input-split"
                                style={{
                                    width: 30,
                                    borderLeft: 0,
                                    borderRight: 0,
                                    pointerEvents: 'none',
                                }}
                                placeholder="~"
                                disabled
                            />
                            <Input
                                className="site-input-right"
                                style={{
                                    width: 100,
                                    textAlign: 'center',
                                }}
                                placeholder="Maximum"
                            />
                        </Input.Group>
                    </Form.Item>


                    <Form.Item
                        name="stepKolonn"
                        label="Шаг колонн, м"
                    >
                        <Input.Group compact>

                            <Input style={{width: 100, textAlign: 'center'}} placeholder="Minimum"/>
                            <Input
                                className="site-input-split"
                                style={{
                                    width: 30,
                                    borderLeft: 0,
                                    borderRight: 0,
                                    pointerEvents: 'none',
                                }}
                                placeholder="~"
                                disabled
                            />
                            <Input
                                className="site-input-right"
                                style={{
                                    width: 100,
                                    textAlign: 'center',
                                }}
                                placeholder="Maximum"
                            />
                        </Input.Group>

                    </Form.Item>

                    <Form.Item
                        name="parkingLoad"
                        label="Нагрузка на перекрыт."
                    >
                        <Input.Group compact>

                            <Input style={{width: 100, textAlign: 'center'}} placeholder="Minimum"/>
                            <Input
                                className="site-input-split"
                                style={{
                                    width: 30,
                                    borderLeft: 0,
                                    borderRight: 0,
                                    pointerEvents: 'none',
                                }}
                                placeholder="~"
                                disabled
                            />
                            <Input
                                className="site-input-right"
                                style={{
                                    width: 100,
                                    textAlign: 'center',
                                }}
                                placeholder="Maximum"
                            />
                        </Input.Group>

                    </Form.Item>


                    <Form.Item
                        name="peopleLiftsQnt"
                        label="Кол-во пассаж. лифтов"
                    >
                        <Input.Group compact>

                            <Input style={{width: 100, textAlign: 'center'}} placeholder="Minimum"/>
                            <Input
                                className="site-input-split"
                                style={{
                                    width: 30,
                                    borderLeft: 0,
                                    borderRight: 0,
                                    pointerEvents: 'none',
                                }}
                                placeholder="~"
                                disabled
                            />
                            <Input
                                className="site-input-right"
                                style={{
                                    width: 100,
                                    textAlign: 'center',
                                }}
                                placeholder="Maximum"
                            />
                        </Input.Group>

                    </Form.Item>


                    <Form.Item
                        name="hasBigLift"
                        label="Грузовой лифт"
                    >
                        <BooleanSelect>
                            <Option value="null">неизвестно</Option>
                            <Option value="true">да</Option>
                            <Option value="false">нет</Option>
                        </BooleanSelect>
                    </Form.Item>


                    <Form.Item
                        name="infra"
                        label="Инфрастуктура"
                    >
                        <InfrastructureInput/>

                    </Form.Item>

                    <Form.Item
                        name="showOnSite"
                        label="Выгрузить на сайт R&B"
                    >
                        <BooleanSelect>
                            <Option value="true">да</Option>
                            <Option value="false">нет</Option>
                        </BooleanSelect>
                    </Form.Item>


                    <Form.Item
                        name="createdAt"
                        label="Дата создания"
                    >
                        <DateInput disabled={true}/>
                        {/*<Input disabled={true} style={{width: 240}} />*/}
                    </Form.Item>


                    <Form.Item
                        name="updatedAt"
                        label="Дата обновления"
                    >
                        <DateInput disabled={true}/>
                    </Form.Item>


                </Form>
            </div>
            <div className={classes.SearchSubForm}>


                <Form
                    // layout="vertical"
                    labelCol={{span: 6}}
                    size={'small'}
                    labelAlign={'left'}
                >

                    <Form.Item
                        name="name"
                        label="Название"
                    >
                        <Input/>
                    </Form.Item>


                    <Form.Item
                        name="isOnMarket"
                        label="На рынке?"
                    >
                        <Select mode={'tags'} defaultValue="Нет на рынке" style={{width: 240}}>
                            <Option value="Нет на рынке">Нет на рынке</Option>
                            <Option value="Есть на рынке">Есть на рынке</Option>
                            <Option value="Продан">Продан</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="isCoworking"
                        label="Коворкинг?"
                    >
                        <BooleanSelect style={{width: 120}}>
                            <Option key={'true'} value={'true'}>Да</Option>
                            <Option key={'false'} value={'false'}>Нет</Option>
                        </BooleanSelect>

                    </Form.Item>

                    <Form.Item
                        name="floor"
                        label="Этаж"
                    >
                        <RangeInput/>
                    </Form.Item>

                    <Form.Item
                        name="area"
                        label="Площадь"
                    >
                        <RangeInput/>
                    </Form.Item>

                    <Form.Item
                        name="name-eng"
                        label="Название (eng)"
                    >
                        <Input/>
                    </Form.Item>


                    <Form.Item
                        name="blockType"
                        label="Тип блока"
                    >
                        <Select mode={'tags'} defaultValue="Офис" style={{width: 240}}>
                            <Option value="Офис">Офис</Option>
                            <Option value="Банк">Банк</Option>
                            <Option value="Ритейл">Ритейл</Option>
                            <Option value="Столовая">Столовая</Option>
                            <Option value="Ресторан">Ресторан</Option>
                            <Option value="Шоу-рум">Шоу-рум</Option>
                            <Option value="ПСН">ПСН</Option>
                        </Select>
                    </Form.Item>


                    <Form.Item
                        name="bti"
                        label="БОМА/БТИ"
                    >
                        <Select mode={'tags'} defaultValue="null" style={{width: 240}}>
                            <Option value="null">Неизвестно</Option>
                            <Option value="БОМА">БОМА</Option>
                            <Option value="БТИ">БТИ</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="bonusPercent"
                        label="Бонусный %"
                    >
                        <RangeInput/>
                    </Form.Item>

                    <Form.Item
                        name="finishing"
                        label="Отделка"
                    >
                        <Select mode={'tags'} defaultValue={'С мебелью'} style={{width: 240}}>
                            <Option value="С мебелью">С мебелью</Option>
                            <Option value="С отделкой">С отделкой</Option>
                            <Option value="Без отделки">Без отделки</Option>
                        </Select>
                    </Form.Item>


                    <Form.Item
                        name="planType"
                        label="Тип планировки"
                    >
                        <Select mode={'tags'} defaultValue={'null'} style={{width: 240}}>
                            <Option value="Open-space">Open-space</Option>
                            <Option value="Кабинетная">Кабинетная</Option>
                        </Select>
                    </Form.Item>


                    <Divider dashed/>


                    <Form.Item
                        name="qfsdfsdfsdf"
                        label="Арендатор"
                    >
                        <RangeInput/>
                    </Form.Item>

                    <Divider orientation={'left'}>Условия сделки</Divider>
                    <Form.Item
                        name="q"
                        label="Обесп. платеж"
                    >
                        <RangeInput/>
                    </Form.Item>

                    <Form.Item
                        name="realisationType"
                        label="Тип реализации"
                    >
                        <Select mode={'tags'} defaultValue={'rent'} style={{width: 240}}>
                            <Option value="rent">Аренда</Option>
                            <Option value="sale">Продажа</Option>
                            <Option value="subRent">Субаренда</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="agreementType"
                        label="Срок договора"
                    >
                        <Select mode={'tags'} style={{width: 240}}>
                            <Option value="null">Неизвестно</Option>
                            <Option value="short">Крактосрочный</Option>
                            <Option value="long">Долгосрочный</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="rentalHolidays"
                        label="Арендн. каникулы"
                    >
                        <RangeInput/>
                    </Form.Item>

                    <Form.Item
                        name="indexation"
                        label="Индексация"
                    >
                        <RangeInput/>
                    </Form.Item>


                    <Divider orientation={'left'}>Коммерческие условия</Divider>

                    <Form.Item
                        name="ndsRent"
                        label="НДС аренда"
                    >
                        <Select defaultValue={'Включен'} style={{width: 240}}>
                            <Option value="null">Неизвестно</Option>
                            <Option value="Включен">Включен</Option>
                            <Option value="Не включен">Не включен</Option>
                            <Option value="УСН">УСН</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="ndsSale"
                        label="НДС продажа"
                    >
                        <Select mode={'tags'} defaultValue={'Включен'} style={{width: 240}}>
                            <Option value="null">Неизвестно</Option>

                            <Option value="Включен">Включен</Option>
                            <Option value="Не включен">Не включен</Option>
                            <Option value="УСН">УСН</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="currency"
                        label="Валюта"
                    >
                        <Select mode={'tags'} defaultValue={'RUB'} style={{width: 240}}>
                            <Option value="RUB">Рубль (₽)</Option>
                            <Option value="USD">Доллар ($)</Option>
                            <Option value="EUR">Евро (€)</Option>
                        </Select>
                    </Form.Item>


                    <Form.Item
                        name="rentPriceAmount"
                        label="Ставка аренды"
                    >
                        <RangeInput/>
                    </Form.Item>


                    <Form.Item
                        name="salePriceAmount"
                        label="Стоимость при прод."
                    >
                        <RangeInput/>
                    </Form.Item>


                    <Form.Item
                        name="baseRentPrice"
                        label="Базовая ставка"
                    >
                        <RangeInput/>
                    </Form.Item>


                    <Form.Item
                        name="monthPriceAmount"
                        label="Мес. аренд. платеж"
                    >
                        <RangeInput/>
                    </Form.Item>


                    <Form.Item
                        name="fullPriceAmount"
                        label="Общая стоимость лота"
                    >
                        <RangeInput/>
                    </Form.Item>


                    <Form.Item
                        name="opex"
                        label="OPEX"
                    >
                        <Select mode={'tags'} defaultValue={"null"} style={{width: 240}}>
                            <Option value="null">Неизвестно</Option>
                            <Option value="include">Включен</Option>
                            <Option value="not_include">Не включен</Option>
                            <Option value="openbook">Open-book</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="opexPrice"
                        label="OPEX размер"
                    >
                        <RangeInput/>
                    </Form.Item>


                    <Form.Item
                        name="commCosts"
                        label="Коммун. расходы"
                    >
                        <RangeInput/>
                    </Form.Item>


                    <Divider>Техническая информация</Divider>

                    <Form.Item
                        name="hasWetPoints"
                        label="Мокрые точки"
                    >
                        <BooleanSelect>
                            <Option value="null">неизвестно</Option>
                            <Option value="true">да</Option>
                            <Option value="false">нет</Option>
                        </BooleanSelect>
                    </Form.Item>


                    <Form.Item
                        name="hasCafee"
                        label="Кухня/кофе-поинт"
                    >
                        <BooleanSelect>
                            <Option value="null">неизвестно</Option>
                            <Option value="true">да</Option>
                            <Option value="false">нет</Option>
                        </BooleanSelect>
                    </Form.Item>


                    <Form.Item
                        name="hasFalseFloor"
                        label="Фальш-пол"
                    >
                        <BooleanSelect>
                            <Option value="null">неизвестно</Option>
                            <Option value="true">да</Option>
                            <Option value="false">нет</Option>
                        </BooleanSelect>
                    </Form.Item>


                    <Form.Item
                        name="ceilings"
                        label="Потолки"
                    >
                        <Select mode={'tags'} style={{width: 240}}>
                            <Option value="null">неизвестно</Option>
                            <Option value="Открытые">Открытые</Option>
                            <Option value="Армстронг">Армстронг</Option>
                        </Select>
                    </Form.Item>

                    <Divider orientation={'left'}>Описания и сайты</Divider>

                    <Form.Item
                        name="qffffsassbhh"
                        label="Описание для брифа"
                    >
                        <Input.TextArea rows={3}/>
                    </Form.Item>


                    <Form.Item
                        name="qeeeefs"
                        label="Описание бриф ENG"
                    >
                        <Input.TextArea rows={3}/>
                    </Form.Item>

                    <Divider/>

                    <Form.Item
                        name="isOnSite"
                        label="Выгрузить на сайт"
                    >
                        <BooleanSelect>
                            <Option value="true">да</Option>
                            <Option value="false">нет</Option>
                        </BooleanSelect>
                    </Form.Item>


                    <Form.Item
                        name="isOnCian"
                        label="Выгрузить на cian.ru"
                    >
                        <BooleanSelect>
                            <Option value="true">да</Option>
                            <Option value="false">нет</Option>
                        </BooleanSelect>
                    </Form.Item>


                    <Form.Item
                        name="isOnYandex"
                        label="Выгр. на яндекс"
                    >
                        <BooleanSelect>
                            <Option value="true">да</Option>
                            <Option value="false">нет</Option>
                        </BooleanSelect>
                    </Form.Item>


                    <Form.Item
                        name="isOnAvito"
                        label="Выгрузить на avito"
                    >
                        <BooleanSelect>
                            <Option value="true">да</Option>
                            <Option value="false">нет</Option>
                        </BooleanSelect>
                    </Form.Item>


                    <Divider orientation={'left'}>Системная информация</Divider>


                    <Form.Item
                        name="comeToMarketDate"
                        label="Выход на рынок"
                    >
                        <DateInput disabled={true}/>

                        {/*<Input type={"date"}/>*/}
                    </Form.Item>


                </Form>
            </div>
        </div>
    </div>
}


export default SearchForm;