import "./SettingsPage.css"
import React from 'react';
import {Input, Select, Space} from 'antd';
import type { SelectProps } from 'antd';
import {useState,ChangeEvent} from "react";
const interests = [
    'спорт',
    'концерты',
    'кино',
    'выставки',
    'кафе',
    'рестораны',
    'достопримечательности'
];

const options: SelectProps['options'] = interests.map(interest => ({
    label: interest,
    value: interest
}));
const handleChange = (value: string[]) => {
    console.log(`selected ${value}`);
};
function SettingsPage() {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const validateEmail = (email: string): boolean => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setEmail(e.target.value);
    };

    const handleEmailBlur = (): void => {
        if (validateEmail(email)) {
            setError('');
            // Здесь вы можете выполнить действия после успешной валидации email
            console.log('Email is valid:', email);
        } else {
            setError('The input is not valid E-mail!');
        }
    };
    return (
        <div className="settings-container">
            <div className="settings-avataravatar"></div>
            <h1 className="settings-header">Фамилия имя</h1>
            <div className="settings-form">
                <label className="settings-label">
                    Почта
                    <div>
                        <Input
                            className="settings-input"
                            type="email"
                            value={email}
                            onChange={handleEmailChange}
                            onBlur={handleEmailBlur}
                            placeholder="Enter your email"
                        />
                        {error && <div style={{color: 'red'}}>{error}</div>}
                    </div>
                    <Input datatype={"mail"} className={"settings-input"}/>
                </label>
                <label className="settings-label">
                    Дата рождения
                    <Input type={"date"} className={"settings-input"}/>
                </label>
                <label className="settings-label">
                    Город
                    <Input type={"text"} className={"settings-input"} />
                </label>
                <label className="settings-label">
                    Интересы
                    <Space style={{ width: '100%' }} direction="vertical">
                        <Select
                            mode="multiple"
                            allowClear
                            style={{ width: '100%' }}
                            placeholder="Выберите интерес"
                            defaultValue={['кино']}
                            onChange={handleChange}
                            options={options}
                        />
                    </Space>
                </label>
            </div>
        </div>
    );
}
export default SettingsPage;