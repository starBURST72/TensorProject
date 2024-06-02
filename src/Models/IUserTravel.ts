export interface TimelineItem {
    id: number;
    title: string;
    type: string;
    place_id: number;
    coordinates: string;
    img:string;
}

export interface UserTravel{
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
