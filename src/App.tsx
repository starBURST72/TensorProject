import React,{useState} from 'react';
import './styles/App.css';
import {Header} from "./components/Header/Header";

import {ElementInfo} from "./components/SelectedElement/SelectedElement";

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
        </div>
    );
}

export default App;
