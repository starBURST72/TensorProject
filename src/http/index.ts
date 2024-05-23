import axios from 'axios';
import { OUR_API_ADDRESS} from "./constants";
import {AuthResponse} from "../Models/responses/AuthResponse";

const $api =axios.create({
    withCredentials: true,
    baseURL: OUR_API_ADDRESS,
})
$api.interceptors.request.use((config)=>{
    config.headers.Authorization=`Bearer ${localStorage.getItem('token')}`
    return config;
})


$api.interceptors.response.use((config)=>{
    return config;
},async (error)=>{
    const OriginalReq = error.config;
    if(error.response.status === 401 && error.config && !error.config._isRetry){
        OriginalReq._isRetry=true;
        try {
            const response = await axios.get<AuthResponse>(`${OUR_API_ADDRESS}/refresh-token`,{withCredentials:true})
            localStorage.setItem('token',response.data.access_token);
            return $api.request(OriginalReq);
        }catch(error){
            console.log("Не авторизован");
        }
    } throw error;
})
export default $api;


