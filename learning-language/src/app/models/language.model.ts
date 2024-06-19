export interface LanguageModel {
    code: string;
    name: string;
}

export interface GetLanguagesResponse {
    languages: LanguageModel[];
}