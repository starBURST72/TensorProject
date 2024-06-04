import React from 'react';
import './InterestsOnProfile.css';

type InterestsOnProfileProps = {
    interests:
    {
        interest_id: number,
        name: string
    }[]
};

const InterestsOnProfile: React.FC<InterestsOnProfileProps> = ({ interests }) => {
    return (
        <div className="interests-container">
            <div className="interests-header">Интересы</div>
            {interests.length > 0 ? (
                interests.map((interest, index) => (
                    <div key={index} className="interest-item">
                        {interest.name}
                    </div>
                ))
            ) : (
                <div>Друзей нет</div>
            )}
        </div>
    );
};



export default InterestsOnProfile;