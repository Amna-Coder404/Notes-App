import { StyleSheet } from "react-native";

export const createHomeStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,

      backgroundColor: theme.bg,
      paddingHorizontal: 15,
    },

    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    profilePic: {
      width: 40,
      height: 40,
      borderRadius: 20
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
      marginTop: 10,
      padding: 10,
      borderWidth: 1,
      borderColor: theme.mutedText,
      borderRadius: 10,

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



    categoryCard: {
      width: 100,
      height: 85,
      borderRadius: 18,
      justifyContent: "center",
      alignItems: "center",

      marginRight: 10,
      borderWidth: 1,
      borderColor: theme.border,
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
      justifyContent: "center",
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
      gap: 23
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

      zIndex: 9999,       // 👈 iOS + Android stacking
      elevation: 10,      // 👈 Android only
    },
    dropDownNotes: {
      position: 'absolute',
      right: 0,
      top: 30,
      backgroundColor: theme.card,
      padding: 10,
      borderRadius: 10,
      width: 150,
      elevation: 5,
      zIndex: 999,
    },
    editBtn: {
      flexDirection: 'row', gap: 10, padding: 8
    },
    cardContainer: {

      marginBottom: 40
    },
    selectCategory: {
      backgroundColor: theme.primary,

    },
    emptyContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 60,
    },

    emptyTitle: {
      fontSize: 18,
      fontWeight: "600",
      color: "#999",
    },

    emptySubtitle: {
      fontSize: 14,
      marginTop: 6,
      color: "#666",
    },
    noteImage: {
      width: "100%",
      height: 160,
      borderRadius: 12,
      marginBottom: 10,
    },

    // Pinned & Fav card
    importantCard: {
      flexDirection: "row",
      alignItems: "flex-start",
      gap: 12,

    },

    importantContent: {
      flex: 1,
      minWidth: 0,
    },

    importantNoteText: {
      color: theme.mutedText,
      width: "100%"
    },

    importantImage: {
      width: 80,
      height: 80,
      borderRadius: 10,
      flexShrink: 0,
    },
 

  });