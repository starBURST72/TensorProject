import React, { useContext, useState } from 'react';
import type { DrawerProps } from 'antd';
import { Button, Carousel, Drawer, Modal } from 'antd';
import { MenuOutlined, StarFilled } from '@ant-design/icons';
import './Sidebar.css';
import { ContextTravel } from '../Context/AppContext';
import { FullMarkerFields } from '../../storage/storage';
import ReviewsModal from '../ReviewsModal/ReviewsModal';
import ReviewsModalCreate from '../ReviewsModalCreate/ReviewsModalCreate';
import { CreateReviewAboutPlace } from '../../services/TravelService';

interface SidebarProps {
  visible: boolean;
  onClose: () => void;
  place: FullMarkerFields | null;
  parseCoordinates: (value: string) => [number, number];
}

const Sidebar: React.FC<SidebarProps> = ({ visible, onClose, place, parseCoordinates }) => {
  const [open, setOpen] = useState(true);
  const [placement] = useState<DrawerProps['placement']>('right');
  const { selectedTravel } = useContext(ContextTravel);
  const [modalState, setModalState] = useState<{ checkReviews: boolean; createReview: boolean }>({
    checkReviews: false,
    createReview: false,
  });

  
  const handleAddReview = async (review: { description: string; score: number }) => {
    try {
        await CreateReviewAboutPlace(place?.id ?? 1, review);
        console.log('Отзыв успешно добавлен');
    } catch (error) {
        console.error('Ошибка при добавлении отзыва:');
    }
};
  const toggleModal = (type: 'checkReviews' | 'createReview', isOpen: boolean) => {
    setModalState((prevState) => ({
      ...prevState,
      [type]: isOpen,
    }));
  };

  return (
    <div className='draw'>
      <Drawer
        title={`${place?.title}`}
        placement={'right'}
        closable={visible}
        onClose={onClose}
        open={visible}
        key={placement}
        mask={false}
        getContainer={false}
        className='sidebar'
      >
        <div className='sidebarContainer'>
          <div className='typeAndScore'>
            <div>{place?.type}</div>
            <div className="sidebarRating">
              <div className="sidebarRatingValue">{place?.mean_score}</div>
              <StarFilled className='sidebarStar' />
            </div>
          </div>
          <Carousel arrows infinite={false} style={{ width: 200 }}>
            {place?.photos.map((photo, index) => (
              <div key={index}>
                <img src={photo.file} alt={`place-${index}`} />
              </div>
            ))}
          </Carousel>
          <div>{'Адрес: ' + place?.address.split(',').slice(2).join(',').trim()}</div>
          <div>{'Описание: ' + place?.description}</div>
          <div className="buttonsContainer">
            <Button onClick={() => toggleModal('checkReviews', true)} className="reviewButton">Посмотреть отзывы</Button>
            <Button onClick={() => toggleModal('createReview', true)} className="reviewButton">Оставить отзыв</Button>
          </div>
        </div>
      </Drawer>
      <ReviewsModal
        visible={modalState.checkReviews}
        onClose={() => toggleModal('checkReviews', false)}
        feedbacks={place?.feedbacks || null}
      />
      <ReviewsModalCreate
        visible={modalState.createReview}
        onClose={() => toggleModal('createReview', false)}
        onSubmit={handleAddReview}
      />
    </div>
  );
};

export default Sidebar;
