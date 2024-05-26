import axios, {AxiosResponse} from "axios";
import {TravelResponse} from "../Models/ISearch";
const token= "394badd151f838e17536fab3f960978a4b476f12";

export const GetCity = async (
    query: string
): Promise<TravelResponse> => {
    try {
        const response: AxiosResponse<TravelResponse> = await axios.post<TravelResponse>(
            'http://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address',
            { query: query,
                "locations": [
                    {
                        "country": "*"
                    }
                ]},
            {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": "Token " + token,
                }
            }
        );
        console.log(response.data)
        return response.data;
    } catch (error: any) {
        // Обработка ошибок
        if (error.response && error.response.data && error.response.data.message) {
            throw new Error('Get city data failed: ' + error.response.data.message);
        } else {
            throw new Error('Get city data failed: ' + error.message);
        }
    }
};

