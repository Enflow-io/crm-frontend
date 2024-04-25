import exp from "constants";
export const LIGHTGREEN_BRANCH_COLOR = '#4DBE52';
export const GREEN_BRANCH_COLOR = '#00be0b';
export const GROW_BRANCH_COLOR = '#F07025';
export const RED_BRANCH_COLOR = '#f01500';
export const YELLOW_BRANCH_COLOR = '#f0cf20';
export const GRAY_BRANCH_COLOR = '#575757';
export const BLUE_BRANCH_COLOR = '#2C75C4';
export const DARK_BLUE_BRANCH_COLOR = '#122bc4';
export const BROWN_BRANCH_COLOR = '#85412E';

interface StationInterface {
    id: string
    label: string
}

export const greenLine: StationInterface[] = [
    {id: 'Khovrino', label: 'Ховрино'},
    {id: 'Belomorskaya', label: 'Беломорская'},
    {id: 'Rechnoy_Vokzal', label: 'Речной вокзал'},
    {id: 'Vodny_Stadion', label: 'стадион'},
    {id: 'Voykovskaya', label: 'Войковская'},
    {id: 'Sokol', label: 'Сокол'},
    {id: 'Aeroport', label: 'Аэропорт'},
    {id: 'Dinamo', label: 'Динамо'},
    {id: 'Belorusskaya_2', label: 'Белорусская'},
    {id: 'Tverskaya', label: 'Тверская'},
    {id: 'Mayakovskaya', label: 'Маяковская'},
    {id: 'Teatralnaya', label: 'Театральная'},
    {id: 'Novokuznetskaya', label: 'Новокузнецкая'},
    {id: 'Paveletskaya_2', label: 'Павелецкая'},
    {id: 'Avtozavodskaya_2', label: 'Автозаводская'},
    {id: 'Tekhnopark', label: 'Технопарк'},
    {id: 'Kolomenskaya', label: 'Коломенская'},
    {id: 'Kashirskaya_2', label: 'Каширская'},
    {id: 'Kantemirovskaya', label: 'Кантемировская'},
    {id: 'Tsaritsyno', label: 'Царицыно'},
    {id: 'Orekhovo', label: 'Орехово'},
    {id: 'Domodedovskaya', label: 'Домодедовская'},
    {id: 'Krasnogvardeyskaya', label: 'Красногвардейская'},
    {id: "Alma-Atinskaya", label: "Алма-Атинская"}
];

export const brownLine: StationInterface[] = [
    {id: 'Krasnopresnenskaya', label: 'Краснопресненская'},
    {id: 'Belorusskaya_2', label: 'Белорусская'},
    {id: 'Novoslobodskaya', label: 'Новослободская'},
    {id: 'Prospekt_Mira_6', label: 'Мира'},
    {id: 'Komsomolskaya_1', label: 'Комсомольская'},
    {id: 'Kurskaya_3', label: 'Курская'},
    {id: 'Marksistskaya', label: 'Марксистская'},
    {id: 'Paveletskaya_2', label: 'Павелецкая'},
    {id: 'Dobryninskaya', label: 'Добрынинская'},
    {id: 'Oktyabrskaya_6', label: 'Октябрьская'},
    {id: 'Park_Kultury_1', label: 'Парк культуры'},
    {id: 'Kiyevskaya_3', label: 'Киевская'},
];

export const grayLine: StationInterface[] = [
    {id: 'Altufyevo', label: 'Алтуфьево'},
    {id: 'Bibirevo', label: 'Бибирево'},
    {id: 'Otradnoye', label: 'Отрадное'},
    {id: 'Vladykino_9', label: 'Владыкино'},
    {id: 'Petrovsko-Razumovskaya_9', label: 'Петровско-Разумовская'},
    {id: 'Timiryazevskaya', label: 'Тимирязевская'},
    {id: 'Dmitrovskaya', label: 'Дмитровская'},
    {id: 'Savyolovskaya_9', label: 'Савеловская'},
    {id: 'Mendeleyevskaya', label: 'Менделеевская'},
    {id: 'Tsvetnoy_Bulvar', label: ' бульвар'},
    {id: 'Chekhovskaya', label: 'Чеховская'},
    {id: 'Borovitskaya', label: 'Боровицкая'},
    {id: 'Polyanka', label: 'Полянка'},
    {id: 'Serpukhovskaya', label: 'Серпуховская'},
    {id: 'Tulskaya', label: 'Тульская'},
    {id: 'Nagatinskaya', label: 'Нагатинская'},
    {id: 'Nagornaya', label: 'Нагорная'},
    {id: 'Nakhimovsky_Prospekt', label: 'Нахимовский проспект'},
    {id: 'Sevastopolskaya', label: 'Севастопольская'},
    {id: 'Chertanovskaya', label: 'Чертановская'},
    {id: 'Yuzhnaya', label: 'Южная'},
    {id: 'Prazhskaya', label: 'Пражская'},
    {id: 'Ulitsa_Akademika_Yangelya', label: 'Улица Академика Янгеля'},
    {id: 'Annino', label: 'Аннино'},
    {id: 'Bulvar_Dmitriya_Donskogo', label: 'Бульвар Дмитрия Донского'},
    {id: 'Ulitsa_Starokachalovskaya', label: 'Улица Старокачаловская'},
    {id: 'Ulitsa_Skobelevskaya', label: 'Улица Скобелевская'},
    {id: 'Bulvar_Admirala_Ushakova', label: 'Бульвар АдмиралаУшакова'},
    {id: 'Ulitsa_Gorchakova', label: 'Улица Горчакова'},
    {id: 'Buninskaya_Alleya', label: 'Бунинская аллея'},
]

export const lightGreenLine: StationInterface[] = [
    {id: 'Lianozovo', label: 'Лианозово'},
    {id: 'Ulitsa_800_Letiya_Moskvy', label: 'Улица 800-летия Москвы'},
    {id: 'Seligerskaya', label: 'Селигерская'},
    {id: 'Verkhniye_Likhobory', label: 'Верхние Лихоборы'},
    {id: 'Okruzhnaya_10', label: 'Окружная'},
    {id: 'Petrovsko-Razumovskaya_9', label: 'Петровско-Разумовская'},
    {id: 'Fonvizinskaya', label: 'Фонвизинская'},
    {id: 'Butyrskaya', label: 'Бутырская'},
    {id: 'Maryina_Roshcha_10', label: 'Марьина Роща'},
    {id: 'Dostoyevskaya', label: 'Достоевская'},
    {id: 'Trubnaya', label: 'Трубная'},
    {id: 'Sretensky_Bulvar', label: 'Сретенский бульвар'},
    {id: 'Rimskaya', label: 'Римская'},
    {id: 'Krestyanskaya_Zastava', label: 'застава'},
    {id: 'Dubrovka_10', label: 'Дубровка'},
    {id: 'Kozhukhovskaya', label: 'Кожуховская'},
    {id: 'Pechatniki_10', label: 'Печатники'},
    {id: 'Volzhskaya', label: 'Волжская'},
    {id: 'Lyublino', label: 'Люблино'},
    {id: 'Shipilovskaya', label: 'Шипиловская'},
    {id: 'Shipilovskaya', label: 'Шипиловская'},
    {id: 'Bratislavskaya', label: 'Братиславская'},
    {id: 'Marino', label: 'Марьино'},
    {id: 'Borisovo', label: 'Борисово'},
    {id: 'Shipilovskaya', label: 'Шипиловская'},
    {id: 'Zyablikovo', label: 'Зябликово'},
]

