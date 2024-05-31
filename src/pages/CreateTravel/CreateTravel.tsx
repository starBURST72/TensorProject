import React, {useEffect, useState} from "react";
import "./CreateTravel.css";
import {Button, Input, List, Rate, Switch} from 'antd';
import SideBarTravel from "../../components/SidebarTravel/SideBarTravel";
import {useLocation} from "react-router-dom";
import MapNewComponent3 from "../../components/MapNew3/MapNewComponent3";

interface LocationState {
    message: {
        value: string;
    };
}
export interface TimelineItem {
    id: number;
    title: string;
    type: string;
    place_id: number;
    coordinates: string;
}


const initialData = [
    { id: 1, title: "Title1", description: "Очень хорошее место", rating: 4.2,address:"Тюмень, ул. Широтная 55" },
    { id: 2, title: "Title2", description: "Очень хорошее место", rating: 4.2,address:"Тюмень, ул. Максима Горького 27" },
    { id: 3, title: "Title3", description: "Очень хорошее место", rating: 4.2,address:"Тюмень, ул. Харькова 23" },
    { id: 4, title: "Title4", description: "Очень хорошее место", rating: 4.2,address:"Тюмень, ул. Республики 92" },
];

function CreateTravel() {
    const location = useLocation();
    let state:any = "";
    if(location.state.value){
        state = location.state.value as LocationState;
        console.log(state)
    }else if(location.state.TravelId){
        const userTravelId = location.state.TravelId as LocationState;
        console.log(userTravelId)
    }
    const [checked, setChecked] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredData, setFilteredData] = useState(initialData);
    const [timelineItems, setTimelineItems] = useState<TimelineItem[]>([]);


    useEffect(() => {
        const savedTimelineItems = localStorage.getItem("timelineItems");
        if (savedTimelineItems) {
            setTimelineItems(JSON.parse(savedTimelineItems));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("timelineItems", JSON.stringify(timelineItems));
    }, [timelineItems]);

    const createTimelineItem = (item: any) => {
        const newTimelineItem = {
            id: timelineItems.length + 1,
            title: item.title,
            type: item.address,
            place_id: item.id,
            coordinates: item.coordinates,
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
                            <Input
                                className="search-bar"
                                placeholder="текстовое поле"
                                value={searchTerm}
                                onChange={handleSearchChange}
                            />
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
                <SideBarTravel message={state} timelineItems={timelineItems} setTimelineItems={setTimelineItems} />
            </div>
        </>
    );
}

export default CreateTravel;
