import React from 'react';
import './InterestsOnProfile.css';

type InterestsOnProfileProps = {
    interests: string[];
};

const InterestsOnProfile: React.FC<InterestsOnProfileProps> = ({ interests }) => {
    return (
        <div className="interests-container">
            <div className="interests-header">Интересы</div>
            {interests.map((interest, index) => (
                <div key={index} className="interest-item">
                    {interest}
                </div>
            ))}
        </div>
    );
};

export default InterestsOnProfile;