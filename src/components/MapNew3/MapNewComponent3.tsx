import React, { useEffect, useRef, useState, useCallback, useLayoutEffect, useContext } from 'react';
import "./MapNewComponent3.css";
import axios from 'axios';
import Sidebar from '../SideBar/Sidebar';
import { AutoComplete, Button, Select, SelectProps, Space, Spin, Typography } from 'antd';
import { GetCity } from '../../services/SearchCityService';
import { getOnePLaceInCity, getPlacesInCity } from '../../services/TravelService';
import { PlacePreviewResponse } from '../../Models/Travels';
import { observer } from 'mobx-react-lite';
import Store from '../../store/store';
import { Context } from '../..';
import { FullMarkerFields, interestsStatic, PreviewMarkerFields, PreviewPlacesInCityFields } from "../../storage/storage";


const parseCoordinates = (coordString: string): [number, number] => {
    // Разделяем строку по запятой
    const [latStr, lngStr] = coordString.split(',');

    // Проверяем, что обе части существуют
    if (latStr === undefined || lngStr === undefined) {
        throw new Error('Invalid coordinate string format');
    }

    // Преобразуем строки в числа
    const lat = parseFloat(latStr);
    const lng = parseFloat(lngStr);

    // Проверяем, что оба значения являются числами
    if (isNaN(lat) || isNaN(lng)) {
        throw new Error('Invalid coordinate values');
    }

    // Возвращаем массив из двух чисел
    return [lat, lng];
};



const interests: SelectProps['options'] = interestsStatic.map(interest => ({
    label: interest,
    value: interest
}));


const MapNewComponent3 = observer(() => {
    const mapRef = useRef<ymaps.Map | null>(null);
    const [options, setOptions] = useState<{ value: string }[]>([]);
    const [placesInCuty, setPlacesInCuty] = useState<PreviewMarkerFields[] | null>(null);
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [selectedPlace, setSelectedPlace] = useState<FullMarkerFields | null>(null);
    const [cityValue, setCityValue] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const { store } = useContext(Context);
    useEffect(() => {
        const onFinishRequests = async () => {
            try {
                const responsePlacesInCuty = await getPlacesInCity(store.city.nameCity, store.typeOfPlaces);
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
        console.log(store.city.nameCity)
        try {
            ymaps.ready(() => {
                if (!mapRef.current && placesInCuty) {
                    mapRef.current = new ymaps.Map("map", {
                        center: store.city.center, 
                        zoom: store.city.zoom 
                    },);
                    mapRef.current.controls.remove('geolocationControl'); // удаляем геолокацию
                    mapRef.current.controls.remove('searchControl'); // удаляем поиск
                    mapRef.current.controls.remove('trafficControl'); // удаляем контроль трафика
                    mapRef.current.controls.remove('typeSelector'); // удаляем тип
                    mapRef.current.controls.remove('fullscreenControl'); // удаляем кнопку перехода в полноэкранный режим
                    mapRef.current.controls.remove('rulerControl'); // удаляем контрол правил
                    placesInCuty?.forEach((marker) => {
                        const newPlacemark = new ymaps.Placemark(parseCoordinates(marker.coordinates), { hintContent: marker.title });
                        newPlacemark.events.add(['click'], async (event: ymaps.MapEvent) => {
                            const fullPlaceInfo = await getOnePLaceInCity(marker.id)
                            setSelectedPlace(fullPlaceInfo)
                            setSidebarVisible(true);
                        });
                        mapRef.current?.geoObjects.add(newPlacemark);
                    });
                }


            });
        }
        catch (error) {
            console.error('Error:', error);
        } finally {
            setIsLoading(false)
        }

    }, [placesInCuty]);

    useEffect(() => {
        const ymaps = window.ymaps;
        console.log(store.city.nameCity)
        ymaps.ready(() => {
            if (mapRef.current && placesInCuty) {
                // Очистка существующих маркеров
                mapRef.current.setCenter(store.city.center);
                mapRef.current.setZoom(store.city.zoom);
            }
        });
    }, [store.city.nameCity]);

    useEffect(() => {
        const ymaps = window.ymaps;
        ymaps.ready(() => {
            if (mapRef.current && placesInCuty) {
                // Очистка существующих маркеров
                mapRef.current.geoObjects.removeAll();

                // Добавление новых маркеров
                placesInCuty?.forEach((marker) => {
                    const newPlacemark = new ymaps.Placemark(parseCoordinates(marker.coordinates), { hintContent: marker.title });
                    newPlacemark.events.add(['click'], async (event: ymaps.MapEvent) => {
                        const fullPlaceInfo = await getOnePLaceInCity(marker.id)
                        setSelectedPlace(fullPlaceInfo);
                        setSidebarVisible(true);
                    });
                    mapRef.current?.geoObjects.add(newPlacemark);
                });
            }
        });
    }, [placesInCuty]);

    const handleChangeTypeOfPlaces = async (value: string) => {
        const onFinishRequests = async () => {
            try {
                await store.changeTypeOfPlace(value)
                const responsePlacesInCuty = await getPlacesInCity(store.city.nameCity, value);
                setPlacesInCuty(responsePlacesInCuty);
                console.log(responsePlacesInCuty);
            } catch (error) {
                console.error('Error:', error);
            }
        };
        onFinishRequests();
    };

    const handleClickButtonCity = async () => {

        await store.infoAboutCity(cityValue)
        const responsePlacesInCuty = await getPlacesInCity(store.city.nameCity, store.typeOfPlaces);
        setPlacesInCuty(responsePlacesInCuty);
        console.log(store.city.nameCity)
    };

    const onChangeCity = (data: string) => {
        setCityValue(data);
    };

    const onSelectType = async (data: string) => {
        await store.changeTypeOfPlace(data)
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

    if (isLoading) {
        return (
            <div className="loading-container">
                <Spin tip="Загрузка..." />
            </div>
        );
    }

    return (
        <div className="map-container">
            <div className="overlay-container">
                
                <div className='searchConteiner'>
                    <Typography.Title level={4}>Выбранный город</Typography.Title>
                    <Space.Compact size='middle'>
                        <AutoComplete
                            style={{ width: 200 }}
                            defaultValue={store.city.nameCity}
                            options={options}
                            onSearch={handleSearchCity}
                            // onSelect={onSelectCity}
                            onChange={onChangeCity}
                            placeholder="Введите город"
                            filterOption={(inputValue, option) =>
                                option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                            }
                        />

                        <Button type="primary" style={{ backgroundColor: '#5c62ec' }} onClick={handleClickButtonCity}>Поехали!</Button>
                    </Space.Compact>
                    <Select
                        value={store.typeOfPlaces}
                        style={{ width: 200, marginTop: 20 }}
                        onChange={handleChangeTypeOfPlaces}
                        options={interests}
                        onSelect={onSelectType}
                    />
                    <Button style={{ marginLeft: 0, marginTop: 20 }}>Добавить новое место</Button>
                </div>

                <Sidebar visible={sidebarVisible} onClose={() => setSidebarVisible(false)} place={selectedPlace} parseCoordinates={parseCoordinates} />
            </div>
            <div className="map" id='map'></div>

        </div>
    );
})

export default MapNewComponent3;