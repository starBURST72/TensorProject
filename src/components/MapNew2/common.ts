import type { YMapLocationRequest, LngLat } from '@yandex/ymaps3-types';

export const LOCATION: YMapLocationRequest = {
    center: [65.541227, 57.152985], // starting position [lng, lat]
    zoom: 14 // starting zoom
};

// Array containing data for markers
export const markerProps = [
    {
        coordinates: [65.5600105653111, 57.14883932510754] as LngLat,

    },
    {
        coordinates: [65.55036168655934, 57.1485671873132] as LngLat,

    },
    {
        coordinates: [65.5340378278529, 57.15222291358625] as LngLat,

    }
];