export const orangeLine: StationInterface[] = [
    {id: 'Medvedkovo', label: 'Медведково'},
    {id: 'Babushkinskaya', label: 'Бабушкинская'},
    {id: 'Sviblovo', label: 'Свиблово'},
    {id: 'Botanichesky_Sad_6', label: ' сад'},
    {id: 'VDNKh', label: 'ВДНХ'},
    {id: 'Alekseyevskaya', label: 'Алексеевская'},
    {id: 'Rizhskaya_6', label: 'Рижская'},
    {id: 'Prospekt_Mira_6', label: 'Мира'},
    {id: 'Sukharevskaya', label: 'Сухаревская'},
    {id: 'Turgenevskaya', label: 'Тургеневская'},
    {id: 'Kitay-Gorod_6a', label: 'Китай-город'},
    {id: 'Tretyakovskaya_6a', label: 'Третьяковская'},
    {id: 'Shabolovskaya', label: 'Шаболовская'},
    {id: 'Akademicheskaya_6', label: 'Академическая'},
    {id: 'Leninsky_Prospekt', label: 'Ленинский проспект'},
    {id: 'Profsoyuznaya', label: 'Профсоюзная'},
    {id: 'Novye_Cheryomushki', label: 'Новые Черёмушки'},
    {id: 'Kaluzhskaya', label: 'Калужская'},
    {id: 'Belyayevo', label: 'Беляево'},
    {id: 'Konkovo', label: 'Коньково'},
    {id: 'Tyoply_Stan', label: 'Тёплый Стан'},
    {id: 'Yasenevo', label: 'Ясенево'},
    {id: 'Novoyasenevskaya', label: 'Новоясеневская'},
]

export const redLine: StationInterface[] = [
    {id: 'Kommunarka_1', label: 'Коммунарка'},
    {id: 'Olkhovaya', label: 'Ольховая'},
    {id: 'Prokshino', label: 'Прокшино'},
    {id: 'Filatov_Lug', label: 'Филатов луг'},
    {id: 'Salaryevo', label: 'Саларьево'},
    {id: 'Rumyantsevo', label: 'Румянцево'},
    {id: 'Troparyovo', label: 'Тропарёво'},
    {id: 'Zapadnaya', label: 'Юго-Западная'},
    {id: 'Prospekt_Vernadskogo_1', label: 'Проспект Вернадского'},
    {id: 'Vorobyovy_Gory', label: ' горы'},
    {id: 'Sportivnaya_1', label: 'Спортивная'},
    {id: 'Frunzenskaya', label: 'Фрунзенская'},
    {id: 'Kropotkinskaya', label: 'Кропоткинская'},
    {id: 'Biblioteka_Imeni_Lenina', label: 'Библиотека имени Ленина'},
    {id: 'Okhotny_Ryad', label: 'Охотный Ряд'},
    {id: 'Lubyanka', label: 'Лубянка'},
    {id: 'Chistye_Prudy', label: 'Чистые пруды'},
    {id: 'Krasnye_Vorota', label: 'Красные Ворота'},
    {id: 'Komsomolskaya_1', label: 'Комсомольская'},
    {id: 'Krasnoselskaya', label: 'Красносельская'},
    {id: 'Sokolniki_1', label: 'Сокольники'},
    {id: 'Preobrazhenskaya_Ploshchad', label: 'Преображенская площадь'},
    {id: 'Cherkizovskaya', label: 'Черкизовская'},
    {id: 'Bulvar_Rokossovskogo_1', label: 'Бульвар Рокоссовского'},
]

export const darkBlueLine: StationInterface[] = [
    {id: 'Golyanovo', label: 'Гольяново'},
    {id: 'Shchyolkovskaya', label: 'Щёлковская'},
    {id: 'Pervomayskaya', label: 'Первомайская'},
    {id: 'Izmaylovskaya', label: 'Измайловская'},
    {id: 'Partizanskaya', label: 'Партизанская'},
    {id: 'Semyonovskaya', label: 'Семёновская'},
    {id: 'Elektrozavodskaya_3', label: 'Электрозаводская'},
    {id: 'Baumanskaya', label: 'Бауманская'},
    {id: 'Kurskaya_3', label: 'Курская'},
    {id: 'Ploshchad_Revolyutsii', label: 'Площадь Революции'},
    {id: 'Smolenskaya_3', label: 'Смоленская'},
    {id: 'Park_Pobedy_3', label: 'Парк Победы'},
    {id: 'Slavyansky_Bulvar', label: ' бульвар'},
    {id: 'Kuntsevskaya_3', label: 'Кунцевская'},
    {id: 'Molodyozhnaya', label: 'Молодёжная'},
    {id: 'Krylatskoye', label: 'Крылатское'},
    {id: 'Strogino', label: 'Строгино'},
    {id: 'Myakinino', label: 'Мякинино'},
    {id: 'Volokolamskaya', label: 'Волоколамская'},
    {id: 'Mitino', label: 'Митино'},
    {id: 'Pyatnitskoye_Shosse', label: 'Пятницкое шоссе'},
]

export const blueLine: StationInterface[] = [
    {id: 'Arbatskaya_4', label: 'Арбатская'},
    {id: 'Aleksandrovsky_Sad', label: 'Александровский сад'},
    {id: 'Smolenskaya_4', label: 'Смоленская'},
    {id: 'Mezhdunarodnaya', label: 'Международная'},
    {id: 'Vystavochnaya', label: 'Выставочная'},
    {id: 'Kutuzovskaya_4', label: 'Кутузовская'},
    {id: 'Fili', label: 'Фили'},
    {id: 'Filyovsky_Park', label: 'парк'},
    {id: 'Pionerskaya', label: 'Пионерская'},
    {id: 'Bagrationovskaya', label: 'Багратионовская'}
]

export const yellowLine: StationInterface[] = [
    {id: 'Novokosino', label: 'Новокосино'},
    {id: 'Novogireevo', label: 'Новогиреево'},
    {id: 'Perovo', label: 'Перово'},
    {id: 'Shosse_Entuziastov_8', label: 'Шоссе Энтузиастов'},
    {id: 'Ploshchad_Ilyicha', label: 'Площадь Ильича'},
    {id: 'Marksistskaya', label: 'Марксистская'},
    {id: 'Minskaya', label: 'Минская'},
    {id: 'Lomonosovsky_Prospekt', label: 'проспект'},
    {id: 'Ramenki', label: 'Раменки'},
    {id: 'Michurinsky_Prospekt_8', label: 'Мичуринский проспект'},
    {id: 'Ozyornaya', label: 'Озёрная'},
    {id: 'Govorovo', label: 'Говорово'},
    {id: 'Solntsevo', label: 'Солнцево'},
    {id: 'Borovskoye_Shosse', label: 'Боровское шоссе'},
    {id: 'Novoperedelkino', label: 'Новопеределкино'},
    {id: 'Rasskazovka', label: 'Рассказовка'},
    {id: 'Pykhtino', label: 'Пыхтино'},
    {id: 'Aviamotornaya_8', label: 'Авиамоторная'},
    {id: 'Aviamotornaya_15', label: 'Авиамоторная'},
]


export const mcdLine: StationInterface[] = [
    {id: 'Ploshchad_Gagarina_14', label: 'Площадь Гагарина'},
    {id: 'Luzhniki_14', label: 'Лужники'},
    {id: 'Delovoy_Tsentr_14', label: ' центр'},
    {id: 'Khoroshyovo_14', label: 'Хорошёво'},
    {id: 'Zorge', label: 'Зорге'},
    {id: 'Panfilovskaya', label: 'Панфиловская'},
    {id: 'Streshnevo', label: 'Стрешнево'},
    {id: 'Baltiyskaya', label: 'Балтийская'},
    {id: 'Koptevo_14', label: 'Коптево'},
    {id: 'Likhobory', label: 'Лихоборы'},
    {id: 'Rostokino', label: 'Ростокино'},
    {id: 'Belokamennaya_14', label: 'Белокаменная'},
    {id: 'Bulvar_Rokossovskogo_1', label: 'Бульвар Рокоссовского'},
    {id: 'Izmaylovo_14', label: 'Измайлово'},
    {id: 'Sokolinaya_Gora_14', label: 'Соколиная Гора'},
    {id: 'Andronovka_14', label: 'Андроновка'},
    {id: 'Novokhokhlovskaya_14', label: 'Новохохловская'},
    {id: 'Ugreshskaya', label: 'Угрешская'},
    {id: 'ZIL_14', label: 'ЗИЛ'},
    {id: 'Verkhnie_Kotly', label: 'Верхние Котлы'},
    {id: 'Krymskaya', label: 'Крымская'},
]


