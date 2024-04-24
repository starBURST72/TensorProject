// Sidebar.tsx
import React, { useState } from 'react';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { FaBars } from 'react-icons/fa';

interface SidebarProps {
    collapsed: boolean;
    onToggleCollapse: () => void;
}

const SidebarComponent: React.FC<SidebarProps> = ({ collapsed, onToggleCollapse }) => {
    return (
        <>
            <FaBars className="cursor-pointer" onClick={onToggleCollapse} />
            <Sidebar collapsed={collapsed}>
                <Menu>
                    <MenuItem>Профиль</MenuItem>
                    <MenuItem>TravelTogether</MenuItem>
                    <SubMenu title="TravelTogether">
                        <MenuItem>Поиск маршрутов</MenuItem>
                        <MenuItem>Мои путешествия</MenuItem>
                        <MenuItem>Избранное</MenuItem>
                    </SubMenu>
                </Menu>
            </Sidebar>
        </>
    );
};

export default SidebarComponent;
