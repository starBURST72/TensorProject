export interface TimelineItem {
    id:number;
    place_id?: number;
    title?: string;
    type?: string;
    creator_user_id?: number;
    coordinates?: string;
    travel_date:string;
    mean_score?:number;
    description?:string;
    order:number;
    photos: {
        file: string
    }[];
}

export interface UserTravel{
    members: { user_id:number,
    username:string}[],
    id:string;
    title:string;
    description:string;
    owner_user_id:string;
    Date_start:string;
    Date_end:string;
    img:string;
    status:string;
    places:TimelineItem[]|[];
}

export interface UserPut{
    members: { user_id:number}[],
    title:string;
    description:string;
    owner_user_id:string;
    Date_start:string;
    Date_end:string;
    img:string |null;
    status:string;
    places?:{
        place_id:number |undefined;
        order:number;
        date:string;
        description:string |undefined;
    }[]|[]
}