import "./ProfilePage.css"
import React from 'react';
import RouteCard from "../../components/RouteCard/RouteCard";

function ProfilePage() {

    return (
        <div className="profile-container">
            <div className="top">
                <div className="avatar"></div>
                <div className="user-info">
                    <div className="user-name">Фамилия имя</div>
                    <div className="user-login">Логин</div>
                </div>
            </div>
            <div className="content">
                <div className="routes">
                    <div className="tabs">
                        <button className="tab selected">Созданные</button>
                        <button className="tab">В которых был (история путешествий)</button>
                    </div>
                    <div className="route-list">
                        <RouteCard />
                        <RouteCard />
                    </div>
                </div>
                <div className="friends">
                    <RouteCard />
                    <RouteCard />
                </div>
            </div>
        </div>
    );
};
export default ProfilePage;