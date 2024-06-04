import React, { useEffect, useRef, useState, useContext } from 'react';
import "./MapNewComponent3.css";
import { AutoComplete, Button, Select, SelectProps, Space, Spin, Typography } from 'antd';
import Sidebar from '../SideBar/Sidebar';
import { GetCity } from '../../services/SearchCityService';
import { CreateNewPlace, getOnePLaceInCity, getPlacesInCity } from '../../services/TravelService';
import { observer } from 'mobx-react-lite';
import { Context } from '../..';
import { FullMarkerFields, interestsStatic, PreviewMarkerFields } from "../../storage/storage";
import CreateNewPlaceModal from '../createNewPlace/CreateNewPlaceModal';

const parseCoordinates = (coordString: string): [number, number] => {
    const [latStr, lngStr] = coordString.split(',');

    if (latStr === undefined || lngStr === undefined) {
        throw new Error('Invalid coordinate string format');
    }

    const lat = parseFloat(latStr);
    const lng = parseFloat(lngStr);

    if (isNaN(lat) || isNaN(lng)) {
        throw new Error('Invalid coordinate values');
    }

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
    const [modalCreatePlaceOpen, setModalCreatePlaceOpen] = useState(false);
    const { store } = useContext(Context);

    useEffect(() => {
        const loadDataAndInitMap = async () => {
            try {
                // Fetch places data
                const responsePlacesInCuty = await getPlacesInCity(store.city.nameCity, store.typeOfPlaces);
                setPlacesInCuty(responsePlacesInCuty);

                // Initialize Yandex Maps after data is fetched
                const ymaps = window.ymaps;
                ymaps.ready(() => {
                    if (!mapRef.current) {
                        mapRef.current = new ymaps.Map("map", {
                            center: store.city.center,
                            zoom: store.city.zoom
                        });
                        mapRef.current.controls.remove('geolocationControl'); // удаляем геолокацию
                        mapRef.current.controls.remove('searchControl'); // удаляем поиск
                        mapRef.current.controls.remove('trafficControl'); // удаляем контроль трафика
                        mapRef.current.controls.remove('typeSelector'); // удаляем тип
                        mapRef.current.controls.remove('fullscreenControl'); // удаляем кнопку перехода в полноэкранный режим
                        mapRef.current.controls.remove('rulerControl'); // удаляем контрол правил
                    }

                    // Add markers to the map
                    responsePlacesInCuty.forEach((marker) => {
                        const newPlacemark = new ymaps.Placemark(parseCoordinates(marker.coordinates), { hintContent: marker.title });
                        newPlacemark.events.add(['click'], async (event: ymaps.MapEvent) => {
                            const fullPlaceInfo = await getOnePLaceInCity(marker.id);
                            setSelectedPlace(fullPlaceInfo);
                            setSidebarVisible(true);
                        });
                        mapRef.current?.geoObjects.add(newPlacemark);
                    });
                });
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setIsLoading(false); // Set loading state to false after map is initialized and markers are added
            }
        };

        loadDataAndInitMap();
    }, [store.city.nameCity, store.typeOfPlaces]);

    useEffect(() => {
        const ymaps = window.ymaps;
        ymaps.ready(() => {
            if (mapRef.current && placesInCuty) {
                // Update map center and zoom level when city changes
                mapRef.current.setCenter(store.city.center);
                mapRef.current.setZoom(store.city.zoom);
            }
        });
    }, [store.city.nameCity]);

    useEffect(() => {
        const ymaps = window.ymaps;
        ymaps.ready(() => {
            if (mapRef.current && placesInCuty) {
                // Clear existing markers and add new ones when places data changes
                mapRef.current.geoObjects.removeAll();
                placesInCuty.forEach((marker) => {
                    const newPlacemark = new ymaps.Placemark(parseCoordinates(marker.coordinates), { hintContent: marker.title });
                    newPlacemark.events.add(['click'], async (event: ymaps.MapEvent) => {
                        const fullPlaceInfo = await getOnePLaceInCity(marker.id);
                        setSelectedPlace(fullPlaceInfo);
                        setSidebarVisible(true);
                    });
                    mapRef.current?.geoObjects.add(newPlacemark);
                });
            }
        });
    }, [placesInCuty]);

    const toggleCreatePlaceModal = (visible: boolean) => {
        setModalCreatePlaceOpen(visible);
    };

    const handleChangeTypeOfPlaces = async (value: string) => {
        try {
            await store.changeTypeOfPlace(value);
            const responsePlacesInCuty = await getPlacesInCity(store.city.nameCity, value);
            setPlacesInCuty(responsePlacesInCuty);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleClickButtonCity = async () => {
        try {
            await store.infoAboutCity(cityValue);
            const responsePlacesInCuty = await getPlacesInCity(store.city.nameCity, store.typeOfPlaces);
            setPlacesInCuty(responsePlacesInCuty);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const onChangeCity = (data: string) => {
        setCityValue(data);
    };

    const onSelectType = async (data: string) => {
        await store.changeTypeOfPlace(data);
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

    const handleAddPLace = async (place: {
        title: string;
        description: string;
        address: string;
        type: string;
        coordinates: string;
        file: File;
    }) => {
        try {
            await CreateNewPlace(place);
            console.log('Место успешно добавлено', place);
        } catch (error) {
            console.error('Ошибка при добавлении места:', error);
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
                    <Button style={{ marginLeft: 0, marginTop: 20 }} onClick={() => toggleCreatePlaceModal(true)}>Добавить новое место</Button>
                </div>
                <Sidebar visible={sidebarVisible} onClose={() => setSidebarVisible(false)} place={selectedPlace} parseCoordinates={parseCoordinates} />
            </div>
            <div className="map" id='map'></div>
            <CreateNewPlaceModal
                visible={modalCreatePlaceOpen}
                onClose={() => toggleCreatePlaceModal(false)}
                onSubmit={handleAddPLace}
            />
        </div>
    );
});

export default MapNewComponent3;
