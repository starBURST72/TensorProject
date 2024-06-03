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


// export type FullMarkerFields = {
//     id: number;
//     creator_user_id: number,
//     title: string;
//     description: string;
//     address: string,
//     type: string,
//     coordinates: string
//     mean_score: number;
//     photos: {
//         file: string
//     }[]
//     feedbacks:[]
// }

// export type PreviewMarkerFields = {
//     id: number;
//     creator_user_id: number,
//     title: string;
//     description: string;
//     address: string,
//     type: string,
//     coordinates: string
//     mean_score: number;
//     photos: {
//         file: string
//     }[]
// }

export interface PlacePreviewResponse {
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