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




export const interestsStatic = [
    'Все',
    'Еда',
    'Концерты',
    'Отдых',
    'Кино',
    'Выставки',
    'Кафе',
    'Ресторан',
    'Театр',
    'Парк',
    'Музей',
    'Спорт',
];



export type FullMarkerFields = {
    id: number;
    creator_user_id: number,
    title: string;
    description: string;
    address: string,
    type: string,
    coordinates: string
    mean_score: number;
    photos: {
        file: string
    }[]
    feedbacks:[]
}

export type PreviewMarkerFields = {
    id: number;
    creator_user_id: number,
    title: string;
    description: string;
    address: string,
    type: string,
    coordinates: string
    mean_score: number;
    photos: {
        file: string
    }[]
}

export interface PreviewPlacesInCityFields {
    markerProps: PreviewMarkerFields[];
}