import { Button, Input, Modal, Timeline, Dropdown, Menu, Upload } from "antd";
import { SettingOutlined, UploadOutlined } from '@ant-design/icons';
import PlaceCard from "../PlaceCard/PlaceCard";
import React, { useState } from "react";
import "./SideBarTravel.css";

interface SideBarTravelProps {
    message: string|any;
}

function SideBarTravel({ message }: SideBarTravelProps) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [cityName, setCityName] = useState('');
    const [isSettingsModalVisible, setIsSettingsModalVisible] = useState(false);
    const [imageUrl, setImageUrl] = useState('');

    const handleOk = () => {
        console.log("City Name:", cityName);
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCityName(e.target.value);
    };

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleSettingsClick = () => {
        setIsSettingsModalVisible(true);
    };

    const handleSettingsOk = () => {
        setIsSettingsModalVisible(false);
    };

    const handleSettingsCancel = () => {
        setIsSettingsModalVisible(false);
    };

    const handleImageChange = (info: any) => {
        if (info.file.status === 'done') {
            getBase64(info.file.originFileObj, (imageUrl: string) =>
                setImageUrl(imageUrl),
            );
        }
    };

    const getBase64 = (img: Blob, callback: (base64Url: string) => void) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result as string));
        reader.readAsDataURL(img);
    };

    const beforeUpload = (file: File) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    };

    return (
        <div className="sidebar">
            <h1 className="sidebar-travel">
                {message}
                <Dropdown overlay={<Menu><Menu.Item key="1" onClick={handleSettingsClick}>Settings</Menu.Item></Menu>} trigger={['click']}>
                    <SettingOutlined />
                </Dropdown>
            </h1>
            <Timeline className="TimeLine">
                <Timeline.Item>
                    <PlaceCard
                        Title="Макдоналдс"
                        type="ул. Мориса Тореза 1"
                        placeid={123}
                        coordinates="12312313132131312"
                    />
                </Timeline.Item>
                <Timeline.Item>
                    <PlaceCard
                        Title="Кальянная"
                        type="Республики"
                        placeid={123}
                        coordinates="9999999999"
                    />
                </Timeline.Item>
            </Timeline>
            <Button className="add-city" onClick={showModal}>+ город</Button>
            <Modal
                title="Добавить город"
                open={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Input
                    placeholder="Введите название города"
                    value={cityName}
                    onChange={handleInputChange}
                />
            </Modal>
            <Modal
                title="Настройки"
                open={isSettingsModalVisible}
                onOk={handleSettingsOk}
                onCancel={handleSettingsCancel}
            >
                <Input placeholder="Enter new title" />
                <Input placeholder="Enter new description" />
                <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    beforeUpload={beforeUpload}
                    onChange={handleImageChange}
                >
                    {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : <UploadOutlined />}
                </Upload>
            </Modal>
        </div>
    );
}

export default SideBarTravel;
