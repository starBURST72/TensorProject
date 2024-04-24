import React,{useState} from 'react';
import './styles/App.css';
import {Header} from "./components/Header/Header";

import {ElementInfo} from "./components/SelectedElement/SelectedElement";
import { Sidebar } from 'react-pro-sidebar';
import SidebarComponent from './components/SideBar/Sidebar';
import MapComponent from './components/Map/MapComponent';

interface IElement {
    name: string;
    address: string;
    order: number;
}

function App() {
    const [selectedElement, setSelectedElement] = useState<IElement | null>(null);

    const handleElementSelect = (element: IElement | null) => {
        setSelectedElement(element);
    };
    return (
        <div className="app">
            <Header onElementSelect={handleElementSelect} />
            {selectedElement && (
                    <ElementInfo element={selectedElement} />
            )}
            {/* <SidebarComponent collapsed={false} onToggleCollapse={()=>false}/> */}
            <MapComponent/>
        </div>
    );
} 

export default App;
