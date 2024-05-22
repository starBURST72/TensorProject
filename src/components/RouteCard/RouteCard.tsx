import React from 'react';

function RouteCard() {
    return (
        <div className="route-card">
            <div className="route-avatar"></div>
            <div className="route-details">
                <div className="route-name">Название:</div>
                <div className="route-creator">Логин создателя</div>
                <div className="route-info">
                    <div className="participants">
                        <div className="participant"></div>
                        <div className="participant"></div>
                        <div className="participant"></div>
                        <div className="additional-participants">+7</div>
                    </div>
                    <div className="places">10 мест</div>
                    <div className="rating">
                        <div className="star">★</div>
                        <div className="rating-value">4.2</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RouteCard;