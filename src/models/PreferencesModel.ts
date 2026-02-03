
export type Theme = 'light' | 'dark';

export interface PreferencesModel{
    theme: Theme;
    language?: string;
    currency?: string;
}