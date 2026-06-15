import { useTheme } from "@/hooks/useTheme";
import React from "react";
import { Switch } from "react-native";

const ThemeToggle = () => {
  const { isDark, toggleTheme, theme } = useTheme();

  return (
 
      <Switch
        value={isDark}
        onValueChange={toggleTheme}
        thumbColor={isDark ? theme.primary : "#ccc"}
        trackColor={{ false: "#ccc", true: theme.primary }}
      />
  
  );
};

export default ThemeToggle;

