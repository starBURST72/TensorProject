import React,{useState} from 'react';
import './styles/App.css';
import {Routes,Route} from "react-router-dom";
import MapPage from "./pages/MapPage";
import NotFound from "./pages/NotFound";
import HomePage from "./pages/HomePage";
import Auth from "./pages/Auth/Auth";
import Layout from "./components/Layout/Layout";
import { Context } from "./components/Context/AppContext";

function App() {
    const [signedIn, setSignedIn] = useState<boolean>(false);
    return (
        <div className="app">
            <Context.Provider value={{ signedIn, setSignedIn }}>
                {signedIn ?
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
                            <Route index element={<HomePage/>}/>
                            <Route path="map" element={<MapPage/>}/>
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
