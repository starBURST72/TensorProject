import $api from "../http";
import { OUR_API_ENDPOINTS } from "../http/constants";

export const getProfileSettings = async (id: number) => {
    try {
        // Выполнение POST запроса для регистрации
        const response = await $api.get(`/${OUR_API_ENDPOINTS.userProfile}/${OUR_API_ENDPOINTS.settings}`);
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

export const putProfileSettings = async (data: FormData) => {
    try {
        // Set the content type to multipart/form-data
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        };

        // Perform PUT request for updating profile settings
        const response = await $api.put(`/${OUR_API_ENDPOINTS.userProfile}/${OUR_API_ENDPOINTS.settings}`, data, config);
        return response.data;
    } catch (error: any) {
        // Handle errors
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
        const response = await $api.get(`/${OUR_API_ENDPOINTS.userProfile}/${id}`);
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

export const getUserCreatedTravelsInfo = async (id: number) => {//////////////Объединить
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

export const getUserHistoryTravelsInfo = async (id: number) => {//////////////Объединить
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

export const getAllTypesOfPlaces = async () => {
    try {
        // Выполнение POST запроса для регистрации
        const response = await $api.get(`/${OUR_API_ENDPOINTS.userProfile}/${OUR_API_ENDPOINTS.settings}`);
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