import { AxiosResponse } from "axios";
import { PlaceFullResponse, PlacePreviewResponse } from "../Models/Travels";
import $api from "../http";
import { OUR_API_ENDPOINTS } from "../http/constants";
import { TimelineItem, UserTravel } from "../Models/IUserTravel";


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

export const CreateTravel = async () => {
    try {
        // Выполнение POST запроса для регистрации
        const response = await $api.post(`${OUR_API_ENDPOINTS.travels}`);
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
export const UserTravelCreate = async () => {
    try {
        // Выполнение POST запроса для регистрации
        const response = await $api.post(`${OUR_API_ENDPOINTS.userTravel}/create`);
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
export const CopyTravel = async (id: number) => {
    try {
        // Выполнение POST запроса для регистрации
        const response = await $api.post(`${OUR_API_ENDPOINTS.travels}/${id}/copy`);
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


export const getPlacesInCity = async (city: string, type: string): Promise<PlacePreviewResponse[]> => {
    try {
        // Выполнение GET запроса для получения всех путешествий
        const response: AxiosResponse<PlacePreviewResponse[]> = await $api.get<PlacePreviewResponse[]>(
            `/${OUR_API_ENDPOINTS.places}`,
            { params: { city, type } }
        );
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


export const getOnePLaceInCity = async (id: number): Promise<PlaceFullResponse> => {
    try {
        // Выполнение GET запроса для получения одного места
        const response: AxiosResponse<PlaceFullResponse> = await $api.get<PlaceFullResponse>(
            `${OUR_API_ENDPOINTS.place}/${id}`)
        return response.data;
    } catch (error: any) {
        // Обработка ошибок получения одного места
        if (error.response && error.response.data && error.response.data.message) {
            throw new Error('Get travels failed: ' + error.response.data.message);
        } else {
            throw new Error('Get travels failed: ' + error.message);
        }
    }
};

export const GetUserTravel = async (id: string): Promise<UserTravel | null> => {
    try {
        // Выполнение POST запроса для регистрации
        const response: AxiosResponse<UserTravel> = await $api.get(`${OUR_API_ENDPOINTS.userTravel}/${id}`);
        console.log(response.data)
        return response.data;
    } catch (error: any) {
        // Обработка ошибок регистрации
        if (error.response && error.response.data && error.response.data.message) {
            console.error('Get travel by ID failed: ' + error.response.data.message);
        } else {
            console.error('Get travel by ID failed: ' + error.message);
        }
        return null;
    }
};

export const UpdateUserTravel = async (id: string, Places: TimelineItem[]): Promise<string | null> => {
    try {
        // Выполнение POST запроса для регистрации
        const response: AxiosResponse<string> = await $api.put(`${OUR_API_ENDPOINTS.userTravel}/${id}`, { Places });
        return response.data;
    } catch (error: any) {
        // Обработка ошибок регистрации
        if (error.response && error.response.data && error.response.data.message) {
            console.error('Get travel by ID failed: ' + error.response.data.message);
        } else {
            console.error('Get travel by ID failed: ' + error.message);
        }
        return null;
    }
};


export const CreateReviewAboutPlace = async (id: number, reviewData: { score: number, description: string }) => {
    try {
        // Выполнение POST запроса для отправки отзыва
        const response = await $api.post(`${OUR_API_ENDPOINTS.places}/${id}/feedback`, reviewData);
        return response.data;
    } catch (error: any) {
        // Обработка ошибок
        if (error.response && error.response.data && error.response.data.message) {
            throw new Error('Failed to create review: ' + error.response.data.message);
        } else {
            throw new Error('Failed to create review: ' + error.message);
        }
    }
};