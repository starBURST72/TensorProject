import React, { useEffect, useRef } from 'react';
import { Button, Input, Space, Typography } from 'antd';
import './HomePage.css';
import { observer } from 'mobx-react-lite';

function HomePage() {
    const homepageRef = useRef<HTMLDivElement>(null);
    const inputContainerRef = useRef<HTMLDivElement>(null);
    const requestRef = useRef<number | null>(null);

    useEffect(() => {
        const lerp = (start: number, end: number, amount: number) => {
            return (1 - amount) * start + amount * end;
        };

        let lastScrollY = 0;
        let currentTop = 50;

        const handleScroll = () => {
            if (homepageRef.current) {
                lastScrollY = homepageRef.current.scrollTop;
            }
        };

        const animate = () => {
            if (inputContainerRef.current && homepageRef.current) {
                const homepageHeight = homepageRef.current.clientHeight;
                const targetTop = 50 + (lastScrollY / homepageHeight) * 75;

                currentTop = lerp(currentTop, targetTop, 0.1); // 0.1 is the damping factor
                inputContainerRef.current.style.top = `${currentTop}%`;
                inputContainerRef.current.style.transform = `translateY(-${(currentTop - 50)}%)`;
            }
            requestRef.current = requestAnimationFrame(animate);
        };

        const currentHomepageRef = homepageRef.current;
        currentHomepageRef?.addEventListener('scroll', handleScroll);
        requestRef.current = requestAnimationFrame(animate);

        return () => {
            currentHomepageRef?.removeEventListener('scroll', handleScroll);
            if (requestRef.current) {
                cancelAnimationFrame(requestRef.current);
            }
        };
    }, []);

    return (
        <div className='homepage' ref={homepageRef}>
            <div className="input-container" ref={inputContainerRef}>
                <Typography.Title level={4}>Куда поедем?</Typography.Title>
                <Space size='large'>
                    <Input placeholder="Введите город" />
                    <Button type="primary">Поехали!</Button>
                </Space>
            </div>
            <div className="hints-container">
                <div>1</div>
                <div>2</div>
                <div>3</div>
            </div>
        </div>
    );
}

export default observer(HomePage);
