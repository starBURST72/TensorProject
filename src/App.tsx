import React,{useState,useEffect} from 'react';
import './styles/App.css';
import {Header} from "./components/Header/Header";
import {ElementInfo} from "./components/SelectedElement/SelectedElement";
import MapComponent from './components/Map/MapComponent';

interface IElement {
    name: string;
    address: string;
    order: number;
}

function App() {
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

    return (
        <div className="app">
            <Header onElementSelect={handleElementSelect} />
            {selectedElement && selectedElement.order != 0 && (
                <ElementInfo element={selectedElement} />
            )}
            {selectedElement && selectedElement.order === 0 && (
                <MapComponent />
            )}
        </div>
    );
}

export default App;
