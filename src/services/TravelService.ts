import $api from "../http";
import { OUR_API_ENDPOINTS } from "../http/constants";

export const getOneTravel = async (id: number) => {
    try {
        // Выполнение POST запроса для регистрации
        const response = await $api.get(`/${OUR_API_ENDPOINTS.travels}/${id}`);
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
        const response = await $api.get(`/${OUR_API_ENDPOINTS.travels}`);
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
        const response = await $api.post(`${OUR_API_ENDPOINTS.travels}`, data);
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


export const getPLacesInCity = async (params: { city: string, type: string }) => {
    try {
        // Выполнение GET запроса для получения всех путешествий
        const response = await $api.get(`/${OUR_API_ENDPOINTS.places}`, { params: params });
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


// export const getOnePLaceInCity = async (id: number) => {
//     try {
//         // Выполнение GET запроса для получения одного места
//         const response = await $api.post(`${OUR_API_ENDPOINTS.places}/${id}`);
//         return response.data;
//     } catch (error: any) {
//         // Обработка ошибок получения одного места
//         if (error.response && error.response.data && error.response.data.message) {
//             throw new Error('Get travels failed: ' + error.response.data.message);
//         } else {
//             throw new Error('Get travels failed: ' + error.message);
//         }
//     }
// };
