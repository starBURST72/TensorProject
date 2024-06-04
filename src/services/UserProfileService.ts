import $api from "../http";
import { OUR_API_ENDPOINTS } from "../http/constants";

export const getProfileSettings = async () => {
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



export const putProfileSettings = async (data: {
    file: string; // file is now a base64 string or null
    name: string;
    surname: string;
    gender: string;
    birthday: string;
    city: string;
    interests: number[];
}) => {
    try {
        const interestsJSON = JSON.stringify(data.interests);

        const payload = {
            file: data.file,
            name: data.name,
            surname: data.surname,
            gender: data.gender,
            birthday: data.birthday,
            city: data.city,
            interests: interestsJSON
        };
        console.log(payload);
        const response = await $api.put(`/${OUR_API_ENDPOINTS.userProfile}/${OUR_API_ENDPOINTS.settings}`, payload);

        return response.data;
    } catch (error: any) {
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
        console.log(response.data)
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



export const getUserTravelsInfo = async (id: number, status: string) => {//////////////Объединить
    try {
        // Выполнение POST запроса для регистрации
        const response = await $api.get(`/${OUR_API_ENDPOINTS.userProfile}/${id}/${OUR_API_ENDPOINTS.userTravels}`,
        { params: { status } }
        );
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

// export const getUserHistoryTravelsInfo = async (id: number) => {//////////////Объединить
//     try {
//         // Выполнение POST запроса для регистрации
//         const response = await $api.get(`/${OUR_API_ENDPOINTS.userProfile}/${OUR_API_ENDPOINTS.userHistoryTravelsInfo}/${id}`);
//         return response.data;
//     } catch (error: any) {
//         // Обработка ошибок регистрации
//         if (error.response && error.response.data && error.response.data.message) {
//             throw new Error('Get settings failed: ' + error.response.data.message);
//         } else {
//             throw new Error('Get settings failed: ' + error.message);
//         }
//     }
// };

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