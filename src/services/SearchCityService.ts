import axios, {AxiosResponse} from "axios";
import {SearchResponse} from "../Models/responses/SearchResponse";
import {token} from "../http/constants";


export const GetCity = async (
    query: string
): Promise<SearchResponse> => {
    try {
        const response: AxiosResponse<SearchResponse> = await axios.post<SearchResponse>(
            'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address',
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

