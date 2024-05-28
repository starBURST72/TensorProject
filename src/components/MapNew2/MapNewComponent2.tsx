import React, { useEffect, useRef, useState, useCallback } from 'react';
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
};

export default function MapNewComponent2() {
    const [location, setLocation] = useState<YMapLocationRequest>({ center: [65.541227, 57.152985], zoom: 17 });
    const mapRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [options, setOptions] = useState<{ value: string }[]>([]);

    const initMap = useCallback(async (responsePlacesInCuty: PlacesInCityFields) => {
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

            const { YMapZoomControl, YMapGeolocationControl } = await ymaps3.import('@yandex/ymaps3-controls@0.0.1');
            const { YMapDefaultMarker } = await ymaps3.import('@yandex/ymaps3-markers@0.0.1');

            const map = new YMap(
                mapRef.current,
                { location: responsePlacesInCuty.location, showScaleInCopyrights: true },
                [new YMapDefaultSchemeLayer({})],
            );

            map.addChild(new YMapDefaultFeaturesLayer({}));

            map.addChild(
                new YMapControls({ position: 'left' })
                    .addChild(new YMapZoomControl({}))
            );

            map.addChild(
                new YMapControls({ position: 'bottom left' })
                    .addChild(new YMapGeolocationControl({}))
            );

            responsePlacesInCuty.markerProps.forEach((markerSource) => {
                const marker = new YMapDefaultMarker(markerSource);
                map.addChild(marker);
            });

        } else {
            console.log("Ref на элемент карты не установлен");
        }
    }, []);

    useEffect(() => {
        const onFinishRequests = async () => {
            try {
                const responsePlacesInCuty = await getPLacesInCity({ city: 'Тюмень', type: 'Все' });
                initMap(responsePlacesInCuty);
                console.log(responsePlacesInCuty);
            } catch (error) {
                console.error('Error:', error);
            }
        };
        onFinishRequests();
    }, [initMap]);

    const handleSearch = async () => {
        try {
            setLoading(true);
            const response = await axios.get('https://geocode-maps.yandex.ru/1.x/', {
                params: {
                    apikey: '8dd7f097-6399-475c-bb7f-1139673cf402',
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

    return (
        <div className="map-container" >
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
            </div>
            <div className="map" ref={mapRef}></div>
        </div>
    );
}
