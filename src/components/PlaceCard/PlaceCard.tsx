import "./PlaceCard.css"
import React from "react";
interface PlaceCardProps {
    Title: string;
    type: string;
    placeid: number;
    coordinates: string;
}

function PlaceCard({ Title, type, placeid, coordinates }:PlaceCardProps){

    const place={
        title: Title,
        type: type,
        placeid: placeid,
        coordinates: coordinates,
    }

    const handleButtonClick = () => {
        console.log("Coordinates:", place.coordinates);
    };

    return (
        <div className="add-place">
            <label>{place.title}</label>
            <p>{place.type}</p>
            <button onClick={handleButtonClick}>Показать</button>
        </div>
    );
}

export default PlaceCard;