import React, { useContext, useEffect, useState } from 'react'
import './FriendsPage.css';
import { ConfigProvider, Menu, MenuProps, Spin, Typography } from 'antd';
import { getFriends } from '../../services/FriendsService';
import FriendCard from '../../components/FriendCard/FriendCard';
import { Context } from '../..';
import { Link } from 'react-router-dom';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
    {
        label: 'Ваши друзья',
        key: 'friends',

    },
    {
        label: 'Входящие заявки',
        key: 'received',
    },
    {
        label: 'Исходящие заявки',
        key: 'sent',
    },
];

type FriendFields = {
    id: number,
    name: string,
    surname: string,
    img: any,
    username: string,
    // status: number
};

export default function FriendsPage() {
    const [current, setCurrent] = useState('friends');
    const [isLoading, setIsLoading] = useState(true);
    const [userFriendsRes, setUserFriendsRes] = useState<FriendFields[] | null>(null)
    const [userFriendsSentRes, setUserFriendsSentRes] = useState<FriendFields[] | null>(null)
    const [userFriendsReceivedRes, setUserFriendsReceivedRes] = useState<FriendFields[] | null>(null)
    const { store } = useContext(Context);
    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };

    useEffect(() => {

        const onFinishRequests = async () => {
            try {


                const responseUserFriendsInfo = await getFriends(store.id)
                setUserFriendsRes(responseUserFriendsInfo.friends)
                setUserFriendsSentRes(responseUserFriendsInfo.pending_sent)
                setUserFriendsReceivedRes(responseUserFriendsInfo.pending_received)
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
        <div className='friendsConteiner'>
            <Typography.Title level={3} className="settings-header">Друзья</Typography.Title>
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
                    <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} style={{ fontSize: '20px', width: 700, caretColor: 'transparent' }} />
                </ConfigProvider>

                {
                    current === 'friends' ?
                        <div className="friendList">
                            {
                                userFriendsRes?.length === 0 ? (
                                    <Typography.Title level={3}>Друзей нет</Typography.Title>
                                ) : (
                                    userFriendsRes?.map(friend =>
                                        <Link to={`/profile/${friend.id}`}>
                                            <FriendCard {...friend} key={friend.id} />
                                        </Link>
                                    )
                                )
                            }
                        </div>
                        : current === 'received' ?
                            <div className="friendList">
                                {
                                    userFriendsReceivedRes?.length === 0 ? (
                                        <Typography.Title level={3}>Входящих заявок нет</Typography.Title>
                                    ) : (
                                        userFriendsReceivedRes?.map(friend =>
                                            <Link to={`/profile/${friend.id}`}>
                                                <FriendCard {...friend} typeOflist="received" key={friend.id} />
                                            </Link>
                                        )
                                    )
                                }
                            </div>
                            :
                            <div className="friendList">
                                {
                                    userFriendsSentRes?.length === 0 ? (
                                        <Typography.Title level={3}>Исходящих заявок нет</Typography.Title>
                                    ) : (
                                        userFriendsSentRes?.map(friend =>
                                            <Link to={`/profile/${friend.id}`}>
                                                <FriendCard {...friend} typeOflist="sent" key={friend.id} />
                                            </Link>
                                        )
                                    )
                                }
                            </div>
                }


            </div>
        </div>
    )
}
