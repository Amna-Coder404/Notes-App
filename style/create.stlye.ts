import { StyleSheet } from "react-native";

export const createStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.secondary,
      paddingHorizontal: 20,
      paddingTop: 50,
    },

    header: {
      marginBottom: 25,
    },

    headerTitle: {
      fontSize: 26,
      fontWeight: "700",
      color: theme.text,
    },

    headerSubtitle: {
      fontSize: 14,
      color: theme.mutedText,
      marginTop: 4,
    },

    input: {
      backgroundColor: theme.card,
      borderWidth: 1,
      borderColor: theme.border,
      borderRadius: 12,
      paddingHorizontal: 14,
      paddingVertical: 12,
      fontSize: 15,
      marginBottom: 15,
      color: theme.text,
    },

    textArea: {
      height: 140,
      textAlignVertical: "top",
      
    },

    dropdown: {
      backgroundColor: theme.card,
      borderWidth: 1,
      borderColor: theme.border,
      borderRadius: 12,
      padding: 14,
      marginBottom: 15,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      
    },

    dropdownText: {
      color: theme.mutedText,
      fontSize: 15,
      
    },

    dropdownPlaceholder: {
      color: theme.mutedText,
    },

    dropdownList: {
      backgroundColor: theme.card,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: theme.border,
      marginBottom: 15,
      overflow: "hidden",
    
      
    },

    dropdownItem: {
      padding: 12,
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
      color : theme.mutedText
    },

    button: {
      backgroundColor: theme.primary,
      paddingVertical: 14,
      borderRadius: 12,
      alignItems: "center",
      marginTop: 10,
      color : theme.mutedText
    },

    buttonText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "600",
    },
  });