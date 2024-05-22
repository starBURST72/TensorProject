import React, { useContext } from "react";
import './Header.css';
import logo from '../../img/logo2.png';
import { ElementsList } from "../ElementsList/ElementsList";
import { Context } from '../Context/AppContext';
import { NavLink } from "react-router-dom";
import { Button } from "antd";
import UserMenuDropdown from "../UserMenuDropdown/UserMenuDropdown";

interface IElement {
    name: string;
    key: number;
    link: string;
}
const elements = ElementsList();

export function Header() {
    const { isAuth, setAuth } = useContext(Context);
    // function logout() {
    //     setAuth(false);
    //     localStorage.removeItem('auth');
    // }
    return (
        <nav className="nav">
            <div className="header-container">
                <div className="nav-row">
                    <NavLink to='/'>
                        <div className="logo">

                            <img className="logo-img" src={logo} alt="Travel Together Logo" />
                            <a href="/" className="logo-text">Travel Together</a>


                        </div>
                    </NavLink>
                    <div className="nav-row">
                        <ul className="nav-list">
                            {elements.map((HeaderElements: IElement, index: number) => (
                                isAuth && index !== elements.length - 1 ? (
                                    <li key={HeaderElements.key} className="nav-list__item">
                                        <NavLink to={HeaderElements.link}
                                            className={({ isActive }) => isActive ? 'nav-list__link--active' : 'nav-list__link'}>{HeaderElements.name}</NavLink>
                                    </li>
                                ) : !isAuth && index === elements.length - 1 ? (
                                    <li key={HeaderElements.key} className="nav-list__item">
                                        <NavLink to={HeaderElements.link}
                                            className={({ isActive }) => isActive ? 'nav-list__link--active' : 'nav-list__link'}>{HeaderElements.name}</NavLink>
                                    </li>
                                ) : null
                            ))}
                            {/* <li>
                                <UserMenuDropdown/>
                            </li> */}
                            {isAuth && (
                                <li key={elements.length} className="nav-list__item">
                                    <UserMenuDropdown/>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
}