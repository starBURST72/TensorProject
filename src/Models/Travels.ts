export interface IData{
    title: string;
    description: string;
    id: number
}
export default class Travels {
    protected _data: IData  ;
    constructor(data: IData) {
        this._data = data;
    }
}