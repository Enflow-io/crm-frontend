
export const convertStringToBoolean = (prop: string)=>{
    if(prop === 'null'){
        return null;
    }else if(prop === 'true'){
        return true;
    }else if(prop === 'false'){
        return false;
    }else {
        return null;
    }

}
export const convertBooleanToString = (prop: boolean)=>{
    if(prop === null){
        return 'null'
    }

    if(prop === undefined){
        return 'null'
    }
    if(prop.toString() === 'true'){
        return 'true';
    }else if(prop.toString() === 'false'){
        return 'false';
    }else{
        return 'null'
    }

}

export function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function formatNumber(num: number) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
}


export const replaceAt = (array: any[], index: number, value: any) => {
    const ret = array.slice(0);
    ret[index] = value;
    return ret;
}

export const convertGlobalDistrict = (globalDistrict: string) => {
  if (globalDistrict === 'Зеленоградский') {
      return 'ЗелАО';
  } else if (globalDistrict === 'Центральный') {
      return 'ЦАО';
  } else if (globalDistrict === 'Северный') {
      return 'САО';
  } else if (globalDistrict === 'Северо-восточный') {
      return 'СВАО';
  } else if (globalDistrict === 'Восточный') {
      return 'ВАО';
  } else if (globalDistrict === 'Юго-восточный') {
      return 'ЮВАО';
  } else if (globalDistrict === 'Южный') {
      return 'ЮАО';
  }  else if (globalDistrict === 'Юго-западный') {
      return 'ЮЗАО';
  } else if (globalDistrict === 'Западный') {
      return 'ЗАО';
  } else if (globalDistrict === 'Северо-западный') {
      return 'СЗАО';
  }
  return null;
}

export const convertChanes = (changes: any) => {
    const ret = [];
    for (const [key, value] of Object.entries(changes)) {
        ret.push({
            key: key,
            value
        });
    }
    return ret;
}

export const convertKeyToString = (key: string) => {
    const keys = {
        isOnCian: 'Выгрузить на cian',
        isOnAvito: 'Выгрузить на avito',
        isOnYandex: 'Выгрузить на yandex',
        isOnMarket: 'Статус на рынке',
        name: 'Название',
        forbiddenAds: 'Запрещено рекламировать',
        realisationType: 'Тип реализации',
        isCoworking: 'Коворкинг',
        floor: 'Этаж',
        area: 'Площадь',
        workingPlaces: 'Кол-во раб. мест',
        'name-eng': 'Название (ENG)',
        blockType: 'Тип блока',
        bti: 'БОМА/БТИ',
        finishing: 'Отделка',
        furniture: 'Мебель',
        planType: 'Тип планировки',
        securityDeposit: 'Обесп. платеж',
        agreementType: 'Срок договора',
        rentalHolidays: 'Арендн. каникулы',
        indexation: 'Индексация',
        saleType: 'Форма сделки продажа',
        agentCommission: 'Комиссия, %',
        taxIncluded: 'НДС аренда',
        ndsSale: 'НДС продажа',
        currency: 'Валюта',
        rentPrice: 'Ставка аренды',
        salePrice: 'Цена за кв. м',
        baseRentPrice: 'Базовая ставка',
        fullRentPrice: 'Полная ставка',
        fullSalePrice: 'Полная ставка',
        monthPrice: 'Мес. аренд. платеж',
        fullPriceAmount: 'Общая стоимость',
        opex: 'OPEX',
        opexPrice: 'OPEX размер',
        commCosts: 'Коммун. расходы',
        wetPoints: 'Мокрые точки',
        toilet: 'Сан. узлы',
        hasCafee: 'Кухня/кофе-поинт',
        hasFalseFloor: 'Фальш-пол',
        ceilings: 'Потолки',
        ceilingHeight: 'Высота потолков',
        electricPower: 'Электрическая мощность',
        youtubeLink: 'Ссылка на видео',
        briefDescription: 'Описание для брифа',
        briefEngDescription: 'Описание для брифа (ENG)',
        siteDescription: 'Описание для сайта',
        siteDescriptionEng: 'Описание для сайта (ENG)',
        cianType: 'Тип объявления CIAN',
        cianTitle: 'Заголовок Cian',
        cianDescription: 'Описание cian.ru',
        cianMainMultiBlock: 'Основной мультиблок?',
        cianMultiBlock: 'В составе мультиблока?',
        cianMainMultiBlockId: 'Выберите основной блок',
        cianBet: 'Ставка аукциона',
        cianBetStart: 'Дата начала действия ставки',
        cianBetEnd: 'Дата окончания ставки',
        cianEnabledBy: 'Включ. эксп. в циан',
        yandexDescription: 'Описание яндекс',
        avitoTitle: 'Заголовок Avito',
        avitoDescription: 'Описание avito',
        siteCategory: 'Подборка на сайт',
        parkingType: 'Паркинг тип',
        prkQnt: 'Кол-во мест на парковке',
        parkingPrice: 'Стоимость парк.',
        parkingIncluded: 'Включен в стоимость (паркинг)',
        parkingNds: 'НДС паркинг',
        vitrinWindows: 'Витринные окна',
        urAddress: 'Юр. адрес?',
        isBusy: 'Помещение с арендатором',
        willNotBusy: 'Дата освобождения',
        entrance: 'Вход',
        targets: 'Назначение',
        payback: 'Окупаемость',
        profitability: 'Доходность',
        responsibleId: 'Ответственный',
        comeToMarketDate: 'Выход на рынок',
        createdAt: 'Дата создания',
        updatedByUserDate: 'Дата обновления',
        actualizationDate: 'Дата актуализации',
        creator: 'Создав. пользователь',
        updatedBy: 'Обновл. пользователем',
        updatedById: 'Обновл. пользователем',
        picsQnt: 'Количество фото',
        buildingId: 'Айди здания',
    }
    if (Object.keys(keys).includes(key)) {
        // @ts-ignore
        return keys[key];
    }
    return key;
}

export const convertValueToString = (value: any, key: string) => {
    if (value === true) {
        return 'Да';
    } else if (value === false) {
        return 'Нет';
    }
    return value;
}