import React,{useContext} from "react";
import './Header.css';
import logo from '../../img/logo2.png';
import { ElementsList } from "../ElementsList/ElementsList";
import { Context } from '../Context/AppContext';
import {NavLink} from "react-router-dom";
import {Button} from "antd";

interface IElement {
    name: string;
    order: number;
    link: string;
}
const elements= ElementsList();
// const adventures = [
//     {
//         id: 1,
//         name: 'Маршрут 1'
//     },
//     {
//         id: 2,
//         name: 'Маршрут 2'
//     },
//     {
//         id: 3,
//         name: 'Маршрут 3'
//     }
// ]

export function Header() {
    const { isAuth,setAuth } = useContext(Context);
    function logout(){
        setAuth(false);
        localStorage.removeItem('auth');
    }
    return (
        <nav className="nav">
            <div className="container">
                <div className="nav-row">
                    <div className="logo">
                        <img className="logo-img" src={logo} alt="Travel Together Logo"/>
                        <a href="" className="logo-text">Travel Together</a>
                    </div>
                    <div className="nav-row">
                        <ul className="nav-list">
                            {elements.map((element: IElement, index: number) => (
                                isAuth && index !== elements.length - 1 ? (
                                    <li key={element.order} className="nav-list__item">
                                        <NavLink to={element.link}
                                                 className={({isActive}) => isActive ? 'nav-list__link--active' : 'nav-list__link'}>{element.name}</NavLink>
                                    </li>
                                ) : !isAuth && index === elements.length - 1 ? (
                                    <li key={element.order} className="nav-list__item">
                                        <NavLink to={element.link}
                                                 className={({isActive}) => isActive ? 'nav-list__link--active' : 'nav-list__link'}>{element.name}</NavLink>
                                    </li>
                                ) : null
                            ))}
                            {isAuth && (
                                <li className="nav-list__item">
                                    <Button onClick={() => logout()}>Exit</Button>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
}