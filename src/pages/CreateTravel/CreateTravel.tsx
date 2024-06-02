import React, {useContext, useEffect, useRef, useState} from "react";
import "./CreateTravel.css";
import {Button, Input, List, Rate, Select, SelectProps, Switch} from 'antd';
import SideBarTravel from "../../components/SidebarTravel/SideBarTravel";
import {useLocation} from "react-router-dom";
import MapNewComponent3 from "../../components/MapNew3/MapNewComponent3";
import {getPlacesInCity, GetUserTravel, UpdateUserTravel} from "../../services/TravelService";
import {interestsStatic, PreviewPlacesInCityFields} from "../../storage/storage";
import {Context} from "../../index";
import {TimelineItem, UserTravel} from "../../Models/IUserTravel";

interface LocationState {
    message: {
        value: string;
    };
}



const initialData = [
    { id: 1, title: "Title1", description: "Очень хорошее место", rating: 4.2,address:"Тюмень, ул. Широтная 55" },
    { id: 2, title: "Title2", description: "Очень хорошее место", rating: 4.2,address:"Тюмень, ул. Максима Горького 27" },
    { id: 3, title: "Title3", description: "Очень хорошее место", rating: 4.2,address:"Тюмень, ул. Харькова 23" },
    { id: 4, title: "Title4", description: "Очень хорошее место", rating: 4.2,address:"Тюмень, ул. Республики 92" },
];



const interests: SelectProps['options'] = interestsStatic.map(interest => ({
    label: interest,
    value: interest
}));


function CreateTravel() {
    const { store } = useContext(Context);
    const location = useLocation();
    const [checked, setChecked] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredData, setFilteredData] = useState(initialData);
    const [timelineItems, setTimelineItems] = useState<TimelineItem[]>([]);
    const prevTimelineItemsRef = useRef<TimelineItem[]>();
    const [state, setState] = useState<any>("");
    const [typeValue, setTypeValue] = useState('Все');
    const [placesInCity, setPlacesInCity] = useState<PreviewPlacesInCityFields | null>(null);
    const [travel,setTravel]=useState<UserTravel |null>(null);
    useEffect(() => {
        if (prevTimelineItemsRef.current !== timelineItems) {
            localStorage.setItem('timelineItems', JSON.stringify(timelineItems));
            prevTimelineItemsRef.current = timelineItems;
        }
    }, [timelineItems]);



    useEffect(() => {
        const fetchData = async () => {
            if (timelineItems.length === 0) {
                // Only make the request if timelineItems is empty
                if (location.state.value) {
                    setState(location.state.value as LocationState);
                    console.log(location.state);
                } else if (location.state.TravelId) {
                    const userTravelId = location.state.TravelId as string;
                    const userTravel: UserTravel | null = await GetUserTravel(userTravelId);
                    setTravel(userTravel);
                    if (userTravel) {
                        console.log(userTravel);
                    }
                    if (
                        userTravel !== null &&
                        userTravel !== undefined &&
                        userTravel.places !== null &&
                        userTravel.places !== undefined
                    ) {
                        setTimelineItems(userTravel.places);
                    }
                }
            }
        };

        fetchData();
    }, [location.state, timelineItems]);
    const handleUpdate = async () => {
        console.log("сработало")
        if (travel && travel.id !== undefined && travel.id !== null) {
            const result = await UpdateUserTravel(travel.id, timelineItems);
            if (result) {
                console.log('Update successful:', result);
            } else {
                console.log('Update failed');
            }
        }
    };
    useEffect(() => {
        const savedTimelineItems = localStorage.getItem("timelineItems");
        if (savedTimelineItems) {
            setTimelineItems(JSON.parse(savedTimelineItems));
        }
    }, []);

    //КОД ОЛЕГА НАДО ИСПРАВИТЬ, все тайпы перевернул как попало
    const onSelectType = (data: string) => {
        setTypeValue(data);
    };
    const handleChangeTypeOfPlaces = (value: string) => {
        const onFinishRequests = async () => {
            try {
                const responsePlacesInCity = await getPlacesInCity(store.city.nameCity, value);
                setPlacesInCity(responsePlacesInCity);
                console.log(responsePlacesInCity);
            } catch (error) {
                console.error('Error:', error);
            }
        };
        onFinishRequests();
    };
  //
    useEffect(() => {
        if (prevTimelineItemsRef.current !== timelineItems) {
            localStorage.setItem("timelineItems", JSON.stringify(timelineItems));
            prevTimelineItemsRef.current = timelineItems;
        }
    }, [timelineItems]);

    const createTimelineItem = (item: any) => {
        const newTimelineItem = {
            id: timelineItems.length + 1,
            title: item.title,
            type: item.address,
            place_id: item.id,
            coordinates: item.coordinates,
            img:item.img,
        };

        setTimelineItems(prevTimelineItems => [...prevTimelineItems, newTimelineItem]);
    };




    const handleSearchChange = (e: any) => {
        const value = e.target.value.toLowerCase();
        setSearchTerm(value);
        const filtered = initialData.filter(item =>
            item.title.toLowerCase().includes(value) ||
            item.description.toLowerCase().includes(value)
        );
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
                                            {item.rating} <Rate disabled defaultValue={5} count={1}/>
                                            <Button onClick={() => createTimelineItem(item)}>Add to Sidebar</Button>
                                        </div>
                                    </List.Item>
                                )}
                            />
                        </>
                    ) : (
                        <MapNewComponent3/>
                    )}
                </div>
                <SideBarTravel  timelineItems={timelineItems} setTimelineItems={setTimelineItems} handleUpdate={handleUpdate} Travel={travel} />
            </div>
        </>
    );
}

export default CreateTravel;
