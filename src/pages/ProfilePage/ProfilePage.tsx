import "./ProfilePage.css"
import React, { useEffect, useState } from 'react';
import TravelCard from "../../components/RouteCard/TravelCard";
import type { MenuProps } from 'antd';
import { Menu, ConfigProvider, Divider, Avatar } from "antd";
import ava from '../../img/ava.jpg'
import { historyTravels, userInfo } from "../../storage/storage";
import { createdTravels } from '../../storage/storage';
import { getUserCreatedTravelsInfo, getUserHistoryTravelsInfo, getUserProfileInfo } from "../../services/UserProfileService";

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
    {
        label: 'Созданные',
        key: 'travels',

    },
    {
        label: 'История',
        key: 'history',
    },
];

type UserInfoFields = {
    // message: string,
    // data: {
    ava: any;
    name: string;
    surname: string;
    gender: string;//мб некторые поля здесь не надо, в профиле мы выводим только часть инфы, или можем сделать доп кнопку типа подробнее и там фул инфа
    birthDate: Date;//и это
    email: string;//и это
    username: string;
    city: string;
    interests: string[]
    // }
};

type TravelInfoFields =
    {
        id: number
        title: string
        description: string
        creatorLogin: string
        score: number
        photo: any
        places:
        {
            placeid: number
            placeName: string
            placeDescription: string
            placeType: string
            placePhoto: any
        }[]


    }[]

function ProfilePage() {
    const [current, setCurrent] = useState('travels');
    const [createdTravelsRes, setCreatedTravelsRes] = useState<TravelInfoFields>([
        {
            id: 0,
            title: '',
            description: '',
            creatorLogin: '',
            score: 0,
            photo: '',
            places: [
                {
                    placeid: 0,
                    placeName: '',
                    placeDescription: '',
                    placeType: '',
                    placePhoto: ''
                },
            ]
        },
    ]);
    const [historyTravelsRes, setHistoryTravelsRes] = useState<TravelInfoFields>([
        {
            id: 0,
            title: '',
            description: '',
            creatorLogin: '',
            score: 0,
            photo: '',
            places: [
                {
                    placeid: 0,
                    placeName: '',
                    placeDescription: '',
                    placeType: '',
                    placePhoto: ''
                },
            ]
        },
    ]);
    const [userInfoRes, setUserInfoRes] = useState<UserInfoFields>({
        // message: '',
        // data: {
        ava: '',
        name: '',
        surname: '',
        gender: '',
        birthDate: new Date(Date.now()),
        email: '',
        username: '',
        city: '',
        interests: ['']
        // }
    })
    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };

    useEffect(() => {

        const onFinishRequests = async () => {
            try {

                const responseUserInfo = await getUserProfileInfo(1)
                const responseUserCreatedTravelInfo = await getUserCreatedTravelsInfo(1)
                const responseUserHistoryTravelInfo = await getUserHistoryTravelsInfo(1)
                
                setUserInfoRes(()=>responseUserInfo)
                setCreatedTravelsRes(responseUserCreatedTravelInfo)
                setHistoryTravelsRes(responseUserHistoryTravelInfo)
                console.log(responseUserInfo)

            } catch (error) {
                console.error('Error:', error);
            }
        };
        onFinishRequests()
    }, []);

    return (

        <div className="profile-container">
            <div className="top">
                <Avatar className="avatar" src={userInfoRes.ava} />
                {/* <img className="avatar" src={ava}></img> */}

                <div className="user-info">
                    <div className="user-name">{`${userInfoRes.surname} ${userInfoRes.name}`}</div>
                    <div className="user-login">{userInfoRes.username}</div>
                    <div className="user-city">{userInfoRes.city}</div>
                </div>
            </div>

            <Divider>Пройденные маршруты</Divider>


            <div className="travelsList">
                <ConfigProvider
                    theme={{
                        components: {
                            Menu: {
                                horizontalItemSelectedColor: '#5c62ec'
                            },
                        },
                    }}
                >
                    <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} style={{ fontSize: '18px', width: '20%' }} />
                </ConfigProvider>

                {
                    current === 'travels' ?
                        <div className="route-list">
                            {
                                createdTravelsRes.map(createdTravel =>
                                    <TravelCard {...createdTravel} key={createdTravel.id}/>

                                )
                            }

                            {/* <TravelCard /> */}
                        </div>
                        :
                        <div className="route-list">
                            {
                                historyTravelsRes.map(historyTravel =>
                                    <TravelCard {...historyTravel} key={historyTravel.id}/>

                                )
                            }

                        </div>
                }


            </div>


        </div>
    );
};
export default ProfilePage;