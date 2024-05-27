import React, {useEffect, useRef, useState} from 'react';
import {AutoComplete, Button, Space, Typography} from 'antd';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';
import { observer } from 'mobx-react-lite';
import {GetCity} from "../../services/SearchCityService";
import HintCard from "../../components/HintCard/HintCard";


function HomePage() {
    const [value, setValue] = useState('');
    const homepageRef = useRef<HTMLDivElement>(null);
    const inputContainerRef = useRef<HTMLDivElement>(null);
    const hintsContainerRef = useRef<HTMLDivElement>(null);
    const [options, setOptions] = React.useState<{ value: string }[]>([]);
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/createTravel', { state: { message: {value} } });
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
                const targetTop = 40 + (lastScrollY / homepageHeight) * 40;

                inputContainerRef.current.style.top = `${targetTop}%`;
            }
            if (hintsContainerRef.current && homepageRef.current) {
                const homepageHeight = homepageRef.current.clientHeight;
                const targetBottom = (lastScrollY / homepageHeight) * 80;

                hintsContainerRef.current.style.bottom = `${targetBottom}%`;
                hintsContainerRef.current.style.transform = `translateY(${(targetBottom + 180)}%)`;
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
        if (value) {
            try {
                const responseData = await GetCity(value);
                const newOptions = responseData.suggestions.map(suggestion=>({
                    value: `${suggestion.data.city}`
                }))
                setOptions(newOptions);
            } catch (error) {
                console.error(error);
            }
        } else {
            setOptions([]);
        }
    };
    return (
        <div className='homepage' ref={homepageRef}>
            <div className="input-container" ref={inputContainerRef}>
                <Typography.Title level={4}>Куда поедем?</Typography.Title>
                <Space.Compact size='large'>
                    <AutoComplete
                        style={{ width: 200 }}
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
            </div>
            <div className="hints-container" ref={hintsContainerRef}>
                <HintCard type={"friends"}/>
                <HintCard type={"Popular"}/>
                <HintCard type={"Continue"}/>
            </div>
        </div>
    );
}

export default observer(HomePage);
