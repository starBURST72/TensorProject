import React, { useState } from "react";
import { Button } from "antd";
import { CopyTravel } from "../../services/TravelService";
import { useNavigate } from "react-router-dom";
import './HintCard.css';

export interface HintCardData {
    id: number;
    title: string;
    description: string;
    mean_score: number;
    img: string;
    count_users: number;
}

interface CopyResponse {
    users_travel_id: number;
}

interface HintCardProps {
    data: HintCardData[] | undefined;
    title: string;
}

function HintCard({ data,title }: HintCardProps) {
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const copyTravel1 = async (copy_id: number) => {
        if(title=="Продолжим?"){
            const TravelId = copy_id;
            navigate(`/editTravel/${TravelId}`);
        }
        else{
            try {
                setLoading(true);
                const responseData: CopyResponse = await CopyTravel(copy_id);
                const TravelId = responseData.users_travel_id;
                console.log(TravelId);
                navigate(`/editTravel/${TravelId}`);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div className="container">
            <h1>{title}</h1>
            {loading ? (
                    <p>Loading...</p>
                ) :
                data ? (
                    data.map((hint) => (
                        <div key={hint.id} className="hint-card">
                            <img src={`data:image/jpg;base64,${hint.img}`} alt={hint.title}/>
                            <h2>{hint.title}</h2>
                            <div className="paragraphs">
                                <p>{hint.description}</p>
                                <p>Рейтинг: {hint.mean_score}</p>
                                <p>Прошли: {hint.count_users}</p>
                            </div>
                            {title=="Продолжим?" ?(<Button className="CopyButton" onClick={() => copyTravel1(hint.id)}>Продолжить</Button>):(
                            <Button className="CopyButton" onClick={() => copyTravel1(hint.id)}>копировать</Button>)}
                        </div>
                    ))
                ) : (
                    <p>Loading</p>
                )}
        </div>
    );
}

export default HintCard;
