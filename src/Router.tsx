import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './App';
import MapComponent from './components/Map/MapComponent';


const Router = () =>(
    <BrowserRouter>
    <Routes>
        <Route path='/' element={<App/>}>

        </Route>
        <Route path='/map' element={<MapComponent/>}>
            
        </Route>
    </Routes>
    </BrowserRouter>
)