import {Outlet} from "react-router-dom";
import {Header} from "../Header/Header";
import React, {useEffect, useState} from "react";

interface IElement {
    name: string;
    order: number;
    link: string;
}



const Layout: React.FC = () => {
    const [selectedElement, setSelectedElement] = useState<IElement | null>(null);


    useEffect(() => {
        const savedSelectedElement = localStorage.getItem('selectedElement');
        if (savedSelectedElement) {
            const parsedElement = JSON.parse(savedSelectedElement);
            setSelectedElement(parsedElement);
        }
    }, []);

    const handleElementSelect = (element: IElement | null) => {
        setSelectedElement(element);
        localStorage.setItem('selectedElement', JSON.stringify(element)); // Сохраняем выбранный элемент в локальное хранилище
    };
    return(
      <>
          <Header onElementSelect={handleElementSelect} />
        <Outlet/>

      </>
    );
}

export default Layout