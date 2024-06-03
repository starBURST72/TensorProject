import { Avatar, Button, Flex, Space } from 'antd'
import React from 'react'
import "./FriendCard.css"
import { PlusSquareOutlined, CloseOutlined, CheckOutlined } from '@ant-design/icons';
import { answerOfInviteToFriends } from '../../services/FriendsService';

interface FriendsProps {
    id: number;
    name: string;
    surname: string;
    img: string;
    username: string;
    typeOflist?: string

    //   image: string;
}


export default function FriendCard(props: FriendsProps) {
    const { id, name, surname, img, username, typeOflist } = props;


    const clickAnswerOfInvite = async (action: 'accept' | 'reject') => {
        await answerOfInviteToFriends(action, id)
    };

    return (
        <div className="friendCardContainer">

            <Space>
                <Avatar className="friendlCardAvatar" src={img} />
                <div className="friendCardNameAndLogin">
                    <div className="friendName">{`${surname} ${name}`}</div>
                    <div className="friendUsername">{`${username}`}</div>
                </div>
            </Space>

            {typeOflist === 'received' && (
                <Flex gap="small" wrap>
                    <Button onClick={() => clickAnswerOfInvite('accept')} icon={<CheckOutlined />} size={'large'} style={{ color: 'green' }} />
                    <Button onClick={() => clickAnswerOfInvite('reject')} icon={<CloseOutlined />} size={'large'} style={{ color: 'red' }} />

                </Flex>
            )}
            {typeOflist === 'sent' && (
                <Flex gap="small" wrap>

                    <Button icon={<CloseOutlined />} size={'large'} style={{ color: 'red' }} />

                </Flex>
            )}
        </div>
    )
}
