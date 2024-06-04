import React, { useContext, useEffect, useRef, useState } from "react";
import "./CreateTravel.css";
import { AutoComplete, Button, Input, List, Rate, Select, SelectProps, Switch } from 'antd';
import SideBarTravel from "../../components/SidebarTravel/SideBarTravel";
import { useNavigate, useParams } from "react-router-dom";
import MapNewComponent3 from "../../components/MapNew3/MapNewComponent3";
import { getPlacesInCity, GetUserTravel, UpdateUserTravel } from "../../services/TravelService";
import { interestsStatic, PreviewMarkerFields, PreviewPlacesInCityFields } from "../../storage/storage";
import { Context } from "../../index";
import { TimelineItem, UserTravel } from "../../Models/IUserTravel";
import { PlacePreviewResponse } from "../../Models/Travels";
import { GetCity } from "../../services/SearchCityService";

// const initialData = [
//     { id: 1, title: "Title1", description: "Очень хорошее место", rating: 4.2, address: "Тюмень, ул. Широтная 55", type: "Еда" },
//     { id: 2, title: "Title2", description: "Очень хорошее место", rating: 4.2, address: "Тюмень, ул. Максима Горького 27", type: "кино" },
//     { id: 3, title: "Title3", description: "Очень хорошее место", rating: 4.2, address: "Тюмень, ул. Харькова 23", type: "спорт" },
//     { id: 4, title: "Title4", description: "Очень хорошее место", rating: 4.2, address: "Тюмень, ул. Республики 92", type: "музей" },
// ];

const interests: SelectProps['options'] = interestsStatic.map(interest => ({
    label: interest,
    value: interest
}));

function CreateTravel() {
    const [initialData, setInitialData] = useState<PlacePreviewResponse[]>([]);
    let { id } = useParams();
    const { store } = useContext(Context);
    const [checked, setChecked] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredData, setFilteredData] = useState(initialData);
    const [timelineItems, setTimelineItems] = useState<TimelineItem[]>([]);
    const prevTimelineItemsRef = useRef<TimelineItem[]>();
    const [typeValue, setTypeValue] = useState('Все');
    const [placesInCity, setPlacesInCity] = useState<PlacePreviewResponse[] | null>(null);
    const [travel, setTravel] = useState<UserTravel | null>(null);
    const navigate = useNavigate();
    const [cityValue, setCityValue] = useState('');
    const [placesInCuty, setPlacesInCuty] = useState<PreviewMarkerFields[] | null>(null);
    const [options, setOptions] = useState<{ value: string }[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const responsePlacesInCity = await getPlacesInCity(store.city.nameCity, store.typeOfPlaces);
            setFilteredData(responsePlacesInCity);
            setInitialData(responsePlacesInCity);
        };

        fetchData();
    }, []);

    const onChangeCity = async (data: string) => {
        setCityValue(data);
        await store.infoAboutCity(cityValue);
        const responsePlacesInCuty = await getPlacesInCity(store.city.nameCity, store.typeOfPlaces);
        setPlacesInCuty(responsePlacesInCuty);
        console.log(responsePlacesInCuty)
        filterData();
    };
    useEffect(() => {
        filterData();
    }, [typeValue, cityValue, searchTerm]);

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

    useEffect(() => {
        const fetchData = async () => {
            if (id) {
                const userTravel: UserTravel | null = await GetUserTravel(id);
                setTravel(userTravel);
                if (userTravel && userTravel.places) {
                    setTimelineItems(userTravel.places);
                }
            }
        };

        fetchData();
    }, []);

    const handleUpdate = async () => {
        if (travel && travel.id !== undefined && travel.id !== null) {
            travel.places=timelineItems;
            const result = await UpdateUserTravel(travel);
            if (result) {
                navigate('/');
            } else {
                console.log('Update failed');
            }
        }
    };

    const onSelectType = (data: string) => {
        setTypeValue(data);
        filterData();
    };

    const handleChangeTypeOfPlaces = (value: string) => {
        const onFinishRequests = async () => {
            try {
                const responsePlacesInCity = await getPlacesInCity(store.city.nameCity, value);
                setPlacesInCity(responsePlacesInCity);
            } catch (error) {
                console.error('Error:', error);
            }
        };
        onFinishRequests();
    };


    const createTimelineItem = (item: any) => {
        const newTimelineItem = {
            id: timelineItems.length + 1,
            title: item.title,
            type: item.address,
            place_id: item.id,
            coordinates: item.coordinates,
            photos: item.photos && item.photos.length > 0 ? [{ file: item.photos[0].file }] : [],
        };

        setTimelineItems(prevTimelineItems => [...prevTimelineItems, newTimelineItem]);
    };

    const handleSearchChange = (e: any) => {
        const value = e.target.value.toLowerCase();
        setSearchTerm(value);
        filterData();
    };

    const filterData = () => {
        let filtered = initialData;
        if (typeValue !== 'Все') {
            filtered = filtered.filter(item => item.type === typeValue);
        }
        if (cityValue) {
            filtered = filtered.filter(item => item.address.includes(cityValue));
        }
        if (searchTerm) {
            filtered = filtered.filter(item =>
                item.title.toLowerCase().includes(searchTerm) ||
                item.description.toLowerCase().includes(searchTerm)
            );
        }
        setFilteredData(filtered);
    };

    return (
        <>
            <div className="trapezoid">
                <div className="switch-container">
                    Карта
                    <div className="switch">
                        <Switch
                            loading={false}
                            defaultChecked={false}
                            checked={checked}
                            onChange={setChecked}
                            style={{
                                backgroundColor: checked ? '#4CAF50' : '#ccc'
                            }}
                        />
                    </div>
                </div>
            </div>
            <div className="page-container">
                <div className="mainFrame">
                    {!checked ? (
                        <>
                            <div>
                                <Select
                                    value={typeValue}
                                    className="type-select"
                                    style={{ width: 200, marginTop: 20 }}
                                    onChange={handleChangeTypeOfPlaces}
                                    options={interests}
                                    onSelect={onSelectType}
                                />
                                <AutoComplete
                                    defaultValue={store.city.nameCity}
                                    options={options}
                                    className="city-autocomplete"
                                    onSearch={handleSearchCity}
                                    onSelect={onChangeCity}
                                    onChange={onChangeCity}
                                    placeholder="Введите город"
                                    filterOption={(inputValue, option) =>
                                        option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                    }
                                />
                                <Input
                                    className="search-bar"
                                    placeholder="текстовое поле"
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                />
                            </div>
                            <List
                                itemLayout="horizontal"
                                className="ListItems"
                                dataSource={filteredData}
                                renderItem={item => (
                                    <List.Item
                                        className="ListItem"
                                    >
                                        <List.Item.Meta
                                            className="Meta"
                                            title={item.title}
                                            description={item.description}
                                        />
                                        <div className="Rate">
                                            {item.mean_score} <Rate disabled defaultValue={5} count={1} />
                                            <Button onClick={() => createTimelineItem(item)}>Добавить</Button>
                                        </div>
                                    </List.Item>
                                )}
                            />
                        </>
                    ) : (
                        <MapNewComponent3 />
                    )}
                </div>
                <SideBarTravel timelineItems={timelineItems} setTimelineItems={setTimelineItems} handleUpdate={handleUpdate} travel={travel} setTravel={setTravel} />
            </div>
        </>
    );
}

export default CreateTravel;
