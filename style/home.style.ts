import { StyleSheet } from "react-native";

export const createHomeStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.bg,
      paddingHorizontal: 20,
      paddingTop: 60,
    },

    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },

    greeting: {
      fontSize: 28,
      fontWeight: "700",
      color: theme.text,
    },

    subtitle: {
      marginTop: 6,
      fontSize: 15,
      color: theme.mutedText,
    },

    profileBtn: {
      width: 38,
      height: 38,
      borderRadius: 19,
      borderWidth: 1,
      borderColor: theme.border,
      justifyContent: "center",
      alignItems: "center",
    },

    searchRow: {
      flexDirection: "row",
      marginTop: 25,
      gap: 12,
    },

    searchContainer: {
      flex: 1,
      height: 50,
      backgroundColor: theme.inputBg,
      borderRadius: 14,
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 15,
    },

    searchInput: {
      flex: 1,
      marginLeft: 10,
      fontSize: 15,
      color: theme.text,
    },

    filterBtn: {
      width: 50,
      height: 50,
      borderRadius: 14,
      backgroundColor: theme.inputBg,
      justifyContent: "center",
      alignItems: "center",
    },

    sectionHeader: {
      marginTop: 30,
      marginBottom: 15,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },

    sectionTitle: {
      fontSize: 22,
      fontWeight: "700",
      color: theme.text,
    },

    viewAll: {
      color: theme.primary,
      fontSize: 15,
      fontWeight: "600",
    },

    categoriesRow: {
      backgroundColor: "red",
      flexDirection: "row",
      gap: 10,
    },

    categoryCard: {
      width: 100,
      height: 85,
      borderRadius: 18,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.card,
      marginRight: 10
    },

    categoryTitle: {
      fontSize: 16,
      fontWeight: "600",
      marginBottom: 6,
      color: theme.text,
    },

    categoryCount: {
      fontSize: 18,
      fontWeight: "700",
      color: theme.text,
    },
    categoryText: {
      color: theme.mutedText,
      fontSize: 12,
      fontWeight: "bold"
    },
    noteCategory: {
      marginTop: 8,
      fontSize: 13,
      fontWeight: "600",
      color: theme.primary,
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 10,
      alignSelf: "flex-start",
      backgroundColor: theme.secondary,
    },

    noteCard: {
      backgroundColor: theme.card,
      borderRadius: 18,
      padding: 16,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: theme.border,
    },

    noteBetween: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },

    noteTitle: {
      fontSize: 16,
      fontWeight: "700",
      color: theme.text,
    },

    noteDate: {
      fontSize: 13,
      color: theme.mutedText,
    },

    noteDescription: {
      marginTop: 6,
      fontSize: 14,
      color: theme.mutedText,
    },

    fab: {
      position: "absolute",
      right: 25,
      bottom: 30,
      width: 62,
      height: 62,
      borderRadius: 31,
      backgroundColor: theme.primary,
      justifyContent: "center",
      alignItems: "center",
    },
   
  });