export const darkMagentaLine: StationInterface[] = [
    {id: 'Planernaya', label: 'Планерная'},
    {id: 'Skhodnenskaya', label: 'Сходненская'},
    {id: 'Tushinskaya', label: 'Тушинская'},
    {id: 'Spartak', label: 'Спартак'},
    {id: 'Shchukinskaya', label: 'Щукинская'},
    {id: 'Oktyabrskoye_Pole', label: 'Октярьское Поле'},
    {id: 'Polezhayevskaya', label: 'Полежаевская'},
    {id: 'Begovaya', label: 'Беговая'},
    {id: 'Ulitsa_1905_Goda', label: 'Улица 1905 года'},
    {id: 'Barrikadnaya', label: 'Баррикадная'},
    {id: 'Pushkinskaya', label: 'Пушкинская'},
    {id: 'Kuznetsky_Most', label: 'Кузнецкий мост'},
    {id: 'Kitay-Gorod_6a', label: 'Китай-Город'},
    {id: 'Taganskaya_7', label: 'Таганская'},
    {id: 'Proletarskaya', label: 'Пролетарская'},
    {id: 'Volgogradsky_Prospekt', label: 'Волгоградский проспект'},
    {id: 'Tekstilshchiki_7', label: 'Текстильщики'},
    {id: 'Vykhino', label: 'Выхино'},
    {id: 'Kuzminki', label: 'Кузьминки'},
    {id: 'Lermontovsky_Prospekt', label: 'Лермонтовский проспект'},
    {id: 'Zhulebino', label: 'Жулебино'},
    {id: 'Kotelniki', label: 'Котельники'},
]

export const allStations = [
    ...greenLine, ...brownLine, ...grayLine,
    ...lightGreenLine, ...orangeLine, ...redLine,
    ...darkBlueLine, ...blueLine, ...yellowLine, ...mcdLine, ...darkMagentaLine
]

export const groupedStations = [
    {
        name: 'Замоскворецкая',
        stations: greenLine
    },
    {
        name: 'Кольцевая',
        stations: brownLine
    },
    {
        name: 'Серпуховская-Темирязевская',
        stations: grayLine
    },
    {
        name: 'Люблинская',
        stations: lightGreenLine
    },
    {
        name: 'Калужско-Рижская',
        stations: orangeLine
    },
    {
        name: 'Сокольническая',
        stations: redLine
    },
    {
        name: 'Арбатско-покровская',
        stations: darkBlueLine
    },
    {
        name: 'Филевская',
        stations: blueLine
    },
    {
        name: 'Калининская',
        stations: yellowLine
    },
    {
        name: 'МЦД',
        stations: mcdLine
    },
    {
        name: 'Таганско-Краснопресненская',
        stations: darkMagentaLine
    },
]


export const getStationById = (id: string) => {
    return allStations.find(el=>el.id === id);
}

export const getStationColorByLabel = (label: string) => {

    const hasColor = (e: any) => e.label === label;


    if (brownLine.some(hasColor)) {
        return BROWN_BRANCH_COLOR
    } else if (grayLine.some(hasColor)) {
        return GRAY_BRANCH_COLOR;
    } else if (greenLine.some(hasColor)) {
        return GREEN_BRANCH_COLOR;
    } else if (lightGreenLine.some(hasColor)) {
        return LIGHTGREEN_BRANCH_COLOR;
    } else if (orangeLine.some(hasColor)) {
        return GROW_BRANCH_COLOR
    } else if (redLine.some(hasColor)) {
        return RED_BRANCH_COLOR;
    } else if (darkBlueLine.some(hasColor)) {
        return BLUE_BRANCH_COLOR
    } else if (blueLine.some(hasColor)) {
        return DARK_BLUE_BRANCH_COLOR;
    } else if (yellowLine.some(hasColor)) {
        return YELLOW_BRANCH_COLOR;
    } else if (mcdLine.some(hasColor)) {
        return '#ffa4ca'
    }else if(darkMagentaLine.some(hasColor)) {
        return '#ff1a96'

    }


}


