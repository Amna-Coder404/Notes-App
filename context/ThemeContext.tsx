import React, { createContext, useState } from "react";
import { darkTheme, lightTheme } from "@/constants/theme";

export const ThemeContext = createContext<any>(null);

export const ThemeProvider = ({ children }: any) => {
    const [isDark, setIsDark] = useState(true);

    const toggleTheme = () => setIsDark((p) => !p);

    const theme = isDark ? darkTheme : lightTheme;

    return (
        <ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
// todo 
// import { useColorScheme } from "react-native";

// const systemTheme = useColorScheme();
// const [isDark, setIsDark] = useState(systemTheme === "dark");