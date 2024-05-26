import React from 'react';
import "./TravelCard.css"
import { Avatar, Space } from 'antd';
import { StarFilled } from '@ant-design/icons';

interface TravelProps {
    id: number,
    title: string,
    description: string,
    creatorLogin: string,
    score: number,
    photo: any,
    places:
    {
        placeid: number,
        placeName: string,
        placeDescription: string,
        placeType: string,
        placePhoto: any
    }[]


    //   image: string;
}

function TravelCard(props: TravelProps) {
    const { id, title, description, creatorLogin, score, photo, places } = props;
    return (
        <div className="travelCardContainer">

            <Space>


                <Avatar className="travelCardAvatar" src={photo}/>

                
                


                <div className="travelCardNameAndLogin">
                    <div className="travelName">{`${title}`}</div>
                    <div className="travelCreator">{`Автор: ${creatorLogin}`}</div>
                </div>
            </Space>

            <Space>
                <div className="travelCardPlacesImages">
                    {
                        places.slice(0, 3).map(place=>
                            <Avatar className="travelCardPlacesImagesOne" src={place.placePhoto} key={`${id}${place.placeid}`}/>
                        )
                        
                    }
                    {
                        places.length>3?
                        <div className="travelCardPlacesImagesCount">{`+${places.length-3}`}</div>
                        :
                        <></>
                    }
                    
                    {/* <div className="travelCardPlacesImagesOne"></div>
                    <div className="travelCardPlacesImagesOne"></div>
                    <div className="travelCardPlacesImagesOne"></div>
                    <div className="travelCardPlacesImagesCount">+7</div> */}
                </div>


                <div className="travelCardPlacesCount">
                    {`${places.length} места`}
                </div>
            </Space>
            <div className="travelCardRating">
                <div className="ratingValue">4.2</div>
                <StarFilled className='star' />

            </div>



        </div>
    );
};

export default TravelCard;