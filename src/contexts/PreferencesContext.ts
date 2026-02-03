import { createContext, useContext } from "react";
import type { PreferencesModel } from "../models/PreferencesModel";

interface PreferencesContextValues{
    preferences: PreferencesModel;
    toggleTheme: () => void;
    changeLanguage: () => void;
    changeCurrency: () => void;
    clearPrefferences: () => void;
}

export const PreferencesContext = createContext<PreferencesContextValues | null>(null);

export const usePreferences = () => {
    const ctx = useContext(PreferencesContext);
    if (!ctx) {
        throw new Error("usePreferences must be used inside PreferencesProvider");
    }
    return ctx;
}