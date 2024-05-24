import "./ProfilePage.css"
import React, { useState } from 'react';
import TravelCard from "../../components/RouteCard/TravelCard";
import type { MenuProps } from 'antd';
import { Menu, ConfigProvider, Divider, Avatar } from "antd";
import ava from '../../img/ava.jpg'
import { historyTravels, userInfo } from "../../storage/storage";
import { createdTravels } from '../../storage/storage';

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

function ProfilePage() {
    const [current, setCurrent] = useState('travels');
    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };
    return (

        <div className="profile-container">
            <div className="top">
                <Avatar className="avatar" src={userInfo.ava} />
                {/* <img className="avatar" src={ava}></img> */}

                <div className="user-info">
                    <div className="user-name">{`${userInfo.surname} ${userInfo.name}`}</div>
                    <div className="user-login">{userInfo.username}</div>
                    <div className="user-city">{userInfo.city}</div>
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
                    <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} style={{ fontSize: '18px', width: '20%' }} />
                </ConfigProvider>

                {
                    current === 'travels' ?
                        <div className="route-list">
                            {
                                createdTravels.map(createdTravel =>
                                    <TravelCard {...createdTravel}/>

                                )
                            }

                            {/* <TravelCard /> */}
                        </div>
                        :
                        <div className="route-list">
                            {
                                historyTravels.map(historyTravel =>
                                    <TravelCard {...historyTravel}/>

                                )
                            }

                        </div>
                }


            </div>


        </div>
    );
};
export default ProfilePage;