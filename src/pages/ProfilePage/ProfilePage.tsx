import "./ProfilePage.css"
import React, { useContext, useEffect, useState } from 'react';
import TravelCard from "../../components/RouteCard/TravelCard";
import type { MenuProps } from 'antd';
import { Menu, ConfigProvider, Divider, Avatar, Typography, Image } from "antd";
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
import { useParams } from "react-router-dom";

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
    {
        label: 'Созданные',
        key: 'creating',

    },
    {
        label: 'История',
        key: 'passed',
    },
    {
        label: 'Текущие',
        key: 'now',
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
    const [nowTravelsRes, setNowTravelsRes] = useState<TravelInfoFields[]>([]);
    const [userInfoRes, setUserInfoRes] = useState<UserInfoFields | null>(null)
    const [userFriendsRes, setUserFriendsRes] = useState<FriendFields[] | null>(null)
    const [isLoading, setIsLoading] = useState(true);
    const { store } = useContext(Context);
    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };
    const { id } = useParams()
    useEffect(() => {

        const onFinishRequests = async () => {
            try {

                const responseUserInfo = await getUserProfileInfo(Number(id))
                console.log(responseUserInfo)
                setUserInfoRes(responseUserInfo)
                const responseUserFriendsInfo = await getFriends(Number(id))
                console.log(responseUserFriendsInfo)
                setUserFriendsRes(responseUserFriendsInfo.friends)
                const responseUserCreatedTravelInfo = await getUserTravelsInfo(Number(id), 'creating')
                console.log(responseUserCreatedTravelInfo)
                setCreatedTravelsRes(responseUserCreatedTravelInfo)
                const responseUserPassedTravelInfo = await getUserTravelsInfo(Number(id), 'passed')
                console.log(responseUserPassedTravelInfo)
                setHistoryTravelsRes(responseUserPassedTravelInfo)
                const responseUserNowTravelInfo = await getUserTravelsInfo(Number(id), 'now')
                console.log(responseUserNowTravelInfo)
                setNowTravelsRes(responseUserNowTravelInfo)



            } catch (error) {
                console.error('Error:', error);
            } finally {
                setIsLoading(false)
            }
        };
        onFinishRequests()
    }, [id]);

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
                    <Avatar className="avatar" src={userInfoRes?.img.substring(2, userInfoRes?.img.length-1)} />
                    {/* <img className="avatar" src={userInfoRes?.img} alt="ava" /> */}
                    {/* <Image src={userInfoRes?.img.substring(2, userInfoRes?.img.length-1)}/> */}


                    <div className="user-info">
                        <div className="user-name">{`${userInfoRes?.surname} ${userInfoRes?.name}`}</div>
                        <div className="user-login">{userInfoRes?.username}</div>
                        <div className="user-city">{userInfoRes?.city}</div>
                        {nowTravelsRes[0] &&
                            <div className="userTravelNow">{`Сейчас проходит: ${nowTravelsRes[0]?.title}`}</div>
                        }
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
                    <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} style={{ fontSize: '18px', width: '400px', caretColor: 'transparent' }} />
                </ConfigProvider>



                {
                    current === 'creating' ?
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
                        : current === 'passed' ?
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
                            :
                            <div className="route-list">
                                {
                                    nowTravelsRes.length > 0 ? (
                                        nowTravelsRes?.map(nowTravel =>
                                            <TravelCard {...nowTravel} key={nowTravel.id} />)
                                    ) : (
                                        <Typography.Title level={3}>Нет текущих маршрутов</Typography.Title>
                                    )
                                }

                            </div>
                }


            </div>


        </div>
    );
};
export default ProfilePage;