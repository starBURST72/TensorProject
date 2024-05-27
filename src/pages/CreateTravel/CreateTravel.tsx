import React, {useState} from "react";
import "./CreateTravel.css"
import {Input, Button, List, Rate, Switch, Modal} from 'antd';
import { useLocation } from 'react-router-dom';
import MapNewComponent2 from "../../components/MapNew2/MapNewComponent2";

interface LocationState {
    message: string;
}
const data = [
    { id: 1,title:"Title1",description:"Очень хорошее место", rating: 4.2 },
    { id: 2,title:"Title2",description:"Очень хорошее место", rating: 4.2 },
    { id: 3,title:"Title3",description:"Очень хорошее место", rating: 4.2 },
    { id: 4,title:"Title4",description:"Очень хорошее место", rating: 4.2 },
];

function CreateTravel(){
    const location = useLocation();
    const state = location.state as LocationState;
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [cityName, setCityName] = useState('');
    const [checked, setChecked] = useState(false);
    console.log(state); //пока так, нечего передавать покачт


    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        console.log("City Name:", cityName); // Обработка введенного названия города
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleInputChange = (e:any) => {
        setCityName(e.target.value);
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
                            <Input className="search-bar" placeholder="текстовое поле"/>
                            <div className="ListItems">
                                <List
                                    itemLayout="horizontal"
                                    dataSource={data}
                                    renderItem={item => (
                                        <List.Item>
                                            <List.Item.Meta
                                                title={item.title}
                                                description={item.description}
                                            />
                                            <div>
                                                {item.rating} <Rate disabled defaultValue={5} count={1}/>
                                            </div>
                                        </List.Item>
                                    )}
                                />
                            </div>
                        </>
                        )
                        :
                        (<MapNewComponent2 />)
                    }
                </div>
                <div className="sidebar">
                    <Button className="add-place">добавленное место</Button>
                    <Button className="add-place">добавленное место</Button>
                    <Button className="add-city" onClick={showModal}>+ город</Button>
                    <Modal
                        title="Добавить город"
                        visible={isModalVisible}
                        onOk={handleOk}
                        onCancel={handleCancel}
                    >
                        <Input placeholder="Введите название города" value={cityName} onChange={handleInputChange} />
                    </Modal>
                </div>
            </div>
        </>
    );
}

export default CreateTravel;



