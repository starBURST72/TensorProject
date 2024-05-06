import MapComponent from '../../components/Map/MapComponent';
import MapNewComponent from '../../components/MapNew/MapNewComponent';
// import Sidebar from '../components/SideBar/Sidebar';
import './MapPage.css';
import React from "react";

export default function MapPage() {
    const a=document.querySelector('nav')?.offsetHeight
    console.log("fsdfsdfsdfsdfsdfs"+a)
    return (
        
        <div className='mapPage'>
            
            <MapNewComponent />
            
        </div>

    );
}