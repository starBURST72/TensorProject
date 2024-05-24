import React, { useState, useEffect, useRef } from 'react';
import { Button, Input, Space, Typography } from 'antd';
import './HomePage.css';
import { observer } from 'mobx-react-lite';

function HomePage() {
    const [scrollY, setScrollY] = useState(0);
    const homepageRef = useRef<HTMLDivElement>(null);
    const hintsContainerRef = useRef<HTMLDivElement>(null);
    const handleScroll = () => {
        setScrollY(window.scrollY);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const inputStyle = {
        top: `${Math.max(40 - scrollY * 0.2, 0)}%`, // Смещение вверх при прокрутке
        transform: `translateY(-${Math.max(50 - scrollY * 0.2, 0)}%)`, // Центрирование относительно топа
    };

    useEffect(() => {
        const hintsContainer = hintsContainerRef.current;
        if (hintsContainer) {
            if (scrollY > 50) {
                hintsContainer.classList.add('visible');
            } else {
                hintsContainer.classList.remove('visible');
            }
        }
    }, [scrollY]);

    return (
        <div className='homepage' ref={homepageRef}>
            <div className="input-container" style={inputStyle}>
                <Typography.Title level={4}>Куда поедем?</Typography.Title>
                <Space.Compact size='large'>
                    <Input placeholder="Введите город" />
                    <Button type="primary">Поехали!</Button>
                </Space.Compact>
            </div>
            <div className="hints-container" ref={hintsContainerRef}>
                <div>1</div>
                <div>2</div>
                <div>3</div>
            </div>
        </div>
    );
}

export default observer(HomePage);
