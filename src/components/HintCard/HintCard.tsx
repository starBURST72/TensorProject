import React, { useState, useEffect } from "react";
import { GetHintCards } from "../../services/HintCardsService";
import './HintCard.css'
import {Button} from "antd";
import {CopyTravel} from "../../services/TravelService";
import {useNavigate} from "react-router-dom";
// Define the types for the HintCard and the response
interface Hint {
    type: string;
}

export interface HintCardData {
    id: number;
    title: string;
    description: string;
    mean_score: number;
    img: string;
    count_users: number;
}

interface HintsResponse {
    data: HintCardData[];
}
interface CopyResponse{
    id:string;
}

function HintCard(props: Hint) {
    const [hintData, setHintData] = useState<HintCardData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();
    const getHint = async (value: string) => {
        if (value) {
            try {
                setLoading(true);
                const responseData: HintsResponse = await GetHintCards(value);
                setHintData(responseData.data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
    };
    const copyTravel1 = async (copy_id: number) => {
        if (copy_id) {
            try {
                setLoading(true);
                const responseData: CopyResponse = await CopyTravel(copy_id);
                const TravelId= responseData.id;
                console.log(TravelId)
                navigate('/createTravel', { state: {TravelId} });
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
    };

    useEffect(() => {
        getHint(props.type);
    }, []);

    return (
        <div className="container">
            <h1>{props.type}</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                hintData ? (
                   // Check if hintData exists before mapping over it
                    hintData.map((hint) => (
                        <div key={hint.id} className="hint-card">
                            <img src={hint.img} alt={hint.title} />
                            <h2>{hint.title}</h2>
                            <div className="paragraphs">
                                <p>{hint.description}</p>
                                <p>Рейтинг: {hint.mean_score}</p>
                                <p>Прошли: {hint.count_users}</p>
                            </div>
                            <Button className="CopyButton" onClick={() => copyTravel1(hint.id)}>копировать</Button>
                        </div>
                    ))
                ) : (
                    <p>No data available</p>
                )
            )}
        </div>
    );

}

export default HintCard;
