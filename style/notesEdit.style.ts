import { StyleSheet } from "react-native";

export const notesEditSection = (theme: any) =>
    StyleSheet.create({
        onCloseBtn: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 9999,
        },

        containerEditSection: {
            position: 'absolute',

            width: 150,
            backgroundColor: theme.card || theme.background,
            borderRadius: 12,
            paddingVertical: 8,
            elevation: 10,
            shadowColor: '#000',
            shadowOpacity: 0.15,
            shadowRadius: 8,
            shadowOffset: {
                width: 0,
                height: 4,
            },
        },

        editBtns: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
            paddingHorizontal: 12,
            paddingVertical: 10,
        },
        text: {
            color: theme.text
        },
        // Note Preview 

        notePreviewContainer: {
            flex: 1,
            backgroundColor: theme.bg,
            padding: 16
        },

        header: {
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 12
        },

        image: {
            width: "100%",
            height: 400,
            borderRadius: 12,
            marginBottom: 16,
        },

        title: {
            fontSize: 26,
            fontWeight: "bold",
            color: theme.text,
            marginBottom: 10,
        },
        categoryRow: {
            flexDirection: "row",
            flexWrap: "wrap",
            marginBottom: 16,
        },
        categoryChip: {
            paddingHorizontal: 10,
            paddingVertical: 8,
            borderRadius: 20,
            backgroundColor: "#3b11729a",
            marginRight: 8,
            marginBottom: 8,
            borderWidth: 1
        },

        content: {
            fontSize: 16,
            lineHeight: 24,
            color: theme.text,
            marginTop: 10,
        },
        time: {
            marginTop: 20,
            fontSize: 12,
            color: theme.mutedText
        }
    });