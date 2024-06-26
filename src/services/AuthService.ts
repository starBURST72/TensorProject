import $api from "../http";
import {AxiosResponse} from "axios";
import {AuthResponse} from "../Models/responses/AuthResponse";
export default class AuthService {
    static async login(username: string, password: string):Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>("/login", {username, password})
    }

    static async reg(email:string,username: string, password: string):Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>("/register", {email,username, password})
    }

    static async logout():Promise<AxiosResponse<void>> {
        return $api.post("/logout")
    }
}