import $api from "../http";
import { OUR_API_ENDPOINTS } from "../http/constants";

export const getProfileSettings = async (id: number) => {
    try {
        // Выполнение POST запроса для регистрации
        const response = await $api.get(`/${OUR_API_ENDPOINTS.userProfile}/${OUR_API_ENDPOINTS.settings}/${id}`);
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
    // ava: any,
    name: string;
    surname: string;
    gender: string;
    birthDate: string;
    email: string;
    username: string;
    city: string;
    interests: string[];

}) => {
    try {
        // Выполнение POST запроса для регистрации
        const response = await $api.put(`/${OUR_API_ENDPOINTS.userProfile}/${OUR_API_ENDPOINTS.settings}/${id}`, data);
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

export const getUserProfileInfo = async (id: number) => {
    try {
        // Выполнение POST запроса для регистрации
        const response = await $api.get(`/${OUR_API_ENDPOINTS.userProfile}/${OUR_API_ENDPOINTS.userInfo}/${id}`);
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

export const getUserCreatedTravelsInfo = async (id: number) => {
    try {
        // Выполнение POST запроса для регистрации
        const response = await $api.get(`/${OUR_API_ENDPOINTS.userProfile}/${OUR_API_ENDPOINTS.userCreatedTravelsInfo}/${id}`);
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

export const getUserHistoryTravelsInfo = async (id: number) => {
    try {
        // Выполнение POST запроса для регистрации
        const response = await $api.get(`/${OUR_API_ENDPOINTS.userProfile}/${OUR_API_ENDPOINTS.userHistoryTravelsInfo}/${id}`);
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