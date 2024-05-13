import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './App';
import Auth from './pages/Auth/Auth';
import MapPage from "./pages/MapPage.css/MapPage";


const Router = () =>(
    <BrowserRouter>
    <Routes>
        <Route path='/' element={<App/>}>

        </Route>
        <Route path='/map' element={<MapPage/>}>
            
        </Route>
        <Route path='/auth' element={<Auth/>}>
            
        </Route>
    </Routes>
    </BrowserRouter>
)