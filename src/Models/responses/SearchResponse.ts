export interface SearchResponse {
    suggestions: Array<{ data: { city: string, region_iso_code: string } }>;
}
