import ava from '../img/ava.jpg'
import duner from '../img/Duner на углях.png'
import shaurma from '../img/Шаурма.png'

export const createdTravels = [
    {
        id: 1,
        title: 'Тур по шаурмечным Тюмени',
        description: 'В этом маршруте собраны самые лучшие шаурмечные Тюмени',
        creatorLogin: 'sanya52',
        score: 4.2,
        photo: shaurma,
        places: [
            {
                placeid: 1,
                placeName: 'Duner на углях',
                placeDescription: 'Шаурмечная',
                placeType: 'Еда',
                placePhoto: duner
            },
            {
                placeid: 1,
                placeName: 'Duner на углях',
                placeDescription: 'Шаурмечная',
                placeType: 'Еда',
                placePhoto: duner
            },
            {
                placeid: 1,
                placeName: 'Duner на углях',
                placeDescription: 'Шаурмечная',
                placeType: 'Еда',
                placePhoto: duner
            },
            {
                placeid: 1,
                placeName: 'Duner на углях',
                placeDescription: 'Шаурмечная',
                placeType: 'Еда',
                placePhoto: duner
            },
        ]
    },
    {
        id: 2,
        title: 'Тур по шаурмечным Тюмени',
        description: 'В этом маршруте собраны самые лучшие шаурмечные Тюмени',
        creatorLogin: 'sanya52',
        score: 4.2,
        photo: shaurma,
        places: [
            {
                placeid: 1,
                placeName: 'Duner на углях',
                placeDescription: 'Шаурмечная',
                placeType: 'Еда',
                placePhoto: duner
            }

        ]
    },
    {
        id: 3,
        title: 'Тур по шаурмечным Тюмени',
        description: 'В этом маршруте собраны самые лучшие шаурмечные Тюмени',
        creatorLogin: 'sanya52',
        score: 4.2,
        photo: ava,
        places: [
            {
                placeid: 1,
                placeName: 'Duner на углях',
                placeDescription: 'Шаурмечная',
                placeType: 'Еда',
                placePhoto: shaurma
            }

        ]
    },

]

export const historyTravels = [
    {
        id: 1,
        title: 'Тур по шаурмечным Тюмени',
        description: 'В этом маршруте собраны самые лучшие шаурмечные Тюмени',
        creatorLogin: 'sanya52',
        score: 4.2,
        photo: shaurma,
        places: [
            {
                placeid: 1,
                placeName: 'Duner на углях',
                placeDescription: 'Шаурмечная',
                placeType: 'Еда',
                placePhoto: duner
            },
            {
                placeid: 1,
                placeName: 'Duner на углях',
                placeDescription: 'Шаурмечная',
                placeType: 'Еда',
                placePhoto: duner
            },
            {
                placeid: 1,
                placeName: 'Duner на углях',
                placeDescription: 'Шаурмечная',
                placeType: 'Еда',
                placePhoto: duner
            }

        ]
    },
    {
        id: 2,
        title: 'Тур по шаурмечным Тюмени',
        description: 'В этом маршруте собраны самые лучшие шаурмечные Тюмени',
        creatorLogin: 'sanya52',
        score: 4.2,
        photo: shaurma,
        places: [
            {
                placeid: 1,
                placeName: 'Duner на углях',
                placeDescription: 'Шаурмечная',
                placeType: 'Еда',
                placePhoto: duner
            }

        ]
    },

]



export const userInfo =
{
    ava: ava,
    name: 'Саша',
    surname: 'Иванов',
    gender: 'Мужской',
    birthdate: '15.04.2002',
    email: 'sashazxc@mail.ru',
    username: 'sanya52',
    city: 'Тюмень',
    interests: [
        'кино',
        'кафе'
    ]
}

export const interestsStatic = [
    'Все',
    'Еда',
    'концерты',
    'кино',
    'выставки',
    'кафе',
    'рестораны',
    'театр',
    'парк',
    'музей',
    'спорт',
];

export type FullMarkerFields = {
    id: number;
    title: string;
    description: string;
    score: number;
    coordinates: string
    photos: {
        file: string
    }[]
    address: string,
    type: string,
}

// type PreviewMarkerFields = {
//     id: number;
//     title: string;
//     description: string;
//     score: number;
//     coordinates: [number, number];
//     photo: string
// }

export interface PreviewPlacesInCityFields {
    markerProps: PreviewMarkerFields[];
}

export type PreviewMarkerFields = {
    id: number;
    title: string;
    description: string;
    score: number;
    coordinates: string;
    photos: {
        file: string
    }[]
}