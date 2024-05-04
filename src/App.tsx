import React,{useState,useEffect} from 'react';
import './styles/App.css';
import {Header} from "./components/Header/Header";
import {Routes,Route} from "react-router-dom";
import MapPage from "./pages/MapPage";
import NotFound from "./pages/NotFound";
import HomePage from "./pages/HomePage";
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
            {/*{selectedElement && selectedElement.order != 0 && (*/}
            {/*    <ElementInfo element={selectedElement} />*/}
            {/*)}*/}
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/map" element={<MapPage/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
            {/*{selectedElement && selectedElement.order === 0 && (*/}
            {/*    <MapComponent />*/}
            {/*)}*/}
        </div>
    );
}

export default App;
