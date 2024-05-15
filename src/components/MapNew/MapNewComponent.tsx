import React, {
    useCallback,
    useRef,
    useState,
    useContext,
    useMemo,
} from "react";
import "./MapNewComponent.css";
import {
    YMap,
    YMapComponentsProvider,
    YMapDefaultSchemeLayer,
    YMapDefaultFeaturesLayer,
    YMapListener,
    YMapFeature,
    YMapCollection,
    YMapControls,
    YMapGeolocationControl,
    YMapZoomControl,
    YMapHint,
    YMapDefaultMarker,
    YMapContainer,
    YMapControlButton,
    YMapHintContext,
    YMapMarker,
    YMapClusterer,

} from "ymap3-components";
import { location as LOCATION, features, apiKey } from "./locations";
import * as YMaps from "@yandex/ymaps3-types";
import { LngLat } from "@yandex/ymaps3-types";
import Sidebar from "../SideBar/Sidebar";
import axios from "axios";
import { YMapLocation } from "@yandex/ymaps3-types/imperative/YMap";




export default function MapNewComponent() {
    const [location, setLocation] = useState(LOCATION);
    const [markers, setMarkers] = useState([]);
    const [ymap, setYmap] = useState<YMaps.YMap>();
    const [inputValue, setInputValue] = useState('');
    const [addressText] = useState('');
    const [point, setPoint] = useState<YMapLocation>( { center: [ 65.541227, 57.152985], zoom: 17 });
    const [loading, setLoading] = useState(false); // Состояние для отслеживания загрузки


    // const ymapRef = useRef<any>(null);

    // const onMapLoad = (ymap: any) => {
    //     ymapRef.current = ymap;

    //     // Добавляем поисковую строку по адресу на карту
    //     const searchControl = ymap.controls.get("searchControl");
    //     if (!searchControl) {
    //         ymap.controls.add("searchControl", {
    //             float: "none",
    //             noPlacemark: false,
    //         });
    //     }
    // };


    const onUpdate = React.useCallback(({ location, mapInAction }: any) => {
        if (!mapInAction) {
            setLocation({
                center: location.center,
                zoom: location.zoom,
            });
        }
    }, []);


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
            setPoint({center: [ parseFloat(coords[0]), parseFloat(coords[1])], zoom: 17})
            setLocation({center: [ parseFloat(coords[0]), parseFloat(coords[1])], zoom: 17})
        } catch (error) {
            console.error('Ошибка при запросе геокодирования:', error);
        } finally {
            setLoading(false); // Устанавливаем состояние загрузки обратно в false после завершения запроса
        }
    };



    // const gridSizedMethod = useMemo(() => clusterByGrid({ gridSize: 64 }), []);

    return (
        <div className="mapnew">
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
                <Sidebar  />
            </div>
            <div className="map-container2">
                <YMapComponentsProvider apiKey={apiKey} lang="en_EN">
                    <YMap
                        key="map"
                        ref={(ymap: YMaps.YMap) => setYmap(ymap)}
                        location={location}
                        mode="vector"
                        theme="light"
                        
                    >
                        <YMapDefaultSchemeLayer />
                        <YMapDefaultFeaturesLayer />

                        <YMapListener onUpdate={onUpdate} />

                        <YMapDefaultMarker coordinates={point.center} />

                        <YMapControls position="bottom">
                            <YMapZoomControl />
                        </YMapControls>
                        <YMapControls position="bottom left">
                            <YMapGeolocationControl />
                        </YMapControls>



                    </YMap>
                </YMapComponentsProvider>
            </div>
        </div>
    );
}


