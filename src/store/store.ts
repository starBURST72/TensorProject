import { IUser } from "../Models/IUser";
import { makeAutoObservable } from "mobx";
import AuthService from "../services/AuthService";
import axios from "axios";
import { AuthResponse } from "../Models/responses/AuthResponse";
import { OUR_API_ADDRESS } from "../http/constants";
import { ICity } from "../Models/ICity";
import $api from "../http";

const CITY_STORAGE_KEY = "selectedCity";
const TYPE_OF_PLACES_STORAGE_KEY = "typeOfPlaces";

export default class Store {
    username=''
    img=''
    id=0
    isAuth = false;
    city = {} as ICity;
    typeOfPlaces = 'Все'
    constructor() {
        makeAutoObservable(this);
        this.city = {
            nameCity: "Москва", // Задайте город по умолчанию
            center: [55.755814, 37.617635], // Координаты Москвы
            zoom: 12 // Зум по умолчанию
        };
        this.loadCityFromLocalStorage();
        this.loadTypeOfPlacesFromLocalStorage();
    }



    setAuth(bool: boolean): void {
        this.isAuth = bool;
    }
    setUsername(username: string): void {
        this.username = username;
    }
    setId(id: number): void {
        this.id = id;
    }
    setImg(img: string): void {
        this.img = img;
    }
    setCity(city: ICity): void {
        this.city = city;
        this.saveCityToLocalStorage();
    }

    setTypeOfPlaces(type: string): void {
        this.typeOfPlaces = type;
        this.saveTypeOfPlacesToLocalStorage();
    }

    async login(username: string, password: string): Promise<void> {
        try {
            const response = await AuthService.login(username, password);
            localStorage.setItem("token", response.data.access_token);
            localStorage.setItem("refresh_token",response.data.refresh_token);
            console.log(response.data);
            this.setAuth(true);
            this.setUsername(response.data.username);
            this.setId(response.data.id);
            this.setImg(response.data.img);
        } catch (err: any) {
            console.log(err.response?.data?.message);
        }
    }

    async reg(email: string, username: string, password: string): Promise<void> {
        try {
            const response = await AuthService.reg(email, username, password);
            localStorage.setItem("token", response.data.access_token);
            localStorage.setItem("refresh_token",response.data.refresh_token);
            console.log(response.data);
            this.setAuth(true);
            this.setUsername(response.data.username);
            this.setId(response.data.id);
            this.setImg(response.data.img);
        } catch (err: any) {
            console.log(err.response?.data?.message);
        }
    }

    async logout() {
        try {
            const response = await AuthService.logout();
            localStorage.removeItem("token");
            localStorage.removeItem("refresh_token");
            // localStorage.removeItem("selectedCity");
            // localStorage.removeItem("typeOfPlaces");
            console.log(response.data);
            this.setAuth(false);
            this.setUsername('');
            this.setId(0);
            this.setImg('');
        } catch (err: any) {
            console.log(err.response?.data?.message);
        }
    }

    async checkAuth() {
        try {
            const response = await $api.post<AuthResponse>(`/refresh_token`, { withCredentials: true })
            localStorage.setItem("token", response.data.access_token);
            localStorage.setItem("refresh_token",response.data.refresh_token);
            console.log(response.data);
            this.setAuth(true);
            this.setUsername(response.data.username);
            this.setId(response.data.id);
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

    async changeTypeOfPlace(type: string) {
        try {
            this.setTypeOfPlaces(type);
        } catch (err: any) {
            console.log(err.response?.data?.message);
        }
    }

    saveCityToLocalStorage(): void {
        localStorage.setItem(CITY_STORAGE_KEY, JSON.stringify(this.city));
    }

    loadCityFromLocalStorage(): void {
        const storedCity = localStorage.getItem(CITY_STORAGE_KEY);
        if (storedCity) {
            this.city = JSON.parse(storedCity);
        }
    }

    saveTypeOfPlacesToLocalStorage(): void {
        localStorage.setItem(TYPE_OF_PLACES_STORAGE_KEY, this.typeOfPlaces);
    }

    loadTypeOfPlacesFromLocalStorage(): void {
        const storedType = localStorage.getItem(TYPE_OF_PLACES_STORAGE_KEY);
        if (storedType) {
            this.typeOfPlaces = storedType;
        }
    }




}