import React, { useEffect, useRef, useState, useCallback, useLayoutEffect } from 'react';
import "./MapNewComponent3.css";
import axios from 'axios';
import Sidebar from '../SideBar/Sidebar';
import { AutoComplete, Button, Space, Typography } from 'antd';
import { GetCity } from '../../services/SearchCityService';
import { getPLacesInCity } from '../../services/TravelService';

type MarkerFields = {
    coordinates: [number, number],
    hint: string;
}

type PlacesInCityFields = {
    location: {
        center: [number, number], // starting position [lng, lat]
        zoom: number // starting zoom
    },
    markerProps: MarkerFields[]
};

export default function MapNewComponent3() {
    const [location, setLocation] = useState({ center: [65.541227, 57.152985], zoom: 17 });
    const mapRef = useRef<ymaps.Map | null>(null);
    const [loading, setLoading] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [options, setOptions] = useState<{ value: string }[]>([]);
    const [placesInCuty, setPlacesInCuty] = useState<PlacesInCityFields | null>(null);
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [selectedPlace, setSelectedPlace] = useState<MarkerFields | null>(null);

    useEffect(() => {
        const onFinishRequests = async () => {
            try {
                const responsePlacesInCuty = await getPLacesInCity({ city: 'Тюмень', type: 'Все' });
                setPlacesInCuty(responsePlacesInCuty);
                console.log(responsePlacesInCuty);
            } catch (error) {
                console.error('Error:', error);
            }
        };
        onFinishRequests();
    }, []);

    useEffect(() => {
        const ymaps = window.ymaps;
        ymaps.ready(() => {
            if (!mapRef.current && placesInCuty) {
                mapRef.current = new ymaps.Map("map", placesInCuty.location);
                mapRef.current.controls.remove('geolocationControl'); // удаляем геолокацию
                mapRef.current.controls.remove('searchControl'); // удаляем поиск
                mapRef.current.controls.remove('trafficControl'); // удаляем контроль трафика
                mapRef.current.controls.remove('typeSelector'); // удаляем тип
                mapRef.current.controls.remove('fullscreenControl'); // удаляем кнопку перехода в полноэкранный режим
                mapRef.current.controls.remove('rulerControl'); // удаляем контрол правил
                placesInCuty.markerProps.forEach((marker) => {
                    const newPlacemark = new ymaps.Placemark(marker.coordinates, { hintContent: marker.hint });
                    newPlacemark.events.add(['click'], (event: ymaps.MapEvent) => {
                        setSelectedPlace(marker)
                        setSidebarVisible(true);
                    });
                    mapRef.current?.geoObjects.add(newPlacemark);
                });
            }
        });
    }, [placesInCuty]);
    const handleSearch = async () => {
        try {
            setLoading(true);
            const response = await axios.get('https://geocode-maps.yandex.ru/1.x/', {
                params: {
                    apikey: '',
                    geocode: inputValue,
                    format: 'json',
                },
            });

            const coords = response.data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(' ');
            setLocation({ center: [parseFloat(coords[0]), parseFloat(coords[1])], zoom: 17 });
        } catch (error) {
            console.error('Ошибка при запросе геокодирования:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearchCity = async (value: string) => {
        if (value) {
            try {
                const responseData = await GetCity(value);
                const newOptions = responseData.suggestions.map(suggestion => ({
                    value: `${suggestion.data.city}`
                }));
                setOptions(newOptions);
            } catch (error) {
                console.error(error);
            }
        } else {
            setOptions([]);
        }
    };
    // Обработчики и остальная часть компонента остаются без изменений
    return (
        <div className="map-container">
            <div className="overlay-container">
                {loading && <div className="loader">Loading...</div>}
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
                <Sidebar visible={sidebarVisible} onClose={() => setSidebarVisible(false)} place={selectedPlace} />
            </div>
            <div className="map" id='map'></div>
            
        </div>
    );
}