import { http, HttpResponse } from 'msw';
import { OUR_API_ADDRESS, OUR_API_ENDPOINTS } from '../http/constants';
import ava from '../img/ava.jpg'
import duner from '../img/Duner на углях.png'
import shaurma from '../img/Шаурма.png'
import { LngLat } from "@yandex/ymaps3-types";
import {
    mockHintCardsContinue,
    mockHintCardsFriends,
    mockHintCardsPopular
} from "./MockedData/MockedData";


export const handlers = [
    // Обработчик для POST запроса аутентификации
    http.post(`${OUR_API_ADDRESS}/${OUR_API_ENDPOINTS.auth}`, (req) => {
        // Возвращаем мокованные данные для успешной аутентификации
        return HttpResponse.json(
            {
                access_token: "access-token",
                refresh_token: "refresh-token",
                user: {
                    username: "string",
                    isActivated: "boolean",
                    id: "string"
                }
            }
        );
    }),

    // Обработчик для POST запроса регистрации
    http.post(`${OUR_API_ADDRESS}/${OUR_API_ENDPOINTS.register}`, (req) => {
        // Возвращаем мокованные данные для успешной регистрации
        return HttpResponse.json(
            { message: 'Registration successful' }
        );
    }),
    http.post(`${OUR_API_ADDRESS}/${OUR_API_ENDPOINTS.logout}`, (req) => {
        // Возвращаем мокованные данные для успешной регистрации
        return HttpResponse.json(
            { message: 'logout successful' }
        );
    }),
    http.get(`${OUR_API_ADDRESS}/refresh_token`, (req) => {
        // Возвращаем мокованные данные для успешной регистрации
        return HttpResponse.json(
            {
                access_token: "access-token",
                refresh_token: "refresh-token",
                user: {
                    username: "string",
                    isActivated: "boolean",
                    id: "string"
                }
            }
        );
    }),


    // Обработчик для GET запроса получения одного маршрута
    http.get(`${OUR_API_ADDRESS}/${OUR_API_ENDPOINTS.travels}/:id`, ({ params }) => {

        return HttpResponse.json(
            [{ message: `Get one travel successful id= ${params.id}` }]
        );
    }),

    // Обработчик для GET запроса получения всех маршрутов
    http.get(`${OUR_API_ADDRESS}/${OUR_API_ENDPOINTS.travels}`, (req) => {

        return HttpResponse.json(
            [{ message: 'Get all travels successful' }]
        );
    }),

    // Обработчик для POST запроса добавления нового маршрута
    http.post(`${OUR_API_ADDRESS}/${OUR_API_ENDPOINTS.travels}`, (req) => {

        return HttpResponse.json(
            [{ message: 'Create new travel successful' }]
        );
    }),


    // Обработчик для GET запроса получения информации о пользователе в настройках
    http.get(`${OUR_API_ADDRESS}/${OUR_API_ENDPOINTS.userProfile}/${OUR_API_ENDPOINTS.settings}/:id`, ({ params }) => {

        return HttpResponse.json(
            {
                // message: `Get user profile info successful id= ${params.id}`,
                // data:{
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
                // }
            }
        );
    }),

    // Обработчик для PUT запроса изменения информации о пользователе в настройках
    http.put(`${OUR_API_ADDRESS}/${OUR_API_ENDPOINTS.userProfile}/${OUR_API_ENDPOINTS.settings}/:id`, ({ params }) => {

        return HttpResponse.json(
            [{ message: `Put user settings successful id= ${params.id}` }]
        );
    }),

    // Обработчик для GET запроса получения информации о пользователе в профиле
    http.get(`${OUR_API_ADDRESS}/${OUR_API_ENDPOINTS.userProfile}/${OUR_API_ENDPOINTS.userInfo}/:id`, ({ params }) => {

        return HttpResponse.json(
            {
                // message: `Get user profile info successful id= ${params.id}`,
                // data:{
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
                // }
            }
        );
    }),

    // Обработчик для GET запроса получения информации о созданных маршрутах пользователя в профиле
    http.get(`${OUR_API_ADDRESS}/${OUR_API_ENDPOINTS.userProfile}/${OUR_API_ENDPOINTS.userCreatedTravelsInfo}/:id`, ({ params }) => {

        return HttpResponse.json(
            [
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
        );
    }),

    // Обработчик для GET запроса получения информации о истории маршрутов пользователя в профиле
    http.get(`${OUR_API_ADDRESS}/${OUR_API_ENDPOINTS.userProfile}/${OUR_API_ENDPOINTS.userHistoryTravelsInfo}/:id`, ({ params }) => {

        return HttpResponse.json(
            [
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

        );
    }),

    http.get(`${OUR_API_ADDRESS}/${OUR_API_ENDPOINTS.places}`, ({ params }) => {

        return HttpResponse.json(
            {
                location: {
                    center: [57.152985, 65.541227], // starting position [lng, lat]
                    zoom: 14 // starting zoom
                },
                markerProps: [
                    {
                        coordinates: [57.14883932510754, 65.5600105653111] as LngLat,
                        hint: '1'
                    },
                    {
                        coordinates: [57.1485671873132, 65.55036168655934] as LngLat,
                        hint: '2'
                    },
                    {
                        coordinates: [57.15222291358625, 65.5340378278529] as LngLat,
                        hint: '3'
                    }
                ]
            }
        );
    }),
    http.post(`${OUR_API_ADDRESS}/${OUR_API_ENDPOINTS.HintCards}`, async ({request}) => {
        const requestBody = await request.json();
        let query: string = '';
        if (requestBody && typeof requestBody === 'object' && 'query' in requestBody) {
            query = requestBody.query;
        }
        console.log('Received params:', query);
        let data:({
            img: string;
            description: string;
            id: string;
            title: string;
            mean_score: number;
            count_users: number
        })[];
        switch (query) {
            case 'friends':
                data = mockHintCardsFriends;
                break;
            case 'popular':
                data = mockHintCardsPopular;
                break;
            case 'continue':
                data = mockHintCardsContinue;
                break;
            default:
                data = []; // or some default data
        }
        return HttpResponse.json(
            {data}
        );
    }),
]
