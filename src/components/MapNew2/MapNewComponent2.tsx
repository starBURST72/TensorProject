import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
// @ts-ignore
import { YMapControlButton, YMapControls, YMapMarker, type YMapLocationRequest, type YMapZoomLocation } from 'ymaps3';
import "./MapNewComponent2.css";
import axios from 'axios';
import Sidebar from '../SideBar/Sidebar';
import { AutoComplete, Button, Space, Typography } from 'antd';
import { GetCity } from '../../services/SearchCityService';
import MapMarker from '../MapMarker/MapMarker';
import { LOCATION, markerProps } from './common';

import { getPLacesInCity } from '../../services/TravelService';

type PlacesInCityFields = {
    location: {
        center: [number, number], // starting position [lng, lat]
        zoom: number // starting zoom
    },
    markerProps:
    {
        coordinates: [number, number]
    }[]
    // [
    // {
    //     coordinates: [65.5600105653111, 57.14883932510754] as LngLat,

    // },
    // {
    //     coordinates: [65.55036168655934, 57.1485671873132] as LngLat,

    // },
    // {
    //     coordinates: [65.5340378278529, 57.15222291358625] as LngLat,

    // }
    // ]
};

export default function MapNewComponent2() {
    const [location, setLocation] = useState<YMapLocationRequest>({ center: [65.541227, 57.152985], zoom: 17 });
    const mapRef = useRef(null);
    const [loading, setLoading] = useState(false); // Состояние для отслеживания загрузки
    const [inputValue, setInputValue] = useState('');
    // const [point, setPoint] = useState({ center: [65.541227, 57.152985], zoom: 14 });
    const [options, setOptions] = React.useState<{ value: string }[]>([]);
    // const markerRef = useRef<YMapMarker | null>(null);
    // const [placesInCuty, setPlacesInCuty] = useState<PlacesInCityFields>({
    //     location: {
    //         center: [50, 60], // starting position [lng, lat]
    //         zoom: 20 // starting zoom
    //     },
    //     markerProps:
    //         [
    //             {
    //                 coordinates: [1, 1]
    //             }
    //         ]
    // });
    const prevPlacesInCuty = useRef({});

    // useEffect(() => {
    //     prevPlacesInCuty.current = placesInCuty;
    // }, [placesInCuty]);

    useEffect(() => {

        const onFinishRequests = async () => {
            try {

                const responsePlacesInCuty = await getPLacesInCity({ city: 'Тюмень', type: 'Все' })

                // setPlacesInCuty(()=>responsePlacesInCuty)
                initMap(responsePlacesInCuty);
                console.log(responsePlacesInCuty)

            } catch (error) {
                console.error('Error:', error);
            }
        };
        onFinishRequests()
    }, []);
    async function initMap(responsePlacesInCuty:PlacesInCityFields) {
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


            // const map = new YMap(mapRef.current, { location: location, });
            const { YMapZoomControl, YMapGeolocationControl } = await ymaps3.import('@yandex/ymaps3-controls@0.0.1');
            const { YMapDefaultMarker } = await ymaps3.import('@yandex/ymaps3-markers@0.0.1');


            const map = new YMap(
                // Pass the link to the HTMLElement of the container
                mapRef.current,
                // Pass the map initialization parameters
                { location: responsePlacesInCuty.location, showScaleInCopyrights: true },
                // Add a map scheme layer
                [new YMapDefaultSchemeLayer({})],

            );

            map.addChild(new YMapDefaultFeaturesLayer({}));

            // Using YMapControls you can change the position of the control.
            map.addChild(
                // Here we place the control on the right
                new YMapControls({ position: 'left' })
                    // Add the first zoom control to the map
                    .addChild(new YMapZoomControl({}))
            );

            map.addChild(
                // Using YMapControls you can change the position of the control
                new YMapControls({ position: 'bottom left' })
                    // Add the geolocation control to the map
                    .addChild(new YMapGeolocationControl({}))
            );

            responsePlacesInCuty.markerProps.forEach((markerSource) => {
                const marker = new YMapDefaultMarker(markerSource);
                map.addChild(marker);
            });
            // map.addChild(new YMapDefaultSchemeLayer({}));
            // map.addChild(new YMapDefaultFeaturesLayer({}));



        } else {
            console.log("Ref на элемент карты не установлен");
        }
    }

    // useEffect(() => {

       


        
    //         initMap();
        

    //     return () => {
    //         ''
    //     }
    // }, [ mapRef, placesInCuty, prevPlacesInCuty]);


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
            
        } catch (error) {
            console.error('Ошибка при запросе геокодирования:', error);
        } finally {
            setLoading(false); // Устанавливаем состояние загрузки обратно в false после завершения запроса
        }
    };

    const handleSearchCity = async (value: string) => {
        if (value) {
            try {
                const responseData = await GetCity(value);
                const newOptions = responseData.suggestions.map(suggestion => ({
                    value: `${suggestion.data.city}`
                }))
                setOptions(newOptions);
            } catch (error) {
                console.error(error);
            }
        } else {
            setOptions([]);
        }
    };

    return (
        <div className="map-container" >

            {/* <MapLocation location={location} /> */}
            <div className="overlay-container">
                {loading && <div className="loader">Loading...</div>}
                {/* <div className='searchConteiner'>
                    <h2> Выбранный город</h2>
                    <div className='SearcgLineAndButton'>
                        <input
                            className='SearchLine'
                            placeholder='Полный адрес'
                            value={inputValue}
                            onChange={e => setInputValue(e.target.value)}
                        />
                        <button onClick={() => handleSearch()}>Показать</button>
                    </div>
                </div> */}
                <div className='searchConteiner'>
                    <Typography.Title level={4}>Выбранный город</Typography.Title>
                    <Space.Compact size='middle'>
                        <AutoComplete
                            style={{ width: 200 }}
                            options={options}
                            onSearch={handleSearchCity}
                            placeholder="Введите город"
                            filterOption={(inputValue, option) =>
                                option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                            }
                        />
                        <Button type="primary" style={{ backgroundColor: '#5c62ec' }}>Поехали!</Button>
                    </Space.Compact>
                </div>
                <Sidebar />
            </div>
            <div className="map" ref={mapRef}>

            </div>


        </div>
    );
}
