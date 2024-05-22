import React, { useContext } from 'react'
import type { MenuProps } from 'antd';
import { Dropdown, Space, Avatar, Badge, Button } from 'antd';
import ava from '../../img/ava.jpg';
import { Context } from '../Context/AppContext';
import { ElementsList } from "../ElementsList/ElementsList";
import './UserMenuDropdown.css';

export default function UserMenuDropdown() {
    const { isAuth, setAuth } = useContext(Context);
    function logout() {
        setAuth(false);
        localStorage.removeItem('auth');
    }

    const items: MenuProps['items'] = [
        {
            label: 'Логин',
            key: '0',
            style:{fontWeight:"650"}
        },
        {
            type: 'divider',
        },
        {
            label: 'Профиль',
            key: '1',
        },
        {
            label: 'Календарь???',
            key: '2',
        },

        {
            label: 'Друзья',
            key: '3',
        },
        {
            label: 'Настройки',
            key: '4',
        },
        {

            key: '5',
            label: 'Exit',
            className:'exit-button',
            onClick:logout
            
            


        },
    ];
    console.log('jjjjjjjjj')
    return (
        <Dropdown menu={{ items }} trigger={['click']} >
            <a onClick={(e) => e.preventDefault()} >
                <Space >
                    <Badge count={0} >
                        <Avatar shape="circle" src={ava} />
                    </Badge>
                </Space>
            </a>
        </Dropdown>
    )
}
