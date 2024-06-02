import {UserTravel} from "../../Models/IUserTravel";

export const mockHintCardsFriends = [
    {
        id: '1',
        title: 'Friends Card 1',
        description: 'Description for friends card 1',
        mean_score: 4.5,
        img: 'https://i.pinimg.com/564x/17/65/2e/17652e3587eccdeda85737c8cff5152b.jpg',
        count_users: 100
    },
    {
        id: '2',
        title: 'Friends Card 2',
        description: 'Description for friends card 2',
        mean_score: 3.8,
        img: 'https://i.pinimg.com/236x/6e/35/82/6e3582e95a6966df1cc4b068f96f1711.jpg',
        count_users: 150
    }
];

export const mockHintCardsPopular = [
    {
        id: '3',
        title: 'Popular Card 1',
        description: 'Description for popular card 1',
        mean_score: 4.7,
        img: 'https://i.pinimg.com/236x/3e/50/ab/3e50ab57eb9542970841fbdfba26616f.jpg',
        count_users: 200
    },
    {
        id: '4',
        title: 'Popular Card 2',
        description: 'Description for popular card 2',
        mean_score: 4.9,
        img: 'https://i.pinimg.com/236x/9e/20/e7/9e20e7c8492e732c4b4da7e69a259300.jpg',
        count_users: 300
    }
];

export const mockHintCardsContinue = [
    {
        id: '5',
        title: 'Continue Card 1',
        description: 'Description for continue card 1',
        mean_score: 4.2,
        img: 'https://i.pinimg.com/736x/10/bc/61/10bc618a94224ad35fb3101e19cfd35f.jpg',
        count_users: 250
    },
    {
        id: '6',
        title: 'Continue Card 2',
        description: 'Description for continue card 2',
        mean_score: 3.9,
        img: 'https://i.pinimg.com/736x/4b/b7/ac/4bb7ac30e95d7965d1368e88ba18eb69.jpg',
        count_users: 180
    }
];

export const travelData: UserTravel[] = [
    {
        id: '1',
        title: 'European Adventure',
        description: 'A two-week trip through France, Italy, and Spain.',
        owner_user_id: 'user123',
        Date_start: '2022-06-01',
        Date_end: '2022-06-14',
        img: 'https://example.com/european-adventure.jpg',
        status: 'Completed',
        places: [
            {
                id: 1,
                title: 'Eiffel Tower',
                type: 'Attraction',
                place_id: 101,
                coordinates: '48.8584° N, 2.2945° E',
                img:"https://avatars.mds.yandex.net/get-altay/10812438/2a0000018a1925ffb27156ef6c710642cf34/L"
            },
            {
                id: 2,
                title: 'Colosseum',
                type: 'Historical Site',
                place_id: 102,
                coordinates: '41.8902° N, 12.4922° E',
                img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIVj-enfMwlOJjdM7IAr2RwTIW3RxVsLmdrg&s",
            },
            // more places...
        ],
    },
    {
        id: '2',
        title: 'Asian Exploration',
        description: 'A month-long trip through Japan, South Korea, and Thailand.',
        owner_user_id: 'user456',
        Date_start: '2022-07-01',
        Date_end: '2022-07-31',
        img: 'https://example.com/asian-exploration.jpg',
        status: 'Planned',
        places: [], // No places planned yet
    },
];

