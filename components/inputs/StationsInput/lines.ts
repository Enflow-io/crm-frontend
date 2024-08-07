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
    color?: string
    line?: string
}

export const greenLine: StationInterface[] = [
    { id: "ts2_Khovrino", label: "Ховрино" },
    { id: "ts2_Belomorskaya", label: "Беломорская" },
    { id: "ts2_Rechnoy_Vokzal", label: "Речной вокзал" },
    { id: "ts2_1_Vodny_Stadion", label: "Водный стадион" },
    { id: "ts2_4_Voykovskaya", label: "Войковская" },
    { id: "ts2_Sokol", label: "Сокол" },
    { id: "ts2_Aeroport", label: "Аэропорт" },
    { id: "ts2_2_Dinamo", label: "Динамо" },
    { id: "ts5_2_Belorusskaya", label: "Белорусская" },
    { id: "ts2_Mayakovskaya", label: "Маяковская" },
    { id: "ts2_7_Tverskaya", label: "Тверская" },
    { id: "ts2_3_Teatralnaya", label: "Театральная" },
    { id: "ts2_2_Novokuznetskaya", label: "Новокузнецкая" },
    { id: "ts2_3_Paveletskaya", label: "Павелецкая" },
    { id: "ts2_4_Avtozavodskaya", label: "Автозаводская" },
    { id: "ts2_Tekhnopark", label: "Технопарк" },
    { id: "ts2_4_Kolomenskaya", label: "Коломенская" },
    { id: "ts2_3_Kashirskaya", label: "Каширская" },
    { id: "ts2_4_Kantemirovskaya", label: "Кантемировская" },
    { id: "ts2_4_Tsaritsyno", label: "Царицыно" },
    { id: "ts2_4_Orekhovo", label: "Орехово" },
    { id: "ts2_4_Domodedovskaya", label: "Домодедовская" },
    { id: "ts2_2_Krasnogvardeyskaya", label: "Красногвардейская" },
    { id: "ts2_6_Alma_Atinskaya", label: "Алма-Атинская" },
];

export const brownLine: StationInterface[] = [
    { id: "ts3_3_Kievskaya", label: "Киевская" },
    { id: "ts1_2_Park_Kultury", label: "Парк культуры"},
    { id: "ts6_3_Oktyabrskaya", label: "Октябрьская" },
    { id: "ts5_2_Dobryninskaya", label: "Добрынинская" },
    { id: "ts2_3_Paveletskaya", label: "Павелецкая" },
    { id: "ts7_10_Taganskaya", label: "Таганская" },
    { id: "ts3_7_Kurskaya", label: "Курская" },
    { id: "ts1_1_Komsomolskaya", label: "Комсомольская" },
    { id: "ts6_2_Prospekt_Mira", label: "Проспект Мира" },
    { id: "ts10_2_Dostoyevskaya", label: "Достоевская" },
    { id: "ts5_2_Novoslobodskaya", label: "Новослободская" },
    { id: "ts5_2_Belorusskaya", label: "Белорусская" },
    { id: "ts5_2_Krasnopresnenskaya", label: "Краснопресненская" },
];

export const grayLine: StationInterface[] = [
    { id: "ts9_Altufyevo", label: "Алтуфьево" },
    { id: "ts9_Bibirevo", label: "Бибирево" },
    { id: "ts9_Otradnoye", label: "Отрадное" },
    { id: "ts9_Vladykino", label: "Владыкино" },
    { id: "ts9_2_Petr_Razumovskaya", label: "Петровско-Разумовская" },
    { id: "ts9_4_Timiryazevskaya", label: "Тимирязевская" },
    { id: "ts9_Dmitrovskaya",  label: "Дмитровская" },
    { id: "ts9_5_Savyolovskaya", label: "Савеловская" },
    { id: "ts9_5_Mendeleyevskaya", label: "Менделеевская" },
    { id: "ts9_1_Tsvetnoy_Bulvar", label: "Цветной бульвар" },
    { id: "ts9_2_Chekhovskaya", label: "Чеховская" },
    { id: "ts9_3_Borovitskaya", label: "Боровицкая" },
    { id: "ts9_4_Polyanka", label: "Полянка" },
    { id: "ts9_2_Serpukhovskaya", label: "Серпуховская" },
    { id: "ts9_Tulskaya", label: "Тульская" },
    { id: "ts9_Nagatinskaya", label: "Нагатинская" },
    { id: "ts9_Nagornaya", label: "Нагорная" },
    { id: "ts9_Nakhimovsky_Prospekt", label: "Нахимовский проспект" },
    { id: "ts9_6_Sevastopolskaya", label: "Севастопольская" },
    { id: "ts9_Chertanovskaya", label: "Чертановская" },
    { id: "ts9_Yuzhnaya", label: "Южная" },
    { id: "ts9_Prazhskaya", label: "Пражская" },
    { id: "ts9_Ulitsa_Ak_Yangelya", label: "Улица Академика Янгеля" },
    { id: "ts9_Annino", label: "Аннино" },
    { id: "ts9_2_Bulvar_Dm_Donskogo", label: "Бульвар Дмитрия Донского" },
]

export const lightGreenLine: StationInterface[] = [
    { id: "ts10_Fizteh", label: "Физтех" },
    { id: "ts10_Lianozovo", label: "Лианозово" },
    { id: "ts10_Yahromskaya", label: "Яхромская" },
    { id: "ts10_Seligerskaya", label: "Селигерская" },
    { id: "ts10_Verkhniye_Likhobory", label: "Верхние Лихоборы" },
    { id: "ts10_Okruzhnaya", label: "Окружная" },
    { id: "ts9_2_Petr_Razumovskaya", label: "Петровско-Разумовская" },
    { id: "ts10_1_Fonvizinskaya", label: "Фонвизинская" },
    { id: "ts10_1_Butyrskaya", label: "Бутырская" },
    { id: "ts10_6_Marina_Roshcha", label: "Марьина Роща" },
    { id: "ts10_2_Dostoyevskaya", label: "Достоевская" },
    { id: "ts10_2_Trubnaya", label: "Трубная" },
    { id: "ts10_2_Sretensky_Bulvar", label: "Сретенский бульвар" },
    { id: "ts10_2_Chkalovskaya", label: "Чкаловская" },
    { id: "ts10_2_Rimskaya", label: "Римская" },
    { id: "ts10_2_Krestyansk_Zastava", label: "Крестьянская застава" },
    { id: "ts10_Dubrovka", label: "Дубровка" },
    { id: "ts10_5_Kozhukhovskaya", label: "Кожуховская"},
    { id: "ts10_2_Pechatniki", label: "Печатники" },
    { id: "ts10_Volzhskaya", label: "Волжская" },
    { id: "ts10_1_Lyublino", label: "Люблино" },
    { id: "ts10_1_Bratislavskaya", label: "Братиславская" },
    { id: "ts10_1_Marino", label: "Марьино" },
    { id: "ts10_1_Borisovo", label: "Борисово"},
    { id: "ts10_1_Shipilovskaya", label: "Шипиловская" },
    { id: "ts10_3_Zyablikovo", label: "Зябликово" },
]

export const orangeLine: StationInterface[] = [
    { id: "ts6_Medvedkovo", label: "Медведково" },
    { id: "ts6_Babushkinskaya", label: "Бабушкинская" },
    { id: "ts6_Sviblovo", label: "Свиблово" },
    { id: "ts6_Botanichesky_Sad", label: "Ботанический сад" },
    { id: "ts6_VDNH", label: "ВДНХ" },
    { id: "ts6_Alexeyevskaya", label: "Алексеевская" },
    { id: "ts6_2_Rizhskaya", label: "Рижская" },
    { id: "ts6_2_Prospekt_Mira", label: "Проспект Мира" },
    { id: "ts6_1_Sukharevskaya", label: "Сухаревская" },
    { id: "ts6_2_Turgenevskaya", label: "Тургеневская" },
    { id: "ts6_2_Kitay_Gorod", label: "Китай-Город" },
    { id: "ts6_4_Tretyakovskaya", label: "Третьяковская" },
    { id: "ts6_3_Oktyabrskaya", label: "Октябрьская" },
    { id: "ts6_Shabolovskaya", label: "Шаболовская" },
    { id: "ts6_Leninsky_Prospekt", label: "Ленинский проспект" },
    { id: "ts6_2_Akademicheskaya", label: "Академическая" },
    { id: "ts6_Profsoyuznaya", label: "Профсоюзная" },
    { id: "ts6_6_Noviye_Cheryomushki", label: "Новые Черёмушки" },
    { id: "ts6_7_Kaluzhskaya", label: "Калужская" },
    { id: "ts6_Belyayevo", label: "Беляево" },
    { id: "ts6_Konkovo", label: "Коньково" },
    { id: "ts6_Tyoplyi_Stan", label: "Тёплый Стан" },
    { id: "ts6_Yasenevo", label: "Ясенево" },
    { id: "ts6_5_Novoyasenevskaya", label: "Новоясеневская" },
]

export const redLine: StationInterface[] = [
    { id: "ts1_8_Bulvar_Rokossovskogo", label: "Бульвар Рокоссовского" },
    { id: "ts1_8_Cherkizovskaya", label: "Черкизовская" },
    { id: "ts1_Preobrazhenskaya_Pl", label: "Преображенская площадь" },
    { id: "ts1_1_Sokolniki", label: "Сокольники" },
    { id: "ts1_Krasnoselskaya", label: "Красносельская" },
    { id: "ts1_1_Komsomolskaya", label: "Комсомольская" },
    { id: "ts1_Krasniye_Vorota", label: "Красные Ворота"},
    { id: "ts1_1_Chistye_Prudy", label: "Чистые пруды"},
    { id: "ts1_2_Lubyanka", label: "Лубянка" },
    { id: "ts1_1_Okhotny_Ryad", label: "Охотный Ряд" },
    { id: "ts1_4_Biblioteka_Im_Lenina", label: "Библиотека имени Ленина" },
    { id: "ts1_1_Kropotkinskaya", label: "Кропоткинская" },
    { id: "ts1_2_Park_Kultury", label: "Парк культуры"},
    { id: "ts1_Frunzenskaya", label: "Фрунзенская" },
    { id: "ts1_Sportivnaya", label: "Спортивная" },
    { id: "ts1_Vorobyovy_Gory", label: "Воробьёвы горы" },
    { id: "ts1_Universitet", label: "Университет" },
    { id: "ts1_2_Prospekt_Vernadskogo", label: "Проспект Вернадского" },
    { id: "ts1_Yugo_Zapadnaya", label: "Юго-Западная" },
    { id: "ts1_Troparyovo", label: "Тропарёво" },
    { id: "ts1_Rumyantsevo", label: "Румянцево" },
    { id: "ts1_Salaryevo", label: "Саларьево" },
    { id: "ts1_5_Filatov_Lug", label: "Филатов луг"},
    { id: "ts1_5_Prokshino", label: "Прокшино" },
    { id: "ts1_5_Olhovaya", label: "Ольховая" },
    { id: "ts1_2_Kommunarka", label: "Коммунарка" },
]

export const darkBlueLine: StationInterface[] = [
    { id: "ts3_Pyatnitskoye_Shosse", label: "Пятницкое шоссе" },
    { id: "ts3_Mitino", label: "Митино" },
    { id: "ts3_Volokolamskaya", label: "Волоколамская" },
    { id: "ts3_Myakinino", label: "Мякинино" },
    { id: "ts3_Strogino", label: "Строгино" },
    { id: "ts3_Krylatskoye", label: "Крылатское" },
    { id: "ts3_Molodyozhnaya", label: "Молодёжная" },
    { id: "ts3_7_Kuntsevskaya", label: "Кунцевская" },
    { id: "ts3_1_Slavyansky_Bulvar", label: "Славянский бульвар" },
    { id: "ts3_5_Park_Pobedy", label: "Парк Победы" },
    { id: "ts3_3_Kievskaya", label: "Киевская" },
    { id: "ts3_3_Smolenskaya", label: "Смоленская" },
    { id: "ts3_7_Arbatskaya", label: "Арбатская" },
    { id: "ts3_4_Ploshad_Revolyutsii", label: "Площадь Революции" },
    { id: "ts3_7_Kurskaya", label: "Курская" },
    { id: "ts3_Baumanskaya", label: "Бауманская" },
    { id: "ts11_1_Elektrozavodskaya", label: "Электрозаводская" },
    { id: "ts3_Semyonovskaya", label: "Семёновская" },
    { id: "ts3_Partizanskaya", label: "Партизанская" },
    { id: "ts3_Izmaylovskaya", label: "Измайловская" },
    { id: "ts3_Pervomayskaya", label: "Первомайская" },
    { id: "ts3_Shchyolkovskaya", label: "Щёлковская" },
]

export const blueLine: StationInterface[] = [
    { id: "ts3_7_Kuntsevskaya", label: "Кунцевская" },
    { id: "ts4_Pionerskaya", label: "Пионерская" },
    { id: "ts4_Filyovsky_Park", label: "Филёвский парк" },
    { id: "ts4_Bagrationovskaya", label: "Багратионовская" },
    { id: "ts4_Fili", label: "Фили" },
    { id: "ts4_7_Kutuzovskaya", label: "Кутузовская" },
    { id: "ts4_1_Studencheskaya", label: "Студенческая" },
    { id: "ts4A_Mezhdunarodnaya", label: "Международная" },
    { id: "ts4A_1_Vystavochnaya", label: "Выставочная" },
    { id: "ts4_6_Smolenskaya", label: "Смоленская-2" },
    { id: "ts4_3_Arbatskaya", label: "Арбатская-2" },
    { id: "ts4_2_Alexandrovsky_Sad", label: "Александровский сад" },
]

