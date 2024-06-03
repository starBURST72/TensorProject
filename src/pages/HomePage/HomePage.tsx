import React, {useEffect, useRef, useState} from 'react';
import {AutoComplete, Button, Drawer, Space, Typography} from 'antd';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';
import { observer } from 'mobx-react-lite';
import {GetCity} from "../../services/SearchCityService";
import HintCard from "../../components/HintCard/HintCard";
import {CreateTravel} from "../../services/TravelService";
import { UpOutlined } from '@ant-design/icons';

const russianLettersRegex = /^[а-яА-ЯёЁ\s]+$/;
function HomePage() {
    const [value, setValue] = useState('');
    const homepageRef = useRef<HTMLDivElement>(null);
    const inputContainerRef = useRef<HTMLDivElement>(null);
    const hintsContainerRef = useRef<HTMLDivElement>(null);
    const [options, setOptions] = React.useState<{ value: string }[]>([]);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const navigate = useNavigate();

    const handleClick = async () => {
        const createdTravel = await CreateTravel()
        console.log(createdTravel.id);
        navigate(`/editTravel/${createdTravel.id}`);
    };

    const onSelect = (data: string) => {
        setValue(data);
    };

    useEffect(() => {
        let lastScrollY = 0;
        const handleScroll = () => {
            if (homepageRef.current) {
                lastScrollY = homepageRef.current.scrollTop;
                updatePositions();
            }
        };

        const updatePositions = () => {
            if (inputContainerRef.current && homepageRef.current) {
                const homepageHeight = homepageRef.current.clientHeight;
                const targetTop = 40 + (lastScrollY / homepageHeight) * 45;

                inputContainerRef.current.style.top = `${targetTop}%`;
            }
            if (hintsContainerRef.current && homepageRef.current) {
                const homepageHeight = homepageRef.current.clientHeight;
                const targetBottom = (lastScrollY / homepageHeight) * 80;

                hintsContainerRef.current.style.bottom = `${targetBottom}%`;
                hintsContainerRef.current.style.transform = `translateY(${(targetBottom + 160)}%)`;
            }
        };

        const currentHomepageRef = homepageRef.current;
        currentHomepageRef?.addEventListener('scroll', handleScroll);

        return () => {
            currentHomepageRef?.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleSearch = async (value: string) => {
        setValue(value);
        if (!value || !russianLettersRegex.test(value)) {
            setOptions([]);
            setErrorMessage('Только русские буквы!');
            return;
        }
        setErrorMessage('');
            try {
                const responseData = await GetCity(value);
                const newOptions = responseData.suggestions.map(suggestion=>({
                    value: `${suggestion.data.city}`
                }))
                setOptions(newOptions);
            } catch (error) {
                console.error(error);
            }
    };
    const [visible, setVisible] = useState(false);

    const showDrawer = () => {
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
    };

    return (

        <div className='homepage' ref={homepageRef}>
            <div className="airplane"></div>
            <div className="input-container" ref={inputContainerRef}>
                <Typography.Title level={4}>Куда поедем?</Typography.Title>
                <Space.Compact size='large'>
                    <AutoComplete
                        style={{width: 200}}
                        options={options}
                        onSearch={handleSearch}
                        onSelect={onSelect}
                        placeholder="Введите город"
                        filterOption={(inputValue, option) =>
                            option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                        }
                    />
                    <Button type="primary" onClick={handleClick}>Поехали!</Button>
                </Space.Compact>
                {errorMessage && (
                    <div style={{color: 'red', marginTop: '5px'}}>
                        {errorMessage}
                    </div>
                )}
            </div>

            <div style={{position: 'fixed', bottom: 0, width: '100%', textAlign: 'center'}}>
                <div>Подсказать?</div>
                <Button type="primary" shape="circle" icon={<UpOutlined/>} onClick={showDrawer}/>
            </div>

            <Drawer
                title="Предложения"
                placement="bottom"
                closable={false}
                height={700}
                onClose={onClose}
                visible={visible}
                key="bottom"
            >
                <div style={{display: 'flex', height: '100%', width: "100%"}}>
                    <div style={{flex: 1}}>
                        <HintCard type={"friends"}/>
                    </div>
                    <div style={{flex: 1}}>
                        <HintCard type={"popular"}/>
                    </div>
                    <div style={{flex: 1}}>
                        <HintCard type={"continue"}/>
                    </div>
                </div>
            </Drawer>

        </div>
    );
}

export default observer(HomePage);
