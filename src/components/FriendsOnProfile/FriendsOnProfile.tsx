import React from 'react';
import './FriendsOnProfile.css';
import { Link } from 'react-router-dom';

interface FriendFields {
    friend_id: number,
    name: string,
    surname: string,
    img: any,
    username: string,
}

interface Friends {
    friends: FriendFields[];
}

const FriendsOnProfile: React.FC<Friends> = ({ friends }) => {
    return (
        <div className="friends-container">
            <div className="friends-header">Друзья</div>
            <div className="friends-list">
                {friends.length > 0 ? (
                    friends.slice(0, 5).map((friend) => (
                        <Link to={`/profile/${friend.friend_id}`}>
                            <div key={friend.friend_id} className="friend">
                                <img className="friend-avatar" src={friend.img} alt={`${friend.name} ${friend.surname}`} />
                                <div className="friend-name">{friend.name}</div>
                            </div>
                        </Link>
                    ))
                ) : (
                    <div>Друзей нет</div>
                )}
            </div>
        </div>
    );
};

export default FriendsOnProfile;
