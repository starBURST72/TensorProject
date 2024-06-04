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

export const putProfileSettings = async (data: {
    file: File;
    name: string;
    surname: string;
    gender: string;
    birthday: string;
    city: string;
    interests: number[];

}) => {
    try {
        const formData = new FormData();
        formData.append('file', data.file);
        formData.append('name', data.name);
        formData.append('surname', data.surname);
        formData.append('gender', data.gender);
        formData.append('birthday', data.birthday);
        formData.append('city', data.city);
        formData.append('interests', JSON.stringify(data.interests));
        // Выполнение POST запроса для регистрации
        console.log(formData)
        const response = await $api.put(`/${OUR_API_ENDPOINTS.userProfile}/${OUR_API_ENDPOINTS.settings}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
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