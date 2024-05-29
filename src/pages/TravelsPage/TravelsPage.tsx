import React, { useContext, useEffect } from "react";

import "./TravelsPage.css";
import Travel from "../../components/Travel/Travel";
import { ContextTravel } from "../../components/Context/AppContext";
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { getAllTravels, getOneTravel} from "../../services/TravelService";

const travelsData = [
    {
        title: "Путешествие 1",
        description: "Описание путешествия 1",
        id: 1
    },
    {
        title: "Путешествие 2",
        description: "Описание путешествия 2",
        id: 2
    },
    {
        title: "Путешествие 3",
        description: "Описание путешествия 3",
        id: 3
    },
    {
        title: "Путешествие 4",
        description: "Описание путешествия 4",
        id: 4
    },
    {
        title: "Путешествие 5",
        description: "Описание путешествия 5",
        id: 5
    },
    // Добавьте остальные путешествия
];

function TravelsPage() {
    const { travels, setTravels } = useContext(ContextTravel);

    useEffect(() => {
        const onFinish = async () => {
            const respone = await getAllTravels();
          };
        setTravels(travelsData);
        onFinish()
      }, []);


    return (
        <div>
            <div className="travels-page">
                <p className="title">Маршруты</p>

                <div className="travel-cards-container">
                    {travels.map((travel, index) => (
                        <Travel key={index} {...travel} />
                    ))}
                </div>
            </div>
            <Button className='newtravelButton' icon={<PlusOutlined />}>
            </Button>
        </div>
    );
}

export default TravelsPage;