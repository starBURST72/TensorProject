import $api from "../http";
import {Axios, AxiosResponse} from "axios";
import {AuthResponse} from "../Models/responses/AuthResponse";
import {IUser} from "../Models/IUser";

export default class UserService {
    static fetchUsers(): Promise<AxiosResponse<IUser[]>> {
        return $api.get<IUser[]>(`/users`);
    }
}