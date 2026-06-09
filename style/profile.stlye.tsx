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


        // Logout
        logoutText: {
            color: theme.danger,
            fontSize: 16,
            fontWeight: "600",
        },

        //    category buttons

        categoryContainer: {
            flex: 1,
            backgroundColor: theme.bg,
            paddingHorizontal: 23,

        },
        categoryContainerMain : {
             flex: 1,
            backgroundColor: theme.bg,
         
        },

        categoryBtn: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 20,
            paddingVertical: 15,
            borderWidth: 1,
            borderColor: theme.border,
            marginTop: 10,
            borderRadius: 8,
        },

        categoryText: {
            fontSize: 16,
            color: theme.text,
        },

        categoryBtnIcon: {
            color: theme.text,
        },
        headerRow: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 16,
            paddingVertical: 12,
            borderBottomWidth: 1,
            borderBottomColor: "rgba(150,150,150,0.15)",
        }
    });