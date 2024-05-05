import React from 'react';
import './styles/App.css';
import {Routes,Route} from "react-router-dom";
import MapPage from "./pages/MapPage";
import NotFound from "./pages/NotFound";
import HomePage from "./pages/HomePage";
import Auth from "./pages/Auth/Auth";
import Layout from "./components/Layout/Layout";

function App() {

    return (
        <div className="app">
            <Routes>
                <Route path='/' element={<Layout/>}>
                    <Route index element={<HomePage/>}/>
                    <Route path="map" element={<MapPage/>}/>
                    <Route path="*" element={<NotFound/>}/>
                    <Route path="Auth" element={<Auth/>}/>
                </Route>
            </Routes>
            {/*{selectedElement && selectedElement.order === 0 && (*/}
            {/*    <MapComponent />*/}
            {/*)}*/}
        </div>
    );
}

export default App;
