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
    id: number;
    title: string;
    description: string;
    score: number;
    coordinates: string;
    photos: {
        file: string
    }[]
}
export interface PlaceFullResponse {
    id: number,
    title: string,
    description: string,
    score: number,
    coordinates: string,
    address: string,
    type: string,
    photos: {
        file: string
    }[]
}