export const yellowLine: StationInterface[] = [
    { id: "ts8_Vnukovo", label: "Внуково" },
    { id: "ts8_Pyhtino", label: "Пыхтино" },
    { id: "ts8_Rasskazovka", label: "Рассказовка" },
    { id: "ts8_Novoperedelkino", label: "Новопеределкино" },
    { id: "ts8_Borovskoye_Shosse", label: "Боровское шоссе" },
    { id: "ts8_Solntsevo", label: "Солнцево" },
    { id: "ts8_Govorovo", label: "Говорово" },
    { id: "ts8_Ozernaya", label: "Озёрная" },
    { id: "ts8_Ramenki", label: "Раменки" },
    { id: "ts8_Lomonosov_Prospekt", label: "Ломоносовский проспект" },
    { id: "ts8_Minskaya", label: "Минская" },
    { id: "ts8_2_Delovoy_Tsentr", label: "Деловой центр" },
    { id: "ts8_3_Dorogomilovskaya", label: "Дорогомиловская" },
    { id: "ts8_4_Plyushchikha", label: "Плющиха" },
    { id: "ts8_1_Volkhonka", label: "Волхонка" },
    { id: "ts8_3_Marksistskaya", label: "Марксистская" },
    { id: "ts8_1_Ploshchad_Ilicha", label: "Площадь Ильича" },
    { id: "ts8_Shosse_Entuziastov", label: "Шоссе Энтузиастов" },
    { id: "ts8_Perovo", label: "Перово" },
    { id: "ts8_Novogireevo", label: "Новогиреево" },
    { id: "ts8_Novokosino", label: "Новокосино" },
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

export const allStationsData: StationInterface[] = [
    {
        id: "line1_1",
        label: "Бульвар Рокоссовского",
        color: "#e42518",
        line: "Сокольническая линия"
    },
    {
        id: "line1_2",
        label: "Черкизовская",
        color: "#e42518",
        line: "Сокольническая линия"
    },
    {
        id: "line1_3",
        label: "Преображенская площадь",
        color: "#e42518",
        line: "Сокольническая линия"
    },
    {
        id: "line1_4",
        label: "Сокольники",
        color: "#e42518",
        line: "Сокольническая линия"
    },
    {
        id: "line1_5",
        label: "Красносельская",
        color: "#e42518",
        line: "Сокольническая линия"
    },
    // {
    //     id: "line1_6",
    //     label: "Комсомольская",
    //     color: "#e42518",
    //     line: "Сокольническая линия"
    // },
    {
        id: "line1_7",
        label: "Красные ворота",
        color: "#e42518",
        line: "Сокольническая линия"
    },
    {
        id: "line1_8",
        label: "Чистые пруды",
        color: "#e42518",
        line: "Сокольническая линия"
    },
    {
        id: "line1_9",
        label: "Лубянка",
        color: "#e42518",
        line: "Сокольническая линия"
    },
    {
        id: "line1_10",
        label: "Охотный Ряд",
        color: "#e42518",
        line: "Сокольническая линия"
    },
    {
        id: "line1_11",
        label: "Библиотека им. Ленина",
        color: "#e42518",
        line: "Сокольническая линия"
    },
    {
        id: "line1_12",
        label: "Кропоткинская",
        color: "#e42518",
        line: "Сокольническая линия"
    },
    {
        id: "line1_13",
        label: "Парк культуры",
        color: "#e42518",
        line: "Сокольническая линия"
    },
    {
        id: "line1_14",
        label: "Фрунзенская",
        color: "#e42518",
        line: "Сокольническая линия"
    },
    {
        id: "line1_15",
        label: "Спортивная",
        color: "#e42518",
        line: "Сокольническая линия"
    },
    {
        id: "line1_16",
        label: "Воробьёвы горы",
        color: "#e42518",
        line: "Сокольническая линия"
    },
    {
        id: "line1_17",
        label: "Университет",
        color: "#e42518",
        line: "Сокольническая линия"
    },
    {
        id: "line1_18",
        label: "Проспект Вернадского",
        color: "#e42518",
        line: "Сокольническая линия"
    },
    {
        id: "line1_19",
        label: "Юго-Западная",
        color: "#e42518",
        line: "Сокольническая линия"
    },
    {
        id: "line1_20",
        label: "Тропарёво",
        color: "#e42518",
        line: "Сокольническая линия"
    },
    {
        id: "line1_21",
        label: "Румянцево",
        color: "#e42518",
        line: "Сокольническая линия"
    },
    {
        id: "line1_22",
        label: "Саларьево",
        color: "#e42518",
        line: "Сокольническая линия"
    },
    {
        id: "line1_23",
        label: "Филатов Луг",
        color: "#e42518",
        line: "Сокольническая линия"
    },
    {
        id: "line1_24",
        label: "Прокшино",
        color: "#e42518",
        line: "Сокольническая линия"
    },
    {
        id: "line1_25",
        label: "Ольховая",
        color: "#e42518",
        line: "Сокольническая линия"
    },
    {
        id: "line1_26",
        label: "Коммунарка",
        color: "#e42518",
        line: "Сокольническая линия"
    },
    {
        id: "line2_1",
        label: "Ховрино",
        color: "#4baf4f",
        line: "Замоскворецкая линия"
    },
    {
        id: "line2_2",
        label: "Беломорская",
        color: "#4baf4f",
        line: "Замоскворецкая линия"
    },
    {
        id: "line2_3",
        label: "Речной вокзал",
        color: "#4baf4f",
        line: "Замоскворецкая линия"
    },
    {
        id: "line2_4",
        label: "Водный стадион",
        color: "#4baf4f",
        line: "Замоскворецкая линия"
    },
    {
        id: "line2_5",
        label: "Войковская",
        color: "#4baf4f",
        line: "Замоскворецкая линия"
    },
    {
        id: "line2_6",
        label: "Сокол",
        color: "#4baf4f",
        line: "Замоскворецкая линия"
    },
    {
        id: "line2_7",
        label: "Аэропорт",
        color: "#4baf4f",
        line: "Замоскворецкая линия"
    },
    {
        id: "line2_8",
        label: "Динамо",
        color: "#4baf4f",
        line: "Замоскворецкая линия"
    },
    {
        id: "line2_9",
        label: "Белорусская",
        color: "#4baf4f",
        line: "Замоскворецкая линия"
    },
    {
        id: "line2_10",
        label: "Маяковская",
        color: "#4baf4f",
        line: "Замоскворецкая линия"
    },
    {
        id: "line2_11",
        label: "Тверская",
        color: "#4baf4f",
        line: "Замоскворецкая линия"
    },
    {
        id: "line2_12",
        label: "Театральная",
        color: "#4baf4f",
        line: "Замоскворецкая линия"
    },
    {
        id: "line2_13",
        label: "Новокузнецкая",
        color: "#4baf4f",
        line: "Замоскворецкая линия"
    },
    {
        id: "line2_14",
        label: "Павелецкая",
        color: "#4baf4f",
        line: "Замоскворецкая линия"
    },
    {
        id: "line2_15",
        label: "Автозаводская",
        color: "#4baf4f",
        line: "Замоскворецкая линия"
    },
    {
        id: "line2_16",
        label: "Технопарк",
        color: "#4baf4f",
        line: "Замоскворецкая линия"
    },
    {
        id: "line2_17",
        label: "Коломенская",
        color: "#4baf4f",
        line: "Замоскворецкая линия"
    },
    {
        id: "line2_18",
        label: "Каширская",
        color: "#4baf4f",
        line: "Замоскворецкая линия"
    },
    {
        id: "line2_19",
        label: "Кантемировская",
        color: "#4baf4f",
        line: "Замоскворецкая линия"
    },
    {
        id: "line2_20",
        label: "Царицыно",
        color: "#4baf4f",
        line: "Замоскворецкая линия"
    },
    {
        id: "line2_21",
        label: "Орехово",
        color: "#4baf4f",
        line: "Замоскворецкая линия"
    },
    {
        id: "line2_22",
        label: "Домодедовская",
        color: "#4baf4f",
        line: "Замоскворецкая линия"
    },
    {
        id: "line2_23",
        label: "Красногвардейская",
        color: "#4baf4f",
        line: "Замоскворецкая линия"
    },
    {
        id: "line2_24",
        label: "Алма-Атинская",
        color: "#4baf4f",
        line: "Замоскворецкая линия"
    },
    {
        id: "line3_1",
        label: "Пятницкое шоссе",
        color: "#0572b9",
        line: "Арбатско-Покровская линия"
    },
    {
        id: "line3_2",
        label: "Митино",
        color: "#0572b9",
        line: "Арбатско-Покровская линия"
    },
    {
        id: "line3_3",
        label: "Волоколамская",
        color: "#0572b9",
        line: "Арбатско-Покровская линия"
    },
    {
        id: "line3_4",
        label: "Мякинино",
        color: "#0572b9",
        line: "Арбатско-Покровская линия"
    },
    {
        id: "line3_5",
        label: "Строгино",
        color: "#0572b9",
        line: "Арбатско-Покровская линия"
    },
    {
        id: "line3_6",
        label: "Крылатское",
        color: "#0572b9",
        line: "Арбатско-Покровская линия"
    },
    {
        id: "line3_7",
        label: "Молодёжная",
        color: "#0572b9",
        line: "Арбатско-Покровская линия"
    },
    // {
    //     id: "line3_8",
    //     label: "Кунцевская",
    //     color: "#0572b9",
    //     line: "Арбатско-Покровская линия"
    // },
    {
        id: "line3_9",
        label: "Славянский бульвар",
        color: "#0572b9",
        line: "Арбатско-Покровская линия"
    },
    {
        id: "line3_10",
        label: "Парк Победы",
        color: "#0572b9",
        line: "Арбатско-Покровская линия"
    },
    {
        id: "line3_11",
        label: "Киевская",
        color: "#0572b9",
        line: "Арбатско-Покровская линия"
    },
    {
        id: "line3_12",
        label: "Смоленская",
        color: "#0572b9",
        line: "Арбатско-Покровская линия"
    },
    // {
    //     id: "line3_13",
    //     label: "Арбатская",
    //     color: "#0572b9",
    //     line: "Арбатско-Покровская линия"
    // },
    {
        id: "line3_14",
        label: "Площадь Революции",
        color: "#0572b9",
        line: "Арбатско-Покровская линия"
    },
    // {
    //     id: "line3_15",
    //     label: "Курская",
    //     color: "#0572b9",
    //     line: "Арбатско-Покровская линия"
    // },
    {
        id: "line3_16",
        label: "Бауманская",
        color: "#0572b9",
        line: "Арбатско-Покровская линия"
    },
    {
        id: "line3_17",
        label: "Электрозаводская",
        color: "#0572b9",
        line: "Арбатско-Покровская линия"
    },
    {
        id: "line3_18",
        label: "Семёновская",
        color: "#0572b9",
        line: "Арбатско-Покровская линия"
    },
    {
        id: "line3_19",
        label: "Партизанская",
        color: "#0572b9",
        line: "Арбатско-Покровская линия"
    },
    {
        id: "line3_20",
        label: "Измайловская",
        color: "#0572b9",
        line: "Арбатско-Покровская линия"
    },
    {
        id: "line3_21",
        label: "Первомайская",
        color: "#0572b9",
        line: "Арбатско-Покровская линия"
    },
    {
        id: "line3_22",
        label: "Щёлковская",
        color: "#0572b9",
        line: "Арбатско-Покровская линия"
    },
    {
        id: "line4_1",
        label: "Александровский сад",
        color: "#24bcee",
        line: "Филёвская линия"
    },
    {
        id: "line4_2",
        label: "Арбатская",
        color: "#24bcee",
        line: "Филёвская линия"
    },
    // {
    //     id: "line4_3",
    //     label: "Смоленская",
    //     color: "#24bcee",
    //     line: "Филёвская линия"
    // },
    // {
    //     id: "line4_4",
    //     label: "Киевская",
    //     color: "#24bcee",
    //     line: "Филёвская линия"
    // },
    {
        id: "line4_7",
        label: "Студенческая",
        color: "#24bcee",
        line: "Филёвская линия"
    },
    {
        id: "line4_8",
        label: "Кутузовская",
        color: "#24bcee",
        line: "Филёвская линия"
    },
    {
        id: "line4_9",
        label: "Фили",
        color: "#24bcee",
        line: "Филёвская линия"
    },
    {
        id: "line4_10",
        label: "Багратионовская",
        color: "#24bcee",
        line: "Филёвская линия"
    },
    {
        id: "line4_11",
        label: "Филевский парк",
        color: "#24bcee",
        line: "Филёвская линия"
    },
    {
        id: "line4_12",
        label: "Пионерская",
        color: "#24bcee",
        line: "Филёвская линия"
    },
    // {
    //     id: "line4_13",
    //     label: "Кунцевская",
    //     color: "#24bcee",
    //     line: "Филёвская линия"
    // },
    // {
    //     id: "line4_5",
    //     label: "Деловой центр",
    //     color: "#24bcee",
    //     line: "Филёвская линия"
    // },
    {
        id: "line4_6",
        label: "Москва-Сити",
        color: "#24bcee",
        line: "Филёвская линия"
    },
    {
        id: "line5_1",
        label: "Комсомольская",
        color: "#925233",
        line: "Кольцевая линия"
    },
    {
        id: "line5_2",
        label: "Курская",
        color: "#925233",
        line: "Кольцевая линия"
    },
    // {
    //     id: "line5_3",
    //     label: "Таганская",
    //     color: "#925233",
    //     line: "Кольцевая линия"
    // },
    // {
    //     id: "line5_4",
    //     label: "Павелецкая",
    //     color: "#925233",
    //     line: "Кольцевая линия"
    // },
    {
        id: "line5_5",
        label: "Добрынинская",
        color: "#925233",
        line: "Кольцевая линия"
    },
    // {
    //     id: "line5_6",
    //     label: "Октябрьская",
    //     color: "#925233",
    //     line: "Кольцевая линия"
    // },
    // {
    //     id: "line5_7",
    //     label: "Парк культуры",
    //     color: "#925233",
    //     line: "Кольцевая линия"
    // },
    // {
    //     id: "line5_8",
    //     label: "Киевская",
    //     color: "#925233",
    //     line: "Кольцевая линия"
    // },
    {
        id: "line5_9",
        label: "Краснопресненская",
        color: "#925233",
        line: "Кольцевая линия"
    },
    // {
    //     id: "line5_10",
    //     label: "Белорусская",
    //     color: "#925233",
    //     line: "Кольцевая линия"
    // },
    {
        id: "line5_11",
        label: "Новослободская",
        color: "#925233",
        line: "Кольцевая линия"
    },
    {
        id: "line5_12",
        label: "Проспект Мира",
        color: "#925233",
        line: "Кольцевая линия"
    },
    {
        id: "line6_1",
        label: "Медведково",
        color: "#ef7e24",
        line: "Калужско-Рижская линия"
    },
    {
        id: "line6_2",
        label: "Бабушкинская",
        color: "#ef7e24",
        line: "Калужско-Рижская линия"
    },
    {
        id: "line6_3",
        label: "Свиблово",
        color: "#ef7e24",
        line: "Калужско-Рижская линия"
    },
    {
        id: "line6_4",
        label: "Ботанический сад",
        color: "#ef7e24",
        line: "Калужско-Рижская линия"
    },
    {
        id: "line6_5",
        label: "ВДНХ",
        color: "#ef7e24",
        line: "Калужско-Рижская линия"
    },
    {
        id: "line6_6",
        label: "Алексеевская",
        color: "#ef7e24",
        line: "Калужско-Рижская линия"
    },
    {
        id: "line6_7",
        label: "Рижская",
        color: "#ef7e24",
        line: "Калужско-Рижская линия"
    },
    // {
    //     id: "line6_8",
    //     label: "Проспект Мира",
    //     color: "#ef7e24",
    //     line: "Калужско-Рижская линия"
    // },
    {
        id: "line6_9",
        label: "Сухаревская",
        color: "#ef7e24",
        line: "Калужско-Рижская линия"
    },
    {
        id: "line6_10",
        label: "Тургеневская",
        color: "#ef7e24",
        line: "Калужско-Рижская линия"
    },
    // {
    //     id: "line6_11",
    //     label: "Китай-город",
    //     color: "#ef7e24",
    //     line: "Калужско-Рижская линия"
    // },
    {
        id: "line6_12",
        label: "Третьяковская",
        color: "#ef7e24",
        line: "Калужско-Рижская линия"
    },
    {
        id: "line6_13",
        label: "Октябрьская",
        color: "#ef7e24",
        line: "Калужско-Рижская линия"
    },
    {
        id: "line6_14",
        label: "Шаболовская",
        color: "#ef7e24",
        line: "Калужско-Рижская линия"
    },
    {
        id: "line6_15",
        label: "Ленинский проспект",
        color: "#ef7e24",
        line: "Калужско-Рижская линия"
    },
    {
        id: "line6_16",
        label: "Академическая",
        color: "#ef7e24",
        line: "Калужско-Рижская линия"
    },
    {
        id: "line6_17",
        label: "Профсоюзная",
        color: "#ef7e24",
        line: "Калужско-Рижская линия"
    },
    {
        id: "line6_18",
        label: "Новые Черёмушки",
        color: "#ef7e24",
        line: "Калужско-Рижская линия"
    },
    {
        id: "line6_19",
        label: "Калужская",
        color: "#ef7e24",
        line: "Калужско-Рижская линия"
    },
    {
        id: "line6_20",
        label: "Беляево",
        color: "#ef7e24",
        line: "Калужско-Рижская линия"
    },
    {
        id: "line6_21",
        label: "Коньково",
        color: "#ef7e24",
        line: "Калужско-Рижская линия"
    },
    {
        id: "line6_22",
        label: "Тёплый стан",
        color: "#ef7e24",
        line: "Калужско-Рижская линия"
    },
    {
        id: "line6_23",
        label: "Ясенево",
        color: "#ef7e24",
        line: "Калужско-Рижская линия"
    },
    {
        id: "line6_24",
        label: "Новоясеневская",
        color: "#ef7e24",
        line: "Калужско-Рижская линия"
    },
    {
        id: "line7_1",
        label: "Планерная",
        color: "#943f90",
        line: "Таганско-Краснопресненская линия"
    },
    {
        id: "line7_2",
        label: "Сходненская",
        color: "#943f90",
        line: "Таганско-Краснопресненская линия"
    },
    {
        id: "line7_3",
        label: "Тушинская",
        color: "#943f90",
        line: "Таганско-Краснопресненская линия"
    },
    {
        id: "line7_4",
        label: "Спартак",
        color: "#943f90",
        line: "Таганско-Краснопресненская линия"
    },
    {
        id: "line7_5",
        label: "Щукинская",
        color: "#943f90",
        line: "Таганско-Краснопресненская линия"
    },
    {
        id: "line7_6",
        label: "Октябрьское поле",
        color: "#943f90",
        line: "Таганско-Краснопресненская линия"
    },
    {
        id: "line7_7",
        label: "Полежаевская",
        color: "#943f90",
        line: "Таганско-Краснопресненская линия"
    },
    {
        id: "line7_8",
        label: "Беговая",
        color: "#943f90",
        line: "Таганско-Краснопресненская линия"
    },
    {
        id: "line7_9",
        label: "Улица 1905 года",
        color: "#943f90",
        line: "Таганско-Краснопресненская линия"
    },
    {
        id: "line7_10",
        label: "Баррикадная",
        color: "#943f90",
        line: "Таганско-Краснопресненская линия"
    },
    {
        id: "line7_11",
        label: "Пушкинская",
        color: "#943f90",
        line: "Таганско-Краснопресненская линия"
    },
    {
        id: "line7_12",
        label: "Кузнецкий мост",
        color: "#943f90",
        line: "Таганско-Краснопресненская линия"
    },
    {
        id: "line7_13",
        label: "Китай-город",
        color: "#943f90",
        line: "Таганско-Краснопресненская линия"
    },
    {
        id: "line7_14",
        label: "Таганская",
        color: "#943f90",
        line: "Таганско-Краснопресненская линия"
    },
    {
        id: "line7_15",
        label: "Пролетарская",
        color: "#943f90",
        line: "Таганско-Краснопресненская линия"
    },
    {
        id: "line7_16",
        label: "Волгоградский проспект",
        color: "#943f90",
        line: "Таганско-Краснопресненская линия"
    },
    {
        id: "line7_17",
        label: "Текстильщики",
        color: "#943f90",
        line: "Таганско-Краснопресненская линия"
    },
    {
        id: "line7_18",
        label: "Кузьминки",
        color: "#943f90",
        line: "Таганско-Краснопресненская линия"
    },
    {
        id: "line7_19",
        label: "Рязанский проспект",
        color: "#943f90",
        line: "Таганско-Краснопресненская линия"
    },
    {
        id: "line7_20",
        label: "Выхино",
        color: "#943f90",
        line: "Таганско-Краснопресненская линия"
    },
    {
        id: "line7_21",
        label: "Лермонтовский проспект",
        color: "#943f90",
        line: "Таганско-Краснопресненская линия"
    },
    {
        id: "line7_22",
        label: "Жулебино",
        color: "#943f90",
        line: "Таганско-Краснопресненская линия"
    },
    {
        id: "line7_23",
        label: "Котельники",
        color: "#943f90",
        line: "Таганско-Краснопресненская линия"
    },
    {
        id: "line8_1",
        label: "Новокосино",
        color: "#FFCD1E",
        line: "Калининская линия"
    },
    {
        id: "line8_2",
        label: "Новогиреево",
        color: "#FFCD1E",
        line: "Калининская линия"
    },
    {
        id: "line8_3",
        label: "Перово",
        color: "#FFCD1E",
        line: "Калининская линия"
    },
    {
        id: "line8_4",
        label: "Шоссе Энтузиастов",
        color: "#FFCD1E",
        line: "Калининская линия"
    },
    {
        id: "line8_5",
        label: "Авиамоторная",
        color: "#FFCD1E",
        line: "Калининская линия"
    },
    {
        id: "line8_6",
        label: "Площадь Ильича",
        color: "#FFCD1E",
        line: "Калининская линия"
    },
    {
        id: "line8_7",
        label: "Марксистская",
        color: "#FFCD1E",
        line: "Калининская линия"
    },
    // {
    //     id: "line8_8",
    //     label: "Третьяковская",
    //     color: "#FFCD1E",
    //     line: "Калининская линия"
    // },
    // {
    //     id: "line8A_1",
    //     label: "Деловой центр",
    //     color: "#FFCD1E",
    //     line: "Солнцевская линия"
    // },
    // {
    //     id: "line8A_2",
    //     label: "Парк Победы",
    //     color: "#FFCD1E",
    //     line: "Солнцевская линия"
    // },
    {
        id: "line8A_3",
        label: "Минская",
        color: "#FFCD1E",
        line: "Солнцевская линия"
    },
    {
        id: "line8A_4",
        label: "Ломоносовский проспект",
        color: "#FFCD1E",
        line: "Солнцевская линия"
    },
    {
        id: "line8A_5",
        label: "Раменки",
        color: "#FFCD1E",
        line: "Солнцевская линия"
    },
    // {
    //     id: "line8A_6",
    //     label: "Мичуринский проспект",
    //     color: "#FFCD1E",
    //     line: "Солнцевская линия"
    // },
    {
        id: "line8A_7",
        label: "Озёрная",
        color: "#FFCD1E",
        line: "Солнцевская линия"
    },
    {
        id: "line8A_8",
        label: "Говорово",
        color: "#FFCD1E",
        line: "Солнцевская линия"
    },
    {
        id: "line8A_9",
        label: "Солнцево",
        color: "#FFCD1E",
        line: "Солнцевская линия"
    },
    {
        id: "line8A_10",
        label: "Боровское шоссе",
        color: "#FFCD1E",
        line: "Солнцевская линия"
    },
    {
        id: "line8A_11",
        label: "Новопеределкино",
        color: "#FFCD1E",
        line: "Солнцевская линия"
    },
    {
        id: "line8A_12",
        label: "Рассказовка",
        color: "#FFCD1E",
        line: "Солнцевская линия"
    },
    {
        id: "line8A_13",
        label: "Пыхтино",
        color: "#FFCD1E",
        line: "Солнцевская линия"
    },
    {
        id: "line8A_14",
        label: "Аэропорт Внуково",
        color: "#FFCD1E",
        line: "Солнцевская линия"
    },
    {
        id: "line9_1",
        label: "Алтуфьево",
        color: "#adacac",
        line: "Серпуховско-Тимирязевская линия"
    },
    {
        id: "line9_2",
        label: "Бибирево",
        color: "#adacac",
        line: "Серпуховско-Тимирязевская линия"
    },
    {
        id: "line9_3",
        label: "Отрадное",
        color: "#adacac",
        line: "Серпуховско-Тимирязевская линия"
    },
    {
        id: "line9_4",
        label: "Владыкино",
        color: "#adacac",
        line: "Серпуховско-Тимирязевская линия"
    },
    // {
    //     id: "line9_5",
    //     label: "Петровско-Разумовская",
    //     color: "#adacac",
    //     line: "Серпуховско-Тимирязевская линия"
    // },
    {
        id: "line9_6",
        label: "Тимирязевская",
        color: "#adacac",
        line: "Серпуховско-Тимирязевская линия"
    },
    {
        id: "line9_7",
        label: "Дмитровская",
        color: "#adacac",
        line: "Серпуховско-Тимирязевская линия"
    },
    {
        id: "line9_8",
        label: "Савёловская",
        color: "#adacac",
        line: "Серпуховско-Тимирязевская линия"
    },
    {
        id: "line9_9",
        label: "Менделеевская",
        color: "#adacac",
        line: "Серпуховско-Тимирязевская линия"
    },
    {
        id: "line9_10",
        label: "Цветной бульвар",
        color: "#adacac",
        line: "Серпуховско-Тимирязевская линия"
    },
    {
        id: "line9_11",
        label: "Чеховская",
        color: "#adacac",
        line: "Серпуховско-Тимирязевская линия"
    },
    {
        id: "line9_12",
        label: "Боровицкая",
        color: "#adacac",
        line: "Серпуховско-Тимирязевская линия"
    },
    {
        id: "line9_13",
        label: "Полянка",
        color: "#adacac",
        line: "Серпуховско-Тимирязевская линия"
    },
    {
        id: "line9_14",
        label: "Серпуховская",
        color: "#adacac",
        line: "Серпуховско-Тимирязевская линия"
    },
    {
        id: "line9_15",
        label: "Тульская",
        color: "#adacac",
        line: "Серпуховско-Тимирязевская линия"
    },
    {
        id: "line9_16",
        label: "Нагатинская",
        color: "#adacac",
        line: "Серпуховско-Тимирязевская линия"
    },
    {
        id: "line9_17",
        label: "Нагорная",
        color: "#adacac",
        line: "Серпуховско-Тимирязевская линия"
    },
    {
        id: "line9_18",
        label: "Нахимовский проспект",
        color: "#adacac",
        line: "Серпуховско-Тимирязевская линия"
    },
    {
        id: "line9_19",
        label: "Севастопольская",
        color: "#adacac",
        line: "Серпуховско-Тимирязевская линия"
    },
    {
        id: "line9_20",
        label: "Чертановская",
        color: "#adacac",
        line: "Серпуховско-Тимирязевская линия"
    },
    {
        id: "line9_21",
        label: "Южная",
        color: "#adacac",
        line: "Серпуховско-Тимирязевская линия"
    },
    {
        id: "line9_22",
        label: "Пражская",
        color: "#adacac",
        line: "Серпуховско-Тимирязевская линия"
    },
    {
        id: "line9_23",
        label: "Улица академика Янгеля",
        color: "#adacac",
        line: "Серпуховско-Тимирязевская линия"
    },
    {
        id: "line9_24",
        label: "Аннино",
        color: "#adacac",
        line: "Серпуховско-Тимирязевская линия"
    },
    {
        id: "line9_25",
        label: "Бульвар Дмитрия Донского",
        color: "#adacac",
        line: "Серпуховско-Тимирязевская линия"
    },
    {
        id: "line10_1",
        label: "Физтех",
        color: "#BED12E",
        line: "Люблинско-Дмитровская линия"
    },
    {
        id: "line10_2",
        label: "Лианозово",
        color: "#BED12E",
        line: "Люблинско-Дмитровская линия"
    },
    {
        id: "line10_3",
        label: "Яхромская",
        color: "#BED12E",
        line: "Люблинско-Дмитровская линия"
    },
    {
        id: "line10_4",
        label: "Селигерская",
        color: "#BED12E",
        line: "Люблинско-Дмитровская линия"
    },
    {
        id: "line10_5",
        label: "Верхние Лихоборы",
        color: "#BED12E",
        line: "Люблинско-Дмитровская линия"
    },
    {
        id: "line10_6",
        label: "Окружная",
        color: "#BED12E",
        line: "Люблинско-Дмитровская линия"
    },
    {
        id: "line10_7",
        label: "Петровско-Разумовская",
        color: "#BED12E",
        line: "Люблинско-Дмитровская линия"
    },
    {
        id: "line10_8",
        label: "Фонвизинская",
        color: "#BED12E",
        line: "Люблинско-Дмитровская линия"
    },
    {
        id: "line10_9",
        label: "Бутырская",
        color: "#BED12E",
        line: "Люблинско-Дмитровская линия"
    },
    {
        id: "line10_10",
        label: "Марьина Роща",
        color: "#BED12E",
        line: "Люблинско-Дмитровская линия"
    },
    {
        id: "line10_11",
        label: "Достоевская",
        color: "#BED12E",
        line: "Люблинско-Дмитровская линия"
    },
    {
        id: "line10_12",
        label: "Трубная",
        color: "#BED12E",
        line: "Люблинско-Дмитровская линия"
    },
    {
        id: "line10_13",
        label: "Сретенский бульвар",
        color: "#BED12E",
        line: "Люблинско-Дмитровская линия"
    },
    {
        id: "line10_14",
        label: "Чкаловская",
        color: "#BED12E",
        line: "Люблинско-Дмитровская линия"
    },
    {
        id: "line10_15",
        label: "Римская",
        color: "#BED12E",
        line: "Люблинско-Дмитровская линия"
    },
    {
        id: "line10_16",
        label: "Крестьянская застава",
        color: "#BED12E",
        line: "Люблинско-Дмитровская линия"
    },
    {
        id: "line10_17",
        label: "Дубровка",
        color: "#BED12E",
        line: "Люблинско-Дмитровская линия"
    },
    {
        id: "line10_18",
        label: "Кожуховская",
        color: "#BED12E",
        line: "Люблинско-Дмитровская линия"
    },
    // {
    //     id: "line10_19",
    //     label: "Печатники",
    //     color: "#BED12E",
    //     line: "Люблинско-Дмитровская линия"
    // },
    {
        id: "line10_20",
        label: "Волжская",
        color: "#BED12E",
        line: "Люблинско-Дмитровская линия"
    },
    {
        id: "line10_21",
        label: "Люблино",
        color: "#BED12E",
        line: "Люблинско-Дмитровская линия"
    },
    {
        id: "line10_22",
        label: "Братиславская",
        color: "#BED12E",
        line: "Люблинско-Дмитровская линия"
    },
    {
        id: "line10_23",
        label: "Марьино",
        color: "#BED12E",
        line: "Люблинско-Дмитровская линия"
    },
    {
        id: "line10_24",
        label: "Борисово",
        color: "#BED12E",
        line: "Люблинско-Дмитровская линия"
    },
    {
        id: "line10_25",
        label: "Шипиловская",
        color: "#BED12E",
        line: "Люблинско-Дмитровская линия"
    },
    {
        id: "line10_26",
        label: "Зябликово",
        color: "#BED12E",
        line: "Люблинско-Дмитровская линия"
    },
    // {
    //     id: "line11_1",
    //     label: "Савёловская",
    //     color: "#89CDCF",
    //     line: "Большая Кольцевая линия"
    // },
    {
        id: "line11_2",
        label: "Петровский парк",
        color: "#89CDCF",
        line: "Большая Кольцевая линия"
    },
    {
        id: "line11_3",
        label: "ЦСКА",
        color: "#89CDCF",
        line: "Большая Кольцевая линия"
    },
    {
        id: "line11_4",
        label: "Хорошёвская",
        color: "#89CDCF",
        line: "Большая Кольцевая линия"
    },
    {
        id: "line11_5",
        label: "Шелепиха",
        color: "#89CDCF",
        line: "Большая Кольцевая линия"
    },
    {
        id: "line11_6",
        label: "Деловой центр",
        color: "#89CDCF",
        line: "Большая Кольцевая линия"
    },
    {
        id: "line11_7",
        label: "Народное Ополчение",
        color: "#89CDCF",
        line: "Большая Кольцевая линия"
    },
    {
        id: "line11_8",
        label: "Мнёвники",
        color: "#89CDCF",
        line: "Большая Кольцевая линия"
    },
    {
        id: "line11_9",
        label: "Терехово",
        color: "#89CDCF",
        line: "Большая Кольцевая линия"
    },
    {
        id: "line11_10",
        label: "Кунцевская",
        color: "#89CDCF",
        line: "Большая Кольцевая линия"
    },
    {
        id: "line11_11",
        label: "Давыдково",
        color: "#89CDCF",
        line: "Большая Кольцевая линия"
    },
    {
        id: "line11_12",
        label: "Аминьевская",
        color: "#89CDCF",
        line: "Большая Кольцевая линия"
    },
    {
        id: "line11_13",
        label: "Мичуринский проспект",
        color: "#89CDCF",
        line: "Большая Кольцевая линия"
    },
    // {
    //     id: "line11_14",
    //     label: "Проспект Вернадского",
    //     color: "#89CDCF",
    //     line: "Большая Кольцевая линия"
    // },
    {
        id: "line11_15",
        label: "Новаторская",
        color: "#89CDCF",
        line: "Большая Кольцевая линия"
    },
    {
        id: "line11_16",
        label: "Воронцовская",
        color: "#89CDCF",
        line: "Большая Кольцевая линия"
    },
    {
        id: "line11_17",
        label: "Зюзино",
        color: "#89CDCF",
        line: "Большая Кольцевая линия"
    },
    {
        id: "line11_18",
        label: "Каховская",
        color: "#89CDCF",
        line: "Большая Кольцевая линия"
    },
    {
        id: "line11_19",
        label: "Варшавская",
        color: "#89CDCF",
        line: "Большая Кольцевая линия"
    },
    // {
    //     id: "line11_20",
    //     label: "Каширская",
    //     color: "#89CDCF",
    //     line: "Большая Кольцевая линия"
    // },
    {
        id: "line11_21",
        label: "Кленовый бульвар",
        color: "#89CDCF",
        line: "Большая Кольцевая линия"
    },
    {
        id: "line11_22",
        label: "Нагатинский затон",
        color: "#89CDCF",
        line: "Большая Кольцевая линия"
    },
    {
        id: "line11_23",
        label: "Печатники",
        color: "#89CDCF",
        line: "Большая Кольцевая линия"
    },
    // {
    //     id: "line11_24",
    //     label: "Текстильщики",
    //     color: "#89CDCF",
    //     line: "Большая Кольцевая линия"
    // },
    // {
    //     id: "line11_25",
    //     label: "Нижегородская",
    //     color: "#89CDCF",
    //     line: "Большая Кольцевая линия"
    // },
    // {
    //     id: "line11_26",
    //     label: "Авиамоторная",
    //     color: "#89CDCF",
    //     line: "Большая Кольцевая линия"
    // },
    {
        id: "line11_27",
        label: "Лефортово",
        color: "#89CDCF",
        line: "Большая Кольцевая линия"
    },
    // {
    //     id: "line11_28",
    //     label: "Электрозаводская",
    //     color: "#89CDCF",
    //     line: "Большая Кольцевая линия"
    // },
    // {
    //     id: "line11_29",
    //     label: "Сокольники",
    //     color: "#89CDCF",
    //     line: "Большая Кольцевая линия"
    // },
    // {
    //     id: "line11_30",
    //     label: "Рижская",
    //     color: "#89CDCF",
    //     line: "Большая Кольцевая линия"
    // },
    // {
    //     id: "line11_31",
    //     label: "Марьина Роща",
    //     color: "#89CDCF",
    //     line: "Большая Кольцевая линия"
    // },
    {
        id: "line12_1",
        label: "Битцевский парк",
        color: "#BAC8E8",
        line: "Бутовская линия"
    },
    {
        id: "line12_2",
        label: "Лесопарковая",
        color: "#BAC8E8",
        line: "Бутовская линия"
    },
    {
        id: "line12_3",
        label: "Улица Старокачаловская",
        color: "#BAC8E8",
        line: "Бутовская линия"
    },
    {
        id: "line12_4",
        label: "Улица Скобелевская",
        color: "#BAC8E8",
        line: "Бутовская линия"
    },
    {
        id: "line12_5",
        label: "Бульвар адмирала Ушакова",
        color: "#BAC8E8",
        line: "Бутовская линия"
    },
    {
        id: "line12_6",
        label: "Улица Горчакова",
        color: "#BAC8E8",
        line: "Бутовская линия"
    },
    {
        id: "line12_7",
        label: "Бунинская аллея",
        color: "#BAC8E8",
        line: "Бутовская линия"
    },
    // {
    //     id: "line14_1",
    //     label: "Бульвар Рокоссовского",
    //     color: "#ffcec6",
    //     line: "МЦК"
    // },
    {
        id: "line14_2",
        label: "Локомотив",
        color: "#ffcec6",
        line: "МЦК"
    },
    {
        id: "line14_3",
        label: "Измайлово",
        color: "#ffcec6",
        line: "МЦК"
    },
    {
        id: "line14_4",
        label: "Соколиная Гора",
        color: "#ffcec6",
        line: "МЦК"
    },
    // {
    //     id: "line14_5",
    //     label: "Шоссе Энтузиастов",
    //     color: "#ffcec6",
    //     line: "МЦК"
    // },
    {
        id: "line14_6",
        label: "Андроновка",
        color: "#ffcec6",
        line: "МЦК"
    },
    // {
    //     id: "line14_7",
    //     label: "Нижегородская",
    //     color: "#ffcec6",
    //     line: "МЦК"
    // },
    {
        id: "line14_8",
        label: "Новохохловская",
        color: "#ffcec6",
        line: "МЦК"
    },
    {
        id: "line14_9",
        label: "Угрешская",
        color: "#ffcec6",
        line: "МЦК"
    },
    // {
    //     id: "line14_10",
    //     label: "Дубровка",
    //     color: "#ffcec6",
    //     line: "МЦК"
    // },
    // {
    //     id: "line14_11",
    //     label: "Автозаводская",
    //     color: "#ffcec6",
    //     line: "МЦК"
    // },
    {
        id: "line14_12",
        label: "ЗИЛ",
        color: "#ffcec6",
        line: "МЦК"
    },
    {
        id: "line14_13",
        label: "Верхние Котлы",
        color: "#ffcec6",
        line: "МЦК"
    },
    {
        id: "line14_14",
        label: "Крымская",
        color: "#ffcec6",
        line: "МЦК"
    },
    {
        id: "line14_15",
        label: "Площадь Гагарина",
        color: "#ffcec6",
        line: "МЦК"
    },
    {
        id: "line14_16",
        label: "Лужники",
        color: "#ffcec6",
        line: "МЦК"
    },
    // {
    //     id: "line14_17",
    //     label: "Кутузовская",
    //     color: "#ffcec6",
    //     line: "МЦК"
    // },
    // {
    //     id: "line14_18",
    //     label: "Москва-Сити",
    //     color: "#ffcec6",
    //     line: "МЦК"
    // },
    // {
    //     id: "line14_19",
    //     label: "Шелепиха",
    //     color: "#ffcec6",
    //     line: "МЦК"
    // },
    {
        id: "line14_20",
        label: "Хорошево",
        color: "#ffcec6",
        line: "МЦК"
    },
    {
        id: "line14_21",
        label: "Зорге",
        color: "#ffcec6",
        line: "МЦК"
    },
    {
        id: "line14_22",
        label: "Панфиловская",
        color: "#ffcec6",
        line: "МЦК"
    },
    // {
    //     id: "line14_23",
    //     label: "Стрешнево",
    //     color: "#ffcec6",
    //     line: "МЦК"
    // },
    {
        id: "line14_24",
        label: "Балтийская",
        color: "#ffcec6",
        line: "МЦК"
    },
    {
        id: "line14_25",
        label: "Коптево",
        color: "#ffcec6",
        line: "МЦК"
    },
    {
        id: "line14_26",
        label: "Лихоборы",
        color: "#ffcec6",
        line: "МЦК"
    },
    // {
    //     id: "line14_27",
    //     label: "Окружная",
    //     color: "#ffcec6",
    //     line: "МЦК"
    // },
    // {
    //     id: "line14_28",
    //     label: "Владыкино",
    //     color: "#ffcec6",
    //     line: "МЦК"
    // },
    // {
    //     id: "line14_29",
    //     label: "Ботанический сад",
    //     color: "#ffcec6",
    //     line: "МЦК"
    // },
    {
        id: "line14_30",
        label: "Ростокино",
        color: "#ffcec6",
        line: "МЦК"
    },
    {
        id: "line14_31",
        label: "Белокаменная",
        color: "#ffcec6",
        line: "МЦК"
    },
    {
        id: "line15_1",
        label: "Нижегородская",
        color: "#d68ab1",
        line: "Некрасовская линия"
    },
    {
        id: "line15_2",
        label: "Стахановская",
        color: "#d68ab1",
        line: "Некрасовская линия"
    },
    {
        id: "line15_3",
        label: "Окская",
        color: "#d68ab1",
        line: "Некрасовская линия"
    },
    {
        id: "line15_4",
        label: "Юго-Восточная",
        color: "#d68ab1",
        line: "Некрасовская линия"
    },
    {
        id: "line15_5",
        label: "Косино",
        color: "#d68ab1",
        line: "Некрасовская линия"
    },
    {
        id: "line15_6",
        label: "Улица Дмитриевского",
        color: "#d68ab1",
        line: "Некрасовская линия"
    },
    {
        id: "line15_7",
        label: "Лухмановская",
        color: "#d68ab1",
        line: "Некрасовская линия"
    },
    {
        id: "line15_8",
        label: "Некрасовка",
        color: "#d68ab1",
        line: "Некрасовская линия"
    },
    {
        id: "lineD1_1",
        label: "Лобня",
        color: "#f7a600",
        line: "МЦД-1"
    },
    {
        id: "lineD1_2",
        label: "Шереметьевская",
        color: "#f7a600",
        line: "МЦД-1"
    },
    {
        id: "lineD1_3",
        label: "Хлебниково",
        color: "#f7a600",
        line: "МЦД-1"
    },
    {
        id: "lineD1_4",
        label: "Водники",
        color: "#f7a600",
        line: "МЦД-1"
    },
    {
        id: "lineD1_5",
        label: "Долгопрудная",
        color: "#f7a600",
        line: "МЦД-1"
    },
    {
        id: "lineD1_6",
        label: "Новодачная",
        color: "#f7a600",
        line: "МЦД-1"
    },
    {
        id: "lineD1_7",
        label: "Марк",
        color: "#f7a600",
        line: "МЦД-1"
    },
    // {
    //     id: "lineD1_8",
    //     label: "Лианозово",
    //     color: "#f7a600",
    //     line: "МЦД-1"
    // },
    {
        id: "lineD1_9",
        label: "Илимская",
        color: "#f7a600",
        line: "МЦД-1"
    },
    {
        id: "lineD1_10",
        label: "Бескудниково",
        color: "#f7a600",
        line: "МЦД-1"
    },
    {
        id: "lineD1_11",
        label: "Дегунино",
        color: "#f7a600",
        line: "МЦД-1"
    },
    // {
    //     id: "lineD1_12",
    //     label: "Окружная",
    //     color: "#f7a600",
    //     line: "МЦД-1"
    // },
    // {
    //     id: "lineD1_13",
    //     label: "Петровско-Разумовская",
    //     color: "#f7a600",
    //     line: "МЦД-1"
    // },
    // {
    //     id: "lineD1_14",
    //     label: "Тимирязевская",
    //     color: "#f7a600",
    //     line: "МЦД-1"
    // },
    // {
    //     id: "lineD1_15",
    //     label: "Дмитровская",
    //     color: "#f7a600",
    //     line: "МЦД-1"
    // },
    // {
    //     id: "lineD1_16",
    //     label: "Савёловская",
    //     color: "#f7a600",
    //     line: "МЦД-1"
    // },
    // {
    //     id: "lineD1_17",
    //     label: "Белорусская",
    //     color: "#f7a600",
    //     line: "МЦД-1"
    // },
    {
        id: "lineD1_18",
        label: "Беговая",
        color: "#f7a600",
        line: "МЦД-1"
    },
    {
        id: "lineD1_19",
        label: "Тестовская (Москва-Сити)",
        color: "#f7a600",
        line: "МЦД-1"
    },
    // {
    //     id: "lineD1_20",
    //     label: "Фили",
    //     color: "#f7a600",
    //     line: "МЦД-1"
    // },
    // {
    //     id: "lineD1_21",
    //     label: "Славянский бульвар",
    //     color: "#f7a600",
    //     line: "МЦД-1"
    // },
    // {
    //     id: "lineD1_22",
    //     label: "Кунцевская",
    //     color: "#f7a600",
    //     line: "МЦД-1"
    // },
    {
        id: "lineD1_23",
        label: "Рабочий поселок",
        color: "#f7a600",
        line: "МЦД-1"
    },
    {
        id: "lineD1_24",
        label: "Сетунь",
        color: "#f7a600",
        line: "МЦД-1"
    },
    {
        id: "lineD1_25",
        label: "Немчиновка",
        color: "#f7a600",
        line: "МЦД-1"
    },
    {
        id: "lineD1_26",
        label: "Сколково",
        color: "#f7a600",
        line: "МЦД-1"
    },
    {
        id: "lineD1_27",
        label: "Баковка",
        color: "#f7a600",
        line: "МЦД-1"
    },
    {
        id: "lineD1_28",
        label: "Одинцово",
        color: "#f7a600",
        line: "МЦД-1"
    },
    {
        id: "lineD2_1",
        label: "Нахабино",
        color: "#e94282",
        line: "МЦД-2"
    },
    {
        id: "lineD2_2",
        label: "Аникеевка",
        color: "#e94282",
        line: "МЦД-2"
    },
    {
        id: "lineD2_3",
        label: "Опалиха",
        color: "#e94282",
        line: "МЦД-2"
    },
    {
        id: "lineD2_4",
        label: "Красногорская",
        color: "#e94282",
        line: "МЦД-2"
    },
    {
        id: "lineD2_5",
        label: "Павшино",
        color: "#e94282",
        line: "МЦД-2"
    },
    {
        id: "lineD2_6",
        label: "Пенягино",
        color: "#e94282",
        line: "МЦД-2"
    },
    // {
    //     id: "lineD2_7",
    //     label: "Волоколамская",
    //     color: "#e94282",
    //     line: "МЦД-2"
    // },
    {
        id: "lineD2_8",
        label: "Трикотажная",
        color: "#e94282",
        line: "МЦД-2"
    },
    // {
    //     id: "lineD2_9",
    //     label: "Тушинская",
    //     color: "#e94282",
    //     line: "МЦД-2"
    // },
    // {
    //     id: "lineD2_10",
    //     label: "Щукинская",
    //     color: "#e94282",
    //     line: "МЦД-2"
    // },
    {
        id: "lineD2_11",
        label: "Стрешнево",
        color: "#e94282",
        line: "МЦД-2"
    },
    {
        id: "lineD2_12",
        label: "Красный балтиец",
        color: "#e94282",
        line: "МЦД-2"
    },
    {
        id: "lineD2_13",
        label: "Гражданская",
        color: "#e94282",
        line: "МЦД-2"
    },
    // {
    //     id: "lineD2_14",
    //     label: "Дмитровская",
    //     color: "#e94282",
    //     line: "МЦД-2"
    // },
    // {
    //     id: "lineD2_15",
    //     label: "Марьина Роща",
    //     color: "#e94282",
    //     line: "МЦД-2"
    // },
    // {
    //     id: "lineD2_16",
    //     label: "Рижская",
    //     color: "#e94282",
    //     line: "МЦД-2"
    // },
    // {
    //     id: "lineD2_17",
    //     label: "Площадь трёх вокзалов",
    //     color: "#e94282",
    //     line: "МЦД-2"
    // },
    // {
    //     id: "lineD2_18",
    //     label: "Курская",
    //     color: "#e94282",
    //     line: "МЦД-2"
    // },
    {
        id: "lineD2_19",
        label: "Москва Товарная",
        color: "#e94282",
        line: "МЦД-2"
    },
    {
        id: "lineD2_20",
        label: "Калитники",
        color: "#e94282",
        line: "МЦД-2"
    },
    // {
    //     id: "lineD2_21",
    //     label: "Новохохловская",
    //     color: "#e94282",
    //     line: "МЦД-2"
    // },
    // {
    //     id: "lineD2_22",
    //     label: "Текстильщики",
    //     color: "#e94282",
    //     line: "МЦД-2"
    // },
    // {
    //     id: "lineD2_23",
    //     label: "Печатники",
    //     color: "#e94282",
    //     line: "МЦД-2"
    // },
    // {
    //     id: "lineD2_24",
    //     label: "Люблино",
    //     color: "#e94282",
    //     line: "МЦД-2"
    // },
    {
        id: "lineD2_25",
        label: "Депо",
        color: "#e94282",
        line: "МЦД-2"
    },
    {
        id: "lineD2_26",
        label: "Перерва",
        color: "#e94282",
        line: "МЦД-2"
    },
    {
        id: "lineD2_27",
        label: "Курьяново",
        color: "#e94282",
        line: "МЦД-2"
    },
    {
        id: "lineD2_28",
        label: "Москворечье",
        color: "#e94282",
        line: "МЦД-2"
    },
    // {
    //     id: "lineD2_29",
    //     label: "Царицыно",
    //     color: "#e94282",
    //     line: "МЦД-2"
    // },
    {
        id: "lineD2_30",
        label: "Котляково",
        color: "#e94282",
        line: "МЦД-2"
    },
    {
        id: "lineD2_31",
        label: "Покровское",
        color: "#e94282",
        line: "МЦД-2"
    },
    {
        id: "lineD2_32",
        label: "Красный строитель",
        color: "#e94282",
        line: "МЦД-2"
    },
    {
        id: "lineD2_33",
        label: "Битца",
        color: "#e94282",
        line: "МЦД-2"
    },
    {
        id: "lineD2_34",
        label: "Бутово",
        color: "#e94282",
        line: "МЦД-2"
    },
    {
        id: "lineD2_35",
        label: "Щербинка",
        color: "#e94282",
        line: "МЦД-2"
    },
    {
        id: "lineD2_36",
        label: "Остафьево",
        color: "#e94282",
        line: "МЦД-2"
    },
    {
        id: "lineD2_37",
        label: "Силикатная",
        color: "#e94282",
        line: "МЦД-2"
    },
    {
        id: "lineD2_38",
        label: "Подольск",
        color: "#e94282",
        line: "МЦД-2"
    },
    {
        id: "lineD3_1",
        label: "Зеленоград-Крюково",
        color: "#EA5B0C",
        line: "МЦД-3"
    },
    {
        id: "lineD3_2",
        label: "Фирсановская",
        color: "#EA5B0C",
        line: "МЦД-3"
    },
    {
        id: "lineD3_3",
        label: "Сходня",
        color: "#EA5B0C",
        line: "МЦД-3"
    },
    {
        id: "lineD3_4",
        label: "Подрезково",
        color: "#EA5B0C",
        line: "МЦД-3"
    },
    {
        id: "lineD3_5",
        label: "Новоподрезково",
        color: "#EA5B0C",
        line: "МЦД-3"
    },
    {
        id: "lineD3_6",
        label: "Молжаниново",
        color: "#EA5B0C",
        line: "МЦД-3"
    },
    {
        id: "lineD3_7",
        label: "Химки",
        color: "#EA5B0C",
        line: "МЦД-3"
    },
    {
        id: "lineD3_8",
        label: "Левобережная",
        color: "#EA5B0C",
        line: "МЦД-3"
    },
    // {
    //     id: "lineD3_9",
    //     label: "Ховрино",
    //     color: "#EA5B0C",
    //     line: "МЦД-3"
    // },
    {
        id: "lineD3_10",
        label: "Грачёвская",
        color: "#EA5B0C",
        line: "МЦД-3"
    },
    {
        id: "lineD3_11",
        label: "Моссельмаш",
        color: "#EA5B0C",
        line: "МЦД-3"
    },
    // {
    //     id: "lineD3_12",
    //     label: "Лихоборы",
    //     color: "#EA5B0C",
    //     line: "МЦД-3"
    // },
    // {
    //     id: "lineD3_13",
    //     label: "Петровско-Разумовская",
    //     color: "#EA5B0C",
    //     line: "МЦД-3"
    // },
    {
        id: "lineD3_14",
        label: "Останкино",
        color: "#EA5B0C",
        line: "МЦД-3"
    },
    // {
    //     id: "lineD3_15",
    //     label: "Электрозаводская",
    //     color: "#EA5B0C",
    //     line: "МЦД-3"
    // },
    {
        id: "lineD3_16",
        label: "Сортировочная",
        color: "#EA5B0C",
        line: "МЦД-3"
    },
    // {
    //     id: "lineD3_17",
    //     label: "Авиамоторная",
    //     color: "#EA5B0C",
    //     line: "МЦД-3"
    // },
    // {
    //     id: "lineD3_18",
    //     label: "Андроновка",
    //     color: "#EA5B0C",
    //     line: "МЦД-3"
    // },
    // {
    //     id: "lineD3_19",
    //     label: "Перово",
    //     color: "#EA5B0C",
    //     line: "МЦД-3"
    // },
    {
        id: "lineD3_20",
        label: "Плющево",
        color: "#EA5B0C",
        line: "МЦД-3"
    },
    {
        id: "lineD3_21",
        label: "Вешняки",
        color: "#EA5B0C",
        line: "МЦД-3"
    },
    // {
    //     id: "lineD3_22",
    //     label: "Выхино",
    //     color: "#EA5B0C",
    //     line: "МЦД-3"
    // },
    // {
    //     id: "lineD3_23",
    //     label: "Косино",
    //     color: "#EA5B0C",
    //     line: "МЦД-3"
    // },
    {
        id: "lineD3_24",
        label: "Ухтомская",
        color: "#EA5B0C",
        line: "МЦД-3"
    },
    {
        id: "lineD3_25",
        label: "Люберцы",
        color: "#EA5B0C",
        line: "МЦД-3"
    },
    {
        id: "lineD3_26",
        label: "Панки",
        color: "#EA5B0C",
        line: "МЦД-3"
    },
    {
        id: "lineD3_27",
        label: "Томилино",
        color: "#EA5B0C",
        line: "МЦД-3"
    },
    {
        id: "lineD3_28",
        label: "Красково",
        color: "#EA5B0C",
        line: "МЦД-3"
    },
    {
        id: "lineD3_29",
        label: "Малаховка",
        color: "#EA5B0C",
        line: "МЦД-3"
    },
    {
        id: "lineD3_30",
        label: "Удельная",
        color: "#EA5B0C",
        line: "МЦД-3"
    },
    {
        id: "lineD3_31",
        label: "Быково",
        color: "#EA5B0C",
        line: "МЦД-3"
    },
    {
        id: "lineD3_32",
        label: "Ильинская",
        color: "#EA5B0C",
        line: "МЦД-3"
    },
    {
        id: "lineD3_33",
        label: "Отдых",
        color: "#EA5B0C",
        line: "МЦД-3"
    },
    {
        id: "lineD3_34",
        label: "Кратово",
        color: "#EA5B0C",
        line: "МЦД-3"
    },
    {
        id: "lineD3_35",
        label: "Есенинская",
        color: "#EA5B0C",
        line: "МЦД-3"
    },
    {
        id: "lineD3_36",
        label: "Фабричная",
        color: "#EA5B0C",
        line: "МЦД-3"
    },
    {
        id: "lineD3_37",
        label: "Раменское",
        color: "#EA5B0C",
        line: "МЦД-3"
    },
    {
        id: "lineD3_38",
        label: "Ипподром",
        color: "#EA5B0C",
        line: "МЦД-3"
    },
    {
        id: "lineD3_39",
        label: "Митьково",
        color: "#EA5B0C",
        line: "МЦД-3"
    },
    {
        id: "lineD4_1",
        label: "Железнодорожная",
        color: "#4BB287",
        line: "МЦД-4"
    },
    {
        id: "lineD4_2",
        label: "Ольгино",
        color: "#4BB287",
        line: "МЦД-4"
    },
    {
        id: "lineD4_3",
        label: "Кучино",
        color: "#4BB287",
        line: "МЦД-4"
    },
    {
        id: "lineD4_4",
        label: "Салтыковская",
        color: "#4BB287",
        line: "МЦД-4"
    },
    {
        id: "lineD4_5",
        label: "Никольское",
        color: "#4BB287",
        line: "МЦД-4"
    },
    {
        id: "lineD4_6",
        label: "Реутов",
        color: "#4BB287",
        line: "МЦД-4"
    },
    // {
    //     id: "lineD4_7",
    //     label: "Новогиреево",
    //     color: "#4BB287",
    //     line: "МЦД-4"
    // },
    {
        id: "lineD4_8",
        label: "Кусково",
        color: "#4BB287",
        line: "МЦД-4"
    },
    {
        id: "lineD4_9",
        label: "Чухлинка",
        color: "#4BB287",
        line: "МЦД-4"
    },
    // {
    //     id: "lineD4_10",
    //     label: "Нижегородская",
    //     color: "#4BB287",
    //     line: "МЦД-4"
    // },
    {
        id: "lineD4_11",
        label: "Серп и Молот",
        color: "#4BB287",
        line: "МЦД-4"
    },
    // {
    //     id: "lineD4_12",
    //     label: "Курская",
    //     color: "#4BB287",
    //     line: "МЦД-4"
    // },
    {
        id: "lineD4_13",
        label: "Площадь трёх вокзалов",
        color: "#4BB287",
        line: "МЦД-4"
    },
    // {
    //     id: "lineD4_14",
    //     label: "Марьина Роща",
    //     color: "#4BB287",
    //     line: "МЦД-4"
    // },
    // {
    //     id: "lineD4_15",
    //     label: "Савёловская",
    //     color: "#4BB287",
    //     line: "МЦД-4"
    // },
    // {
    //     id: "lineD4_16",
    //     label: "Белорусская",
    //     color: "#4BB287",
    //     line: "МЦД-4"
    // },
    // {
    //     id: "lineD4_17",
    //     label: "Москва-Сити",
    //     color: "#4BB287",
    //     line: "МЦД-4"
    // },
    // {
    //     id: "lineD4_18",
    //     label: "Кутузовская",
    //     color: "#4BB287",
    //     line: "МЦД-4"
    // },
    {
        id: "lineD4_19",
        label: "Поклонная",
        color: "#4BB287",
        line: "МЦД-4"
    },
    // {
    //     id: "lineD4_20",
    //     label: "Минская",
    //     color: "#4BB287",
    //     line: "МЦД-4"
    // },
    {
        id: "lineD4_21",
        label: "Матвеевская",
        color: "#4BB287",
        line: "МЦД-4"
    },
    // {
    //     id: "lineD4_22",
    //     label: "Аминьевская",
    //     color: "#4BB287",
    //     line: "МЦД-4"
    // },
    {
        id: "lineD4_23",
        label: "Очаково",
        color: "#4BB287",
        line: "МЦД-4"
    },
    {
        id: "lineD4_24",
        label: "Мещерская",
        color: "#4BB287",
        line: "МЦД-4"
    },
    // {
    //     id: "lineD4_25",
    //     label: "Солнечная",
    //     color: "#4BB287",
    //     line: "МЦД-4"
    // },
    {
        id: "lineD4_26",
        label: "Переделкино",
        color: "#4BB287",
        line: "МЦД-4"
    },
    {
        id: "lineD4_27",
        label: "Мичуринец",
        color: "#4BB287",
        line: "МЦД-4"
    },
    {
        id: "lineD4_28",
        label: "Внуково",
        color: "#4BB287",
        line: "МЦД-4"
    },
    {
        id: "lineD4_29",
        label: "Лесной Городок",
        color: "#4BB287",
        line: "МЦД-4"
    },
    {
        id: "lineD4_30",
        label: "Толстопальцево",
        color: "#4BB287",
        line: "МЦД-4"
    },
    {
        id: "lineD4_31",
        label: "Кокошкино",
        color: "#4BB287",
        line: "МЦД-4"
    },
    {
        id: "lineD4_32",
        label: "Санино",
        color: "#4BB287",
        line: "МЦД-4",
    },
    {
        id: "lineD4_33",
        label: "Крёкшино",
        color: "#4BB287",
        line: "МЦД-4"
    },
    {
        id: "lineD4_34",
        label: "Победа",
        color: "#4BB287",
        line: "МЦД-4"
    },
    {
        id: "lineD4_35",
        label: "Апрелевка",
        color: "#4BB287",
        line: "МЦД-4"
    },
    {
        id: "lineD4A_1",
        label: "Солнечная",
        color: "#4BB287",
        line: "МЦД-4А"
    },
    // {
    //     id: "lineD4A_2",
    //     label: "Новопеределкино",
    //     color: "#4BB287",
    //     line: "МЦД-4А"
    // },
]
// export const allStations = [
//     ...greenLine, ...brownLine, ...grayLine,
//     ...lightGreenLine, ...orangeLine, ...redLine,
//     ...darkBlueLine, ...blueLine, ...yellowLine, ...mcdLine, ...darkMagentaLine
// ]

export const allStations = [
    ...allStationsData
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
        return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAABGdBTUEAALGPC/xhBQAABbRJREFUWAnNWXtQVFUY/87d5b28dlEEClshtRFYiHgZ6PIIH2Egj2gaS3rMWBrTjJmZM4k0lY2P/tKGv2rsH8eB0fyjqZEQmKaxf5iSwbCpxB5CKEoSIsLC7fsOe6939967DwaRM7NzzvnO9/id757vPL5lMMtysCgzycEc5SCKmSCyeGAQL4piPKljjPWDCP3ARPyxLqNoPLP7XNfvszHF/BE6VJq2eGKKvcGmYbMIYoo/sgxYjyjA6UCDePTts93XfJX1CeCxGrtp5MbNt6ZF2IWKTb4q1+EbFRgcjrCYj+xo7hjV4ZHJXgF+VGirxE/1qShCrCw1Bw3GYBCXxva97RdOeVIn6A3iemIHitIaAMSWuQZHNmd0ii1kg2zp4dAc+KQmL2T8xthxFKzRE5xLOgZVc7AldOvO5vN33PWqPEizmU9wBIgc4bSpcpjBHXHwd6cb0P073Onz0F/1/RdNYlvfYKfSlgtiHhC05nArUzLNVxuNkulqZeDIn5i2Eh6tDwgcOYE7BncMjsXpFRkg7XP+RCsTBMiufsGrc1OeKgPBaPTKJzEQBsIi9TlAOiGcm7BE91onZeeD/dV6CI9ZrMtrDAqGom07YeWaEl0erQHCQphojAOcdLB6bPt1QmSUVYExMAjyX3xNywanZVbUgslsgfSnq3R5dAZMdKTS2MwnFqFCh1GTbLIsgqScAj5m21AO0fEPq/gCgkMg77mXOH1pehZEJySqeDwR6LyncYFuJf4e/LYNFSAYZnYowWCEgrrtKltZlc9DaGQ0p+NGDBl+epEwETaBX5lU6j0Q0JhtI5+czLSqaD0ssibL/aAwE+TU1sl9aqSu24ST8j1YSIawCfw+Rz0fizUzD6KWJLhwU0SvfZkvGU7Prt4CIeERLjxh0RZYnl/oQvPawbsmAsTLph8lo6xSk3v5k4UQtzIFgk3hkFW1RZMno6xak65LRGxGugnTDulLCY0yw6Or7bqs9lfqof9SDwepxfTI4zkQFZcA/w5c1RpW0xCbgAe1zx5MW/cMGIwBakVOijUzF3Kf3ao7TsGSvlH7C2gJETa83PrqP8D9zLtyQ4D+BAhEGu4ATFDdUbTw0YUAXwmMDWiOuhFpLzM/tNSNCjB89S8VTSIM9/8tNeXaZI7BZbJW7ntsIDYMEnx9+VC0ToPx0RE4sXsbTNwZU2mYnpqClvfehFuD6vnTKeRTQWzoQXwaeikhEZGwoqBYxdXb0coX/PkTn6nGur85A9f7foOfz32tGlv2xGqIiI1T0VUExEafuEs14EZILd2E526gGxXg4rdfcdoPJ4/DrX/uzZM82vn5MT7W4+RRCtO+6VOwIDaBHtVKYa22TSPyRq4Pwp/dM3ObmpyAtqYjsigBvn1ziPfJi9cu/yqPSQ3b+nIMFvm2J5FdasJmaO0bGC6xLqEdVHVvesxeCvQ5UvFO5176f7kIUxN34e7ofzAxdhuG/rgMiRhIRoziLz94B6YdDqB9Mzm3gF/JYhKtLiroOBTxXhUWbYahK+qkAz3097T/+CE/HOnFD9OQ4qIBO5v3HXInyX0rbrr0O9W4Cy51tnJ669GDEJu8AibHZx5ndD570rGm7nUu19txVtYrNTgm7OBWA8BTGpNA0zBRfwGU0cAASKIUCV8EvIHpiAUAjEOg1IiUv5FXKeVKeDriAaMkDIRFgiED5IkczJX4c/RJSuaq5rYRgzKp5HIotl0Z7C1ZFkuHs32ujPqjBz9t49727ialDA8SJQFvEOxAcfpJrOclLyPZpvzMu20/1WKN/rlX5E8skYiBEjkkINHud022nDZdwJFdlQclMOTJj4tt+/Ah3YBSunwS/2xqWnMYFI172i687+45SZ9Xwws2gSnNgBI5kRZzMi7g/UjzmrKV5DzUlALeTzqVSSI9fq8eVArSicOzEPjQ9/ctfV+T6EqQUnu+/ob4Hy2+65vC0ZL/AAAAAElFTkSuQmCC'
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

export const metroLinesWithIds = [
    {
        'id': 'line1',
        'name': 'Сокольническая линия',
        'color': 'e42518',
        'stations': [
            {
                'name': 'Бульвар Рокоссовского',
                'id': 'line1_1',
                'top': 312,
                'left': 868,
            },
            {
                'name': 'Черкизовская',
                'id': 'line1_2',
                'top': 340,
                'left': 868,
            },
            {
                'name': 'Преображенская площадь',
                'id': 'line1_3',
                'top': 369,
                'left': 868,
            },
            {
                'name': 'Сокольники',
                'id': 'line1_4',
                'top': 401,
                'left': 868,
            },
            {
                'name': 'Красносельская',
                'id': 'line1_5',
                'top': 426,
                'left': 868,
            },
            {
                'name': 'Комсомольская',
                'id': 'line1_6',
                'top': 472,
                'left': 834,
            },
            {
                'name': 'Красные ворота',
                'id': 'line1_7',
                'top': 514,
                'left': 792,
            },
            {
                'name': 'Чистые пруды',
                'id': 'line1_8',
                'top': 553,
                'left': 752,
                'labelTop': -4,
                'labelLeft': 6,
            },
            {
                'name': 'Лубянка',
                'id': 'line1_9',
                'top': 594,
                'left': 712,
            },
            {
                'name': 'Охотный Ряд',
                'id': 'line1_10',
                'top': 675,
                'left': 631,
            },
            {
                'name': 'Библиотека им. Ленина',
                'id': 'line1_11',
                'top': 752,
                'left': 553,
            },
            {
                'name': 'Кропоткинская',
                'id': 'line1_12',
                'top': 789,
                'left': 502,
            },
            {
                'name': 'Парк культуры',
                'id': 'line1_13',
                'top': 803,
                'left': 420,
            },
            {
                'name': 'Фрунзенская',
                'id': 'line1_14',
                'top': 830,
                'left': 393,
            },
            {
                'name': 'Спортивная',
                'id': 'line1_15',
                'top': 857,
                'left': 366,
            },
            {
                'name': 'Воробьёвы горы',
                'id': 'line1_16',
                'top': 884,
                'left': 339,
            },
            {
                'name': 'Университет',
                'id': 'line1_17',
                'top': 910,
                'left': 313,
            },
            {
                'name': 'Проспект Вернадского',
                'id': 'line1_18',
                'top': 936,
                'left': 287,
            },
            {
                'name': 'Юго-Западная',
                'id': 'line1_19',
                'top': 964,
                'left': 259,
            },
            {
                'name': 'Тропарёво',
                'id': 'line1_20',
                'top': 992,
                'left': 231,
            },
            {
                'name': 'Румянцево',
                'id': 'line1_21',
                'top': 992,
                'left': 231,
            },
            {
                'name': 'Саларьево',
                'id': 'line1_22',
                'top': 992,
                'left': 231,
            },
            {
                'name': 'Филатов Луг',
                'id': 'line1_23',
                'top': 992,
                'left': 231,
            },
            {
                'name': 'Прокшино',
                'id': 'line1_24',
                'top': 992,
                'left': 231,
            },
            {
                'name': 'Ольховая',
                'id': 'line1_25',
                'top': 992,
                'left': 231,
            },
            {
                'name': 'Коммунарка',
                'id': 'line1_26',
                'top': 992,
                'left': 231,
            },
        ],
    },
    {
        'id': 'line2',
        'name': 'Замоскворецкая линия',
        'color': '4baf4f',
        'stations': [
            {
                'name': 'Ховрино',
                'id': 'line2_1',
                'top': 254,
                'left': 373,
            },
            {
                'name': 'Беломорская',
                'id': 'line2_2',
                'top': 254,
                'left': 373,
            },
            {
                'name': 'Речной вокзал',
                'id': 'line2_3',
                'top': 254,
                'left': 373,
            },
            {
                'name': 'Водный стадион',
                'id': 'line2_4',
                'top': 282,
                'left': 373,
            },
            {
                'name': 'Войковская',
                'id': 'line2_5',
                'top': 311,
                'left': 373,
            },
            {
                'name': 'Сокол',
                'id': 'line2_6',
                'top': 339,
                'left': 373,
            },
            {
                'name': 'Аэропорт',
                'id': 'line2_7',
                'top': 368,
                'left': 373,
            },
            {
                'name': 'Динамо',
                'id': 'line2_8',
                'top': 446,
                'left': 401,
            },
            {
                'name': 'Белорусская',
                'id': 'line2_9',
                'top': 483,
                'left': 438,
            },
            {
                'name': 'Маяковская',
                'id': 'line2_10',
                'top': 554,
                'left': 510,
            },
            {
                'name': 'Тверская',
                'id': 'line2_11',
                'top': 593,
                'left': 548,
            },
            {
                'name': 'Театральная',
                'id': 'line2_12',
                'top': 660,
                'left': 616,
            },
            {
                'name': 'Новокузнецкая',
                'id': 'line2_13',
                'top': 808,
                'left': 744,
            },
            {
                'name': 'Павелецкая',
                'id': 'line2_14',
                'top': 899,
                'left': 744,
            },
            {
                'name': 'Автозаводская',
                'id': 'line2_15',
                'top': 945,
                'left': 743,
            },
            {
                'name': 'Технопарк',
                'id': 'line2_16',
                'top': 945,
                'left': 743,
            },
            {
                'name': 'Коломенская',
                'id': 'line2_17',
                'top': 973,
                'left': 743,
            },
            {
                'name': 'Каширская',
                'id': 'line2_18',
                'top': 1008,
                'left': 743,
            },
            {
                'name': 'Кантемировская',
                'id': 'line2_19',
                'top': 1059,
                'left': 743,
            },
            {
                'name': 'Царицыно',
                'id': 'line2_20',
                'top': 1088,
                'left': 744,
            },
            {
                'name': 'Орехово',
                'id': 'line2_21',
                'top': 1116,
                'left': 744,
            },
            {
                'name': 'Домодедовская',
                'id': 'line2_22',
                'top': 1159,
                'left': 787,
            },
            {
                'name': 'Красногвардейская',
                'id': 'line2_23',
                'top': 1159,
                'left': 881,
            },
            {
                'name': 'Алма-Атинская',
                'id': 'line2_24',
                'top': 1159,
                'left': 881,
            },
        ],
    },
    {
        'id': 'line3',
        'name': 'Арбатско-Покровская линия',
        'color': '0572b9',
        'stations': [
            {
                'name': 'Пятницкое шоссе',
                'id': 'line3_1',
                'top': 339,
                'left': 127,
            },
            {
                'name': 'Митино',
                'id': 'line3_2',
                'top': 339,
                'left': 127,
            },
            {
                'name': 'Волоколамская',
                'id': 'line3_3',
                'top': 368,
                'left': 126,
            },
            {
                'name': 'Мякинино',
                'id': 'line3_4',
                'top': 397,
                'left': 126,
            },
            {
                'name': 'Строгино',
                'id': 'line3_5',
                'top': 425,
                'left': 126,
            },
            {
                'name': 'Крылатское',
                'id': 'line3_6',
                'top': 453,
                'left': 126,
            },
            {
                'name': 'Молодёжная',
                'id': 'line3_7',
                'top': 482,
                'left': 127,
            },
            {
                'name': 'Кунцевская',
                'id': 'line3_8',
                'close': true,
                'top': 511,
                'left': 126,
            },
            {
                'name': 'Славянский бульвар',
                'id': 'line3_9',
                'close': true,
                'top': 722,
                'left': 171,
            },
            {
                'name': 'Парк Победы',
                'id': 'line3_10',
                'top': 722,
                'left': 283,
            },
            {
                'name': 'Киевская',
                'id': 'line3_11',
                'top': 722,
                'left': 386,
            },
            {
                'name': 'Смоленская',
                'id': 'line3_12',
                'top': 723,
                'left': 453,
            },
            {
                'name': 'Арбатская',
                'id': 'line3_13',
                'top': 722,
                'left': 523,
            },
            {
                'name': 'Площадь Революции',
                'id': 'line3_14',
                'top': 689,
                'left': 644,
            },
            {
                'name': 'Курская',
                'id': 'line3_15',
                'top': 624,
                'left': 857,
            },
            {
                'name': 'Бауманская',
                'id': 'line3_16',
                'top': 583,
                'left': 912,
            },
            {
                'name': 'Электрозаводская',
                'id': 'line3_17',
                'top': 556,
                'left': 939,
            },
            {
                'name': 'Семёновская',
                'id': 'line3_18',
                'top': 454,
                'left': 991,
            },
            {
                'name': 'Партизанская',
                'id': 'line3_19',
                'top': 425,
                'left': 990,
            },
            {
                'name': 'Измайловская',
                'id': 'line3_20',
                'top': 400,
                'left': 991,
            },
            {
                'name': 'Первомайская',
                'id': 'line3_21',
                'top': 368,
                'left': 991,
            },
            {
                'name': 'Щёлковская',
                'id': 'line3_22',
                'top': 340,
                'left': 991,
            },
        ],
    },
    {
        'id': 'line4',
        'name': 'Филёвская линия',
        'color': '24bcee',
        'stations': [
            {
                'name': 'Александровский сад',
                'id': 'line4_1',
                'top': 722,
                'left': 553,
            },
            {
                'name': 'Арбатская',
                'id': 'line4_2',
                'top': 707,
                'left': 486,
            },
            {
                'name': 'Смоленская',
                'id': 'line4_3',
                'top': 708,
                'left': 439,
            },
            {
                'name': 'Киевская',
                'id': 'line4_4',
                'top': 708,
                'left': 371,
            },
            {
                'name': 'Студенческая',
                'id': 'line4_7',
                'top': 708,
                'left': 306,
            },
            {
                'name': 'Кутузовская',
                'id': 'line4_8',
                'top': 707,
                'left': 217,
            },
            {
                'name': 'Фили',
                'id': 'line4_9',
                'top': 639,
                'left': 141,
            },
            {
                'name': 'Багратионовская',
                'id': 'line4_10',
                'top': 610,
                'left': 141,
            },
            {
                'name': 'Филевский парк',
                'id': 'line4_11',
                'top': 582,
                'left': 141,
            },
            {
                'name': 'Пионерская',
                'id': 'line4_12',
                'top': 553,
                'left': 141,
            },
            {
                'name': 'Кунцевская',
                'id': 'line4_13',
                'top': 582,
                'left': 141,
            },
        ],
    },
    // Хак, чтобы алгоритму было проще
    {
        'id': 'line4',
        'name': 'Филёвская линия',
        'color': '24bcee',
        'stations': [
            {
                'name': 'Деловой центр',
                'id': 'line4_5',
                'top': 658,
                'left': 276,
            },
            {
                'name': 'Москва-Сити',
                'id': 'line4_6',
                'top': 629,
                'left': 276,
            },
        ],
    },
    {
        'id': 'line5',
        'name': 'Кольцевая линия',
        'color': '925233',
        'isCircle': true,
        'stations': [
            {
                'name': 'Комсомольская',
                'id': 'line5_1',
                'top': 486,
                'left': 819,
                'labelTop': -15,
                'labelLeft': 16,
            },
            {
                'name': 'Курская',
                'id': 'line5_2',
                'top': 625,
                'left': 885,
            },
            {
                'name': 'Таганская',
                'id': 'line5_3',
                'top': 736,
                'left': 874,
            },
            {
                'name': 'Павелецкая',
                'id': 'line5_4',
                'top': 879,
                'left': 744,
            },
            {
                'name': 'Добрынинская',
                'id': 'line5_5',
                'top': 896,
                'left': 590,
            },
            {
                'name': 'Октябрьская',
                'id': 'line5_6',
                'top': 864,
                'left': 510,
            },
            {
                'name': 'Парк культуры',
                'id': 'line5_7',
                'top': 789,
                'left': 434,
            },
            {
                'name': 'Киевская',
                'id': 'line5_8',
                'top': 708,
                'left': 400,
                'labelRight': -6,
                'labelBottom': 5,
            },
            {
                'name': 'Краснопресненская',
                'id': 'line5_9',
                'top': 608,
                'left': 399,
                'labelTop': 4,
                'labelLeft': 2,
            },
            {
                'name': 'Белорусская',
                'id': 'line5_10',
                'top': 497,
                'left': 452,
                'labelTop': -12,
                'labelLeft': 10,
            },
            {
                'name': 'Новослободская',
                'id': 'line5_11',
                'top': 429,
                'left': 542,
                'labelTop': 8,
                'labelLeft': 1,
            },
            {
                'name': 'Проспект Мира',
                'id': 'line5_12',
                'top': 413,
                'left': 686,
                'labelTop': -20,
                'labelLeft': 16,
            },
        ],
    },
    {
        'id': 'line6',
        'name': 'Калужско-Рижская линия',
        'color': 'ef7e24',
        'stations': [
            {
                'name': 'Медведково',
                'id': 'line6_1',
                'top': 168,
                'left': 744,
            },
            {
                'name': 'Бабушкинская',
                'id': 'line6_2',
                'top': 196,
                'left': 744,
            },
            {
                'name': 'Свиблово',
                'id': 'line6_3',
                'top': 225,
                'left': 744,
            },
            {
                'name': 'Ботанический сад',
                'id': 'line6_4',
                'top': 254,
                'left': 744,
            },
            {
                'name': 'ВДНХ',
                'id': 'line6_5',
                'top': 282,
                'left': 744,
            },
            {
                'name': 'Алексеевская',
                'id': 'line6_6',
                'top': 311,
                'left': 744,
            },
            {
                'name': 'Рижская',
                'id': 'line6_7',
                'top': 339,
                'left': 744,
            },
            {
                'name': 'Проспект Мира',
                'id': 'line6_8',
                'top': 398,
                'left': 700,
            },
            {
                'name': 'Сухаревская',
                'id': 'line6_9',
                'top': 458,
                'left': 685,
            },
            {
                'name': 'Тургеневская',
                'id': 'line6_10',
                'top': 553,
                'left': 732,
            },
            {
                'name': 'Китай-город',
                'id': 'line6_11',
                'top': 677,
                'left': 836,
            },
            {
                'name': 'Третьяковская',
                'id': 'line6_12',
                'top': 789,
                'left': 764,
            },
            {
                'name': 'Октябрьская',
                'id': 'line6_13',
                'top': 878,
                'left': 495,
            },
            {
                'name': 'Шаболовская',
                'id': 'line6_14',
                'top': 916,
                'left': 466,
            },
            {
                'name': 'Ленинский проспект',
                'id': 'line6_15',
                'top': 945,
                'left': 465,
            },
            {
                'name': 'Академическая',
                'id': 'line6_16',
                'top': 973,
                'left': 466,
            },
            {
                'name': 'Профсоюзная',
                'id': 'line6_17',
                'top': 1002,
                'left': 466,
            },
            {
                'name': 'Новые Черёмушки',
                'id': 'line6_18',
                'top': 1031,
                'left': 466,
            },
            {
                'name': 'Калужская',
                'id': 'line6_19',
                'top': 1059,
                'left': 465,
            },
            {
                'name': 'Беляево',
                'id': 'line6_20',
                'top': 1088,
                'left': 465,
            },
            {
                'name': 'Коньково',
                'id': 'line6_21',
                'top': 1116,
                'left': 466,
            },
            {
                'name': 'Тёплый стан',
                'id': 'line6_22',
                'top': 1145,
                'left': 466,
            },
            {
                'name': 'Ясенево',
                'id': 'line6_23',
                'top': 1173,
                'left': 466,
            },
            {
                'name': 'Новоясеневская',
                'id': 'line6_24',
                'top': 1216,
                'left': 449,
            },
        ],
    },
    {
        'id': 'line7',
        'name': 'Таганско-Краснопресненская линия',
        'color': '943f90',
        'stations': [
            {
                'name': 'Планерная',
                'id': 'line7_1',
                'top': 282,
                'left': 249,
            },
            {
                'name': 'Сходненская',
                'id': 'line7_2',
                'top': 311,
                'left': 250,
            },
            {
                'name': 'Тушинская',
                'id': 'line7_3',
                'top': 340,
                'left': 250,
            },
            {
                'name': 'Спартак',
                'id': 'line7_4',
                'top': 340,
                'left': 250,
            },
            {
                'name': 'Щукинская',
                'id': 'line7_5',
                'top': 396,
                'left': 250,
            },
            {
                'name': 'Октябрьское поле',
                'id': 'line7_6',
                'top': 425,
                'left': 250,
            },
            {
                'name': 'Полежаевская',
                'id': 'line7_7',
                'top': 501,
                'left': 292,
            },
            {
                'name': 'Беговая',
                'id': 'line7_8',
                'top': 526,
                'left': 318,
            },
            {
                'name': 'Улица 1905 года',
                'id': 'line7_9',
                'top': 552,
                'left': 346,
            },
            {
                'name': 'Баррикадная',
                'id': 'line7_10',
                'top': 594,
                'left': 384,
            },
            {
                'name': 'Пушкинская',
                'id': 'line7_11',
                'top': 608,
                'left': 563,
            },
            {
                'name': 'Кузнецкий мост',
                'id': 'line7_12',
                'top': 608,
                'left': 725,
            },
            {
                'name': 'Китай-город',
                'id': 'line7_13',
                'top': 662,
                'left': 821,
            },
            {
                'name': 'Таганская',
                'id': 'line7_14',
                'top': 735,
                'left': 853,
            },
            {
                'name': 'Пролетарская',
                'id': 'line7_15',
                'top': 824,
                'left': 942,
            },
            {
                'name': 'Волгоградский проспект',
                'id': 'line7_16',
                'top': 888,
                'left': 991,
            },
            {
                'name': 'Текстильщики',
                'id': 'line7_17',
                'top': 917,
                'left': 991,
            },
            {
                'name': 'Кузьминки',
                'id': 'line7_18',
                'top': 945,
                'left': 991,
            },
            {
                'name': 'Рязанский проспект',
                'id': 'line7_19',
                'top': 974,
                'left': 990,
            },
            {
                'name': 'Выхино',
                'id': 'line7_20',
                'top': 1002,
                'left': 991,
            },
            {
                'name': 'Лермонтовский проспект',
                'id': 'line7_21',
                'top': 1002,
                'left': 991,
            },
            {
                'name': 'Жулебино',
                'id': 'line7_22',
                'top': 1002,
                'left': 991,
            },
            {
                'name': 'Котельники',
                'id': 'line7_23',
                'top': 1072,
                'left': 991,
            },
        ],
    },
    {
        'id': 'line8',
        'name': 'Калининская линия',
        'color': 'FFCD1E',
        'stations': [
            {
                'name': 'Новокосино',
                'id': 'line8_1',
                'top': 583,
                'left': 1059,
            },
            {
                'name': 'Новогиреево',
                'id': 'line8_2',
                'top': 583,
                'left': 1059,
            },
            {
                'name': 'Перово',
                'id': 'line8_3',
                'top': 609,
                'left': 1032,
            },
            {
                'name': 'Шоссе Энтузиастов',
                'id': 'line8_4',
                'top': 637,
                'left': 1005,
            },
            {
                'name': 'Авиамоторная',
                'id': 'line8_5',
                'top': 664,
                'left': 978,
            },
            {
                'name': 'Площадь Ильича',
                'id': 'line8_6',
                'top': 715,
                'left': 927,
            },
            {
                'name': 'Марксистская',
                'id': 'line8_7',
                'top': 715,
                'left': 853,
            },
            {
                'name': 'Третьяковская',
                'id': 'line8_8',
                'top': 789,
                'left': 744,
            },
        ],
    },
    {
        'id': 'line8A',
        'name': 'Солнцевская линия',
        'color': 'FFCD1E',
        'stations': [
            { 'name': 'Деловой центр', 'id': 'line8A_1', 'top': 460, 'left': 420 },
            {
                'name': 'Парк Победы',
                'id': 'line8A_2',
                'top': 789,
                'left': 744,
            },
            {
                'name': 'Минская',
                'id': 'line8A_3',
                'top': 789,
                'left': 744,
            },
            {
                'name': 'Ломоносовский проспект',
                'id': 'line8A_4',
                'top': 789,
                'left': 744,
            },
            {
                'name': 'Раменки',
                'id': 'line8A_5',
                'top': 789,
                'left': 744,
            },
            {
                'name': 'Мичуринский проспект',
                'id': 'line8A_6',
                'top': 789,
                'left': 744,
            },
            {
                'name': 'Озёрная',
                'id': 'line8A_7',
                'top': 789,
                'left': 744,
            },
            {
                'name': 'Говорово',
                'id': 'line8A_8',
                'top': 789,
                'left': 744,
            },
            {
                'name': 'Солнцево',
                'id': 'line8A_9',
                'top': 789,
                'left': 744,
            },
            {
                'name': 'Боровское шоссе',
                'id': 'line8A_10',
                'top': 789,
                'left': 744,
            },
            {
                'name': 'Новопеределкино',
                'id': 'line8A_11',
                'top': 789,
                'left': 744,
            },
            {
                'name': 'Рассказовка',
                'id': 'line8A_12',
                'top': 789,
                'left': 744,
            },
            {
                'name': 'Пыхтино',
                'id': 'line8A_13',
                'top': 789,
                'left': 744,
            },
            {
                'name': 'Аэропорт Внуково',
                'id': 'line8A_14',
                'top': 789,
                'left': 744,
            },
        ],
    },
    {
        'id': 'line9',
        'name': 'Серпуховско-Тимирязевская линия',
        'color': 'adacac',
        'stations': [
            {
                'name': 'Алтуфьево',
                'id': 'line9_1',
                'top': 140,
                'left': 496,
            },
            {
                'name': 'Бибирево',
                'id': 'line9_2',
                'top': 168,
                'left': 496,
            },
            {
                'name': 'Отрадное',
                'id': 'line9_3',
                'top': 197,
                'left': 497,
            },
            {
                'name': 'Владыкино',
                'id': 'line9_4',
                'top': 225,
                'left': 497,
            },
            {
                'name': 'Петровско-Разумовская',
                'id': 'line9_5',
                'top': 253,
                'left': 497,
            },
            {
                'name': 'Тимирязевская',
                'id': 'line9_6',
                'top': 282,
                'left': 496,
            },
            {
                'name': 'Дмитровская',
                'id': 'line9_7',
                'top': 310,
                'left': 496,
            },
            {
                'name': 'Савёловская',
                'id': 'line9_8',
                'top': 339,
                'left': 497,
            },
            {
                'name': 'Менделеевская',
                'id': 'line9_9',
                'top': 415,
                'left': 527,
            },
            {
                'name': 'Цветной бульвар',
                'id': 'line9_10',
                'top': 508,
                'left': 620,
            },
            {
                'name': 'Чеховская',
                'id': 'line9_11',
                'top': 593,
                'left': 577,
            },
            {
                'name': 'Боровицкая',
                'id': 'line9_12',
                'top': 752,
                'left': 523,
            },
            {
                'name': 'Полянка',
                'id': 'line9_13',
                'top': 845,
                'left': 589,
            },
            {
                'name': 'Серпуховская',
                'id': 'line9_14',
                'top': 916,
                'left': 589,
            },
            {
                'name': 'Тульская',
                'id': 'line9_15',
                'top': 945,
                'left': 589,
            },
            {
                'name': 'Нагатинская',
                'id': 'line9_16',
                'top': 973,
                'left': 589,
            },
            {
                'name': 'Нагорная',
                'id': 'line9_17',
                'top': 1002,
                'left': 589,
            },
            {
                'name': 'Нахимовский проспект',
                'id': 'line9_18',
                'top': 1030,
                'left': 589,
            },
            {
                'name': 'Севастопольская',
                'id': 'line9_19',
                'top': 1082,
                'left': 589,
            },
            {
                'name': 'Чертановская',
                'id': 'line9_20',
                'top': 1116,
                'left': 589,
            },
            {
                'name': 'Южная',
                'id': 'line9_21',
                'top': 1145,
                'left': 589,
            },
            {
                'name': 'Пражская',
                'id': 'line9_22',
                'top': 1173,
                'left': 589,
            },
            {
                'name': 'Улица академика Янгеля',
                'id': 'line9_23',
                'top': 1202,
                'left': 589,
            },
            {
                'name': 'Аннино',
                'id': 'line9_24',
                'top': 1230,
                'left': 589,
            },
            {
                'name': 'Бульвар Дмитрия Донского',
                'id': 'line9_25',
                'top': 1259,
                'left': 590,
            },
        ],
    },
    {
        'id': 'line10',
        'name': 'Люблинско-Дмитровская линия',
        'color': 'BED12E',
        'stations': [
            {
                'name': 'Физтех',
                'id': 'line10_1',
                'top': 1059,
                'left': 867,
            },
            {
                'name': 'Лианозово',
                'id': 'line10_2',
                'top': 1059,
                'left': 867,
            },
            {
                'name': 'Яхромская',
                'id': 'line10_3',
                'top': 1059,
                'left': 867,
            },
            {
                'name': 'Селигерская',
                'id': 'line10_4',
                'top': 1059,
                'left': 867,
            },
            {
                'name': 'Верхние Лихоборы',
                'id': 'line10_5',
                'top': 1059,
                'left': 867,
            },
            {
                'name': 'Окружная',
                'id': 'line10_6',
                'top': 1059,
                'left': 867,
            },
            {
                'name': 'Петровско-Разумовская',
                'id': 'line10_7',
                'top': 1059,
                'left': 867,
            },
            {
                'name': 'Фонвизинская',
                'id': 'line10_8',
                'top': 1059,
                'left': 867,
            },
            {
                'name': 'Бутырская',
                'id': 'line10_9',
                'top': 1059,
                'left': 867,
            },
            {
                'name': 'Марьина Роща',
                'id': 'line10_10',
                'top': 339,
                'left': 620,
            },
            {
                'name': 'Достоевская',
                'id': 'line10_11',
                'top': 368,
                'left': 620,
            },
            {
                'name': 'Трубная',
                'id': 'line10_12',
                'top': 487,
                'left': 620,
            },
            {
                'name': 'Сретенский бульвар',
                'id': 'line10_13',
                'top': 533,
                'left': 732,
            },
            {
                'name': 'Чкаловская',
                'id': 'line10_14',
                'top': 639,
                'left': 871,
            },
            {
                'name': 'Римская',
                'id': 'line10_15',
                'top': 715,
                'left': 947,
            },
            {
                'name': 'Крестьянская застава',
                'id': 'line10_16',
                'top': 809,
                'left': 956,
            },
            {
                'name': 'Дубровка',
                'id': 'line10_17',
                'top': 854,
                'left': 911,
            },
            {
                'name': 'Кожуховская',
                'id': 'line10_18',
                'top': 881,
                'left': 884,
            },
            {
                'name': 'Печатники',
                'id': 'line10_19',
                'top': 945,
                'left': 867,
            },
            {
                'name': 'Волжская',
                'id': 'line10_20',
                'top': 973,
                'left': 867,
            },
            {
                'name': 'Люблино',
                'id': 'line10_21',
                'top': 1002,
                'left': 867,
            },
            {
                'name': 'Братиславская',
                'id': 'line10_22',
                'top': 1030,
                'left': 867,
            },
            {
                'name': 'Марьино',
                'id': 'line10_23',
                'top': 1059,
                'left': 867,
            },
            {
                'name': 'Борисово',
                'id': 'line10_24',
                'top': 1059,
                'left': 867,
            },
            {
                'name': 'Шипиловская',
                'id': 'line10_25',
                'top': 1059,
                'left': 867,
            },
            {
                'name': 'Зябликово',
                'id': 'line10_26',
                'top': 1059,
                'left': 867,
            },
        ],
    },
    {
        'id': 'line11',
        'name': 'Большая Кольцевая линия',
        'color': '89CDCF',
        'stations': [
            {
                'name': 'Савёловская',
                'id': 'line11_1',
                'top': 1059,
                'left': 867,
            },
            {
                'name': 'Петровский парк',
                'id': 'line11_2',
                'top': 1059,
                'left': 867,
            },
            {
                'name': 'ЦСКА',
                'id': 'line11_3',
                'top': 1059,
                'left': 867,
            },
            {
                'name': 'Хорошёвская',
                'id': 'line11_4',
                'top': 1059,
                'left': 867,
            },
            {
                'name': 'Шелепиха',
                'id': 'line11_5',
                'top': 1059,
                'left': 867,
            },
            {
                'name': 'Деловой центр',
                'id': 'line11_6',
                'top': 1059,
                'left': 867,
            },
            {
                'name': 'Народное Ополчение',
                'id': 'line11_7',
                'top': 339,
                'left': 620,
            },
            {
                'name': 'Мнёвники',
                'id': 'line11_8',
                'top': 368,
                'left': 620,
            },
            {
                'name': 'Терехово',
                'id': 'line11_9',
                'top': 487,
                'left': 620,
            },
            {
                'name': 'Кунцевская',
                'id': 'line11_10',
                'top': 533,
                'left': 732,
            },
            {
                'name': 'Давыдково',
                'id': 'line11_11',
                'top': 639,
                'left': 871,
            },
            {
                'name': 'Аминьевская',
                'id': 'line11_12',
                'top': 715,
                'left': 947,
            },
            {
                'name': 'Мичуринский проспект',
                'id': 'line11_13',
                'top': 809,
                'left': 956,
            },
            {
                'name': 'Проспект Вернадского',
                'id': 'line11_14',
                'top': 854,
                'left': 911,
            },
            {
                'name': 'Новаторская',
                'id': 'line11_15',
                'top': 881,
                'left': 884,
            },
            {
                'name': 'Воронцовская',
                'id': 'line11_16',
                'top': 945,
                'left': 867,
            },
            {
                'name': 'Зюзино',
                'id': 'line11_17',
                'top': 973,
                'left': 867,
            },
            {
                'name': 'Каховская',
                'id': 'line11_18',
                'top': 1002,
                'left': 867,
            },
            {
                'name': 'Варшавская',
                'id': 'line11_19',
                'top': 1030,
                'left': 867,
            },
            {
                'name': 'Каширская',
                'id': 'line11_20',
                'top': 1059,
                'left': 867,
            },
            {
                'name': 'Кленовый бульвар',
                'id': 'line11_21',
                'top': 1059,
                'left': 867,
            },
            {
                'name': 'Нагатинский затон',
                'id': 'line11_22',
                'top': 1059,
                'left': 867,
            },
            {
                'name': 'Печатники',
                'id': 'line11_23',
                'top': 1059,
                'left': 867,
            },
            {
                'name': 'Текстильщики',
                'id': 'line11_24',
                'top': 1002,
                'left': 867,
            },
            {
                'name': 'Нижегородская',
                'id': 'line11_25',
                'top': 1030,
                'left': 867,
            },
            {
                'name': 'Авиамоторная',
                'id': 'line11_26',
                'top': 1059,
                'left': 867,
            },
            {
                'name': 'Лефортово',
                'id': 'line11_27',
                'top': 1059,
                'left': 867,
            },
            {
                'name': 'Электрозаводская',
                'id': 'line11_28',
                'top': 1059,
                'left': 867,
            },
            {
                'name': 'Сокольники',
                'id': 'line11_29',
                'top': 1059,
                'left': 867,
            },
            {
                'name': 'Рижская',
                'id': 'line11_30',
                'top': 1059,
                'left': 867,
            },
            {
                'name': 'Марьина Роща',
                'id': 'line11_31',
                'top': 1059,
                'left': 867,
            },
        ],
    },
    {
        'id': 'line12',
        'name': 'Бутовская линия',
        'color': 'BAC8E8',
        'stations': [
            {
                'name': 'Битцевский парк',
                'id': 'line12_1',
                'top': 1273,
                'left': 575,
            },
            {
                'name': 'Лесопарковая',
                'id': 'line12_2',
                'top': 1273,
                'left': 575,
            },
            {
                'name': 'Улица Старокачаловская',
                'id': 'line12_3',
                'top': 1273,
                'left': 575,
            },
            {
                'name': 'Улица Скобелевская',
                'id': 'line12_4',
                'top': 1330,
                'left': 489,
            },
            {
                'name': 'Бульвар адмирала Ушакова',
                'id': 'line12_5',
                'top': 1330,
                'left': 430,
            },
            {
                'name': 'Улица Горчакова',
                'id': 'line12_6',
                'top': 1330,
                'left': 375,
            },
            {
                'name': 'Бунинская аллея',
                'id': 'line12_7',
                'top': 1330,
                'left': 318,
            },
        ],
    },
    {
        'id': 'line14',
        'name': 'МЦК',
        'isMCC': true,
        'color': 'ffcec6',
        'stations': [
            {
                'name': 'Бульвар Рокоссовского',
                'id': 'line14_1',
                'top': 1273,
                'left': 575,
            },
            {
                'name': 'Локомотив',
                'id': 'line14_2',
                'top': 1273,
                'left': 575,
            },
            {
                'name': 'Измайлово',
                'id': 'line14_3',
                'top': 1273,
                'left': 575,
            },
            {
                'name': 'Соколиная Гора',
                'id': 'line14_4',
                'top': 1273,
                'left': 575,
            },
            {
                'name': 'Шоссе Энтузиастов',
                'id': 'line14_5',
                'top': 1273,
                'left': 575,
            },
            {
                'name': 'Андроновка',
                'id': 'line14_6',
                'top': 1273,
                'left': 575,
            },
            {
                'name': 'Нижегородская',
                'id': 'line14_7',
                'top': 1273,
                'left': 575,
            },
            {
                'name': 'Новохохловская',
                'id': 'line14_8',
                'top': 1273,
                'left': 575,
            },
            {
                'name': 'Угрешская',
                'id': 'line14_9',
                'top': 1273,
                'left': 575,
            },
            {
                'name': 'Дубровка',
                'id': 'line14_10',
                'top': 1273,
                'left': 575,
            },
            {
                'name': 'Автозаводская',
                'id': 'line14_11',
                'top': 1273,
                'left': 575,
            },
            {
                'name': 'ЗИЛ',
                'id': 'line14_12',
                'top': 1273,
                'left': 575,
            },
            {
                'name': 'Верхние Котлы',
                'id': 'line14_13',
                'top': 1273,
                'left': 575,
            },
            {
                'name': 'Крымская',
                'id': 'line14_14',
                'top': 1273,
                'left': 575,
            },
            {
                'name': 'Площадь Гагарина',
                'id': 'line14_15',
                'top': 1273,
                'left': 575,
            },
            {
                'name': 'Лужники',
                'id': 'line14_16',
                'top': 1273,
                'left': 575,
            },
            {
                'name': 'Кутузовская',
                'id': 'line14_17',
                'top': 1273,
                'left': 575,
            },
            {
                'name': 'Москва-Сити',
                'id': 'line14_18',
                'top': 1273,
                'left': 575,
            },
            {
                'name': 'Шелепиха',
                'id': 'line14_19',
                'top': 1273,
                'left': 575,
            },
            {
                'name': 'Хорошево',
                'id': 'line14_20',
                'top': 1273,
                'left': 575,
            },
            {
                'name': 'Зорге',
                'id': 'line14_21',
                'top': 1273,
                'left': 575,
            },
            {
                'name': 'Панфиловская',
                'id': 'line14_22',
                'top': 1273,
                'left': 575,
            },
            {
                'name': 'Стрешнево',
                'id': 'line14_23',
                'top': 1273,
                'left': 575,
            },
            {
                'name': 'Балтийская',
                'id': 'line14_24',
                'top': 1273,
                'left': 575,
            },
            {
                'name': 'Коптево',
                'id': 'line14_25',
                'top': 1273,
                'left': 575,
            },
            {
                'name': 'Лихоборы',
                'id': 'line14_26',
                'top': 1273,
                'left': 575,
            },
            {
                'name': 'Окружная',
                'id': 'line14_27',
                'top': 1273,
                'left': 575,
            },
            {
                'name': 'Владыкино',
                'id': 'line14_28',
                'top': 1273,
                'left': 575,
            },
            {
                'name': 'Ботанический сад',
                'id': 'line14_29',
                'top': 1273,
                'left': 575,
            },
            {
                'name': 'Ростокино',
                'id': 'line14_30',
                'top': 1273,
                'left': 575,
            },
            {
                'name': 'Белокаменная',
                'id': 'line14_31',
                'top': 1273,
                'left': 575,
            },
        ],
    },
    {
        'id': 'line15',
        'name': 'Некрасовская линия',
        'color': 'd68ab1',
        'stations': [
            {
                'name': 'Нижегородская',
                'id': 'line15_1',
                'top': 1273,
                'left': 575,
            },
            {
                'name': 'Стахановская',
                'id': 'line15_2',
                'top': 1273,
                'left': 575,
            },
            {
                'name': 'Окская',
                'id': 'line15_3',
                'top': 1330,
                'left': 489,
            },
            {
                'name': 'Юго-Восточная',
                'id': 'line15_4',
                'top': 1330,
                'left': 489,
            },
            {
                'name': 'Косино',
                'id': 'line15_5',
                'top': 1273,
                'left': 575,
            },
            {
                'name': 'Улица Дмитриевского',
                'id': 'line15_6',
                'top': 1273,
                'left': 575,
            },
            {
                'name': 'Лухмановская',
                'id': 'line15_7',
                'top': 1273,
                'left': 575,
            },
            {
                'name': 'Некрасовка',
                'id': 'line15_8',
                'top': 1330,
                'left': 489,
            },
        ],
    },
    {
        'id': 'lineD1',
        'name': 'МЦД-1',
        'isMCD': true,
        'color': 'f7a600',
        'stations': [
            {
                'name': 'Лобня',
                'id': 'lineD1_1',
                'outside': true,
                'top': 1059,
                'left': 867,
            },
            {
                'name': 'Шереметьевская',
                'id': 'lineD1_2',
                'outside': true,
                'top': 1059,
                'left': 867,
            },
            {
                'name': 'Хлебниково',
                'id': 'lineD1_3',
                'outside': true,
                'top': 1059,
                'left': 867,
            },
            {
                'name': 'Водники',
                'id': 'lineD1_4',
                'outside': true,
                'top': 1059,
                'left': 867,
            },
            {
                'name': 'Долгопрудная',
                'id': 'lineD1_5',
                'outside': true,
                'top': 1059,
                'left': 867,
            },
            {
                'name': 'Новодачная',
                'id': 'lineD1_6',
                'outside': true,
                'top': 1059,
                'left': 867,
            },
            {
                'name': 'Марк',
                'id': 'lineD1_7',
                'top': 339,
                'left': 620,
            },
            {
                'name': 'Лианозово',
                'id': 'lineD1_8',
                'top': 368,
                'left': 620,
            },
            {
                'name': 'Илимская',
                'id': 'lineD1_9',
                'close': true,
                'top': 487,
                'left': 620,
            },
            {
                'name': 'Бескудниково',
                'id': 'lineD1_10',
                'top': 533,
                'left': 732,
            },
            {
                'name': 'Дегунино',
                'id': 'lineD1_11',
                'top': 639,
                'left': 871,
            },
            {
                'name': 'Окружная',
                'id': 'lineD1_12',
                'top': 715,
                'left': 947,
            },
            {
                'name': 'Петровско-Разумовская',
                'id': 'lineD1_13',
                'close': true,
                'top': 809,
                'left': 956,
            },
            {
                'name': 'Тимирязевская',
                'id': 'lineD1_14',
                'top': 854,
                'left': 911,
            },
            {
                'name': 'Дмитровская',
                'id': 'lineD1_15',
                'close': true,
                'top': 881,
                'left': 884,
            },
            {
                'name': 'Савёловская',
                'id': 'lineD1_16',
                'top': 945,
                'left': 867,
            },
            {
                'name': 'Белорусская',
                'id': 'lineD1_17',
                'top': 973,
                'left': 867,
            },
            {
                'name': 'Беговая',
                'id': 'lineD1_18',
                'top': 1002,
                'left': 867,
            },
            {
                'name': 'Тестовская (Москва-Сити)',
                'id': 'lineD1_19',
                'top': 1030,
                'left': 867,
            },
            {
                'name': 'Фили',
                'id': 'lineD1_20',
                'top': 1059,
                'left': 867,
            },
            {
                'name': 'Славянский бульвар',
                'id': 'lineD1_21',
                'top': 1059,
                'left': 867,
            },
            {
                'name': 'Кунцевская',
                'id': 'lineD1_22',
                'top': 1059,
                'left': 867,
            },
            {
                'name': 'Рабочий поселок',
                'id': 'lineD1_23',
                'top': 1059,
                'left': 867,
            },
            {
                'name': 'Сетунь',
                'id': 'lineD1_24',
                'top': 1059,
                'left': 867,
            },
            {
                'name': 'Немчиновка',
                'id': 'lineD1_25',
                'outside': true,
                'top': 1059,
                'left': 867,
            },
            {
                'name': 'Сколково',
                'id': 'lineD1_26',
                'outside': true,
                'top': 1059,
                'left': 867,
            },
            {
                'name': 'Баковка',
                'id': 'lineD1_27',
                'outside': true,
                'top': 1059,
                'left': 867,
            },
            {
                'name': 'Одинцово',
                'id': 'lineD1_28',
                'outside': true,
                'top': 1059,
                'left': 867,
            },
        ],
    },

    {
        'id': 'lineD2',
        'name': 'МЦД-2',
        'isMCD': true,
        'color': 'e94282',
        'stations': [
            {
                'name': 'Нахабино',
                'id': 'lineD2_1',
                'outside': true,
                'top': 1059,
                'left': 867,
            },
            {
                'name': 'Аникеевка',
                'id': 'lineD2_2',
                'outside': true,
                'top': 1059,
                'left': 867,
            },
            {
                'name': 'Опалиха',
                'id': 'lineD2_3',
                'outside': true,
                'top': 1059,
                'left': 867,
            },
            {
                'name': 'Красногорская',
                'id': 'lineD2_4',
                'outside': true,
                'top': 1059,
                'left': 867,
            },
            {
                'name': 'Павшино',
                'id': 'lineD2_5',
                'outside': true,
                'top': 1059,
                'left': 867,
            },
            {
                'name': 'Пенягино',
                'id': 'lineD2_6',
                'outside': true,
                'top': 1059,
                'left': 867,
            },
            {
                'name': 'Волоколамская',
                'id': 'lineD2_7',
                'top': 339,
                'left': 620,
            },
            {
                'name': 'Трикотажная',
                'id': 'lineD2_8',
                'top': 368,
                'left': 620,
            },
            {
                'name': 'Тушинская',
                'id': 'lineD2_9',
                'top': 487,
                'left': 620,
            },
            {
                'name': 'Щукинская',
                'id': 'lineD2_10',
                'top': 533,
                'left': 732,
            },
            {
                'name': 'Стрешнево',
                'id': 'lineD2_11',
                'top': 639,
                'left': 871,
            },
            {
                'name': 'Красный балтиец',
                'id': 'lineD2_12',
                'top': 715,
                'left': 947,
            },
            {
                'name': 'Гражданская',
                'id': 'lineD2_13',
                'top': 809,
                'left': 956,
            },
            {
                'name': 'Дмитровская',
                'id': 'lineD2_14',
                'top': 854,
                'left': 911,
            },
            {
                'name': 'Марьина Роща',
                'id': 'lineD2_15',
                'top': 881,
                'left': 884,
            },
            {
                'name': 'Рижская',
                'id': 'lineD2_16',
                'top': 945,
                'left': 867,
            },
            {
                'name': 'Площадь трёх вокзалов',
                'id': 'lineD2_17',
                'top': 973,
                'left': 867,
            },
            {
                'name': 'Курская',
                'id': 'lineD2_18',
                'top': 1002,
                'left': 867,
            },
            {
                'name': 'Москва Товарная',
                'id': 'lineD2_19',
                'top': 1030,
                'left': 867,
            },
            {
                'name': 'Калитники',
                'id': 'lineD2_20',
                'top': 1059,
                'left': 867,
            },
            {
                'name': 'Новохохловская',
                'id': 'lineD2_21',
                'top': 1059,
                'left': 867,
            },
            {
                'name': 'Текстильщики',
                'id': 'lineD2_22',
                'top': 1059,
                'left': 867,
            },
            {
                'name': 'Печатники',
                'id': 'lineD2_23',
                'top': 1059,
                'left': 867,
            },
            {
                'name': 'Люблино',
                'id': 'lineD2_24',
                'top': 1059,
                'left': 867,
            },
            {
                'name': 'Депо',
                'id': 'lineD2_25',
                'top': 1059,
                'left': 867,
            },
            {
                'name': 'Перерва',
                'id': 'lineD2_26',
                'top': 1059,
                'left': 867,
            },
            {
                'name': 'Курьяново',
                'id': 'lineD2_27',
                'close': true,
                'top': 1059,
                'left': 867,
            },
            {
                'name': 'Москворечье',
                'id': 'lineD2_28',
                'top': 1059,
                'left': 867,
            },
            {
                'name': 'Царицыно',
                'id': 'lineD2_29',
                'top': 1059,
                'left': 867,
            },
            {
                'name': 'Котляково',
                'id': 'lineD2_30',
                'close': true,
                'top': 1059,
                'left': 867,
            },
            {
                'name': 'Покровское',
                'id': 'lineD2_31',
                'top': 1059,
                'left': 867,
            },
            {
                'name': 'Красный строитель',
                'id': 'lineD2_32',
                'top': 1059,
                'left': 867,
            },
            {
                'name': 'Битца',
                'id': 'lineD2_33',
                'top': 1059,
                'left': 867,
            },
            {
                'name': 'Бутово',
                'id': 'lineD2_34',
                'top': 1059,
                'left': 867,
            },
            {
                'name': 'Щербинка',
                'id': 'lineD2_35',
                'top': 1059,
                'left': 867,
            },
            {
                'name': 'Остафьево',
                'id': 'lineD2_36',
                'top': 1059,
                'left': 867,
            },
            {
                'name': 'Силикатная',
                'id': 'lineD2_37',
                'outside': true,
                'top': 1059,
                'left': 867,
            },
            {
                'name': 'Подольск',
                'id': 'lineD2_38',
                'outside': true,
                'top': 1059,
                'left': 867,
            },
        ],
    },
    {
        'id': 'lineD3',
        'name': 'МЦД-3',
        'isMCD': true,
        'color': 'EA5B0C',
        'stations': [
            {
                'name': 'Зеленоград-Крюково',
                'id': 'lineD3_1',
                'outside': true,
                'top': 1059,
                'left': 867,
            },
            {
                'name': 'Фирсановская',
                'id': 'lineD3_2',
                'outside': true,
                'top': 1059,
                'left': 867,
            },
            {
                'name': 'Сходня',
                'id': 'lineD3_3',
                'outside': true,
                'top': 1059,
                'left': 867,
            },
            {
                'name': 'Подрезково',
                'id': 'lineD3_4',
                'outside': true,
                'top': 1059,
                'left': 867,
            },
            {
                'name': 'Новоподрезково',
                'id': 'lineD3_5',
                'outside': true,
                'top': 1059,
                'left': 867,
            },
            {
                'name': 'Молжаниново',
                'id': 'lineD3_6',
                'outside': true,
                'top': 1059,
                'left': 867,
            },
            {
                'name': 'Химки',
                'id': 'lineD3_7',
                'top': 339,
                'left': 620,
            },
            {
                'name': 'Левобережная',
                'id': 'lineD3_8',
                'top': 368,
                'left': 620,
            },
            {
                'name': 'Ховрино',
                'id': 'lineD3_9',
                'top': 487,
                'left': 620,
            },
            {
                'name': 'Грачёвская',
                'id': 'lineD3_10',
                'top': 533,
                'left': 732,
            },
            {
                'name': 'Моссельмаш',
                'id': 'lineD3_11',
                'top': 639,
                'left': 871,
            },
            {
                'name': 'Лихоборы',
                'id': 'lineD3_12',
                'top': 715,
                'left': 947,
            },
            {
                'name': 'Петровско-Разумовская',
                'id': 'lineD3_13',
                'top': 809,
                'left': 956,
            },
            {
                'name': 'Останкино',
                'id': 'lineD3_14',
                'top': 854,
                'left': 911,
            },
            {
                'name': 'Электрозаводская',
                'id': 'lineD3_15',
                'top': 881,
                'left': 884,
            },
            {
                'name': 'Сортировочная',
                'id': 'lineD3_16',
                'top': 945,
                'left': 867,
            },
            {
                'name': 'Авиамоторная',
                'id': 'lineD3_17',
                'top': 973,
                'left': 867,
            },
            {
                'name': 'Андроновка',
                'id': 'lineD3_18',
                'top': 1002,
                'left': 867,
            },
            {
                'name': 'Перово',
                'id': 'lineD3_19',
                'top': 1030,
                'left': 867,
            },
            {
                'name': 'Плющево',
                'id': 'lineD3_20',
                'top': 1059,
                'left': 867,
            },
            {
                'name': 'Вешняки',
                'id': 'lineD3_21',
                'top': 1059,
                'left': 867,
            },
            {
                'name': 'Выхино',
                'id': 'lineD3_22',
                'top': 1059,
                'left': 867,
            },
            {
                'name': 'Косино',
                'id': 'lineD3_23',
                'top': 1059,
                'left': 867,
            },
            {
                'name': 'Ухтомская',
                'id': 'lineD3_24',
                'top': 1059,
                'left': 867,
            },
            {
                'name': 'Люберцы',
                'id': 'lineD3_25',
                'top': 1059,
                'left': 867,
            },
            {
                'name': 'Панки',
                'id': 'lineD3_26',
                'top': 1059,
                'left': 867,
            },
            {
                'name': 'Томилино',
                'id': 'lineD3_27',
                'top': 1059,
                'left': 867,
            },
            {
                'name': 'Красково',
                'id': 'lineD3_28',
                'top': 1059,
                'left': 867,
            },
            {
                'name': 'Малаховка',
                'id': 'lineD3_29',
                'top': 1059,
                'left': 867,
            },
            {
                'name': 'Удельная',
                'id': 'lineD3_30',
                'top': 1059,
                'left': 867,
            },
            {
                'name': 'Быково',
                'id': 'lineD3_31',
                'top': 1059,
                'left': 867,
            },
            {
                'name': 'Ильинская',
                'id': 'lineD3_32',
                'top': 1059,
                'left': 867,
            },
            {
                'name': 'Отдых',
                'id': 'lineD3_33',
                'top': 1059,
                'left': 867,
            },
            {
                'name': 'Кратово',
                'id': 'lineD3_34',
                'top': 1059,
                'left': 867,
            },
            {
                'name': 'Есенинская',
                'id': 'lineD3_35',
                'top': 1059,
                'left': 867,
            },
            {
                'name': 'Фабричная',
                'id': 'lineD3_36',
                'top': 1059,
                'left': 867,
            },
            {
                'name': 'Раменское',
                'id': 'lineD3_37',
                'outside': true,
                'top': 1059,
                'left': 867,
            },
            {
                'name': 'Ипподром',
                'id': 'lineD3_38',
                'outside': true,
                'top': 1059,
                'left': 867,
            },
        ],
    },
    {
        'id': 'lineD4',
        'name': 'МЦД-4',
        'isMCD': true,
        'color': '4BB287',
        'stations': [
            {
                'name': 'Железнодорожная',
                'id': 'lineD4_1',
                'outside': true,
                'top': 1059,
                'left': 867,
            },
            {
                'name': 'Ольгино',
                'id': 'lineD4_2',
                'outside': true,
                'top': 1059,
                'left': 867,
            },
            {
                'name': 'Кучино',
                'id': 'lineD4_3',
                'outside': true,
                'top': 1059,
                'left': 867,
            },
            {
                'name': 'Салтыковская',
                'id': 'lineD4_4',
                'outside': true,
                'top': 1059,
                'left': 867,
            },
            {
                'name': 'Никольское',
                'id': 'lineD4_5',
                'outside': true,
                'top': 1059,
                'left': 867,
            },
            {
                'name': 'Реутов',
                'id': 'lineD4_6',
                'outside': true,
                'top': 1059,
                'left': 867,
            },
            {
                'name': 'Новогиреево',
                'id': 'lineD4_7',
                'top': 339,
                'left': 620,
            },
            {
                'name': 'Кусково',
                'id': 'lineD4_8',
                'top': 368,
                'left': 620,
            },
            {
                'name': 'Чухлинка',
                'id': 'lineD4_9',
                'top': 487,
                'left': 620,
            },
            {
                'name': 'Нижегородская',
                'id': 'lineD4_10',
                'top': 533,
                'left': 732,
            },
            {
                'name': 'Серп и Молот',
                'id': 'lineD4_11',
                'top': 639,
                'left': 871,
            },
            {
                'name': 'Курская',
                'id': 'lineD4_12',
                'top': 715,
                'left': 947,
            },
            {
                'name': 'Площадь трёх вокзалов',
                'id': 'lineD4_13',
                'top': 809,
                'left': 956,
            },
            {
                'name': 'Марьина Роща',
                'id': 'lineD4_14',
                'top': 854,
                'left': 911,
            },
            {
                'name': 'Савёловская',
                'id': 'lineD4_15',
                'top': 881,
                'left': 884,
            },
            {
                'name': 'Белорусская',
                'id': 'lineD4_16',
                'top': 945,
                'left': 867,
            },
            {
                'name': 'Москва-Сити',
                'id': 'lineD4_17',
                'top': 973,
                'left': 867,
            },
            {
                'name': 'Кутузовская',
                'id': 'lineD4_18',
                'top': 1002,
                'left': 867,
            },
            {
                'name': 'Поклонная',
                'id': 'lineD4_19',
                'top': 1030,
                'left': 867,
            },
            {
                'name': 'Минская',
                'id': 'lineD4_20',
                'top': 1059,
                'left': 867,
            },
            {
                'name': 'Матвеевская',
                'id': 'lineD4_21',
                'top': 1059,
                'left': 867,
            },
            {
                'name': 'Аминьевская',
                'id': 'lineD4_22',
                'top': 1059,
                'left': 867,
            },
            {
                'name': 'Очаково',
                'id': 'lineD4_23',
                'top': 1059,
                'left': 867,
            },
            {
                'name': 'Мещерская',
                'id': 'lineD4_24',
                'top': 1059,
                'left': 867,
            },
            {
                'name': 'Солнечная',
                'id': 'lineD4_25',
                'top': 1059,
                'left': 867,
            },
            {
                'name': 'Переделкино',
                'id': 'lineD4_26',
                'top': 1059,
                'left': 867,
            },
            {
                'name': 'Мичуринец',
                'id': 'lineD4_27',
                'top': 1059,
                'left': 867,
            },
            {
                'name': 'Внуково',
                'id': 'lineD4_28',
                'top': 1059,
                'left': 867,
            },
            {
                'name': 'Лесной Городок',
                'id': 'lineD4_29',
                'top': 1059,
                'left': 867,
            },
            {
                'name': 'Толстопальцево',
                'id': 'lineD4_30',
                'top': 1059,
                'left': 867,
            },
            {
                'name': 'Кокошкино',
                'id': 'lineD4_31',
                'top': 1059,
                'left': 867,
            },
            {
                'name': 'Санино',
                'id': 'lineD4_32',
                'top': 1059,
                'left': 867,
            },
            {
                'name': 'Крёкшино',
                'id': 'lineD4_33',
                'top': 1059,
                'left': 867,
            },
            {
                'name': 'Победа',
                'id': 'lineD4_34',
                'top': 1059,
                'left': 867,
            },
            {
                'name': 'Апрелевка',
                'id': 'lineD4_35',
                'top': 1059,
                'left': 867,
            },
        ],
    },
    {
        'id': 'lineD4A',
        'name': 'МЦД-4А',
        'color': '4BB287',
        'stations': [
            {
                'name': 'Солнечная',
                'id': 'lineD4A_1',
                'top': 1273,
                'left': 575,
            },
            {
                'name': 'Новопеределкино',
                'id': 'lineD4A_2',
                'top': 1273,
                'left': 575,
            },
        ],
    },
]

