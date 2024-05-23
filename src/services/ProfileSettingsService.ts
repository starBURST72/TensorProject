import $api from "../http";
import { OUR_API_ENDPOINTS } from "../http/constants";

export const getProfileSettings = async (id: number) => {
    try {
        // Выполнение POST запроса для регистрации
        const response = await $api.get(`/${OUR_API_ENDPOINTS.profile}/${OUR_API_ENDPOINTS.settings}/${id}`);
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

export const putProfileSettings = async (id: number, data: {
    name: string;
    surname: string;
    gender: string;
    birthDate: Date;
    email: string;
    username: string;
    city: string;
    interests: string[];

}) => {
    try {
        // Выполнение POST запроса для регистрации
        const response = await $api.put(`/${OUR_API_ENDPOINTS.profile}/${OUR_API_ENDPOINTS.settings}/${id}`, data);
        return response.data;
    } catch (error: any) {
        // Обработка ошибок регистрации
        if (error.response && error.response.data && error.response.data.message) {
            throw new Error('Put settings failed: ' + error.response.data.message);
        } else {
            throw new Error('Put settings failed: ' + error.message);
        }
    }
};