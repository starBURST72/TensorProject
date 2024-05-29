import {Button, Input, Modal, Timeline} from "antd";
import PlaceCard from "../PlaceCard/PlaceCard";
import React, {useState} from "react";

interface LocationState {
    message: string|any;

}

function SideBarTravel({message}:LocationState){

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [cityName, setCityName] = useState('');
    const handleOk = () => {
        console.log("City Name:", cityName); // Обработка введенного названия города
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleInputChange = (e: any) => {
        setCityName(e.target.value);
    };
    const showModal = () => {
        setIsModalVisible(true);
    };

    return(
        <div className="sidebar">
            <h1 className="sidebar-travel">{message}</h1>
            <Timeline className="TimeLine">
                <Timeline.Item>
                    <PlaceCard
                        Title="Макдоналдс"
                        type="ул. Мориса Тореза 1"
                        placeid={123}
                        coordinates="12312313132131312"
                    />
                </Timeline.Item>
                <Timeline.Item>
                    <PlaceCard
                        Title="Кальянная"
                        type="Республики"
                        placeid={123}
                        coordinates="9999999999"
                    />
                </Timeline.Item>
            </Timeline>
            <Button className="add-city" onClick={showModal}>+ город</Button>
            <Modal
                title="Добавить город"
                open={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Input
                    placeholder="Введите название города"
                    value={cityName}
                    onChange={handleInputChange}
                />
            </Modal>
        </div>
    );
}


export default SideBarTravel;