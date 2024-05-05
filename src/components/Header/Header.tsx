import React from "react";
import './Header.css';
import logo from '../../img/logo2.png';
import { ElementsList } from "../ElementsList/ElementsList";
import Sidebar from "../SideBar/Sidebar";
import {NavLink} from "react-router-dom";

interface IElement {
    name: string;
    order: number;
    link: string;
}
const elements= ElementsList();
const adventures = [
    {
        id: 1,
        name: 'Маршрут 1'
    },
    {
        id: 2,
        name: 'Маршрут 2'
    },
    {
        id: 3,
        name: 'Маршрут 3'
    }
]
export function Header() {

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
                            {elements.map((element: IElement) => (
                                <li key={element.order} className="nav-list__item">
                                    <NavLink to={element.link} className={({isActive})=>isActive ? 'nav-list__link--active':'nav-list__link'}>{element.name}</NavLink>
                                </li>
                            ))}
                        </ul>
                        <Sidebar adventures={adventures}/>
                    </div>
                </div>
            </div>
        </nav>
    );
}