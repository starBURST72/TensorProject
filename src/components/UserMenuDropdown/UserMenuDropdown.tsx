import React, { useContext } from 'react'
import type { MenuProps } from 'antd';
import { Dropdown, Space, Avatar, Badge, Button } from 'antd';
import ava from '../../img/ava.jpg';
import './UserMenuDropdown.css';
import { Link } from 'react-router-dom';
import {Context} from '../../index'
import {observer} from "mobx-react-lite";


function UserMenuDropdown() {
    const {store}=useContext(Context);
    function logout(){
        store.logout();
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
            label: (
                <Link to={'/profile'}>
                    Профиль
                </Link>
                // <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                //   1st menu item
                // </a>
            ),

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
        // {
        //     label: 'Настройки',
        //     key: '4',
            
        // },
        {
            label: (
                <Link to={'/settings'}>
                    Настройки
                </Link>
                // <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                //   1st menu item
                // </a>
              ),
            key: 4,
        },
        {

            key: '5',
            label: 'Exit',
            className:'exit-button',
            onClick:logout
            
            


        },
    ];
    return (
        <Dropdown menu={{ items }} trigger={['click']} >
            <a onClick={(e) => e.preventDefault()} >
                <Space style={{cursor:"pointer"}}>
                    <Badge count={0} >
                        <Avatar shape="circle" size={'large'} src={ava} />
                    </Badge>
                </Space>
            </a>
        </Dropdown>
    )
}

export default UserMenuDropdown;