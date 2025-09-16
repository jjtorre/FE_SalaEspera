import { createContext, useContext, useEffect, useState } from "react";
import {I18n} from "i18n-js";
import AsyncStorage from "@react-native-async-storage/async-storage";
type Language = "es" |"fr" | "en" | "de";

interface LanguageContextProps {
    language: Language;
    changeLanguage: (lng: Language) => void
}
const translations = {
  en: { welcome: 'Welcome', signIn: 'Sign in', login: 'Login', email: 'Email', language: 'Language', theme: 'Theme', settings: 'Settings' },
  es: { welcome: 'Bienvenido', signIn: 'Inicia Sesión', login: 'Ingresar', email: 'Correo', language: 'Idioma', theme: 'Tema', settings: 'Configuración' },
  fr: { welcome: 'Bienvenue', signIn: 'Connexion', login: 'Connexion', email: 'E-mail', language: 'Langue', theme: 'Thème', settings: 'Paramètres' },
  de: { welcome: 'Wilkommen', signIn:'Anmelden', login: 'Anmelden', email: 'E-Mail', language: 'Sprache', theme: 'Thema', settings: 'Einstellungen' },
};

const i18n = new I18n(translations); 
i18n.defaultLocale = "de";
i18n.enableFallback = true;
const LanguageContext = createContext<{
     language: Language,
    changeLanguage: (lng: Language) => void
} | null>(null);

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) throw new Error("useLanguage debe usarse dentro de LanguageProvider")
    return context;
    };

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
    const [language, setLanguage] = useState<Language>('es');

    useEffect (()=>{
        const loadLanguage = async () => {
            const storedLanguage = await AsyncStorage.getItem("language")
            if (storedLanguage) {
                setLanguage(storedLanguage as Language);
                i18n.locale = storedLanguage;
            }else if(!i18n.locale) {
                setLanguage(i18n.defaultLocale as Language);
                i18n.locale = i18n.defaultLocale; 
            }
        };
        loadLanguage()
    }, [])


    const changeLanguage = async (lang: Language) => {
        setLanguage(lang);
        i18n.locale = lang;
        await AsyncStorage.setItem("language", lang);
    };

    return (
        <LanguageContext.Provider value={{language, changeLanguage}}>
            {children}
        </LanguageContext.Provider>
    )
}

export {i18n}