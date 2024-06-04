import { http, HttpResponse } from 'msw';
import { OUR_API_ADDRESS, OUR_API_ENDPOINTS } from '../http/constants';
import ava from '../img/ava.jpg'
import duner from '../img/Duner на углях.png'
import shaurma from '../img/Шаурма.png'
import { LngLat } from "@yandex/ymaps3-types";
import {
    mockHintCardsContinue,
    mockHintCardsFriends,
    mockHintCardsPopular, travelData
} from "./MockedData/MockedData";
import { mockPlacesAll, mockPlacesFood } from './MockedData/MockedPlaces';
import { UserTravel } from "../Models/IUserTravel";
import { user, user1, user2, user3, user4, user5, user6, user7 } from './MockedData/MockedUsers';

function getMockDataForId(id: string): string {
    const mockDataMap: Record<string, { id: string }> = {
        '1': { id: '1' },
        '2': { id: '2' },
        '3': { id: '3' },
    };
    return mockDataMap[id]?.id || '';
}

function getTravelById(id: string, travelData: UserTravel[]): UserTravel | undefined {
    return travelData.find(travel => travel.id === id);
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
            {
                id: '123',
                title: 'Test Travel',
                description: 'This is a test travel object',
            }
        );
    }),


    // Обработчик для GET запроса получения информации о пользователе в настройках
    http.get(`${OUR_API_ADDRESS}/${OUR_API_ENDPOINTS.userProfile}/${OUR_API_ENDPOINTS.settings}/:id`, ({ params }) => {

        return HttpResponse.json(user);
    }),

    // Обработчик для PUT запроса изменения информации о пользователе в настройках
    http.put(`${OUR_API_ADDRESS}/${OUR_API_ENDPOINTS.userProfile}/${OUR_API_ENDPOINTS.settings}/:id`, ({ params }) => {

        return HttpResponse.json(
            [{ message: `Put user settings successful id= ${params.id}` }]
        );
    }),

    // Обработчик для GET запроса получения информации о пользователе в профиле
    http.get(`${OUR_API_ADDRESS}/${OUR_API_ENDPOINTS.userProfile}/:id`, ({ params }) => {

        return HttpResponse.json(user);
    }),

    // Обработчик для GET запроса получения информации о созданных маршрутах пользователя в профиле

    // Обработчик для GET запроса получения информации о истории маршрутов пользователя в профиле
    http.get(`${OUR_API_ADDRESS}/${OUR_API_ENDPOINTS.userProfile}/:id/${OUR_API_ENDPOINTS.userTravels}`, ({ params }) => {
        const { status: statusParams } = params;
        // let data: UserTravel | undefined;
        console.log(statusParams)
        switch (statusParams) {
            case 'passed':
                return HttpResponse.json([
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
            case 'creating':
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
            case 'now':
                return HttpResponse.json(
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
                    }
                );
            default:
                return HttpResponse.json({ c: statusParams });
        }
    }),


    http.get(`${OUR_API_ADDRESS}/${OUR_API_ENDPOINTS.places}`, ({ request }) => {

        const url = new URL(request.url)
        const city = url.searchParams.get('city')
        const type = url.searchParams.get('type')
        if (city === 'Тюмень' && type === 'Все') {
            return HttpResponse.json(
                mockPlacesAll
            );
        } else if (city === 'Тюмень' && type === 'Еда') {
            return HttpResponse.json(
                mockPlacesAll
            );
        } else {
            return HttpResponse.json([]);
        }
    }),

    http.get(`${OUR_API_ADDRESS}/${OUR_API_ENDPOINTS.place}/:id`, ({ params }) => {

        // let id: string;
        const { id: paramId } = params;
        // let data: UserTravel | undefined;
        console.log(paramId)
        switch (paramId) {
            case '1':
                return HttpResponse.json(mockPlacesAll[0]);
            case '2':
                return HttpResponse.json(mockPlacesAll[1]);
            case '3':
                return HttpResponse.json(mockPlacesAll[2]);
            default:
                return HttpResponse.json({ c: paramId });
        }


    }),


    http.post(`${OUR_API_ADDRESS}/${OUR_API_ENDPOINTS.HintCards}`, async ({ request }) => {
        const requestBody = await request.json();
        let query: string = '';
        if (requestBody && typeof requestBody === 'object' && 'query' in requestBody) {
            query = requestBody.query;
        }
        let data: ({
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
            { data }
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


    http.get(`${OUR_API_ADDRESS}/${OUR_API_ENDPOINTS.friends}/:id`, ({ params }) => {

        const { id: paramId } = params;
        // let data: UserTravel | undefined;
        console.log(paramId)
        // const type = url.searchParams.get('type')
        switch (paramId) {
            case '1':
                return HttpResponse.json({
                    pending_sent: [user4, user7],
                    pending_received: [user3, user6],
                    friends: [
                        user1,
                        user2,
                        user5
                    ]
                });

            default:
                return HttpResponse.json({
                    pending_sent: [],
                    pending_received: [],
                    friends: [

                    ]
                });
        }

    }),

    http.get(`${OUR_API_ADDRESS}/${OUR_API_ENDPOINTS.userTravel}/:id`, async ({ params }) => {

        const { id: paramId } = params;
        let data: UserTravel | undefined;
        console.log(paramId)
        if (typeof paramId === 'string') {
            data = getTravelById(paramId, travelData);
        } else {
            return HttpResponse.json({ error: 'Invalid ID' }, { status: 400 });
        }
        return HttpResponse.json(data);
    }),


    http.post(`${OUR_API_ADDRESS}/${OUR_API_ENDPOINTS.places}`, ({ request }) => {

        return HttpResponse.json(
            { request }
        );
    }),


    http.post(`${OUR_API_ADDRESS}/${OUR_API_ENDPOINTS.places}/:id/feedback`, ({ request, params }) => {
        return HttpResponse.json(
            [{ message: `Добавлен отзыв id= ${params.id}` }, request]
        );
    }),







]


