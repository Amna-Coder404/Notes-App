import React, { createContext, useState } from "react";
import { darkTheme, lightTheme } from "@/constants/theme";
import { StatusBar } from "expo-status-bar";

export const ThemeContext = createContext<any>(null);

export const ThemeProvider = ({ children }: any) => {
    const [isDark, setIsDark] = useState(true);

    const toggleTheme = () => setIsDark((p) => !p);

    const theme = isDark ? darkTheme : lightTheme;

    return (
        <ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>
            <StatusBar style="light" />
            {children}
        </ThemeContext.Provider>
    );
};
