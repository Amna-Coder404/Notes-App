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
    label: {
      fontSize: 16,
      fontWeight: "bold",
      color: theme.bright,
      marginBottom: 6,
      marginLeft: 2,
      letterSpacing: 0.3,

    },

    requiredMark: {
      color: "red",
      fontSize: 13,
      marginLeft: 4,
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
      marginBottom: 25,
      overflow: "hidden",
      maxHeight: 350,


    },

    dropDownListInEdit: {
      position: "absolute",
      top: 350, // adjust based on dropdown height
      left: 0,
      right: 0,

      zIndex: 9999,
      elevation: 10, // Android fix
      margin: 12
    },

    dropdownItem: {
      padding: 12,
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
      color: theme.mutedText,


    },

    button: {
      backgroundColor: theme.primary,
      paddingVertical: 14,
      borderRadius: 12,
      alignItems: "center",
      marginTop: 10,
      color: theme.mutedText
    },

    buttonText: {
      color: theme.bright,
      fontSize: 16,
      fontWeight: "600",
    },
    errorText: {
      color: "red",
      fontSize: 13,
      marginTop: 4,
      marginLeft: 2,
    },
    formContainer: {
      paddingHorizontal: 16,
      paddingVertical: 26,
    },




  });