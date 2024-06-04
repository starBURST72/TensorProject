import "./ProfilePage.css"
import React, { useContext, useEffect, useState } from 'react';
import TravelCard from "../../components/RouteCard/TravelCard";
import type { MenuProps } from 'antd';
import { Menu, ConfigProvider, Divider, Avatar, Typography } from "antd";
import ava from '../../img/ava.jpg'
import { historyTravels } from "../../storage/storage";
import { createdTravels } from '../../storage/storage';
import { getUserProfileInfo, getUserTravelsInfo } from "../../services/UserProfileService";
import { Spin } from 'antd';
import FriendsOnProfile from "../../components/FriendsOnProfile/FriendsOnProfile";
import { getFriends } from "../../services/FriendsService";
import InterestsOnProfile from "../../components/InterestsOnProfile/InterestsOnProfile";
import { Context } from "../..";
import Title from "antd/es/skeleton/Title";

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
    email: string,
    username: string,
    name: string,
    surname: string,
    id: number,
    img: string,
    gender: string,
    birthday: string,
    city: string,
    interests:
    {
        interest_id: number,
        name: string
    }[]


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


    }

type FriendFields = {
    friend_id: number,
    name: string,
    surname: string,
    img: any,
    username: string,
    // status: number
};



function ProfilePage() {
    const [current, setCurrent] = useState('travels');
    const [createdTravelsRes, setCreatedTravelsRes] = useState<TravelInfoFields[]>([]);
    const [historyTravelsRes, setHistoryTravelsRes] = useState<TravelInfoFields[]>([]);
    const [nowTravelRes, setNowTravelRes] = useState<TravelInfoFields | null>(null);
    const [userInfoRes, setUserInfoRes] = useState<UserInfoFields | null>(null)
    const [userFriendsRes, setUserFriendsRes] = useState<FriendFields[] | null>(null)
    const [isLoading, setIsLoading] = useState(true);
    const { store } = useContext(Context);
    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };

    useEffect(() => {

        const onFinishRequests = async () => {
            try {

                const responseUserInfo = await getUserProfileInfo(store.id)
                setUserInfoRes(responseUserInfo)
                const responseUserFriendsInfo = await getFriends(store.id)
                console.log(responseUserFriendsInfo)
                setUserFriendsRes(responseUserFriendsInfo.friends)
                const responseUserCreatedTravelInfo = await getUserTravelsInfo(store.id, 'creating')
                console.log(responseUserCreatedTravelInfo)
                setCreatedTravelsRes(responseUserCreatedTravelInfo)
                const responseUserPassedTravelInfo = await getUserTravelsInfo(store.id, 'passed')
                console.log(responseUserPassedTravelInfo)
                setHistoryTravelsRes(responseUserPassedTravelInfo)



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
                    <Avatar className="avatar" src={userInfoRes?.img} />


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
                                createdTravelsRes.length > 0 ? (
                                    createdTravelsRes?.map(createdTravel =>
                                        <TravelCard {...createdTravel} key={createdTravel.id} />)
                                ) : (
                                    <Typography.Title level={3}>Нет созданных маршрутов</Typography.Title>
                                )
                            }

                            {/* <TravelCard /> */}
                        </div>
                        :
                        <div className="route-list">
                            {
                                historyTravelsRes.length > 0 ? (
                                    historyTravelsRes?.map(historyTravel =>
                                        <TravelCard {...historyTravel} key={historyTravel.id} />)
                                ) : (
                                    <Typography.Title level={3}>Нет пройденных маршрутов</Typography.Title>
                                )
                            }

                        </div>
                }


            </div>


        </div>
    );
};
export default ProfilePage;