export const getStationLineImgByLabel = (label: string) => {

    const hasColor = (e: any) => e.label === label;


    if (brownLine.some(hasColor)) {
        return 'data:image/png;base64,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'
    } else if (grayLine.some(hasColor)) {
        return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAABGdBTUEAALGPC/xhBQAABUBJREFUWAnNWUlIa1cY/hMn1OCEOEQEIV1pVEQcENSoC3HCtj4nRN7e9oHSrvteC3VlUaSELhXF2T5E6dqCgiBdVBQRtAuH1LkunEXT/zvmXpLce5Obh6Y9EM85//jd//7/OeceDfSJrbW11cKqjQaDIZ97M35OpxM9Mc3Bnfgx7Q8ez01OTu6AF2gzBKLQ2dmZ9PDw8DU7/YL1rIHosuw6A/8YFhb288jIyLFeXV0Au7q6TOfn598wsG/ZsEmvcQ25Swbal5CQ8JPdbr/UkJHJfgHyq/ySDdoZXLKs9QIDtnnENrv41f/qy5xRi8nKhra2tvfMn3lpcPDpsjkDH/ClhUOV0dPTE+lwOIZZqVlL8YXp02az+W1/f/+Nt11FBPE0QQYHTM3wqRbJEG/EW1tbeK1fedODMM+anZ11rq+v/+7uy+MVoyCYOcM/D7q7wiuPnWz/jXvhyK8YSwmq9T8Eh2dnCAY7sGCCJgN0rXO6lxI2RHV1dc9WfPwtLS2lkBBFJmlqcB4mA4skIABih2AGFmHdLS8vjzgliBdcTZ3w8HDq6OigoqIiTRk1BrAAE3gCIG9f73gsh1VNyZtWVVVFANDU1OTNkufV1dUUFxdHkA2wmbClQkcAZMSfB2IgPj6eEEE0m81GycnKzIiIiKCGhgYhk5mZSSkpKWKs9w9jwn5PRtepxKpXEXIAZTSKZxP51dysXM9ramooJiZGmEW+VlZWBuICslZgg5fGQDThrKKiwkOlpKSE0tPTZVpkZCTV19fLcwzKy8sDKhaXcqORHeI8p7tlZ2dTUpLIX1kH0WxpaZHnqG6TyTOlY2NjqaCgQJbRMwA2RFAcMvUoQEYr4eHcYrFQdHQ01dbWqprT0lUVfiaaQ7nXDRA5lZ+vHXA+mdD29jZFRUWp+rRarSL6x8e6z6tmI1eLboDIo9BQPJN6w+uXKldNItBiATa8Yux/upqeSvT1AHDivgLocOpEkfytQ5CwlqWmpipEDw8PFTSJcHR0JA3lHgu3rzSRBXkAbIggvr78NrUEv7q6ot7eXrq9vVXoPz09UV9fH52enip4arYUQs8Ehy6AWDIKCwsVNlZWVggJPzc3p+AtLi7S3t4eLS8vK3g5OTmUmJiooKsQHCgSfLf6bGVlZcSfiwqZpaUlQVtYWKCTkxOZj4hOTU2JuSQjM3mAdVNPPgMbIqh8fHdrPFYzdnZ2Rpubm0KSN3YaHR2Vtebn5+ni4kLMEcXd3V2ZJw1QLKhqP20uZGNj4x9en96woOf2wITi4mLKzc0lnOm8287ODgHY9fU13dzc0MHBgSgkVPHg4CA9Pj6KvRiHChzJ0tLSPExgO+QIEXaY/f19D55rss4n6x/FosZP8pGFFQeG7u5uNUVBw5qH38DAACEX0YaHhykjI4Pu7u7EHPuzLxvSIQMLvHcDJtBEjHE4vL+/x92J5wbqrRW8+SWfNS24IhFn8bW1tSuORjj7twUPg7Ynjl7v2NjYb5BAkYiGuxJmKFdWSSBIPTAAi+RO/ppZXV29z8rK+osZODf5LS/JwAv32HbfDg0N/SnZlQGCwBW9icTnZsOfYDeO3vdcub+4+1VEiqsZl0aTLKQ8x7trvvx4emJiopVBehxe5ByU/EEAFzk8n5ZoQejF5ZE3OPhVRFACg0i2t7d/x/17X3KS/Cf2TrzW8fHxH9TAwaYmQMkh7mtY+f93gSkBxEUOl/1nDPID0/xe2Up6PnpcAX+ATfdLIi15vxF0V3Rdor/j144PfcXW6C6rMn69S3QVZ7iXsTD91f8N8S+z18nshcxWTQAAAABJRU5ErkJggg==';
    } else if (greenLine.some(hasColor)) {
        return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAABGdBTUEAALGPC/xhBQAABWBJREFUWAnNWV1MHFUU/u7sH1uW8rPsLlBo+TOaaI2GxAcbW6CVamtbxLbiDwUqJdEWtUpM1AhSQmJSmmhifFQb05gGY+ODj0o11gcNiQmgPhRqaQWxD0JZyp/LeM4Ms+zszP5MoeBplrn3nHvO+ebcuefeeypwu3QpvQRz/x4ARBkE8iDTj59MMkapPao8IffBZf8K2yaHbseVsKR0yePHHE6Q8ychy/dZ0hVigABfgAsfYlvw72R1kwPY6/MAM6+T0VYCRu0VkBBB0u4G3GdQcYPbcSkxwO88NQjhI5q3QFxLloViHDa8hB3BL+OpSjGFsizQ62nHovzF6oNjr/TCbJt9sK8YZC74Md+NuYmzpHgoht7qsoXogSujHg9fn4k2bIwgv81agmNEHAjVpyFgRoAX09rWLHKR4WKQ7DuK9Ih5QfB3IVMiWQ8S5FkSByMXzjIQTiXyzOU7syCsvC2tbuEu1VJQxBRznks+ldgg4bWCloSe6wK1cApHwnHLAxiDknMVlgqQdwhOwhbocW8Vuorake9Sdzcz1Q2SG6dLu/CUr9pMHI/XChUThYFpHi20MCztEM15R5FiS0Fb4ZsxHR3f1IyAM4BjeQ0xx5gKGAtvqUTaFFt6xTxnDvZ4dyu2G3PqUOouNvjx2FLxxuaTCr88YzvucpcYxsRl8H5PJIFPJRY3/qO5R2ATNsW+XbKjo+htg6+X819EtjNb4QshKIqNhjFxGYyJsEnqkSnuUJ1Qogz0Qm69jlfrP4StqfeGeem2jWgteCXc50Z9zrNwCLuOl7BDxzmaYjrPWaBHsypR6N6i05CEhM6id8K8kwUnkOnIDPe54Xf6UZ29T8dL3BFlHJDYy9DEwrFc86k64HsCD6WVIdOegVcLjptoAs1Wp5mw2Sl3Jw3Q7/Bhf/ZeU+fM7Cpux083+5BuTzcdszOzAsUphRie/cNUbmASNksRbMh9Dg4pdtLdRdPfuln/7UU65cXSZCXlUAQ5zciRRmK1eU9sym2IJQ7znZIz3DZrcFqyL2UAM3kUT5YI3lgU07Sr5LINpQbZ0MywgacxhmeuaM3wM8cVwD7vnnA/boOw8RSPxh20JDTbDSYWJlD1y35Mh6YNJkJyCNX9tRiZvWaQ8S6UFBE2jmBCgF57Fmp8dMOMop4bF5QP/r2rZ6IkwCdjn6F/ehCfj/cYZFVZO7HFVWDgGxiEjb5BurcmoCOUZF2SyzDq3Ph5hdd97QNcnR0JyzmibVc6lb42JiykBufN5BaL3Ccpl+pIbZN2U169gXt99k98P/GDwp9dnEPr5bfCY06PvI+x+XGlz1HsDw6EZVqjMbeOLnW8RuMQXfht+HjuHzS4DtIwPnLp6LCvBru9u/B8Tq2Oz52fKd8xsMnQJG6GpvDrrd9RkfGIEulnBhuwIC+A8+Ze72PYREeye1Lv1tnYaE/DIv0LOPwYvPWbTqZ0+KK/fapLPVF/6zlFU728Vy0NlyuCRsUozuGBOvC3yPSAZyv97senf51T+pUZO/DNg18r7Xh/RK/ZSU90ojLYpgLkw+E8hqyeCeM5XZGMqw9OlHCJRP0I1FpJ94qMrq5yt1a/ifhKqVYCurCsOzEGxqLSMkAu5HCthK9+60XsmzFEFJWWATIopZAjOtYLH81gR+SdmHGoiyQSEZc+LqadX/PqAtdnyqeehhC6GdRHUIFMA7iQwwprRVrxKAqcAicmBjWSVCuRqTxmEumYihYEyvdO01o+dSo6cpoV4xRrEu35vy1gagB54XCtRIh36Zd4a9H0Yj3ZhmKLbCaorrKJxBGMdKTuOC3EqrZ6lyZQd7CIHglSa6/Rf0P8Bx6IlWdp35LbAAAAAElFTkSuQmCC';
    } else if (lightGreenLine.some(hasColor)) {
        return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAABGdBTUEAALGPC/xhBQAABX1JREFUWAnNWV1MHFUUPvfOsgsL5W9LgRVQWowxwVLEEkKr/JRCrBZKC6IY/Hk1+mTjY6tN+tCIPhlfTEgaY0wDFum7AUzBpyYmLcYojQIGukXTxvCzC+5ez7nLjDM7d3ZnCWBvspk75/ebc8/9O8tgm+3MVN+hWOSfLgFQBwyCTIggMBaU5oRYFIwtgoBFBnCL+zxj3x67dnc7rlDffeueGjgQjay+Kxh0o/Nq95ooyeAOEzCq+bI/Gz325X23uq4A9o735kQg+j56OS+EyHFrXCXHGFsBEIM+0D4ZbhnGfvKWEmDnZM9ZiMY+x6EsTm4qPS46DoHG37nRNHI9mSZ3YmKkWOf42YsiFhvZaXDkk2ySbekDfTnhUDJ6p3uzIpHYVQTZ66S4k3Qc9mGfj7853Di8nmjXFkGK3F6CI0AUiC2ftoDZAHZNnLuwV5EzR4t8km8zjfoWxDQhKC8wQSz0RKVde2cgGOc95oljAJFLiYjO7saESOeDEFDIx7QqfQkyhpjWuXTAceDQVX46pe/m4ibwME9KOV2AMMTX3DhFAqQdghZhXcjNsy5QCwOV/RDwFTqKe7kX3q56AxqLGhxl1Ax2Po4JMAzYohvr72GSprVDdARPglfzwqtPvKL2gdSXHnsRCrz50B5sc5RRMQgLbanEkwAFxM6oBJ1ohd4CqAs8K9ltJa1QmlViE83UMuFcRdzsM/nVKFNqk0lGkPs9CnA6laS78beVngCNadK+xjXor+yz+TpddgpyvbmSjgsxdKQZRcJE2DgdmWzWkxAYrkAnEaC5PX/gODyeXWGQ/JofusutZltLWoyPMgRTdAgbx1lTl0LOwj5SWAPFWTinTI0zDq9XvmZQuspfhpwMa0rne/OgYX+9IeOmQ9g4BiR+yHSjgTIdpeqEbyiqhyf3VUG2Jxs6EaCq0cRKqyE2D52EEamrlpeRC/X7jzrKDhzsh1/+npUgVUI1BYehOLMYQuGQim2jETaM4NYx3ca2E06UtoKHOy+6NPzdFZ12xS0KTZb2oDV/HYWJgdhwmRFuAwjtCZNDZTyDZ6jIBo2WJcpZd00IjtN5yY0wrWVBvz1dl9bvOarfU/AKfAVQH3jOUcfCQGxc3r4sVPWLajdY2VyFCz9egnA0bFOKiihcvn0FlsPLNl5HsN1GUxEIG0VwUcU00/Z5cpT76dTytEz4kblRs7jsf7c0DnOr8zAZumnj1WKuFvmKbHQbAbFxPN7csjESCC0lzaDKrYnQ91JydGEM7of/u0lSRL/67WvJm9ySMZukHHQzWQgbp0u1WVnVVw3vn+G/YObhT1J8M7YJQ7NXDdXr82PwYOOhfKco/r4yZ/D0ThuuCHRkS9YIm/bz0MyDp956ugcFrdsDEo4XNUJt4Ai0lDTZ7PyK6x0BW42uwnp0HRbW/gCaSB6cxR/PfAqUg7RuHg3UySNZWXaZxYbf44cY5ld+Rh7Mry1YePIFL/o3Xhi5LBc1uvHjWlOdKPVBNd7VHVpN4WGg35U7gzC1/IOU+mJ2CA7mVEIkFpHvtD8ns6EfMm6OT9u8ECYi4jADyJLGxtrddM+EpLsbjaoPmtd/iEokMgnitRIxuBvOtmdTDOr1GyNLqVaC4XS3SW7PqystwkBYdGEDoLxFYa0EB9311qcb2bEn+UYM+o2O7BoA6YXuo/gFH1H//2jk23wnJgxIszacKKxroucaPvekLqN7p/rMWPNIHz4tI2iJIAmTABVySEFX3u0n+dryaQEn8Tg5j0cS6zQAFzEzbJF20kuLTqUOHNax5m8uJUZOt5PS8SNbwNS/gJKWaiV4GP4QvzJlyVbXc3qSDbJFNhMnhEonZQTNSvEdB6sQdNF/lIroZpB6f6/+hvgXmyrjKJyGJnkAAAAASUVORK5CYII=';
    } else if (orangeLine.some(hasColor)) {
        return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAABGdBTUEAALGPC/xhBQAABVBJREFUWAnNWV9sFEUY/2b2z12b9lopIKKiCbUNUhsNAq0QGokRkESwVvHBiESfGkQKGN+kNTExsZWYGGOMGn00qERiIj4YHg2YGiH1oQo+YCxSrbaltlzb2/H75m63uzuzd7v1rnGTZme+v7/9br5vZr4yWOQz/lLLWp6b3SOE2CAErGaMraY3mWMMRpA+Qm+kDzqG/UX9G0OXF+OKJVG6fqx1pePMHBQOPIZ6LUl0UXaIcTjFedXbtf0XR+PqxgIoetfXTI7PHRUAxwBETVzjejk2hU77M/XWAOv9cUovs0AtCfD60bs6nRy8g+BuXlD77yN0fI0b0F078PPnxazxKCauITZxuOk4gvu03ODIJ9kk2+SDfEXh0DJET3vVBIx9DEI8EaVYVjpjJ+ugYT878e1M2K4SQRm5pQRHiDAQFBBdJBWAkz3NryxZ5PzhQpDSt5+G48BPXEgIWnMBekinYlN0KjBxuvyJ4wHJl5LZS5VIiCRfhICuZertRrcEeT9xoc7FLyVYde2OAyV9W/fvATCsknKuAAWIsLhzCZB2CGRgEY7/mOu2QXr3EWB1Rb7JSkP60ZfBat0R3zBKEhbCREoSoJPLvoDkRDuE3f4UMCsF6R0HI53bW58GXrsc7PYnI2X0DFFDWyrxJEAhnL16QT2VZVaCeXeHZFqbHge+fI0qaFdDavvzkm40bkaZO1SZIpTCfg+cTiUo11JEVmHZm7uAYbrRwwwTUjtfVGRS254BXrMsL4PHmuRRhBZ5YqIjk2K9GIGctXUFJKz7dgO/pWmBlq6B1IPPLcxxZG3sxN/LDNBKTQgbx+q9oZSgn282bQG+7DY/CaPJIb3rsEdLYXaz6jpvTgNe2wDWPQ8FaKUmhA0B5g+ZpYRdvt2+zx0G3uTcWNMKrCoDqY5nAzx3EqXr8sNvwmbmT8KY2DEehmvKbNkeKZl+pAfmr1xEkLVaGaPpAeANt4Mz9quWHyYStkQRtDZ1YlJEF12zeYuy9vxO0SFYbfEPSBRBjrtuvPChJ7utdD1jpu3HpIxtLEtQqAAKM0xAbBz3vqthum5OtcxYcafCyv15RaG5BEfD45kVYK6PXiauLr0JG2XxiJ8YNdbVMTEzCdPvHgCRnVbUBB6X//mwG5y/VfNxk4WwcboaKtZDBFZdr91P5374Si747DfvhTQA5s59Bs7Vn2Du+y8Vntm8FdhN8oaq8PwEwoYA2aCfqBtbG/eCbm3NDp6W4tmz74Pz12+eKkX0xpm35NyV8Zg4oLppx0gWwsbpUu1X1o11yeGM/w65y9/lxednYeb0654qARaTf8g5RTE3Muzx3IFMFjyyFXsIGy/c+Id0gta9u+SZz1jVqLCd0V+A+O5xa/7C1zB/6Tw4E6OQPfuBlKe6STLOmJpIvH4VpB7ulnzFeJ4wRNjk5kg3fjw9KAeG6v35n0lnwMSiS3/THx2CuQtnpMjMqdfAuHUdwGz+ckb7czEb6Z2HpN4EruXwQ5iIhpkMQIfD3PwN7J0kOxOSbmUeNmWY6bXUIpGLgAaItL8yzpJbJSxu/8ZbpbJXgheW5ObKq4Hg8NJkDbhWPYB0i8IdqBsFYm99rpFyvcm3xOBrKnkAyUn+Psr6yuUwuR3W578Tkz6CDj64vbCJI82fLHl3gfozbw7vw+Ic+AUDESSoJECNHBycDEKv4MxtHoXASTxRbimS+V6JOI6fpEQ6Si8JndYcmu7LnBh+NRw5105Jx//bBqb7BbRoZa8EWC9+7ZRLX/ybWsCsl2yGE0Jns2QE/UqyiY5diMJFX9ka/bKaceWa6BpnsFT/hvgXZuTQ2MfCAdAAAAAASUVORK5CYII='
    } else if (redLine.some(hasColor)) {
        return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAABGdBTUEAALGPC/xhBQAABVBJREFUWAnNWd1vVEUU/83dvbuLdlsa2l2pVQxI1ARjDYkxaaJUEEQUCrJVtAVEBFLFKDSG+CBFQ9KE8mKUV+ODIaaI0T/BF43YYIJiULCCTbHLg+1+QEu793rObPd6P2a7d0t3ZZLtzpxz5pzfzjlzZuZUYI5tLIZlGrDJBFaaJpoE0GQKNLE6YWKE6CNC0AcYNICvFyZxaS6maL7/lo4jZph4k4xvhokV/meSpMDPZOwrTeDj6CiSfuf6Amg2oiYlcJCA9RCwGr/KlXICGTLaX2viuLiGjFLGRiwJMB3DFnLRCXJj3Dbvlrvk/lEKke5oEqdnU0Yy6kaAxHgMh8mlp+YbHFtknaybbbAtNQqODEUzm7FgfBKfESuhYFeCNFAXxg4xjBtu5Z4VlCtXXXCMKcELolpJD8BUHO/zBPcvqcI4MWPbYcrhYrkhOOaKuN4xswIDAmNSGtpq3zgWwJlUcpGDtwK2favk3U0p6P5CCrJcLPNcOeC0AEL7DpQ0rCe6AD1UUq4gwAvEWApjCZBPCJmEC1Qf38HV6xF57yjE4ubi0gvuQOTwMejPvVBcRsFhLIyJWRKgYWB/uSdEaPseiEgEkR7eU+oW2vUGtFgcoa7X1QLFqHRa8ZHKbBmDdPCfK+dsFfEmRH+6AhEIwJyeRqb1IRhDF53m7qxB9MchaIsaKCmbyDz+AMn87pSZbURnN10wHtb4VlIOONYZenmXBMd9EQwi/O4R7jpaePdbEhwTBUX+HFZxBWMTqRgO0HIed2ifbSA0RM9cgnbvfZaUSTGSaWuB8eu5PC1ah9rBIYiF9ZaMcS2J9CMUr9NTFq1Uh1LOQY0CcmUpQTs/uOppBzjmCU1D5NCHllh43zsOcMzQGmPQn223ZPx0GJtG4SEvmX4msEyoUx3w+vpNCDz6GERdPcJ731aqC3XtUdKLERlbkHZJEyH11URDDMFnNhaV5bQzffYHiNo6pUzgidXQliyFcfkPJd9NZGxa4ZruZqrG+ks7IXRdxZK04JNrEO7uKcrnzaK/srso381gbGKsESliRN1M71ig5vsLCCxd7mWVQTFG/0a65R4gN+1nVpo2Cq76kQy0rlKCyw0VfwsZf3pdqcXvQnDd835McpK+yrt4xI+0Ko+Z42O43rEWZjbrUWHmcsjuaIcxfMXD87tZGJtGYVESoKhfBH3DFo+hqW8GZMBPftTn5Z38VObFqdMnPbxg21qI5iUeupvA2NjFg26Ge6x3bIcIh91k3Dz1uaRNnuiH8ddli88rOtGXP6NvfpmXsZjU4bwZ6iy9WRibZtCj2j5Z1VcpM0aGkfvu27z45ARu9P63eyc/OQYzmQ9tPl1y52dOGJvy0LZXKXsHbBRvl7EF+rL451ANthJbXm/sYvrGDgTb1iGU6LSTZT939gwwMQEzNQ5kUjB+O49gaxtl8jCu790GTE2B86a+ZgO0xXcjsPxBhw4RrQXoiNQa4jAu/OLgyUH+snBU9unp9wGlG9P9oVtIyZZ9LWHNS7W1mNn9O61xevNTJeezgNsujxkTgyM3A3w5zJlUO7nVqgErm49G1YeAwDIukcgLK3cIaf986J4PHYylUL+RK8hKb/tHE7+iaDm7CbHfu8N8LJZDB9uWGGxFJenigpR8jwocKYyr/k227W9itm+5uACG7mBcNPqCxtWuLgzUJfEinR4ODzpWUCImAS7kUH+gALoK3/nikQsc2/UAZCJXmWZ+TW8lY5J104r1SluKypbEwn9ma/93AdMTgyqwt3UJ2A5YFtGpCkFX8fZy39K0HStXRLeDLPT5UU0BXPF/Q/wLbv4hWxFf60MAAAAASUVORK5CYII=';
    } else if (darkBlueLine.some(hasColor)) {
        return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAABGdBTUEAALGPC/xhBQAABYJJREFUWAnNWWtsVEUUPnP30XZZ2LbbbmmxYGgxRUpJKIU+ABuCopFAqUs0UZRoYgyiJrapf4xUo4mQ6i/iH6OBRH8Yja8Iif0jmrT80EasJT6LhkJLsbUNlF362vGc2c7tvXvv3gduq5NsZ+bMOWe+e+bMmZlTBrdYql/sKpuahr2Q4NUcoIQxKKGa1DGAQc5hkGpQWI/fB5/1vNrQfytToQ7npaq9K8Jj/DBwto8Dr3QuSaBZHzD+CQuw473tDVedyjoC2Nh+PjgSG28B4K3AIehUuSkfgwmE21EQyH3jTPs6bFsXW4Ab2s42JyDxFue8yFqVu1HG2LACyqEfjtV9bCWppBtEQKyyrevILE98lGlwNCfpJN00B82VDofpQN2b3TkTQ/wk+tn+dIKZpKN/fhgsZo+dfb4+nqrXYEH6msUER4DIEGJOE0saAK5/ofulxbKc1lo0J82tpVFbt8S0Icgv8Jt09FShhesz7mFKVLtxVCAUSkZj47+T8y4cAHvNtLvDgdxyGYLUJaY45wacgp/26DZxcFjOuntjIXg9qh0seWmQMCRjbpJVAKQTAodabaU1DFsr8uDZe1dBUcivoeqb2T4FWu6/He5eH9YP2PZ4axITgADI4/CM2xNi/5blkIUAntpZmna6h+qLoWCpH6KbXXoNnlbiSEXNySVOQFPaWUwGCpf5YRtakErTpiIoDWcbuHL8CjzeuELQa8pCsLLAyGMQ0hLwvKeuQrcS3OKuDv59NRHwkBNiIf96+p6Voq398/DWEshb4hMkdHzXViRMhE0RVyatZps2zgXNNfolu29DAaxZHlAlg9keOLg9aT1J3LMpAt65j5I0u5qwKXSfs2PUjtetyYUV+frlUnDiw7vmrXgAd3co4NWKQTjohx2V+TqabQexKfKSacs8xxDdoreelNuxLgyVpUFYluOBA7i8ZiWKG8tNIWxecRPGlpOSjz7VeGd6K1DY6bt4HZbm6K0nddeWh+C2/Cy49PekJFnWhM2VBfeiH/k8amw3KKflP3iX3ve0TLRZmjc7tyJZEGdjDu0H8ICDeObzpv8AApuMAFrYVm3G0b35kBWLHKNYtqowR3bVemA0rrZTGwOjN1NJInA3rk3vJloBwqbQ60tLTNc2Ow2uxWfgybfPQ2xq1iA2m+Dw3MmfYGjM6G/RWmfLTNgoMtkCpJCx0+Q87ewdEQ7/zleXDAA//XYYfrsSg9Pn/jKM1aOvFudmGeipBMKG7xbWkzqQ2t9THQG/iW+d+j45+YmvL8Pg2PxykkWPd14UaiSPVifFTSf+TNgUelRrhc3aZsqujE/CdxeuCfapGQ4dX/ypip44cxlGrk+LPlnx16Eb6phsNOFxSctnVQibZ+ibd8eKGp6IIiNeufRlV1UYGu7Ig90bDUPQNzABUzMJmLg5CzcmZ+HC1TjUrA4JS7e9/wvMoA9S3Ny+Ng8ioSxYHZk/CmmWYLYX736AJ4wP+oeNG40e+udeb3gtGVHxxY/XLcOFoeORCj1iTa8W/Yh+Le/9DJ29o2Lk6Od/QEXJEohPJ0S/HM9nKx2H5i4ZX7Z1aTTPNQkTFmFkuhwmYrzf7Z3QqDVDFMw+KAFWRikSEVWTuRLWkSH1GVDDOmT+Rg37lCuhB0sGtP8rFYSBsEglKkB6RVGuxM3RJ5VkrsajDTHIFx3pVQFSR7xHGbxM7f+k4NzaNzFhMEQiSn1UtXV/sNjZBcrP9B6rfxCXWHd50VlQIEYGSuSQwGJZUSaPUsGZWlCCIkuKXAmHIwuXCkFr4bL+eLT+FTNwlgAl0P9tAlMCJKelXAkw1o5fa5uylXJpa9KBukhn6oYwkzFsEjMmSRNJdMpC4EPf7VuaztYFS6JLgNp6sf4N8Q98S+BWt03i8gAAAABJRU5ErkJggg=='
    } else if (blueLine.some(hasColor)) {
        return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAABGdBTUEAALGPC/xhBQAABYVJREFUWAnNWV1MXEUUPjPLLlCg/OyyC5SCFn/TrQ8ajbBUKWmjVREKtLaVH21jEwitibWJ8YfaGuOD+mBCfLPGF41BrSTGhz75IPTFn0QWKypaWwpCl1jLT4tldzxnlrncu/fuspc/vclmZs6cc+a75845Z+YsgyU+Xn9vWYRBrYiIe4BBEQj8gfyRxhGkjSBthHH2LRfQMx4MDC1lKWZHyHdXrzccFh0RxnaBEH47ssBYkAtx2uFgXWM/BMaTlU0KYH7VQGY4dOUoE+J5AZCZrHIrPlxwSjD2lsOT8/blrzZPWfHoaYsCdPvP1gNE3hVC+PSCy+0zxsYAePtEsPyzRLp4vEkExPL8vceFiHyy0uBoTdJJuqNriLiGspwoLu9Ln5kUH6CW3fFeYEXpjHWvy2Ktw2crrsXqNVmQLLem4AgRGoLWpLUXBeje0te5ZpbTo0GQcm09DfsGxOQQtC/wlQz0GJlVHDJ0cN6odxwNCIWSSOjKr6vhEHbeiLybe3JuUSFI24MU5+yA4yjZ1kLJI/GzpyYfnCmaHRIz4yxhICyKUQKkDEFBWBGTabdvzYWXny2FIp8rLnt6GocTR2+Cmh3uuDxWE4SFMNGcBDgn4LDdDNHaWABpqRyOtW20WkPSDu4rBK/HBS2N9mI8YaGUqgEUAurirmIxUZDvgh0P5MqZ/XU+uHljmokrI53DkQMbJL3yvmzYVGLmMQnpCDLf45jTqQQ/vK3E/2S9FzDpS3UpuL9e6CjRqY52DzUVgTvXKQe48W1bkTARNk5HJpP2BARcC5rqjZ+sfqcH7rx1nSaVlemAjqei1lPEvbVeoJex8xA2Ls9zNqSqKnKgZIPxc3HO4MXDC1Yk787JTjFozXe74NHqPANtsQFh4/KwuRinbr6lwWg9NfVItRvu9mdC9noHtDVbh5+W3QWKPbkWD8Ip8yfhpAQ8eU7YuS2+FV7CsPNd/ySszzJaTyl/8P5sKC1OhT+GZxUpcYundAoz1q9rIbqvzgtOp4xMFrMAVeU50PG0ce/pGclZmhtsWZEAMgw7yT3NcT6vXtqV4AWIb/8uigB6iUR9JhCgGE3EouYolpWVpquh1v5+wXSE0+bOX7yu9VXHh4H74ar420TxRVsxSk4yYiRaj6yywd9X56Dh0ABMz4RNQpgJoOnIORgeNe+31mSdBbFxuhqatMcQcjFkPLbdnE97zoTkhn/nveEYCYAPT4/BuV9m4NMvL5vmtmGoKi5MNdFNBMTG6d5qmogh7H3cC6kus3N0fxFdvOv9S3BxZOFzkkXf6LogtSgevUqKm8nsZ3mnpku1Xtiq32SR7C/9OQt931yV7LP/COh887wmSoDHQjfkmKz448/T2pzqkLPQkS3RQ9gc0+On/kr3HWxERnm80QvUPuSG6kAu7KkxTcH3wSm4PhuByakwTE6HYfC3a1B5bza40NLPHBuEG3hEorhJh4pCXyrctmkhFdIaWZkYgiMAHrcTBocsHA0v+qFg4HWZHD2bvz6JvK/owVF/IhiIJZnGB577CXrOTEi6//YM2HJHBnzUEy0cbEXP//zU4ucQt7/XpBeN+1pooLJTAqTD4VxYDNk9E5q0rhABQU2lOFgZlUjkLqAOlSNWSP+y1RAWVb/RtinVSqLliGXrX5YCwkBYlBINYPQWxdvtpD6lZOVaSru8Xd3oSK8GkAbyPsrgBPX/kwfX1t+JCYN0Ej0YKj/gDf/jNa8uYH1mor/iCfzEhsOLwYISMTJQIQcLjt164Kvany8exYKTeOItPG9JrNPA8dUrhaC16LP2V5y0ApcQoAL+vy1gKoC0aalWgp/8VQqgir7UVupAXaQz1iGsdJqcxIpJ0WTGoSoEXfRt3qVXtYiuAOrbtfob4l9d6+X8gKKDiwAAAABJRU5ErkJggg==';
    } else if (yellowLine.some(hasColor)) {
        return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAABGdBTUEAALGPC/xhBQAABS9JREFUWAnNWd1vG0UQn9m7s90Qf2DnGyrSpoBEgVbiBVSQQKCChBBtaVpA4kNFFAkI4qM88EJFH3gCniqQ+sYjCqIqUuFPAB6QEqASSE0KtEkgRTRJE7uO7Vtm1tnL2Xu270JsOCnZ2ZnZmV9md2d3Jwgb/BZ+3DEiKu7jUrp3SYQhBBySAENsDgFmJchZlDCLKL53LXEmc8f5qY24Ilvhv6uTI32udF8lIPtBytvDjyRNxJ/I2WmB4mRy19R82LGhAMpzO7uXyitvSYnHCFh3WOOBeojLiPKDlH3dh7jz3HKgjo/ZEuDVie0HXJAfSyn7feP+NYmIfwrAl5O7p79oZkw0EhIgXJwcPu6C+/lmg2OfbJNtsw/21QhHoEBevGfL4l9/fEpmRhsN3Fw+jqd7Bp7Drd8U6u0aEeS/prPgGJIcZZ9BkTQALv2w7d3ORc4fLzla9e3nqZS1zqhuCF5znMo6/yGCFCAO+jeOB0SlklL+PIV5U3dr1D+Td3fK6dqhU5A3xdU8FwWcgFjvCy39O9fvp3lyWuppBQ4QY9F9BZBPCJWENTdEa6fuh8Tg2+R7oLE2JiAx9A446Uca6wRIGAtjYpECSMfXWNQTIpZ7ClDEIdH/WoCLKivW+ywIpxdYN9JHpxUfqTxGAaSzdV8UA2j3gZ16QA1xcqMgYjeZw0UXxPteUnyr+27SGTZ1mnDUeU9ywbeSqAd/LHeIzn5LmUe0IT74huEq3vM8CDu7poMUxScNnaYMuoyoGxNfmZoqGkJylj1cw3Uyj4FI3LrOE0mK3tH1PlFO9gn6bdfwWnUYm+D7XCtFv9xO3gcifqOfRdEUtGHe9HjxviOAdtrrMyGcHnAye2t4rTqMTfBls5WiX95oqpz0XrC6dgFaKYj3HvEP8eiom4Wx2dWbMC3JEB/aObDTDzXUTAweg3J+UoEMUrK699Bm2Qru6sUgscFjbIKghY6gkz1I09k46drJeyl6LxqONINOCXAibBbGxmkmXPhIMZar3Rzasb9FEfN3DTqW5RtcNQMYQpMhBR3Gcybf5HAus+LbDEGl+JvB0wy3+LsmvZYTt51+0Os3IxgbTbGcbaakZUELXJaXID/1DMhKXqt5rZQVWLlwlNbbjMfTRCz3tCabtoxN8NOwqRYJ0crQefqwoVZaOKsWfHH+E1P29zi4136B0pUvDRmnKnRuMPj1DMYm+N1aL6jvO9kD6tyt569eOaNYxflTBPSSJ+aIXpv7SPW1jickgvNmqPVM2AQ/qv2Dg+ig3OeuzkFl5buqulyFwsz73lAGLMuXVZ+jWCn87Mk0Ud0s6iqgWUbL2IR68dOj2pASw8k8qu58VuJmQ+wWp5VcX7fKi19DeflbcEvzULx8Sulz3mQbgZslNgDx/jElN4wzgzAxNnU40m45TbnGqBR0DZ8MHMtMO7lH/eR/fQVKC18pvcLMCbC23AbgFlRfJG6BZjYSg68rvcWJs6r1/2JM3KcWgC+HFelORb0T8ti2fFR9sFCMcIlELQImuBzRFmcbMMpYdP3GW6WqVkIPlg3Y29Qh6tFEdRtt1APIryiulfDTTws73VafnYTBV1TyADIY9R5FeK/TwDx/5Nv/Jma+2iSeAhGq9DGx/bPOVxeoPrN7+jBNcc0M1kRQISYFLuQQ9nE/8PbSa8WjOnAKTyPHHElVK5FwvF2lELXeaVpTd144UR85jcuYYi3Q7X9dwGwJkIH+r0vAOpLcrhXRx2gV74v6luazlaLRniK6H6SmO/VviH8AA7Phl0dKEvAAAAAASUVORK5CYII=';
    } else if (mcdLine.some(hasColor)) {
        return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAABGdBTUEAALGPC/xhBQAABI9JREFUWAnNWUtvFEcQrh68Nmubh0MCxmBEYkNeTkgEyo3fAEG8BAfuVjjBOZY5mxvKPQejBBBR/kAOyS2YSEiQA4IIsHAA8RJgGz9w833d07OzMz2zM7CsKWk9/arqr6u6qrvLSt6Q9C8TA7Ike0Qv7RSt+kTpPhF8DekptE2hDb/gsgTyuzq86+abTKXKMOmLV9bL7NwPmPx7ET1UhhfgrwLwb1LtOKP27XhQlLcQQH3uWrcszJyA0JOidXdR4d5xSr1A+5hUOk+rg1+ynEsNAerxv/dBwk+iZUOupLKdSu6DZVgd/e5iHmuQ1am1Vnr80ghMc6Hp4DipWbC6wDk4VxYOb4c+N1mVhXs/w5wHshib2q7Uean0HlMH+2eTclMaNKtpJTgioiIwp0+TKYByduLHlmkuri6C5NwJqjOxdQjuuew9keBvblUpDXXujztOBNCGkukb78QhyiyD3l3pGnQhqGZixrkyoYRL+6xA5Pl4nUgQ6aExVGKwMdeMNQDNCcEgXIb61oh8s1mkWsnmWgHx3/aL9Pdkj/H3nAwx4ZQkzc4dx74rd0IMfiRCAF9t8k/B1u3r7QI4tgwRC49UkAWo1d4y/EZrfWsty8CHIt0dafY2iP6i17ZvWCWyyjMmzVVrMec9AJpbSdmDn6DcvuL3a48WP8X+XBmaX2FMWS0CE7EF5spUw12sNJAw2dYPRNZWa7yVFSKfh9pzrZ9gUQRahnCdC8x9rgzTxtVpk3LiuBbp3R1t9VKpzf5wW9T3ZNdw1wRAd8nMHlfXk2Uqeuq6LpF2aC8r/GTx1k0QqwBbm7kJI34XImplc44WdmAvPpoGyIT2nPDeUPsv5lxL/he3dLhaCQ0a57CO75W8EbExuffiA7kVKKMwKQDEFaLw+KRz+BgZG/OIMor6CrAFGPx/nryoj7Fs9cqoGhWev4yKqYKvjyfPppxtEhcCbHSSqXhbZtm3wecXRf64LrL4Ks22BMP8eUNk2rPftuGEKULABg3iadiI6Jm+8/T2ExFu+GseI/z3UOQpLsi3HqelM1R1tafbky3ABoB4tzYiBlnf3rr1yHL+e88CdXKo0St3bc2NcX38GmdJBPt4vysDW8BHtatnfn3mnZkXefDcstCc/0zW2An45YKtU4tPZmp9rkRvbuQswBbYFz8e1T7aguDLoLsmdoy5cc/gHOx3161JmPv+M9yMAJwASYybHOOLe50w8RASEez3krpKbDai8sWvZSg1bvdgqilqYNDl7y84wh2AI12+I9LTKfJqydZ5PufJcMfj+CU7Pv6XmEBGyTalMX+z9J0wLrCZZWYfqu0DTJGYqBrmSsaaOcdbyhpz+Zta2EeuBPpkOmJ5yTyagCWkCGD4ihpGCCh+9DkpzfrauYfdi45iI4CshO/RUZaXiUbjb2JiSEUik344O/ErHOZAS0EyP3Nk1yGVsGCdBg1iDkAiB6Y+3zKALnmUAGfwZIEINclcyQi0mdJ0Fl+pdgtoFJo7ldSck9Nw4uVOYDYEyJW81ylgp2oD1CbRkYXgQ/89SqLHQbpyq/4N8RqGaHfPPQUciwAAAABJRU5ErkJggg=='
    }else{
        return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAABGdBTUEAALGPC/xhBQAABI9JREFUWAnNWUtvFEcQrh68Nmubh0MCxmBEYkNeTkgEyo3fAEG8BAfuVjjBOZY5mxvKPQejBBBR/kAOyS2YSEiQA4IIsHAA8RJgGz9w833d07OzMz2zM7CsKWk9/arqr6u6qrvLSt6Q9C8TA7Ike0Qv7RSt+kTpPhF8DekptE2hDb/gsgTyuzq86+abTKXKMOmLV9bL7NwPmPx7ET1UhhfgrwLwb1LtOKP27XhQlLcQQH3uWrcszJyA0JOidXdR4d5xSr1A+5hUOk+rg1+ynEsNAerxv/dBwk+iZUOupLKdSu6DZVgd/e5iHmuQ1am1Vnr80ghMc6Hp4DipWbC6wDk4VxYOb4c+N1mVhXs/w5wHshib2q7Uean0HlMH+2eTclMaNKtpJTgioiIwp0+TKYByduLHlmkuri6C5NwJqjOxdQjuuew9keBvblUpDXXujztOBNCGkukb78QhyiyD3l3pGnQhqGZixrkyoYRL+6xA5Pl4nUgQ6aExVGKwMdeMNQDNCcEgXIb61oh8s1mkWsnmWgHx3/aL9Pdkj/H3nAwx4ZQkzc4dx74rd0IMfiRCAF9t8k/B1u3r7QI4tgwRC49UkAWo1d4y/EZrfWsty8CHIt0dafY2iP6i17ZvWCWyyjMmzVVrMec9AJpbSdmDn6DcvuL3a48WP8X+XBmaX2FMWS0CE7EF5spUw12sNJAw2dYPRNZWa7yVFSKfh9pzrZ9gUQRahnCdC8x9rgzTxtVpk3LiuBbp3R1t9VKpzf5wW9T3ZNdw1wRAd8nMHlfXk2Uqeuq6LpF2aC8r/GTx1k0QqwBbm7kJI34XImplc44WdmAvPpoGyIT2nPDeUPsv5lxL/he3dLhaCQ0a57CO75W8EbExuffiA7kVKKMwKQDEFaLw+KRz+BgZG/OIMor6CrAFGPx/nryoj7Fs9cqoGhWev4yKqYKvjyfPppxtEhcCbHSSqXhbZtm3wecXRf64LrL4Ks22BMP8eUNk2rPftuGEKULABg3iadiI6Jm+8/T2ExFu+GseI/z3UOQpLsi3HqelM1R1tafbky3ABoB4tzYiBlnf3rr1yHL+e88CdXKo0St3bc2NcX38GmdJBPt4vysDW8BHtatnfn3mnZkXefDcstCc/0zW2An45YKtU4tPZmp9rkRvbuQswBbYFz8e1T7aguDLoLsmdoy5cc/gHOx3161JmPv+M9yMAJwASYybHOOLe50w8RASEez3krpKbDai8sWvZSg1bvdgqilqYNDl7y84wh2AI12+I9LTKfJqydZ5PufJcMfj+CU7Pv6XmEBGyTalMX+z9J0wLrCZZWYfqu0DTJGYqBrmSsaaOcdbyhpz+Zta2EeuBPpkOmJ5yTyagCWkCGD4ihpGCCh+9DkpzfrauYfdi45iI4CshO/RUZaXiUbjb2JiSEUik344O/ErHOZAS0EyP3Nk1yGVsGCdBg1iDkAiB6Y+3zKALnmUAGfwZIEINclcyQi0mdJ0Fl+pdgtoFJo7ldSck9Nw4uVOYDYEyJW81ylgp2oD1CbRkYXgQ/89SqLHQbpyq/4N8RqGaHfPPQUciwAAAABJRU5ErkJggg=='
    }


}

