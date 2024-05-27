import {AxiosResponse} from "axios";
import $api from "../http";
import {OUR_API_ENDPOINTS} from "../http/constants";
import {HintsResponse} from "../Models/responses/HintsResponse";

export const GetHintCards = async (
    query: string
): Promise<HintsResponse> => {
    try {
        const response: AxiosResponse<HintsResponse> = await $api.post<HintsResponse>(
            `${OUR_API_ENDPOINTS.HintCards}`,
            { query: query},
            {
                headers: {
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

