import { IUser } from "../Models/IUser";
import { makeAutoObservable } from "mobx";
import AuthService from "../services/AuthService";
import axios from "axios";
import { AuthResponse } from "../Models/responses/AuthResponse";
import { OUR_API_ADDRESS } from "../http/constants";
import { ICity } from "../Models/ICity";
export default class Store {
    user = {} as IUser;
    isAuth = false;
    city = {} as ICity;

    constructor() {
        makeAutoObservable(this);
        this.city = {
            nameCity: "Москва", // Задайте город по умолчанию
            center: [55.755814, 37.617635], // Координаты Москвы
            zoom: 12 // Зум по умолчанию
        };
    }



    setAuth(bool: boolean): void {
        this.isAuth = bool;
    }
    setUser(user: IUser): void {
        this.user = user;
    }

    setCity(city: ICity): void {
        this.city = city;
    }

    async login(username: string, password: string): Promise<void> {
        try {
            const response = await AuthService.login(username, password);
            localStorage.setItem("token", response.data.access_token);
            console.log(response.data);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (err: any) {
            console.log(err.response?.data?.message);
        }
    }

    async reg(email: string, username: string, password: string): Promise<void> {
        try {
            const response = await AuthService.reg(email, username, password);
            localStorage.setItem("token", response.data.access_token);
            console.log(response.data);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (err: any) {
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
        } catch (err: any) {
            console.log(err.response?.data?.message);
        }
    }

    async checkAuth() {
        try {
            const response = await axios.get<AuthResponse>(`${OUR_API_ADDRESS}/refresh_token`, { withCredentials: true })
            localStorage.setItem("token", response.data.access_token);
            console.log(response.data);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (err: any) {
            console.log(err.response?.data?.message);
        }
    }

    async infoAboutCity(inputCity: string) {
        try {

            const response = await axios.get('https://geocode-maps.yandex.ru/1.x/', {
                params: {
                    apikey: '8dd7f097-6399-475c-bb7f-1139673cf402',
                    geocode: inputCity,
                    format: 'json',
                },
            });

            const coords = response.data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(' ');
            const nameCity = response.data.response.GeoObjectCollection.featureMember[0].GeoObject.name;
            console.log(nameCity)
            // setGeoCodecCoordinates([parseFloat(coords[1]), parseFloat(coords[0])]);
            const cityData: ICity = {
                nameCity: nameCity,
                center: [parseFloat(coords[1]), parseFloat(coords[0])],
                zoom: 12
            };
            this.setCity(cityData);

        } catch (err: any) {
            console.log(err.response?.data?.message);
        }
    }

    // const handleSearch = async () => {
    //     try {
    //         setLoading(true); // Устанавливаем состояние загрузки в true
    //         const response = await axios.get('https://geocode-maps.yandex.ru/1.x/', {
    //             params: {
    //                 apikey: '8dd7f097-6399-475c-bb7f-1139673cf402',
    //                 geocode: inputValue,
    //                 format: 'json',
    //             },
    //         });

    //         const coords = response.data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(' ');
    //         // setGeoCodecCoordinates([parseFloat(coords[1]), parseFloat(coords[0])]);
    //         setPoint({center: [ parseFloat(coords[0]), parseFloat(coords[1])], zoom: 17})
    //         setLocation({center: [ parseFloat(coords[0]), parseFloat(coords[1])], zoom: 17})
    //     } catch (error) {
    //         console.error('Ошибка при запросе геокодирования:', error);
    //     } finally {
    //         setLoading(false); // Устанавливаем состояние загрузки обратно в false после завершения запроса
    //     }
    // };


}