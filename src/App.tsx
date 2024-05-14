import React, { useEffect, useState } from 'react';
import './styles/App.css';
import { Routes, Route } from "react-router-dom";
import MapPage from "./pages/MapPage.css/MapPage";
import NotFound from "./pages/NotFoundPage/NotFound";
import HomePage from "./pages/HomePage/HomePage";
import Auth from "./pages/Auth/Auth";
import Layout from "./components/Layout/Layout";
import { Context, ContextTravel } from "./components/Context/AppContext";
import { useNavigate } from "react-router-dom";
import TravelsPage from './pages/TravelsPage/TravelsPage';

interface Travel {
    id: number;
    title: string;
    description: string;
}

function App() {
    const [isAuth, setAuth] = useState<boolean>(false);
    const [travel, setTravel] = useState<Travel>({id:0,title:'Выберите маршрут',description:'Описание'});

    useEffect(() => {
        const navElement = document.querySelector('nav');
        const navHeight = navElement?.offsetHeight || 0;
        document.documentElement.style.setProperty('--nav-height', `${navHeight}px`);
    }, []); 

    useEffect(() => {
        if (localStorage.getItem('auth')) { setAuth(true); }

    }, [])

    let navigate = useNavigate();
    useEffect(() => {
        if (isAuth) {
            return navigate("/map");
        } else { return navigate("/Auth"); }
    }, [isAuth]);
    
    return (
        <div className="app">
            <Context.Provider value={{ isAuth, setAuth }}>
                {isAuth ?
                    <ContextTravel.Provider value={{ travel, setTravel }}>
                        <Routes>
                            <Route path='/' element={<Layout />}>
                                <Route index element={<HomePage />} />
                                <Route path="map" element={<MapPage />} />
                                <Route path="*" element={<NotFound />} />
                                <Route path="travels" element={<TravelsPage />} />
                            </Route>
                        </Routes>
                    </ContextTravel.Provider>
                    :
                    <Routes>
                        <Route path='/' element={<Layout />}>
                            <Route index element={<HomePage />} />
                            <Route path="*" element={<NotFound />} />
                            <Route path="Auth" element={<Auth />} />

                            <Route path="map" element={<MapPage />} />
                        </Route>
                    </Routes>
                }

            </Context.Provider>
        </div>
    );
}

export default App;
