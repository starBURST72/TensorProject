import React, { useState, useEffect, useCallback } from "react";
import './Header.css';
import logo from '../../img/logo2.png';
import { elements } from "../ElementsList/ElementsList";
import Sidebar from "../SideBar/Sidebar";
import {Link} from "react-router-dom";

interface IElement {
    name: string;
    address: string;
    order: number;
}
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
export function Header({ onElementSelect }: { onElementSelect: (element: IElement | null) => void }) {
    const [activeElement, setActiveElement] = useState<number | null>(null);

    // Загрузка выбранного элемента из локального хранилища при загрузке компонента
    useEffect(() => {
        const savedActiveElement = localStorage.getItem('activeElement');
        if (savedActiveElement) {
            setActiveElement(parseInt(savedActiveElement));
        }
    }, []);

    // Сохранение выбранного элемента в локальное хранилище при изменении
    useEffect(() => {
        if (activeElement !== null) {
            localStorage.setItem('activeElement', activeElement.toString());
        }
    }, [activeElement]);

    const handleClick = useCallback((order: number) => {
            const selected = elements.find(el => el.order === order);
            if (selected) {
                onElementSelect(selected);
                setActiveElement(order);
                localStorage.setItem('activeElement', order.toString()); // Сохраняем выбранный элемент в локальное хранилище
            }

    }, [activeElement, onElementSelect]);

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
                                    <Link to="/map" className={`nav-list__link ${activeElement === element.order ? 'nav-list__link--active' : ''}`}>{element.order}</Link>
                                </li>
                            ))}
                        </ul>
                        <div><a href="/auth">auth</a></div>
                        <Sidebar adventures={adventures}/>
                    </div>
                </div>
            </div>
        </nav>
    );
}