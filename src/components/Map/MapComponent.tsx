import React, {useRef, useState } from 'react';
import { YMaps, Map, Placemark, ZoomControl, SearchControl} from '@pbe/react-yandex-maps';
import axios from 'axios';
import './MapComponent.css';





const MapComponent: React.FC = () => {
    const [inputValue, setInputValue] = useState('');
    const [addressText] = useState('');
    const [geoCodecCoordinates, setGeoCodecCoordinates] = useState([57.152985, 65.541227]);
    const [loading, setLoading] = useState(false); // Состояние для отслеживания загрузки

    const mapState = {
        center: [geoCodecCoordinates[0], geoCodecCoordinates[1]],
        zoom: 16
    };

    const searchControlRef = useRef(null);

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
            setGeoCodecCoordinates([parseFloat(coords[1]), parseFloat(coords[0])]);
        } catch (error) {
            console.error('Ошибка при запросе геокодирования:', error);
        } finally {
            setLoading(false); // Устанавливаем состояние загрузки обратно в false после завершения запроса
        }
    };

    const handleSearchControlResultChange = (event: any) => {
        const result = event.get('target').get('result');
        if (result.get('collection').get('children').get('length') > 0) {
            const firstResult = result.get('collection').get('children').get(0);
            setInputValue(firstResult.get('properties').get('name'));
            const coords = firstResult.get('geometry').get('coordinates');
            setGeoCodecCoordinates([coords[1], coords[0]]);
        }
    };

    return (
        <>
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
            <YMaps
                query={{
                    ns: "use-load-option",
                    apikey: "8dd7f097-6399-475c-bb7f-1139673cf402",
                    load: "Map,Placemark,control.ZoomControl,control.SearchControl"
                }}
            >
                <div style={{ width: '100%', height: 750 }}>
                    <Map style={{ width: '100%', height: 750 }} state={mapState}>
                        <ZoomControl/>
                        <SearchControl
                            ref={searchControlRef}
                            options={{
                                provider: 'yandex#search',
                            }}
                            events={{onChange: handleSearchControlResultChange}}
                        />
                        <Placemark geometry={[geoCodecCoordinates[0], geoCodecCoordinates[1]]}
                                   options={{
                                       //preset: 'islands#circleIcon',
                                       //iconColor: 'green',
                                   }}
                                   properties={{
                                       balloonContentHeader: inputValue,
                                       balloonContentBody: addressText
                                   }} />
                    </Map>
                </div>
            </YMaps>
        </>
    )
}

export default MapComponent;