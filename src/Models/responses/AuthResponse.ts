import {IUser} from "../IUser";

export interface AuthResponse {
    access_token: string;
    refresh_token: string;
    username:string;
    id:number
}
