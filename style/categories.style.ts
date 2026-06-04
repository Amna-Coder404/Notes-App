import { Platform, StyleSheet } from "react-native";

export const categoryModal = (theme: any) =>
    StyleSheet.create({
        modalContainer: {
            backgroundColor: theme.bg,
            marginBottom: Platform.OS === "ios" ? 44 : 0,
            flex: 1,
            marginTop: Platform.OS === "ios" ? 44 : 0,
        },
        modalHeader: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 16,
            height: 56,
            borderBottomWidth: 0.5,
            borderBottomColor: theme.mutedText,
        },
        modalTitle: {
            color: theme.mutedText,
            fontSize: 16,
            fontWeight: "600",
        },
    })