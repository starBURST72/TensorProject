import React, { useLayoutEffect, useState,useEffect } from 'react';
import './styles/App.css';
import { Routes, Route } from "react-router-dom";
import MapPage from "./pages/MapPage.css/MapPage";
import NotFound from "./pages/NotFoundPage/NotFound";
import HomePage from "./pages/HomePage/HomePage";
import Auth from "./pages/Auth/Auth";
import Layout from "./components/Layout/Layout";
import { Context, ContextTravel } from "./components/Context/AppContext";
import { useNavigate,useLocation } from "react-router-dom";
import TravelsPage from './pages/TravelsPage/TravelsPage';
import SettingsPage from "./pages/SettingsPage/SettingsPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";


// interface TravelContextType {
//     travels: {
//       title: string;
//       description: string;
//       id: number;
//     }[];
//     setTravel: React.Dispatch<React.SetStateAction<any>>;
//   }


interface Travel {
    title: string;
    description: string;
    id: number;
  }

function App() {
    const [isAuth, setAuth] = useState<boolean>(false);
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
        const auth = localStorage.getItem('auth');
        if (auth) {
            setAuth(true);
        }
        setLoading(false);
    }, []);

    useLayoutEffect(() => {
        if (!loading) {
            if (isAuth) {
                if (location.pathname === '/Auth') {
                    navigate('/'); // Redirect to the home page if authenticated and on /auth
                }
            } else {
                navigate("/Auth");
            }
        }
    }, [isAuth, loading, navigate]);
    
    return (
        <div className="app">
            <Context.Provider value={{ isAuth, setAuth }}>
                {isAuth ?
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

            </Context.Provider>
        </div>
    );
}

export default App;
