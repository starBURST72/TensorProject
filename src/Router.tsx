import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './App';
import Auth from './pages/Auth/Auth';


const Router = () =>(
    <BrowserRouter>
    <Routes>
        <Route path='/' element={<App/>}>
        </Route>
        <Route path='/auth' element={<Auth/>}>
        </Route>
    </Routes>
    </BrowserRouter>
)