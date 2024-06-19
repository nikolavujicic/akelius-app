export interface Level {
    id: number;
    languageCode: string;
    title: string;
}

export interface GetLevelsResponse {
    levels: Level[];
}