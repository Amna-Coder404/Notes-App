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
        }

    });