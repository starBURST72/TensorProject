import React, { useEffect, useRef, useState, useCallback, useLayoutEffect, useContext } from 'react';
import "./MapNewComponent3.css";
import axios from 'axios';
import Sidebar from '../SideBar/Sidebar';
import { AutoComplete, Button, Select, SelectProps, Space, Typography } from 'antd';
import { GetCity } from '../../services/SearchCityService';
import { getOnePLaceInCity, getPlacesInCity } from '../../services/TravelService';
import { PlacePreviewResponse } from '../../Models/Travels';
import { observer } from 'mobx-react-lite';
import Store from '../../store/store';
import { Context } from '../..';
// type MarkerFields = {
//     id: number
//     coordinates: [number, number]
//     title: string
// }

// type PlacesInCityFields = {
//     // location: {
//     //     center: [number, number], // starting position [lng, lat]
//     //     zoom: number // starting zoom
//     // },
//     markerProps: MarkerFields[]
// };
const interestsStatic = [
    'Все',
    'Еда',
    'концерты',
    'кино',
    'выставки',
    'кафе',
    'рестораны',
    'театр',
    'парк',
    'музей',
    'спорт',
];

const interests: SelectProps['options'] = interestsStatic.map(interest => ({
    label: interest,
    value: interest
}));

type FullMarkerFields = {
    id: number;
    title: string;
    description: string;
    score: number;
    coordinates: [number, number]
    photo:string
    address: string,
    type: string,
}

type PreviewMarkerFields = {
    id: number;
    title: string;
    description: string;
    score: number;
    coordinates: [number, number];
    photo: string
}

interface PreviewPlacesInCityFields {
    markerProps: PreviewMarkerFields[];
}

const MapNewComponent3 = observer(() => {
    const [location, setLocation] = useState({ center: [65.541227, 57.152985], zoom: 17 });
    const mapRef = useRef<ymaps.Map | null>(null);
    const [loading, setLoading] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [options, setOptions] = useState<{ value: string }[]>([]);
    const [placesInCuty, setPlacesInCuty] = useState<PreviewPlacesInCityFields | null>(null);
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [selectedPlace, setSelectedPlace] = useState<FullMarkerFields | null>(null);
    const [cityValue, setCityValue] = useState('');
    const [typeValue, setTypeValue] = useState('Все');
    const { store } = useContext(Context);
    useEffect(() => {
        const onFinishRequests = async () => {
            try {
                const responsePlacesInCuty = await getPlacesInCity(store.city.nameCity, 'Все');
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
        ymaps.ready(() => {
            if (!mapRef.current && placesInCuty) {
                mapRef.current = new ymaps.Map("map", {
                    center: store.city.center, // starting position [lng, lat]
                    zoom: store.city.zoom // starting zoom
                },);
                mapRef.current.controls.remove('geolocationControl'); // удаляем геолокацию
                mapRef.current.controls.remove('searchControl'); // удаляем поиск
                mapRef.current.controls.remove('trafficControl'); // удаляем контроль трафика
                mapRef.current.controls.remove('typeSelector'); // удаляем тип
                mapRef.current.controls.remove('fullscreenControl'); // удаляем кнопку перехода в полноэкранный режим
                mapRef.current.controls.remove('rulerControl'); // удаляем контрол правил
                placesInCuty.markerProps?.forEach((marker) => {
                    const newPlacemark = new ymaps.Placemark(marker.coordinates, { hintContent: marker.title });
                    newPlacemark.events.add(['click'], async (event: ymaps.MapEvent) => {
                        const fullPlaceInfo = await getOnePLaceInCity(marker.id)
                        setSelectedPlace(fullPlaceInfo)
                        setSidebarVisible(true);
                    });
                    mapRef.current?.geoObjects.add(newPlacemark);
                });
            }


        });
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
                placesInCuty.markerProps?.forEach((marker) => {
                    const newPlacemark = new ymaps.Placemark(marker.coordinates, { hintContent: marker.title });
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
    // const handleSearch = async () => {
    //     try {
    //         setLoading(true);
    //         const response = await axios.get('https://geocode-maps.yandex.ru/1.x/', {
    //             params: {
    //                 apikey: '',
    //                 geocode: inputValue,
    //                 format: 'json',
    //             },
    //         });

    //         const coords = response.data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(' ');
    //         setLocation({ center: [parseFloat(coords[0]), parseFloat(coords[1])], zoom: 17 });
    //     } catch (error) {
    //         console.error('Ошибка при запросе геокодирования:', error);
    //     } finally {
    //         setLoading(false);
    //     }
    // };
    const handleChangeTypeOfPlaces = (value: string) => {
        const onFinishRequests = async () => {
            try {
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
        const responsePlacesInCuty = await getPlacesInCity(store.city.nameCity, 'Все');
        setPlacesInCuty(responsePlacesInCuty);
        console.log(store.city.nameCity)
    };

    const onChangeCity = (data: string) => {
        setCityValue(data);
    };

    const onSelectType = (data: string) => {
        setTypeValue(data);
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
                        value={typeValue}
                        style={{ width: 200, marginTop: 20 }}
                        onChange={handleChangeTypeOfPlaces}
                        options={interests}
                        onSelect={onSelectType}
                    />
                    <Button style={{marginLeft:0, marginTop:20}}>Добавить новое место</Button>
                </div>
                
                <Sidebar visible={sidebarVisible} onClose={() => setSidebarVisible(false)} place={selectedPlace} />
            </div>
            <div className="map" id='map'></div>

        </div>
    );
})

export default MapNewComponent3;