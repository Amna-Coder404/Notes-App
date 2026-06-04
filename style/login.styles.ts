import { StyleSheet } from "react-native";

export const createLoginStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.bg,
      paddingHorizontal: 24,
      justifyContent: "center",
      alignItems: "center",
    },

    logoContainer: {
      width: 110,
      height: 110,
      borderRadius: 28,
      backgroundColor: theme.primary,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 40,
    },

    title: {
      fontSize: 32,
      fontWeight: "700",
      color: theme.text,
      textAlign: "center",
      marginBottom: 12,
    },

    highlightText: {
      color: theme.primary,
    },

    subtitle: {
      fontSize: 16,
      color: theme.mutedText,
      textAlign: "center",
      lineHeight: 24,
      paddingHorizontal: 20,
      marginBottom: 80,
    },

    button: {
      width: "100%",
      height: 58,
      backgroundColor: theme.primary,
      borderRadius: 14,
      justifyContent: "center",
      alignItems: "center",
    },

    buttonText: {
      color: "#FFFFFF",
      fontSize: 18,
      fontWeight: "600",
    },
  });