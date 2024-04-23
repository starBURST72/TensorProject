import React, { useState } from "react";
import './Header.css';
import logo from '../../img/logo2.png';
import {elements} from "../ElementsList/ElementsList";
import {ElementInfo} from "../SelectedElement/SelectedElement";

interface IElement {
    name: string;
    address: string;
    order: number;
}

export function Header() {
    const [selectedElement, setSelectedElement] = useState<IElement | null>(null);
    const [activeElement, setActiveElement] = useState<number | null>(null);

    const handleClick = (order: number) => {
        const selected = elements.find(el => el.order === order);
        if (selected) {
            setSelectedElement(selected);
            setActiveElement(order); // устанавливаем активный элемент
        }
    }

    return (
        <>
        <nav className="nav">
            <div className="container">
                <div className="nav-row">
                    <div className="logo"><img className="logo-img" src={logo}/>
                        <a href="" className="logo-text">Travel Together</a></div>
                    <ul className="nav-list">
                        {elements.map((element: IElement) => (
                            <li key={element.order} className="nav-list__item" onClick={() => handleClick(element.order)}>
                                <a href="#" className={`nav-list__link ${activeElement === element.order ? 'nav-list__link--active' : ''}`}>{element.order}</a>
                            </li>
                        ))}
                    </ul>
                </div>

            </div>
        </nav>
            {selectedElement && (
                <div>
                    <ElementInfo element={selectedElement} />
                </div>
            )}
        </>
    );
}