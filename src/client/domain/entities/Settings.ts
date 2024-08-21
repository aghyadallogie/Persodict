export interface UserSettings {
    userId: string;
    userLangs: string[];
}

export interface ToggleLanguageArgs {
    languageCode: string;
    region?: string;
}