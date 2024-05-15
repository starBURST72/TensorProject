import axios from 'axios';
import { OUR_API_ADDRESS, OUR_API_ENDPOINTS } from "./constants";

export const postLogin = async (data: { username: string; password: string }) => {
    try {
        // Выполнение POST запроса для аутентификации
        const response = await axios.post(`${OUR_API_ADDRESS}/${OUR_API_ENDPOINTS.auth}`, data);
        return response.data;
    } catch (error: any) {
        // Обработка ошибок аутентификации
        if (error.response && error.response.data && error.response.data.message) {
            throw new Error('Login failed: ' + error.response.data.message);
        } else {
            throw new Error('Login failed: ' + error.message);
        }
    }
};

export const postRegister = async (data: { email: string; username: string; password: string }) => {
    try {
        // Выполнение POST запроса для регистрации
        const response = await axios.post(`${OUR_API_ADDRESS}/${OUR_API_ENDPOINTS.register}`, data);
        return response.data;
    } catch (error: any) {
        // Обработка ошибок регистрации
        if (error.response && error.response.data && error.response.data.message) {
            throw new Error('Registration failed: ' + error.response.data.message);
        } else {
            throw new Error('Registration failed: ' + error.message);
        }
    }
};

export const getOneTravel = async (id: number) => {
    try {
        // Выполнение POST запроса для регистрации
        const response = await axios.get(`${OUR_API_ADDRESS}/${OUR_API_ENDPOINTS.travels}/${id}`);
        return response.data;
    } catch (error: any) {
        // Обработка ошибок регистрации
        if (error.response && error.response.data && error.response.data.message) {
            throw new Error('Get travel by ID failed ' + error.response.data.message);
        } else {
            throw new Error('Get travel by ID failed: ' + error.message);
        }
    }
};



export const getAllTravels = async () => {
    try {
        // Выполнение GET запроса для получения всех путешествий
        const response = await axios.get(`${OUR_API_ADDRESS}/${OUR_API_ENDPOINTS.travels}`);
        return response.data;
    } catch (error: any) {
        // Обработка ошибок получения всех путешествий
        if (error.response && error.response.data && error.response.data.message) {
            throw new Error('Get travels failed: ' + error.response.data.message);
        } else {
            throw new Error('Get travels failed: ' + error.message);
        }
    }
};

export const CreateTravel = async (data: { name: string, description: string, places: Object }) => {
    try {
        // Выполнение POST запроса для регистрации
        const response = await axios.post(`${OUR_API_ADDRESS}/${OUR_API_ENDPOINTS.travels}`, data);
        return response.data;
    } catch (error: any) {
        // Обработка ошибок регистрации
        if (error.response && error.response.data && error.response.data.message) {
            throw new Error('Get travel by ID failed ' + error.response.data.message);
        } else {
            throw new Error('Get travel by ID failed: ' + error.message);
        }
    }
};
