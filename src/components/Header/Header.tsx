import React, { useContext } from "react";
import './Header.css';
import logo from '../../img/logo2.png';
import { elements } from "../ElementsList/ElementsList";
import { Context } from '../../index';
import { NavLink } from "react-router-dom";
import UserMenuDropdown from "../UserMenuDropdown/UserMenuDropdown";

interface IElement {
    name: string;
    key: number;
    link: string;
}

export function Header() {
    const {store } = useContext(Context);
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
                                store.isAuth && index !== elements.length - 1 ? (
                                    <li key={HeaderElements.key} className="nav-list__item">
                                        <NavLink to={HeaderElements.link}
                                            className={({ isActive }) => isActive ? 'nav-list__link--active' : 'nav-list__link'}>{HeaderElements.name}</NavLink>
                                    </li>
                                ) : !store.isAuth && index === elements.length - 1 ? (
                                    <li key={HeaderElements.key} className="nav-list__item">
                                        <NavLink to={HeaderElements.link}
                                            className={({ isActive }) => isActive ? 'nav-list__link--active' : 'nav-list__link'}>{HeaderElements.name}</NavLink>
                                    </li>
                                ) : null
                            ))}
                            {store.isAuth && (
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