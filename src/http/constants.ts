
// const publicUrl = process.env.PUBLIC_URL || '/';
// const serverUrl = `${publicUrl}mock`;

export const OUR_API_ADDRESS = 'https://backtenzer-production.up.railway.app';

export const token = "394badd151f838e17536fab3f960978a4b476f12";
export enum OUR_API_ENDPOINTS {
    register = 'register',
    auth = 'login',
    travels = 'travels',
    userTravel="user_travels",
    logout = 'logout',
    settings = 'settings',
    userProfile = 'userprofile',
    userInfo = 'userinfo',
    HintCards="HintCard",
    userCreatedTravelsInfo = 'usercreatedtravelsinfo',//////
    userHistoryTravelsInfo = 'userhistorytravelsinfo',
    places = 'places',
    typesOfPlaces = 'typesofplaces'
}