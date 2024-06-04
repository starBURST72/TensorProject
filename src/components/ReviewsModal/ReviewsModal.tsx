import React from 'react';
import { Modal, Typography, Button } from 'antd';
import { StarFilled } from '@ant-design/icons';
import "./ReviewsModal.css";

interface ReviewModalProps {
    visible: boolean;
    onClose: () => void;
    feedbacks: Array<{ user_id: number; username: string; score: number; description: string; }> | null;
}

const ReviewsModal: React.FC<ReviewModalProps> = ({ visible, onClose, feedbacks }) => {
    return (
        <Modal
            centered
            title="Отзывы"
            visible={visible}
            onOk={onClose}
            onCancel={onClose}
            className="reviewsModal" 
            footer={null} 
        >
            <div className='reviewsContainer'>
                {!(feedbacks && feedbacks?.length>0) ? (
                    <Typography.Title level={3}>Отзывов нет</Typography.Title>
                ) : (
                    <div className='feedbackList'>
                        {feedbacks?.map((feedback, index) => (
                            <div className='reviewCard' key={index}>
                                <div className="reviewerNameAndText">
                                    <div className="reviewerName"><b>Пользователь:</b> {feedback.username}</div>
                                    <div className="reviewerText"><b>Отзыв:</b> {feedback.description}</div>
                                </div>
                                <div className='reviewScoreContainer'>
                                    <div className="reviewScore">{feedback.score}</div>
                                    <StarFilled className='reviewStar' />
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className='modalFooter'> 
                <Button key="submit" type="primary" onClick={onClose}>
                    ОК
                </Button>
                <Button key="back" onClick={onClose}>
                    Закрыть
                </Button>
            </div>
        </Modal>
    );
};

export default ReviewsModal;
