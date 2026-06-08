import { StyleSheet } from "react-native";

export const profileScreenStyles = (theme: any) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.bg,
        },

        // Header
        header: {
            backgroundColor: theme.primary,
            paddingTop: 70,
            paddingBottom: 30,
            paddingHorizontal: 20,
            flexDirection: "row",
            alignItems: "center",

        },

        profileImage: {
            width: 80,
            height: 80,
            borderRadius: 40,
            borderWidth: 3,
            borderColor: theme.bright,
        },

        userInfo: {
            marginLeft: 15,
        },

        userName: {
            fontSize: 24,
            fontWeight: "700",
            color: theme.bright,
        },

        userEmail: {
            fontSize: 15,
            color: theme.bright,
            marginTop: 4,
        },

        // Menu
        menuContainer: {
            marginTop: 15,
            backgroundColor: theme.bg,
        },

        menuItem: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 20,
            paddingVertical: 24,
            borderBottomWidth: 1,
            borderBottomColor: theme.border,
        },

        menuLeft: {
            flexDirection: "row",
            alignItems: "center",
        },

        iconContainer: {
            width: 40,
            alignItems: "center",
            justifyContent: "center",
        },

        menuTextContainer: {
            marginLeft: 17,
        },

        menuTitle: {
            fontSize: 16,
            fontWeight: "600",
            color: theme.text,
        },

        menuSubtitle: {
            fontSize: 13,
            color: theme.textSecondary,
            marginTop: 2,
        },


        // Logout
        logoutText: {
            color: theme.danger,
            fontSize: 16,
            fontWeight: "600",
        },

        // Switch
        switchContainer: {
            transform: [{ scaleX: 1.1 }, { scaleY: 1.1 }],
        },
    });