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

function getMockDataForId(id: string): string {
    const mockDataMap: Record<string, { id: string }> = {
        '1': { id: 'mockId1' },
        '2': { id: 'mockId2' },
        '3': { id: 'mockId3' },
    };
    return mockDataMap[id]?.id || '';
    }

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

    // http.get(`${OUR_API_ADDRESS}/${OUR_API_ENDPOINTS.places}`, ({ params }) => {

    //     return HttpResponse.json(
    //         {
    //             location: {
    //                 center: [57.152985, 65.541227], // starting position [lng, lat]
    //                 zoom: 14 // starting zoom
    //             },
    //             markerProps: [
    //                 {
    //                     id: 1,
    //                     coordinates: [57.152985, 65.541227 ] as LngLat,
    //                     title: 'Название 1'
    //                 },
    //                 {
    //                     id: 2,
    //                     coordinates: [57.1485671873132, 65.55036168655934] as LngLat,
    //                     title: 'Название 2'
    //                 },
    //                 {
    //                     id: 3,
    //                     coordinates: [57.15222291358625, 65.5340378278529] as LngLat,
    //                     title: 'Название 3'
    //                 }
    //             ]
    //         }
    //     );
    // }),

    http.get(`${OUR_API_ADDRESS}/${OUR_API_ENDPOINTS.places}`, ({ request }) => {

        const url = new URL(request.url)
        const city = url.searchParams.get('city')
        const type = url.searchParams.get('type')
        if (city === 'Тюмень' && type === 'Все') {
            return HttpResponse.json({
                markerProps: [
                    {
                        id: 1,
                        title: 'Название 1',
                        description: 'Описание',
                        score: 4.2,
                        coordinates: [57.14883932510754, 65.5600105653111],
                    },
                    {
                        id: 2,
                        title: 'Название 2',
                        description: 'Описание',
                        score: 4.2,
                        coordinates: [57.1485671873132, 65.55036168655934],
                    },
                    {
                        id: 3,
                        title: 'Название 3',
                        description: 'Описание',
                        score: 4.2,
                        coordinates: [57.15222291358625, 65.5340378278529],
                    },
                ],
            });
        } else if (city === 'Тюмень' && type === 'Еда') {
            return HttpResponse.json({
                markerProps: [
                    {
                        id: 4,
                        title: 'Название 4',
                        description: 'Описание',
                        score: 4.2,
                        coordinates: [57.11785179582525, 65.54868508203124],
                    },
                    {
                        id: 5,
                        title: 'Название 5',
                        description: 'Описание',
                        score: 4.2,
                        coordinates: [57.111839820618066, 65.54690409524531],
                    },
                    {
                        id: 6,
                        title: 'Название 6',
                        description: 'Описание',
                        score: 4.2,
                        coordinates: [57.12033801574096, 65.52634764535519],
                    },
                    {
                        id: 7,
                        title: 'Название 7',
                        description: 'Описание',
                        score: 4.2,
                        coordinates: [57.12648934490567, 65.52321847405013],
                    },
                ],
            });
        } else {
            return HttpResponse.json({});
        }
    }),

    http.get(`${OUR_API_ADDRESS}/${OUR_API_ENDPOINTS.places}/:id`, ({ request }) => {

        const url = new URL(request.url)
        const id = url.searchParams.get('id')
        switch (id) {
            case '1':
                return HttpResponse.json(
                    {
                        id: 1,
                        title: 'Название 1',
                        description: 'Описание 1',
                        score: 4.2,
                        coordinates: [57.14883932510754, 65.5600105653111],
                        address: 'Адрес 1',
                        type: 'Еда',
                    }
                );
            case '2':
                return HttpResponse.json({
                    id: 2,
                    title: 'Название 2',
                    description: 'Описание 2',
                    score: 4.2,
                    coordinates: [57.1485671873132, 65.55036168655934],
                    address: 'Адрес 2',
                    type: 'Красота',
                });
            case '3':
                return HttpResponse.json({
                    id: 3,
                        title: 'Название 3',
                        description: 'Описание',
                        score: 4.2,
                        coordinates: [57.15222291358625, 65.5340378278529],
                        address: 'Адрес 3',
                        type: 'Спорт',
                });
            default:
                return HttpResponse.json({c:id});
        }


    }),


    http.post(`${OUR_API_ADDRESS}/${OUR_API_ENDPOINTS.HintCards}`, async ({ request }) => {
        const requestBody = await request.json();
        let query: string = '';
        if (requestBody && typeof requestBody === 'object' && 'query' in requestBody) {
            query = requestBody.query;
        }
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
                data = [];
        }
        return HttpResponse.json(
            {data}
        );
    }),
    http.post(`${OUR_API_ADDRESS}/${OUR_API_ENDPOINTS.travels}/:id/copy`, async ({ params }) => {
        let id: string;
        const { id: paramId } = params;
        if (typeof paramId === 'string') {
            id = getMockDataForId(paramId);
        } else {
            return HttpResponse.json({ error: 'Invalid ID' }, { status: 400 });
        }

        return HttpResponse.json({ id });
    }),

]
