import {BuildingTypes} from "../Selects/SelectsLists";
import {CianTypes} from "../Blocks/BlockOptions";

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
        name: 'Название (ENG)',
        type: 'string',
        fieldId: 'nameEng'
    },
    {
        name: 'Площадь в аренду',
        type: 'number',
        fieldId: 'freeRentArea',
        visible: true
    },
    {
        name: 'Площадь на продажу',
        type: 'number',
        fieldId: 'freeSaleArea',
        visible: true
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
        visible: true
    },

    {
        name: 'Аренда стоимость',
        type: 'number',
        fieldId: 'rentPrice'
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
        options: CianTypes.map(el=>el.value)
    },
    {
        name: 'Яндекс?',
        type: 'boolean',
        fieldId: 'isOnYandex'
    },

]