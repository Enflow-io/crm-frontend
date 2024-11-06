import {BuildingTypes} from "../Selects/SelectsLists";
import {CianTypes, blockTypes, finishingTypes} from "../Blocks/BlockOptions";
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
        name: 'Площадь в аренду, м²',
        type: 'number',
        fieldId: 'freeRentArea',
        visible: true,
        render: (val: any)=>{
            return Math.round(parseFloat(val));
        }
    },
    {
        name: 'Площадь на продажу, м²',
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
        name: 'Шаг колонн, м',
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
        name: 'Общ. площадь, м²',
        type: 'number',
        fieldId: 'area',
        visible: true
    },
    {
        name: 'Статус на рынке',
        type: 'boolean',
        fieldId: 'isOnMarket',
        visible: true,
        minWidth: 110,

    },
    {
        name: 'Выгрузить на сайт R&B',
        type: 'boolean',
        fieldId: 'showOnSite',
        visible: true,
        minWidth: 110,

    },
    {
        name: 'Грузовой лифт',
        type: 'boolean',
        fieldId: 'hasBigLift'
    },
    {
        name: 'Коворкинг',
        type: 'boolean',
        fieldId: 'isCoworking'
    },
    {
        name: 'Пл. офисов, м²',
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
        name: 'Кол-во этажей',
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
        name: 'Паркинг, многоуровн.',
        type: 'number',
        fieldId: 'parkingMultiQnt',
        minWidth: 110,

    },
    {
        name: 'Парк. кол-во, наземн.',
        type: 'number',
        fieldId: 'parkingNazemQnt',
        minWidth: 110,

    },
    {
        name: 'Парк. кол-во, подземн.',
        type: 'number',
        fieldId: 'parkingSubwayQnt'
    },
    {
        name: 'Кол-во пассаж. лифтов',
        type: 'number',
        fieldId: 'peopleLiftsQnt',
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
        name: 'Срок договора',
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
        type: "selectable",
        fieldId: 'blockType',
        visible: true,
        options: blockTypes
    },

    {
        name: 'Статус на рынке',
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
        name: 'Тип планировки',
        type: 'string',
        fieldId: 'planType'
    },
    {
        name: 'Отделка',
        type: 'selectable',
        fieldId: 'finishing',
        visible: true,
        options: finishingTypes
    },
    // {
    //     name: 'Телефон',
    //     type: 'string',
    //     fieldId: 'phone',
    //     visible: true
    // },
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
        name: 'Ставка аренды',
        type: 'number',
        fieldId: 'rentPrice'
    },
    {
        name: 'Общая стоимость',
        type: 'number',
        fieldId: 'fullPriceAmount'
    },
    
    {
        name: 'Цена за кв. м',
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
        name: 'Коворкинг',
        type: 'boolean',
        fieldId: 'isCoworking'
    },
    {
        name: 'Выгрузить на avito',
        type: 'boolean',
        fieldId: 'isOnAvito'
    },
    {
        name: 'С фото?',
        type: 'boolean',
        fieldId: 'withPhoto'
    },
    {
        name: 'Выгрузить на сайт',
        type: 'boolean',
        fieldId: 'isOnSite',
        visible: true
    },
    {
        name: 'Выгрузить на cian.ru',
        type: 'boolean',
        fieldId: 'isOnCian'
    },
    {
        name: "Тип объявления (ЦИАН)",
        type: "selectable",
        fieldId: "cianType",
        options: CianTypes.map(el => el.value)
    },
    {
        name: 'Выгр. на яндекс',
        type: 'boolean',
        fieldId: 'isOnYandex'
    },

]