import React, {useEffect, useState} from 'react';
import './styles/App.css';
import {Routes,Route} from "react-router-dom";
import MapPage from "./pages/MapPage";
import NotFound from "./pages/NotFound";
import HomePage from "./pages/HomePage";
import Auth from "./pages/Auth/Auth";
import Layout from "./components/Layout/Layout";
import { Context } from "./components/Context/AppContext";
import { useNavigate } from "react-router-dom";

function App() {
    const [isAuth, setAuth] = useState<boolean>(false);

    useEffect(()=>{
        if(localStorage.getItem('auth')){setAuth(true);}

    },[])

    let navigate = useNavigate();
    useEffect(() => {
        if (isAuth){
            return navigate("/");
        }else{return navigate("/Auth");}
    },[isAuth]);

    return (
        <div className="app">
            <Context.Provider value={{ isAuth, setAuth }}>
                {isAuth ?
                        <Routes>
                            <Route path='/' element={<Layout/>}>
                                <Route index element={<HomePage/>}/>
                                <Route path="map" element={<MapPage/>}/>
                                <Route path="*" element={<NotFound/>}/>
                            </Route>
                        </Routes>
                     :
                    <Routes>
                        <Route path='/' element={<Layout/>}>
                            <Route path="*" element={<NotFound/>}/>
                            <Route path="Auth" element={<Auth/>}/>
                        </Route>
                    </Routes>
                }

            </Context.Provider>
        </div>
    );
}

export default App;
