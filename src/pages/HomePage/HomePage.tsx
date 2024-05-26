import React, { useEffect, useRef } from 'react';
import {AutoComplete, Button, Space, Typography} from 'antd';
import './HomePage.css';
import { observer } from 'mobx-react-lite';
import {GetCity} from "../../services/SearchCityService";


function HomePage() {
    const homepageRef = useRef<HTMLDivElement>(null);
    const inputContainerRef = useRef<HTMLDivElement>(null);
    const hintsContainerRef = useRef<HTMLDivElement>(null);
    const [options, setOptions] = React.useState<{ value: string }[]>([]);

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
                const targetTop = 50 + (lastScrollY / homepageHeight) * 40;

                inputContainerRef.current.style.top = `${targetTop}%`;
            }
            if (hintsContainerRef.current && homepageRef.current) {
                const homepageHeight = homepageRef.current.clientHeight;
                const targetBottom = (lastScrollY / homepageHeight) * 40;

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
                <Space size='large'>
                    <AutoComplete
                        style={{ width: 200 }}
                        options={options}
                        onSearch={handleSearch}
                        placeholder="Введите город"
                        filterOption={(inputValue, option) =>
                            option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                        }
                    />
                    <Button type="primary">Поехали!</Button>
                </Space>
            </div>
            <div className="hints-container" ref={hintsContainerRef}>
                <div className="hints-card">
                    <h1>Друзья</h1>
                </div>
                <div className="hints-card">
                    <h1>Популярное</h1>
                </div>
                <div className="hints-card">
                    <h1>Продолжить</h1>
                </div>
            </div>
        </div>
    );
}

export default observer(HomePage);
