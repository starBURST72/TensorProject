import React, {useLayoutEffect, useState, useEffect, useContext} from 'react';
import './styles/App.css';
import { Routes, Route } from "react-router-dom";
import MapPage from "./pages/MapPage.css/MapPage";
import NotFound from "./pages/NotFoundPage/NotFound";
import HomePage from "./pages/HomePage/HomePage";
import Auth from "./pages/Auth/Auth";
import Layout from "./components/Layout/Layout";
import {ContextTravel } from "./components/Context/AppContext";
import { useNavigate,useLocation } from "react-router-dom";
import TravelsPage from './pages/TravelsPage/TravelsPage';
import SettingsPage from "./pages/SettingsPage/SettingsPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import {Context} from "./index";
import {observer} from "mobx-react-lite";


interface Travel {
    title: string;
    description: string;
    id: number;
  }

function App() {
    const {store}=useContext(Context);
    const [travels, setTravels] = useState<Travel[]>([]);
    const [loading, setLoading] = useState(true);
    let location = useLocation();
    const [selectedTravel, setSelectedTravel] = useState<Travel | null>({
        title: 'Выберите маршрут',
        description: 'Описание маршрута',
        id: 0
      });
    let navigate = useNavigate();
    useEffect(() => {
        const navElement = document.querySelector('nav');
        const navHeight = navElement?.offsetHeight || 0;
        document.documentElement.style.setProperty('--nav-height', `${navHeight}px`);
    }, []);

    useEffect(() => {
        if (localStorage.getItem('token')){
            store.checkAuth()
        }
        // const auth = localStorage.getItem("token");
        // if (auth) {
        //     store.setAuth(true);
        // }
        setLoading(false);
    }, []);

    useLayoutEffect(() => {
        if (!loading) {
            if (store.isAuth) {
                if (location.pathname === '/Auth') {
                    navigate('/'); // Redirect to the home page if authenticated and on /auth
                }
            } else {
                navigate("/Auth");
            }
        }
    }, [store.isAuth, loading, navigate]);
    
    return (
        <div className="app">
            <h1>{store.isAuth?"ЗАЛОГИНЕН":"НЕАВТОРИЗОВАН"}</h1>
                {store.isAuth ?
                    <ContextTravel.Provider value={{ travels, setTravels, selectedTravel, setSelectedTravel }}>
                        <Routes>
                            <Route path='/' element={<Layout />}>
                                <Route index element={<HomePage />} />
                                <Route path="map" element={<MapPage />} />
                                <Route path="settings" element={<SettingsPage />} />
                                <Route path="profile" element={<ProfilePage />} />
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
                            <Route index element={<HomePage />} />
                            <Route path="map" element={<MapPage />} />
                        </Route>
                    </Routes>
                }
        </div>
    );
}

export default observer(App);
