import React, { useState,useCallback } from "react";
import './Header.css';
import logo from '../../img/logo2.png';
import {elements} from "../ElementsList/ElementsList";
import Sidebar from "../SideBar/Sidebar";

interface IElement {
    name: string;
    address: string;
    order: number;
}

export function Header({ onElementSelect }: { onElementSelect: (element: IElement | null) => void }) {
    const [activeElement, setActiveElement] = useState<number | null>(null);

    const handleClick = useCallback((order: number) => {
        if (activeElement === order) {
            setActiveElement(null);
            onElementSelect(null);
        } else {
            const selected = elements.find(el => el.order === order);
            if (selected) {
                onElementSelect(selected);
                setActiveElement(order);
            }
        }
    }, [activeElement, onElementSelect]);

    const adventures = ['Маршрут 1', 'Маршрут 2', 'Маршрут 3'];

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
                                <li key={element.order} className="nav-list__item" onClick={() => handleClick(element.order)}>
                                    <a href="#" className={`nav-list__link ${activeElement === element.order ? 'nav-list__link--active' : ''}`}>{element.order}</a>
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