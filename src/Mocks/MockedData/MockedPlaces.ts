import shava from '../../img/Шаурма.png'

export const mockPlacesAll = [
    {
        id: 1,
        creator_user_id: 1,
        title: 'Кафе Теремок',
        description: 'Вкусная еда',
        address: 'Россия, Тюмень, Центральная площадь',
        type: 'Еда',
        coordinates: '57.14883932510754,65.5600105653111',
        mean_score: 4.5,
        photos: [{ file: shava }, { file: shava }],
        feedbacks: [
            {
                "user_id": 1,
                "username": "gena77",
                "score": 4.5,
                "description": "вообще не понравилось("
            },
            {
                "user_id": 2,
                "username": "miron33",
                "score": 4.5,
                "description": "вообще не понравилось("
            },

        ]
    },


    {
        id: 2,
        title: 'Салон красоты Beauty',
        description: 'Красота рядом!',
        mean_score: 4,
        coordinates: '57.1485671873132,65.55036168655934',
        address: 'Россия, Тюмень, Центральная площадь',
        type: 'Красота',
        photos: [{ file: shava }],
        feedbacks: [
            {
                "user_id": 1,
                "username": "gena77",
                "score": 5,
                "description": "вообще не понравилось("
            },
            {
                "user_id": 2,
                "username": "miron33",
                "score": 3,
                "description": "вообще не понравилось("
            },

        ]
    },
    {
        id: 3,
        title: 'Стадион Динамо',
        description: 'Футбольный стадион',
        mean_score: 3,
        coordinates: '57.15222291358625,65.5340378278529',
        address: 'Россия, Тюмень, Центральная площадь',
        type: 'Спорт',
        photos: [{ file: shava }],
        feedbacks: [
            {
                "user_id": 1,
                "username": "gena77",
                "score": 3,
                "description": "вообще не понравилось("
            },
            {
                "user_id": 2,
                "username": "miron33",
                "score": 3,
                "description": "вообще не понравилось("
            },

        ]
    },
    
    {
        id: 4,
        title: 'Название 4',
        description: 'Описание',
        mean_score: 4,
        coordinates: '57.11785179582525,65.54868508203124',
        address: 'Россия, Тюмень, улица Дмитрия Менделеева, 1А',
        type: 'Спорт',
        photos: [{ file: shava }],
        feedbacks: [
            {
                "user_id": 1,
                "username": "gena77",
                "score": 4,
                "description": "вообще не понравилось("
            },
            {
                "user_id": 2,
                "username": "miron33",
                "score": 4,
                "description": "вообще не понравилось("
            },

        ]
    },
    {
        id: 5,
        title: 'Название 5',
        description: 'Описание',
        mean_score: 4.2,
        coordinates: '57.111839820618066,65.54690409524531',
        address: 'Россия, Тюмень, улица Федюнинского, 43',
        type: 'Спорт',
        photos: [{ file: shava }],
        feedbacks: [
            {
                "user_id": 1,
                "username": "gena77",
                "score": 4,
                "description": "вообще не понравилось("
            },
            {
                "user_id": 2,
                "username": "miron33",
                "score": 4,
                "description": "вообще не понравилось("
            },

        ]
    },

    {
        id: 6,
        title: 'Название 6',
        description: 'Описание',
        mean_score: 4.2,
        coordinates: '57.12033801574096,65.52634764535519',
        address: 'Россия, Тюмень, микрорайон Южный',
        type: 'Спорт',
        photos: [{ file: shava }],
        feedbacks: [
            {
                "user_id": 1,
                "username": "gena77",
                "score": 4,
                "description": "вообще не понравилось("
            },
            {
                "user_id": 2,
                "username": "miron33",
                "score": 4,
                "description": "вообще не понравилось("
            },

        ]
    },

    {
        id: 7,
        title: 'Название 7',
        description: 'Описание',
        mean_score: 4.2,
        coordinates: '57.12648934490567,65.52321847405013',
        address: 'Россия, Тюмень, улица Червишевский Тракт, 23',
        type: 'Спорт',
        photos: [{ file: shava }],
        feedbacks: [
            {
                "user_id": 1,
                "username": "gena77",
                "score": 4,
                "description": "вообще не понравилось("
            },
            {
                "user_id": 2,
                "username": "miron33",
                "score": 4,
                "description": "вообще не понравилось("
            },

        ]
    },
];

export const mockPlacesFood = [
    {
        id: 4,
        title: 'Название 4',
        description: 'Описание',
        score: 4.2,
        coordinates: '57.11785179582525,65.54868508203124',
    },
    {
        id: 5,
        title: 'Название 5',
        description: 'Описание',
        score: 4.2,
        coordinates: '57.111839820618066,65.54690409524531',
    },
    {
        id: 6,
        title: 'Название 6',
        description: 'Описание',
        score: 4.2,
        coordinates: '57.12033801574096,65.52634764535519',
    },
    {
        id: 7,
        title: 'Название 7',
        description: 'Описание',
        score: 4.2,
        coordinates: '57.12648934490567,65.52321847405013',
    },
];