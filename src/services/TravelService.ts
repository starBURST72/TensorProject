import { AxiosResponse } from "axios";
import { PlaceFullResponse, PlacePreviewResponse } from "../Models/Travels";
import $api from "../http";
import { OUR_API_ENDPOINTS } from "../http/constants";
import {TimelineItem, UserPut, UserTravel} from "../Models/IUserTravel";
import * as Base64 from 'js-base64';


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
        const response = await $api.post(`${OUR_API_ENDPOINTS.userTravel}`);
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

export const CopyTravel = async (id:number) => {
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

export const GetUserTravel = async (id:string):Promise<UserTravel | null> => {
    try {
        // Выполнение POST запроса для регистрации
        const response:AxiosResponse<UserTravel> = await $api.get(`${OUR_API_ENDPOINTS.userTravel}/${id}`);
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
function transformUserTravelToUserPut(userTravel: UserTravel): {
    Date_end: string;
    img: string|null;
    places: { date: string; description: string | undefined; id: number | undefined; order: number }[];
    owner_user_id: string;
    Date_start: string;
    members: { user_id: number }[];
    description: string;
    title: string;
    status: string
} {
// Decode the Base64 string to get the original image
    const imageData = Base64.toUint8Array(userTravel.img);
    const image = new Image();
    image.src = URL.createObjectURL(new Blob([imageData]));

// Compress the image
    const canvas = document.createElement('canvas');
    canvas.width = image.width;
    canvas.height = image.height;
    const ctx = canvas.getContext('2d');
    ctx?.drawImage(image, 0, 0);
    let compressedImageData: string | null = null;
    if (canvas) {
        compressedImageData = canvas.toDataURL('image/png');
    }

// Encode the compressed image back into a Base64 string
    let compressedUserTravelImg: string | null;
    if (compressedImageData) {
        compressedUserTravelImg = compressedImageData.split(',')[1] ?? null;
    } else {
        compressedUserTravelImg = null;
    }
    return {
        members: userTravel.members.map(member => ({ user_id: member.user_id })),
        title: userTravel.title,
        description: userTravel.description,
        owner_user_id: userTravel.owner_user_id,
        Date_start: userTravel.Date_start,
        Date_end: userTravel.Date_end,
        img: compressedUserTravelImg ?? null,
        status: userTravel.status,
        places: userTravel.places.map(place => ({
            id: place.place_id ||undefined,
            order: place.order,
            date: place.date,
            description: place.description  ||undefined,
        })),
    };
}
export const UpdateUserTravel = async (Travel:UserTravel):Promise<string | null> => {
    const TravelPut = transformUserTravelToUserPut(Travel);
    console.log(TravelPut)
    try {
        // Выполнение POST запроса для регистрации
        const response:AxiosResponse<string> = await $api.put(`${OUR_API_ENDPOINTS.userTravel}/${Travel.id}`,{TravelPut});
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


export const CreateNewPlace = async (placeData: {
    title: string;
    description: string;
    address: string;
    type: string;
    coordinates: string;
    file: File;
}) => {
    try {
        // Создание объекта FormData и добавление полей
        const formData = new FormData();
        formData.append('title', placeData.title);
        formData.append('description', placeData.description);
        formData.append('address', placeData.address);
        formData.append('type', placeData.type);
        formData.append('coordinates', placeData.coordinates);
        formData.append('file', placeData.file);

        // Выполнение POST запроса для отправки места
        const response = await $api.post(`${OUR_API_ENDPOINTS.places}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        return response.data;
    } catch (error: any) {
        // Обработка ошибок
        if (error.response && error.response.data && error.response.data.message) {
            throw new Error('Failed to create place: ' + error.response.data.message);
        } else {
            throw new Error('Failed to create place: ' + error.message);
        }
    }
};

