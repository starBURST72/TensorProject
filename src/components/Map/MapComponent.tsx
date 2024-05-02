import React, {useRef, useState } from 'react';
import { YMaps, Map, Placemark, ZoomControl, SearchControl} from '@pbe/react-yandex-maps';
import axios from 'axios';
import './MapComponent.css';





const MapComponent: React.FC = () => {
    const [inputValue, setInputValue] = useState('')
    const [addressText] = useState('')
    const [geoCodecCoordinates, setGeoCodecCoordinates] = useState([57.152985, 65.541227])
    const mapState = {
        center: [geoCodecCoordinates[0], geoCodecCoordinates[1]],
        zoom: 16
    };
    const searchControlRef = useRef(inputValue);
    const handleSearch = async () => {
        try {
          const response = await axios.get('https://geocode-maps.yandex.ru/1.x/', {
            params: {
              apikey: '8dd7f097-6399-475c-bb7f-1139673cf402',
              geocode: inputValue,
              format: 'json',
            },
          });
    
          const coords = response.data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(' ');
          setGeoCodecCoordinates([parseFloat(coords[1]), parseFloat(coords[0])]);
        } catch (error) {
          console.error('Ошибка при запросе геокодирования:', error);
        }
      };


      const handleSearchControlResultChange = (event: any) => {
        const result = event.get('target').get('result');
        if (result.get('collection').get('children').get('length') > 0) {
          const firstResult = result.get('collection').get('children').get(0);
          setInputValue(firstResult.get('properties').get('name'));
          const coords = firstResult.get('geometry').get('coordinates');
          setGeoCodecCoordinates([coords[1], coords[0]]);
        }
      };


    return (
        <>
            
            <div className='searchConteiner'>
                <h2>Введите адрес</h2>
                <div className='SearcgLineAndButton'>
                    <input
                        className='SearchLine'
                        placeholder='Полный адрес'
                        value={inputValue}
                        onChange={e => setInputValue(e.target.value)}    
                    />
                    <button  onClick={() => handleSearch()}>Показать</button>
                </div>
            </div>
            <YMaps
                query={{
                    ns: "use-load-option",
                    apikey: "8dd7f097-6399-475c-bb7f-1139673cf402",
                    load: "Map,Placemark,control.ZoomControl,control.SearchControl"
                    // load: "загружаемые модули"
                }}

            >
                <div style={{ width: '100%', height: 750 }}>
                    <Map style={{ width: '100%', height: 750 }} state={mapState}>
                        <ZoomControl/>
                        <SearchControl
                        
                        ref={searchControlRef}
                        options={{
                            
                            provider: 'yandex#search',
                        }}
                        events={{onChange:handleSearchControlResultChange}}
                        //onResultShow={handleSearchControlResultChange}
                        
                        />
                        <Placemark geometry={[geoCodecCoordinates[0], geoCodecCoordinates[1]]}
                            options={
                                {
                                    //preset: 'islands#circleIcon', // список темплейтов на сайте яндекса
                                    //iconColor: 'green', // цвет иконки, можно также задавать в hex
                                    // balloonContentLayout: this.state.balloonContent

                                }}
                            properties={
                                {
                                    balloonContentHeader: inputValue,
                                    balloonContentBody: addressText
                                    // iconContent: '', // пару символов помещается
                                    // hintContent: '<b> Я появляюсь при наведении на метку </b>',
                                    // // создаём пустой элемент с заданными размерами
                                    //  balloonContent: mapRef.balloonContent

                                    // Формируем строку с данными об объекте.

                                    // В качестве контента балуна задаем строку с адресом объекта.
                                    // balloonContent: mapRef.geocode(inp)
                                    // .then(result=>result.geoObjects.get(0).getAddressLine())
                                }} />

                    </Map>

                </div>
            </YMaps>
        </>
    )
}

export default MapComponent;
