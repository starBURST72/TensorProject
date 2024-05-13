
import MapNewComponent2 from '../../components/MapNew2/MapNewComponent2';
import './MapPage.css';
import React, { useEffect } from "react";

export default function MapPage() {
    useEffect(() => {
        const navElement = document.querySelector('nav');
        const navHeight = navElement?.offsetHeight || 0;
        document.documentElement.style.setProperty('--nav-height', `${navHeight}px`);
    }, []);

    return (
        
        <div className='mapPage' id='mapPage'>
            
            <MapNewComponent2 />
            
        </div>

    );
}