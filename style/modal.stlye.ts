
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
            color: theme.text,
            fontSize: 16,
            fontWeight: "bold",
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
            gap: 12,
            marginBottom: 36
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
            maxHeight: "86%",
            paddingHorizontal: 12,
            paddingVertical: 33
        },
        text: {
            color: theme.mutedText,

        },
        canalBtn: {
            backgroundColor: "#84061B"
        },
        savebtnText: {
            color: theme.primary,
            fontSize: 16,
            fontWeight: "600",
        },

        // Create Image Model
        imageAddTitle: {
            fontSize: 30,
            color: theme.text,
            marginBottom: 12
        },
        takeOrPick: {
            flexDirection: "row",
            gap: 12,

            padding: 12,
            borderRadius: 10,
            backgroundColor: theme.card,
            marginBottom: 10,
            width: "80%",
        },

        changeBtn: {
            position: "absolute",
            bottom: 16,
            right: 2,
            width: 150,
            borderRadius: 6,
            borderWidth: 1,
            paddingVertical: 10,
            paddingHorizontal: 15,
            backgroundColor: "rgba(40, 29, 46, 0.62)",
            borderColor: "rgba(57, 44, 65, 0.82)"
        },
        createImage: {
            width: "100%",
            height: 200,
            borderRadius: 12,
            marginBottom: 15,
        },

        imageTitleInput: {
            fontSize: 24,
            fontWeight: "700",
            color: theme.text,
            marginTop: 20,
        },
        imageContentInput: {
            color: theme.text,
            fontSize: 16,
            marginTop: 15,
            lineHeight: 24,
            minHeight: 150,
            textAlignVertical: "top",
        },
        icon: {
            color: theme.text,
            fontSize: 20
        },
        againPickPhoto: {
            padding: 12,
            borderRadius: 10,
            backgroundColor: theme.card,
            marginTop: 10,
        }
    })