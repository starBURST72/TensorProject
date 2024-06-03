import "./ProfilePage.css"
import React, { useEffect, useState } from 'react';
import TravelCard from "../../components/RouteCard/TravelCard";
import type { MenuProps } from 'antd';
import { Menu, ConfigProvider, Divider, Avatar } from "antd";
import ava from '../../img/ava.jpg'
import { historyTravels, userInfo } from "../../storage/storage";
import { createdTravels } from '../../storage/storage';
import { getUserCreatedTravelsInfo, getUserHistoryTravelsInfo, getUserProfileInfo } from "../../services/UserProfileService";
import { Spin } from 'antd';
import FriendsOnProfile from "../../components/FriendsOnProfile/FriendsOnProfile";
import { getFriends } from "../../services/FriendsService";
import InterestsOnProfile from "../../components/InterestsOnProfile/InterestsOnProfile";

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

type FriendFields = {
    id: number,
    name: string,
    surname: string,
    img: any,
    username: string,
    // status: number
};

type Friends = {
    friends: FriendFields[];
};


function ProfilePage() {
    const [current, setCurrent] = useState('travels');
    const [createdTravelsRes, setCreatedTravelsRes] = useState<TravelInfoFields | null>(null);
    const [historyTravelsRes, setHistoryTravelsRes] = useState<TravelInfoFields | null>(null);
    const [userInfoRes, setUserInfoRes] = useState<UserInfoFields | null>(null)
    const [userFriendsRes, setUserFriendsRes] = useState<FriendFields[] | null>(null)
    const [isLoading, setIsLoading] = useState(true);
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
                const responseUserFriendsInfo = await getFriends(1)
                setUserInfoRes(responseUserInfo)
                setCreatedTravelsRes(responseUserCreatedTravelInfo)
                setHistoryTravelsRes(responseUserHistoryTravelInfo)
                setUserFriendsRes(responseUserFriendsInfo.friends)
                console.log(responseUserFriendsInfo)

            } catch (error) {
                console.error('Error:', error);
            } finally {
                setIsLoading(false)
            }
        };
        onFinishRequests()
    }, []);

    if (isLoading) {
        return (
            <div className="loading-container">
                <Spin tip="Загрузка..." />
            </div>
        );
    }
    
    return (

        <div className="profile-container">
            <div className="top">
                <div className="topConteiner">
                    <Avatar className="avatar" src={userInfoRes?.ava} />
                    {/* <img className="avatar" src={ava}></img> */}

                    <div className="user-info">
                        <div className="user-name">{`${userInfoRes?.surname} ${userInfoRes?.name}`}</div>
                        <div className="user-login">{userInfoRes?.username}</div>
                        <div className="user-city">{userInfoRes?.city}</div>
                    </div>
                </div>

                <div className="topConteiner">
                    {userInfoRes && <InterestsOnProfile interests={userInfoRes.interests} />}
                    {userFriendsRes && <FriendsOnProfile friends={userFriendsRes} />}
                </div>

            </div>

            <Divider>Маршруты</Divider>


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
                    <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} style={{ fontSize: '18px', width: '300px', caretColor: 'transparent' }} />
                </ConfigProvider>

                {
                    current === 'travels' ?
                        <div className="route-list">
                            {
                                createdTravelsRes?.map(createdTravel =>
                                    <TravelCard {...createdTravel} key={createdTravel.id} />

                                )
                            }

                            {/* <TravelCard /> */}
                        </div>
                        :
                        <div className="route-list">
                            {
                                historyTravelsRes?.map(historyTravel =>
                                    <TravelCard {...historyTravel} key={historyTravel.id} />

                                )
                            }

                        </div>
                }


            </div>


        </div>
    );
};
export default ProfilePage;