import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";
import { Appearance } from "react-native";

type Theme = "light" | "dark" ;

interface ThemeContextProps  {
    theme: Theme;
    changeTheme: () => void
}

const ThemeContext = createContext<ThemeContextProps | null>(null);

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) throw new Error ('useTheme debe usarse dentro del Provider');
    return context;
}

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [theme, setTheme] = useState<Theme>('light');
    
    useEffect(()=>{
        const loadTheme = async () => {
            const stored = await AsyncStorage.getItem("theme");
            if (stored ==="light" || stored ==="dark"){
                setTheme(stored);
            }else {
                const systemTheme = Appearance.getColorScheme();
                setTheme(systemTheme == 'dark' ? 'dark' : 'light');
            }

        };
        loadTheme();
    },[])

    const changeTheme = async () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        await AsyncStorage.setItem("theme", newTheme);
    }

    return (
         <ThemeContext.Provider value={{theme, changeTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}