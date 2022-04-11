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


export const allStations = [
    ...greenLine, ...brownLine, ...grayLine,
    ...lightGreenLine, ...orangeLine, ...redLine,
    ...darkBlueLine, ...blueLine, ...yellowLine, ...mcdLine
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
    }


}


