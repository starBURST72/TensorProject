import {IUser} from "../Models/IUser";
import {makeAutoObservable} from "mobx";
import AuthService from "../services/AuthService";
import axios from "axios";
import {AuthResponse} from "../Models/responses/AuthResponse";
import {OUR_API_ADDRESS} from "../http/constants";
export default class Store {
    user={} as IUser;
    isAuth=false;
    constructor(){
        makeAutoObservable(this);
    }

    setAuth(bool:boolean):void {
        this.isAuth=bool;
    }
    setUser(user:IUser):void {
        this.user = user;
    }

    async login(username:string, password:string):Promise<void> {
        try {
            const response = await AuthService.login(username, password);
            localStorage.setItem("token", response.data.access_token);
            console.log(response.data);
            this.setAuth(true);
            this.setUser(response.data.user);
        }catch(err:any){
            console.log(err.response?.data?.message);
        }
    }

    async reg(email:string,username:string, password:string):Promise<void> {
        try {
            const response = await AuthService.reg(email,username, password);
            localStorage.setItem("token", response.data.access_token);
            console.log(response.data);
            this.setAuth(true);
            this.setUser(response.data.user);
        }catch(err:any){
            console.log(err.response?.data?.message);
        }
    }

    async logout() {
        try {
            const response = await AuthService.logout();
            localStorage.removeItem("token");
            console.log(response.data);
            this.setAuth(false);
            this.setUser({} as IUser);
        }catch(err:any){
            console.log(err.response?.data?.message);
        }
    }

    async checkAuth(){
        try {
            const response = await axios.get<AuthResponse>(`${OUR_API_ADDRESS}/refresh-token`,{withCredentials:true})
            localStorage.setItem("token", response.data.access_token);
            console.log(response.data);
            this.setAuth(true);
            this.setUser(response.data.user);
        }catch(err:any){
            console.log(err.response?.data?.message);
        }
    }
}