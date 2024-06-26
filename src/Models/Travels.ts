export interface IData {
    title: string;
    description: string;
    id: number
}
export default class Travels {
    protected _data: IData;
    constructor(data: IData) {
        this._data = data;
    }
}


export interface PlacePreviewResponse {
    creator_user_id: number;
    title: string;
    id: number;
    description: string;
    address: string;
    date:string;
    type: string;
    coordinates: string;
    mean_score: number;
    photos: {
        file: string
    }[];
}
export interface PlaceFullResponse {
    id: number;
    creator_user_id: number,
    title: string;
    description: string;
    address: string,
    type: string,
    coordinates: string
    mean_score: number;
    photos: {
        file: string
    }[]
    feedbacks:[]
}