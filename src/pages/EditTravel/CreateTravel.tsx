import React, { useContext, useEffect, useRef, useState } from "react";
import "./CreateTravel.css";
import {AutoComplete, Avatar, Button, DatePicker, Input, List, Modal, Rate, Select, SelectProps, Switch} from 'antd';
import SideBarTravel from "../../components/SidebarTravel/SideBarTravel";
import { useNavigate, useParams } from "react-router-dom";
import MapNewComponent3 from "../../components/MapNew3/MapNewComponent3";
import { getPlacesInCity, GetUserTravel, UpdateUserTravel } from "../../services/TravelService";
import { interestsStatic, PreviewMarkerFields, PreviewPlacesInCityFields } from "../../storage/storage";
import { Context } from "../../index";
import { TimelineItem, UserTravel } from "../../Models/IUserTravel";
import { PlacePreviewResponse } from "../../Models/Travels";
import { GetCity } from "../../services/SearchCityService";
import dayjs from "dayjs";

let idCounter = 0;

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
    const [options, setOptions] = useState<{ value: string }[]>([]);
    const [date, setDate] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const[currentItem,setCurrentItem]=useState<TimelineItem|null>(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log(store.city.nameCity)
                console.log(store.typeOfPlaces);
                const responsePlacesInCity = await getPlacesInCity(store.city.nameCity, store.typeOfPlaces);
                setFilteredData(responsePlacesInCity);
                setInitialData(responsePlacesInCity);
                console.log(responsePlacesInCity);
            } catch (error) {
                console.error('Error fetching places:', error);
            }
        };

        fetchData();
    }, [cityValue, typeValue, store.city.nameCity, store.typeOfPlaces]);

    const onChangeCity = async (data: string) => {
        setCityValue(data);
        await store.infoAboutCity(cityValue);
        const responsePlacesInCuty = await getPlacesInCity(store.city.nameCity, store.typeOfPlaces);
        setPlacesInCity(responsePlacesInCuty);

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
                console.log(userTravel)
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
            console.log(timelineItems)
            travel.places = timelineItems;
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
        setModalOpen(true);
        setCurrentItem(item);
    };

    const handleOkClick = (date: any) => {

        const newTimelineItem: TimelineItem = {
            id: idCounter,
            title: currentItem?.title,
            type: currentItem?.type,
            place_id: currentItem?.id,
            travel_date: dayjs(date).format('YYYY-MM-DD'),
            description: currentItem?.description,
            creator_user_id: currentItem?.creator_user_id,
            mean_score: currentItem?.mean_score,
            order: idCounter,
            coordinates: currentItem?.coordinates,
            photos: currentItem?.photos && currentItem.photos.length > 0 && currentItem.photos[0] ? [{ file: currentItem.photos[0].file }] : [],
        };
        idCounter++;
        setTimelineItems(prevTimelineItems => {
            const updatedTimelineItems = [...prevTimelineItems, newTimelineItem];
            updatedTimelineItems.sort((a, b) => new Date(a.travel_date).getTime() - new Date(b.travel_date).getTime());
            updatedTimelineItems.forEach((item, index) => item.order = index + 1);
            return updatedTimelineItems;
        });

        setModalOpen(false);
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
                                        key={item.id}
                                        className="ListItem"
                                    >
                                        <List.Item.Meta
                                            className="Meta"
                                            avatar={<Avatar src={item?.photos?.[0]?.file}/>}
                                            title={item.title}
                                            description={item.description}
                                        />
                                        <div className="Rate">
                                            {parseFloat(item.mean_score.toFixed(1))} <Rate disabled defaultValue={5} count={1} />
                                            <Button onClick={() => createTimelineItem(item)}>Добавить</Button>
                                        </div>
                                    </List.Item>
                                )}
                            />
                            <Modal
                                open={modalOpen}
                                onCancel={() => setModalOpen(false)}
                                footer={[
                                    <Button key="cancel" onClick={() => setModalOpen(false)}>
                                        Cancel
                                    </Button>,
                                    <Button key="ok" type="primary" onClick={() => handleOkClick(date)}>
                                        OK
                                    </Button>,
                                ]}
                            >
                                <DatePicker
                                    value={date}
                                    onChange={(date) => setDate(date)}
                                />
                            </Modal>
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
