import { http,HttpResponse } from 'msw';
import { OUR_API_ADDRESS, OUR_API_ENDPOINTS } from '../API/constants';

export const handlers = [
    // Обработчик для POST запроса аутентификации
    http.post(`${OUR_API_ADDRESS}/${OUR_API_ENDPOINTS.auth}`, (req) => {
        // Возвращаем мокованные данные для успешной аутентификации
        return HttpResponse.json(
            {
                token: "mocked-token"
            }
        );
    }),

    // Обработчик для POST запроса регистрации
    http.post(`${OUR_API_ADDRESS}/${OUR_API_ENDPOINTS.register}`, (req) => {
        // Возвращаем мокованные данные для успешной регистрации
        return HttpResponse.json(
            [{ message: 'Registration successful' }]
        );
    }),
]
