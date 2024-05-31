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
    markerProps: {
      id: number;
      title: string;
      description: string;
      score: number;
      coordinates: [number, number];
      photo: string
    }[];
  }
export interface PlaceFullResponse {
    id: number,
    title: string,
    description: string,
    score: number,
    coordinates: [number, number],
    address: string,
    type: string,
    photo: string
}