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
            setSelectedElement(JSON.parse(savedSelectedElement));
        }
    }, []);

    const handleElementSelect = (element: IElement | null) => {
        if (element === selectedElement) {
            // Если текущий элемент уже выбран, делаем его неактивным
            setSelectedElement(null);
            localStorage.removeItem('selectedElement'); // Удаляем выбранный элемент из локального хранилища
        } else {
            setSelectedElement(element);
            localStorage.setItem('selectedElement', JSON.stringify(element)); // Сохраняем выбранный элемент в локальное хранилище
        }
    };

    return (
        <div className="app">
            <Header onElementSelect={handleElementSelect} />
            {selectedElement && (
                <ElementInfo element={selectedElement} />
            )}
            <MapComponent />
        </div>
    );
}

export default App;