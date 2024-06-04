export interface HintsResponse {
    best_travels: Array<{ id: number, title: string,description:string,mean_score:number,img:string,count_users:number}>;
    friends_travels: Array<{ id: number, title: string,description:string,mean_score:number,img:string,count_users:number}>;
    upcoming_travels: Array<{ id: number, title: string,description:string,mean_score:number,img:string,count_users:number}>;
}
