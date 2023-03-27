import {BuildingTypes} from "../Selects/SelectsLists";
import {CianTypes} from "../Blocks/BlockOptions";
import {Select} from "antd";
import React from "react";
import { BuildingInterface } from "../../interfaces/BuildingInterface";

export const BuildingCols = [
    {
        name: 'Название',
        type: 'string',
        fieldId: 'name',
        visible: true,
        render: (obj: any, all: any) => {
            return `${all.name} (${all.blocks.length} бл.)`
        }
    },
    {
        name: 'Кол-во этажей',
        type: 'number',
        fieldId: 'floorsQnt',
        visible: true
    },
     {
        name: 'Фото',
        type: 'img',
        fieldId: 'pics',
        visible: true,
        render: (val: any, model: BuildingInterface)=>{
            if(model.pics.length>0){
                return <div><img width={120} src={model.pics[0].url} /></div>;
            }else{
                return "–"
            }
        }
    },
    {
        name: 'Название (ENG)',
        type: 'string',
        fieldId: 'nameEng'
    },
    {
        name: 'Площадь в аренду',
        type: 'number',
        fieldId: 'freeRentArea',
        visible: true,
        render: (val: any)=>{
            return Math.round(parseFloat(val));
        }
    },
    {
        name: 'Площадь на продажу',
        type: 'number',
        fieldId: 'freeSaleArea',
        visible: true,
        render: (val: any)=>{
            return Math.round(parseFloat(val));
        }
    },
    {
        name: 'Метро 1',
        type: 'string',
        fieldId: 'station1',
        visible: true
    },
    {
        name: 'Метро 2',
        type: 'string',
        fieldId: 'station2'
    },
    {
        name: 'Шаг колонн',
        type: 'string',
        fieldId: 'stepKolonn'
    },
    {
        name: 'Адрес',
        type: 'string',
        fieldId: 'address',
        visible: true
    },
    {
        name: 'Класс',
        type: 'selectable',
        fieldId: 'buildingClass',
        options: [
            "A", "B", "B+", "C"
        ],
        visible: true,
        width: 60,

    },
    {
        name: 'Общая площадь',
        type: 'number',
        fieldId: 'area',
        visible: true
    },
    {
        name: 'На рынке?',
        type: 'boolean',
        fieldId: 'isOnMarket',
        visible: true,
        minWidth: 110,

    },
    {
        name: 'На сайте?',
        type: 'boolean',
        fieldId: 'showOnSite',
        visible: true,
        minWidth: 110,

    },
    {
        name: 'Груз. лифты?',
        type: 'boolean',
        fieldId: 'hasBigLift'
    },
    {
        name: 'Коворкинг?',
        type: 'boolean',
        fieldId: 'isCoworking'
    },
    {
        name: 'Площадь офисов',
        type: 'number',
        fieldId: 'officesArea'
    },
    {
        name: 'Год постройки',
        type: 'number',
        fieldId: 'buildingYear',
        visible: true,
        minWidth: 110,

    },
    {
        name: 'Этажность',
        type: 'number',
        fieldId: 'floorsQnt',
        visible: true
    },
    {
        name: 'До метро1',
        type: 'number',
        fieldId: 'fromStation1'
    },
    {
        name: 'До метро2',
        type: 'number',
        fieldId: 'fromStation2'
    },
    {
        name: 'Парковка мног. кол-во',
        type: 'number',
        fieldId: 'parkingMultiQnt',
        minWidth: 110,

    },
    {
        name: 'Парковка назем. кол-во',
        type: 'number',
        fieldId: 'parkingNazemQnt',
        minWidth: 110,

    },
    {
        name: 'Парковка подз. кол-во',
        type: 'number',
        fieldId: 'parkingSubwayQnt'
    },
    {
        name: 'Кол-во лифтов',
        type: 'number',
        fieldId: 'peopleLiftsQnt',
        minWidth: 110,

    },
    {
        name: 'Метро выбор',
        type: 'stations',
        fieldId: 'metroStations',
        minWidth: 110,

    },
    {
        name: 'По карте',
        type: 'polygon',
        fieldId: 'polygon',
        minWidth: 110,

    },
    {
        name: 'Округ',
        fieldId: 'globalDistrict',
        minWidth: 110,
        type: "selectable",
        options: [
            "ЦАО",
            "САО",
            "СВАО",
            "ВАО",
            "ЮВАО",
            "ЮАО",
            "ЮЗАО",
            "ЗАО"

        ]
    },
    {
        name: 'Район',
        type: 'string',
        fieldId: 'district',
        minWidth: 110,
    },
    {
        name: 'Тип здания',
        type: 'selectable',
        fieldId: 'buildingType',
        options: BuildingTypes
    },
]


export const BlockCols = [
    {
        name: 'Тип договора',
        type: 'string',
        fieldId: 'agreementType'
    },
    {
        name: 'Название',
        type: 'string',
        fieldId: 'name',
        visible: true
    },
    {
        name: 'Тип блока',
        type: 'string',
        fieldId: 'blockType',
        visible: true
    },

    {
        name: 'На рынке?',
        type: 'selectable',
        fieldId: 'isOnMarket',
        options: [
            "есть на рынке",
            "нет на рынке",
            "продан",
        ],
        visible: true
    },
    {
        name: 'Планировка',
        type: 'string',
        fieldId: 'planType'
    },
    {
        name: 'Телефон',
        type: 'string',
        fieldId: 'phone',
        visible: true
    },
    {
        name: 'Этаж',
        type: 'string',
        fieldId: 'floor',
        visible: true
    },
    {
        name: 'Площадь',
        type: 'number',
        fieldId: 'area',
        visible: true,

    },

    {
        name: 'Аренда стоимость',
        type: 'number',
        fieldId: 'rentPrice'
    },
    {
        name: 'Продажа стоимость',
        type: 'number',
        fieldId: 'salePrice'
    },
    {
        name: 'Аренда?',
        type: 'boolean',
        fieldId: 'isRent',
        visible: true
    },
    {
        name: 'Коворкинг?',
        type: 'boolean',
        fieldId: 'isCoworking'
    },
    {
        name: 'Авито?',
        type: 'boolean',
        fieldId: 'isOnAvito'
    },
    {
        name: 'С фото?',
        type: 'boolean',
        fieldId: 'withPhoto'
    },
    {
        name: 'На сайте?',
        type: 'boolean',
        fieldId: 'isOnSite',
        visible: true
    },
    {
        name: 'Циан?',
        type: 'boolean',
        fieldId: 'isOnCian'
    },
    {
        name: "Циан, тип",
        type: "selectable",
        fieldId: "cianType",
        options: CianTypes.map(el => el.value)
    },
    {
        name: 'Яндекс?',
        type: 'boolean',
        fieldId: 'isOnYandex'
    },

]