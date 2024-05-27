// import React, { useEffect, useRef } from 'react';
// // @ts-ignore
// import { YMapMarker } from 'ymaps3';

// interface MarkerProps {
//   position: number[];
//   hintContent: string;
//   balloonContent: string;
// }

// const MapMarker: React.FC<MarkerProps> = ({ position, hintContent, balloonContent }) => {
//   const markerRef = useRef<YMapMarker | null>(null);

//   useEffect(() => {
//     if (!markerRef.current) {
//       markerRef.current = new YMapMarker({
//         position,
//         hintContent,
//         balloonContent,
//       });
//     } else {
//       markerRef.current.update({
//         position,
//         hintContent,
//         balloonContent,
//       });
//     }
//   }, [position, hintContent, balloonContent]);

//   return null;
// };

// export default MapMarker;
import React, { useEffect, useRef } from 'react';
// @ts-ignore
import { YMapMarker } from 'ymaps3';

interface MarkerProps {
  position: number[];
  hintContent: string;
  balloonContent: string;
}

const MapMarker: React.FC<YMapMarker> = ({ position, hintContent, balloonContent }) => {
  const markerRef = useRef<YMapMarker | null>(null);

  useEffect(() => {
    if (!markerRef.current) {
      markerRef.current = new YMapMarker({
        position,
        hintContent,
        balloonContent,
      });
    } else {
      markerRef.current.update({
        position,
        hintContent,
        balloonContent,
      });
    }
  }, [position, hintContent, balloonContent]);

  return null;
};

export default MapMarker;