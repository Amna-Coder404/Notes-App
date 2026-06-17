// Voice Note 
import { StyleSheet } from "react-native";

export const voiceNoteStyle = (theme: any) =>
    StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#00000090",
        },
        voiceCard: {
            width: "85%",
            backgroundColor: theme.card,
            borderRadius: 20,
            padding: 20,
        },
        title: {
            justifyContent:"center",
            flexDirection: "row",
            gap:12
        },
        titleText: {
            fontSize: 20,
            fontWeight: "bold",
            marginBottom: 20,
            textAlign: "center",
            color: theme.text
        },
        voiceContainer: {
            marginTop: 10,
            padding: 12,
            borderRadius: 12,
            backgroundColor: theme.voice,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center"
        },
        voiceWaveCon: {
            flexDirection: "row",
            alignItems: "center",
            gap: 2
        },
        voiceWave: {
            width: 3,
            borderRadius: 2,
        },

        icon: {
            color: theme.bright,
            fontSize: 24
        },
        voiceIcon : {
             color: theme.icon,
            fontSize: 24
        },
        text: {
            color: theme.text,
            fontWeight: "bold"
        },
        // Buttons 
        btnContainer: {
            gap: 12
        },
        button: {
            backgroundColor: "#4CAF50",
            padding: 15,
            borderRadius: 10,
            alignItems: "center",
        },
        recordingBtn: {
            textAlign: "center",
            color: "red",
            marginBottom: 15,
        },
        btntext: {
            color: "white",
            fontWeight: "bold"
        },
        input: {
            borderWidth: 1,
            borderColor: theme.border,
            borderRadius: 10,
            padding: 12,
            marginTop: 20,
        },


    });