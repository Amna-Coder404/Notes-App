import { text } from "node:stream/consumers";
import { Platform, StyleSheet } from "react-native";

export const modalStlye = (theme: any) =>
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
        buttonContainer: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-evenly",
            gap: 12
        },

        button: {
            backgroundColor: theme.primary,
            paddingVertical: 14,
            paddingHorizontal: 42,
            borderRadius: 12,
            alignItems: "center",
            marginTop: 10,
            color: theme.mutedText,

        },
        buttonText: {
            color: "#fff",
            fontSize: 16,
            fontWeight: "600",
        },
        centerModalOverlay: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 16,
            backgroundColor: "#a7a7a72b"
        },

        centerModalBox: {
            width: "100%",
            backgroundColor: theme.bg,
            borderRadius: 16,
            padding: 16,
            maxHeight: "85%",
        },
        text: {
            color: theme.mutedText,
            
        },
        canalBtn: {
            backgroundColor: "#84061B"
        }
    })