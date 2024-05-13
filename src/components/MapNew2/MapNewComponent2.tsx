import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
// @ts-ignore
import { YMapControlButton, YMapControls, type YMapLocationRequest, type YMapZoomLocation } from 'ymaps3';
import "./MapNewComponent2.css";
import axios from 'axios';
import Sidebar from '../SideBar/Sidebar';

export default function MapNewComponent2() {
    const [location, setLocation] = useState<YMapLocationRequest>({ center: [ 65.541227, 57.152985], zoom: 17 });
    const mapRef = useRef(null);
    const [loading, setLoading] = useState(false); // Состояние для отслеживания загрузки
    const [inputValue, setInputValue] = useState('');
    const [point, setPoint] = useState( { center: [ 65.541227, 57.152985], zoom: 17 });

    

    useEffect(() => {
        
        async function initMap() {
            await ymaps3.ready;

            if (mapRef.current) {
                

                const {
                    YMap,
                    YMapDefaultSchemeLayer,
                    YMapControls,
                    YMapDefaultFeaturesLayer,
                    YMapMarker,
                    YMapScaleControl,
                } = ymaps3;


                const map = new YMap(mapRef.current, { location: location, });



                map.addChild(new YMapDefaultSchemeLayer({}));
                map.addChild(new YMapDefaultFeaturesLayer({}));


            } else {
                console.log("Ref на элемент карты не установлен");
            }
        }

        initMap();
    }, [location, mapRef]);


    const handleSearch = async () => {
        try {
            setLoading(true); // Устанавливаем состояние загрузки в true
            const response = await axios.get('https://geocode-maps.yandex.ru/1.x/', {
                params: {
                    apikey: '8dd7f097-6399-475c-bb7f-1139673cf402',
                    geocode: inputValue,
                    format: 'json',
                },
            });

            const coords = response.data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(' ');
            // setGeoCodecCoordinates([parseFloat(coords[1]), parseFloat(coords[0])]);

            setLocation({ center: [parseFloat(coords[0]), parseFloat(coords[1])], zoom: 17 })
            console.log(location)
        } catch (error) {
            console.error('Ошибка при запросе геокодирования:', error);
        } finally {
            setLoading(false); // Устанавливаем состояние загрузки обратно в false после завершения запроса
        }
    };



    return (
        <div className="map-container" >

            {/* <MapLocation location={location} /> */}
            <div className="overlay-container">
                {loading && <div className="loader">Loading...</div>}
                <div className='searchConteiner'>
                    <h2>Введите адрес</h2>
                    <div className='SearcgLineAndButton'>
                        <input
                            className='SearchLine'
                            placeholder='Полный адрес'
                            value={inputValue}
                            onChange={e => setInputValue(e.target.value)}
                        />
                        <button onClick={() => handleSearch()}>Показать</button>
                    </div>
                </div>
                <Sidebar adventures={[]} />
            </div>
            <div className="map" ref={mapRef}>

            </div>


        </div>
    );
}
