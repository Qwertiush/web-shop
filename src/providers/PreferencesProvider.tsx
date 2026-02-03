import { useEffect, useState, type ReactNode } from "react"
import type { PreferencesModel } from "../models/PreferencesModel";
import { PreferencesContext } from "../contexts/PreferencesContext";

interface Props{
    children: ReactNode;
}

export const PreferencesProvider = ({children}: Props) => {
    const defaultPrefs = { theme: 'light', language: 'en', currency: 'zł' };
    const [preferences, setPreferences] = useState<PreferencesModel>(() => {
        const prefs = localStorage.getItem('preferences');
        if(prefs){
            const parsed = JSON.parse(prefs);
            return{
                theme: parsed.theme ?? defaultPrefs.theme,
                language: parsed.language ?? defaultPrefs.language,
                currency: parsed.currency ?? defaultPrefs.currency,
            };
        }
        return {theme: defaultPrefs.theme, language: defaultPrefs.language, currency: defaultPrefs.currency};
    });

    useEffect(()=>{
        localStorage.setItem('preferences', JSON.stringify(preferences));
        document.documentElement.setAttribute('data-theme', preferences.theme);
    },[preferences]);

    const toggleTheme = () => {
        setPreferences(prev => ({
            ...prev,
            theme: prev.theme === 'light' ? 'dark' : 'light',
        }));
    }

    const changeLanguage = () => {

    }

    const changeCurrency = () => {

    }

    const clearPrefferences = () => {
        localStorage.setItem('preferences', '');
    }
  
    return (
    <PreferencesContext.Provider
        value={{
            preferences,
            toggleTheme,
            changeLanguage,
            changeCurrency,
            clearPrefferences
        }}
        >
        {children}
    </PreferencesContext.Provider>
  )
}
