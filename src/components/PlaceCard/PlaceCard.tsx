import "./PlaceCard.css"
import React from "react";
import {Button} from "antd";
import { DeleteOutlined } from '@ant-design/icons';
interface PlaceCardProps {
    Title: string;
    type: string;
    place_id: number;
    coordinates: string;
    onDelete: () => void;
}

function PlaceCard({ Title, type, place_id, coordinates,onDelete }:PlaceCardProps){

    const place={
        title: Title,
        type: type,
        place_id: place_id,
        coordinates: coordinates,
    }

    const handleButtonClick = () => {
        console.log("Coordinates:", place.coordinates);
    };

    return (
        <div className="add-place">
            <label>{place.title}</label>
            <p>{place.type}</p>
            <Button className="DeleteButton" onClick={onDelete} type="primary" icon={<DeleteOutlined />}/>
            <button onClick={handleButtonClick}>Показать</button>
        </div>
    );
}

export default PlaceCard;