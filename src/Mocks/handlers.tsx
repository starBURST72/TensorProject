import { http, HttpResponse } from 'msw';
import { OUR_API_ADDRESS, OUR_API_ENDPOINTS } from '../http/constants';

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
                    isActivated:"boolean",
                    id:"string"
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
    http.get(`${OUR_API_ADDRESS}/refresh-token`, (req) => {
        // Возвращаем мокованные данные для успешной регистрации
        return HttpResponse.json(
            {
                access_token: "access-token",
                refresh_token: "refresh-token",
                user: {
                    username: "string",
                    isActivated:"boolean",
                    id:"string"
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
]