import { YMapLocation } from "@yandex/ymaps3-types/imperative/YMap";
import * as YMaps from "@yandex/ymaps3-types";

export const features: YMaps.YMapFeatureProps[] = [
  {
    id: "1",
    style: {
      fillRule: "nonzero",
      fill: "var(--map-no-data-color)",
      fillOpacity: 0.6,
      stroke: [
        {
          color: "var(--map-no-data-color)",
          width: 5,
        },
      ],
    },
    geometry: {
      type: "Polygon",
      coordinates: [
        [
          [37.8, 55.8],
          [37.8, 55.75],
          [37.9, 55.75],
          [37.9, 55.8],
        ],
      ],
    },
    properties: { hint: "Polygon 1" },
  },
  {
    id: "2",
    style: {
      fillRule: "nonzero",
      fill: "var(--map-success-color)",
      fillOpacity: 0.6,
      stroke: [
        {
          color: "var(--map-success-color)",
          width: 5,
        },
      ],
    },
    geometry: {
      type: "Polygon",
      coordinates: [
        [
          [37.9, 55.8],
          [37.9, 55.75],
          [38.0, 55.75],
          [38.0, 55.8],
        ],
      ],
    },
    properties: { hint: "Polygon 2" },
  },
  {
    id: "3",
    style: {
      fillRule: "nonzero",
      fill: "var(--map-danger-color)",
      fillOpacity: 0.6,
      stroke: [
        {
          color: "var(--map-danger-color)",
          width: 5,
        },
      ],
    },
    geometry: {
      type: "Polygon",
      coordinates: [
        [
          [38.0, 55.8],
          [38.0, 55.75],
          [38.1, 55.75],
          [38.1, 55.8],
        ],
      ],
    },
    properties: { hint: "Polygon 3" },
  },
];

export const location: YMapLocation = { center: [ 65.541227, 57.152985], zoom: 17 };

export const apiKey = "8dd7f097-6399-475c-bb7f-1139673cf402";
