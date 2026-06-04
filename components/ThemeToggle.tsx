import React from "react";
import { View, Text, Switch, StyleSheet } from "react-native";
import { useTheme } from "@/hooks/useTheme";

const ThemeToggle = () => {
  const { isDark, toggleTheme, theme } = useTheme();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.card, borderColor: theme.border },
      ]}
    >
      <Text style={[styles.text, { color: theme.text }]}>
        Dark Mode
      </Text>

      <Switch
        value={isDark}
        onValueChange={toggleTheme}
        thumbColor={isDark ? theme.primary : "#ccc"}
        trackColor={{ false: "#ccc", true: theme.primary }}
      />
    </View>
  );
};

export default ThemeToggle;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    marginVertical: 10,
  },

  text: {
    fontSize: 16,
    fontWeight: "600",
  },
});