export interface TravelResponse {
    suggestions: Array<{ data: { city: string, region_iso_code: string } }>;
}

// Определяем типы для пропсов компонента
export interface SearchResultsProps {
    data: TravelResponse;
}