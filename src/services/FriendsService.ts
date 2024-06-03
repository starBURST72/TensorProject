import $api from "../http";
import { OUR_API_ENDPOINTS } from "../http/constants";

export const getFriends = async (id: number) => {//////id?
    try {
        // Выполнение POST запроса для регистрации
        const response = await $api.get(`/${OUR_API_ENDPOINTS.friends}/${id}`);//id свой либо кого то
        return response.data;
    } catch (error: any) {
        // Обработка ошибок регистрации
        if (error.response && error.response.data && error.response.data.message) {
            throw new Error('Get settings failed: ' + error.response.data.message);
        } else {
            throw new Error('Get settings failed: ' + error.message);
        }
    }
};

export const answerOfInviteToFriends = async (response: string, id:number) => {
    try {
        // Выполнение GET запроса для получения всех путешествий
        const res = await $api.post(
            `/${OUR_API_ENDPOINTS.friends}/respond/${id}`,
            { params: { response } }
        );
        return res.data;
    } catch (error: any) {
        // Обработка ошибок получения всех путешествий
        if (error.response && error.response.data && error.response.data.message) {
            throw new Error('Get travels failed: ' + error.response.data.message);
        } else {
            throw new Error('Get travels failed: ' + error.message);
        }
    }
};

export const inviteToFriends = async (id:number) => {// как я понял id того, кому ты отправляшь запрос в друзья
    try {
        // Выполнение GET запроса для получения всех путешествий
        const res = await $api.post(
            `/${OUR_API_ENDPOINTS.friends}/send/${id}`
        );
        return res.data;
    } catch (error: any) {
        // Обработка ошибок получения всех путешествий
        if (error.response && error.response.data && error.response.data.message) {
            throw new Error('Get travels failed: ' + error.response.data.message);
        } else {
            throw new Error('Get travels failed: ' + error.message);
        }
    }
};