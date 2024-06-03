import React, { useState } from 'react';
import { Modal, Form, Input, Rate, Button } from 'antd';

interface AddReviewModalProps {
    visible: boolean;
    onClose: () => void;
    onSubmit: (review: { description: string; score: number }) => void;
}

const ReviewsModalCreate: React.FC<AddReviewModalProps> = ({ visible, onClose, onSubmit }) => {
    const [form] = Form.useForm();

    const handleSubmit = () => {
        form.validateFields()
            .then(values => {
                onSubmit(values);
                form.resetFields();
                onClose();
            })
            .catch(info => {
                console.log('Validate Failed:', info);
            });
    };

    return (
        <Modal
            centered
            title="Добавить отзыв"
            visible={visible}
            onOk={handleSubmit}
            onCancel={onClose}
            footer={null} 
        >
            <Form form={form} layout="vertical">
                <div className='formReviewContainer'>
                    <Form.Item
                        name="description"
                        label="Отзыв"
                        rules={[{ required: true, message: 'Пожалуйста, введите отзыв' }]}
                    >
                        <Input.TextArea rows={4} />
                    </Form.Item>
                    <Form.Item
                        name="score"
                        label="Оценка"
                        rules={[{ required: true, message: 'Пожалуйста, поставьте оценку' }]}
                    >
                        <Rate />
                    </Form.Item>
                </div>
            </Form>
            <div className='modalFooter'>
                <Button key="submit" type="primary" onClick={handleSubmit}>
                    Отправить
                </Button>
                <Button key="back" onClick={onClose}>
                    Отмена
                </Button>
            </div>
        </Modal>
    );
};

export default ReviewsModalCreate;
