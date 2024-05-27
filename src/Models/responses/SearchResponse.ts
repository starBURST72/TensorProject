export interface SearchResponse {
    suggestions: Array<{ data: { value:string,city: string, region_iso_code: string } }>;
}
