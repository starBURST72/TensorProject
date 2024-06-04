export interface TimelineItem {
    id: number;
    title: string;
    type: string;
    place_id: number;
    coordinates: string;
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