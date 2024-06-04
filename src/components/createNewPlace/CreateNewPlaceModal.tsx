import React, { useEffect, useState, useRef, useContext } from 'react';
import { Modal, Form, Input, Button, message, UploadFile, Select, SelectProps } from 'antd';
import { Context } from '../..';
import './CreateNewPlaceModal.css';
import PhotoUploadPlaceCreate from '../PhotoUploadPlaceCreate/PhotoUploadPlaceCreate';
import { interestsStatic } from '../../storage/storage';

interface AddReviewModalProps {
    visible: boolean;
    onClose: () => void;
    onSubmit: (placeInfo: {
        title: string;
        description: string;
        address: string;
        type: string;
        coordinates: string;
        file: File;
    }) => void;
}

const interests: SelectProps['options'] = interestsStatic.map(interest => ({
    label: interest,
    value: interest
}));

const CreateNewPlaceModal: React.FC<AddReviewModalProps> = ({ visible, onClose, onSubmit }) => {
    const [form] = Form.useForm();
    const [coordinates, setCoordinates] = useState<string | null>(null);
    const [address, setAddress] = useState<string>('');
    const [file, setFile] = useState<UploadFile | null>(null);
    const mapRef = useRef<any>(null);
    const placemarkRef = useRef<any>(null);
    const { store } = useContext(Context);

    const handleMapClick = (e: any) => {
        const coords = e.get('coords');
        setCoordinates(`${coords[0]}, ${coords[1]}`);
        getAddress(coords);

        const ymaps = window.ymaps;
        if (placemarkRef.current) {
            placemarkRef.current.geometry.setCoordinates(coords);
        } else {
            placemarkRef.current = new ymaps.Placemark(coords, { hintContent: address });
            mapRef.current.geoObjects.add(placemarkRef.current);
        }
    };

    const getAddress = (coords: number[]) => {
        const ymaps = window.ymaps;
        ymaps.geocode(coords).then((res: any) => {
            const firstGeoObject = res.geoObjects.get(0);
            const addressLine = firstGeoObject.getAddressLine();
            setAddress("Россия, " + addressLine);
            if (placemarkRef.current) {
                placemarkRef.current.properties.set('hintContent', addressLine);
                placemarkRef.current.properties.set('balloonContent', addressLine);
            }
        });
    };

    const handleSubmit = () => {
        form
            .validateFields()
            .then((values) => {
                if (coordinates && file) {
                    onSubmit({ ...values, coordinates, address, file: file.originFileObj });
                    form.resetFields();
                    setCoordinates(null);
                    setAddress('');
                    setFile(null);
                    onClose();
                } else {
                    message.error('Пожалуйста, выберите координаты и загрузите файл');
                }
            })
            .catch((info) => {
                console.log('Validate Failed:', info);
            });
    };

    useEffect(() => {
        const ymaps = window.ymaps;
        ymaps.ready(() => {
            if (visible && !mapRef.current) {
                mapRef.current = new ymaps.Map('mapCreatePlace', {
                    center: store.city.center,
                    zoom: store.city.zoom,
                    controls: ['zoomControl'],
                });
                mapRef.current.controls.remove('geolocationControl');
                mapRef.current.controls.remove('searchControl');
                mapRef.current.controls.remove('trafficControl');
                mapRef.current.controls.remove('typeSelector');
                mapRef.current.controls.remove('fullscreenControl');
                mapRef.current.controls.remove('rulerControl');
                mapRef.current.events.add('click', handleMapClick);
            } else if (mapRef.current) {
                mapRef.current.setCenter(store.city.center);
                mapRef.current.setZoom(store.city.zoom);
            }
        });
    }, [visible, store.city.center, store.city.zoom]);

    return (
        <Modal centered title="Добавить новое место" visible={visible} onOk={handleSubmit} onCancel={onClose} footer={null}>
            <Form form={form} layout="vertical">
                <Form.Item
                    name="title"
                    label="Название"
                    rules={[{ required: true, message: 'Пожалуйста, введите название места' }]}
                    className="formItemCreatePlace"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="description"
                    label="Описание"
                    rules={[{ required: true, message: 'Пожалуйста, введите описание места' }]}
                    className="formItemCreatePlace"
                >
                    <Input.TextArea rows={2} />
                </Form.Item>
                <Form.Item
                    name="type"
                    label="Тип"
                    rules={[{ required: true, message: 'Пожалуйста, введите тип места' }]}
                    className="formItemCreatePlace"
                >
                    <Select
                        options={interests} />
                </Form.Item>
                <Form.Item label="Координаты" required className="formItemCreatePlace">
                    <div id="mapCreatePlace" style={{ width: '100%', height: 300 }}></div>
                    {coordinates && <div>Выбранные координаты: {coordinates}</div>}
                </Form.Item>
                <Form.Item label="Адрес" required className="formItemCreatePlace">
                    {address ? <div>Адрес: {address}</div> : <div>Адрес не определен</div>}
                </Form.Item>
                <Form.Item
                    name="file"
                    label="Фотография"
                    rules={[{ required: true, message: 'Пожалуйста, загрузите фотографию' }]}
                    className="formItemCreatePlace"
                >
                    <PhotoUploadPlaceCreate
                        file={file}
                        onChange={(file) => setFile(file)}
                    />
                </Form.Item>
            </Form>
            <div className="modalFooter">
                <Button key="submit" type="primary" onClick={handleSubmit}>
                    Добавить
                </Button>
                <Button key="back" onClick={onClose}>
                    Отмена
                </Button>
            </div>
        </Modal>
    );
};

export default CreateNewPlaceModal;
