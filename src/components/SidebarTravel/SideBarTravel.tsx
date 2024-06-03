import {Button, Input, Modal, Timeline, Upload, message} from "antd";
import { SettingOutlined, UploadOutlined } from '@ant-design/icons';
import PlaceCard from "../PlaceCard/PlaceCard";
import React, {Dispatch, SetStateAction, useState, useEffect} from "react";
import "./SideBarTravel.css";
import {TimelineItem, UserTravel} from "../../Models/IUserTravel";


interface SideBarTravelProps {
    timelineItems: TimelineItem[];
    travel: UserTravel | null;
    setTimelineItems: React.Dispatch<React.SetStateAction<TimelineItem[]>>;
    handleUpdate: () => Promise<void>;
    setTravel: React.Dispatch<React.SetStateAction<UserTravel | null>>;
}

function SideBarTravel({ timelineItems, setTimelineItems, handleUpdate, travel, setTravel}: SideBarTravelProps) {
    const [isSettingsModalVisible, setIsSettingsModalVisible] = useState(false);
    const [title, setTitle] = useState(travel?.title);
    const [description, setDescription] = useState(travel?.description);
    const [imageUrl, setImageUrl] = useState(travel?.img || '');

    useEffect(() => {
        setTitle(travel?.title);
        setDescription(travel?.description);
        setImageUrl(travel?.img || '');
    }, [travel]);

    const handleDelete = (id: number) => {
        setTimelineItems((timelineItems: TimelineItem[]) => timelineItems.filter(item => item.id !== id));
    };

    const handleSettingsClick = () => {
        setIsSettingsModalVisible(true);
    };

    const handleSettingsOk = () => {
        const updatedTravel: UserTravel | null = {
            title: title ?? "",
            description: description ?? "",
            img: imageUrl,
            id: travel?.id ?? '',
            owner_user_id: travel?.owner_user_id ?? '',
            Date_start: travel?.Date_start ?? '',
            Date_end: travel?.Date_end ?? '',
            status: travel?.status ?? '',
            places: timelineItems
        };
        setTravel(updatedTravel);
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
                {travel?.title}
                <SettingOutlined style={{ cursor: 'pointer', marginLeft: "20px" }} onClick={handleSettingsClick} />
            </h1>
            <Timeline className="TimeLine">
                {timelineItems.map(item => (
                    <Timeline.Item key={item.id}>
                        <PlaceCard
                            Title={item.title}
                            img={item.img}
                            type={item.type}
                            place_id={item.place_id}
                            coordinates={item.coordinates}
                            onDelete={() => handleDelete(item.id)}
                        />
                    </Timeline.Item>
                ))}
            </Timeline>
            <Modal
                title="Настройки"
                open={isSettingsModalVisible}
                onOk={handleSettingsOk}
                onCancel={handleSettingsCancel}
            >
                <Input placeholder="Enter new title" value={title} onChange={e => setTitle(e.target.value)} />
                <Input placeholder="Enter new description" value={description} onChange={e => setDescription(e.target.value)} />
                <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    beforeUpload={beforeUpload}
                    onChange={handleImageChange}
                >
                    {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : <UploadOutlined />}
                </Upload>
            </Modal>
            <div className="confirm-container">
                <Button type="primary" onClick={handleUpdate}>Сохранить</Button>
            </div>
        </div>
    );
}

export default SideBarTravel;
