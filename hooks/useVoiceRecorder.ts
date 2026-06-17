import { Audio } from "expo-av";
import { useState } from "react";

export const useVoiceRecorder = () => {
    const [recording, setRecording] = useState<Audio.Recording | null>(null);

    const startRecording = async () => {
        try {
            const permission = await Audio.requestPermissionsAsync();

            if (!permission.granted) {
                console.log("Microphone permission denied");
                return;
            }


            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
                // playThroughEarpieceAndroid : true
            });

            const { recording } = await Audio.Recording.createAsync(
                Audio.RecordingOptionsPresets.HIGH_QUALITY
            );

            setRecording(recording);
        }
        catch (error) {
            console.log("ERROR : ", error);
        }
    };

    const stopRecording = async () => {
        if (!recording) return null;

        await recording.stopAndUnloadAsync();

        const uri = recording.getURI();

        setRecording(null);


        return uri;
    };

    return {
        recording,
        startRecording,
        stopRecording
    }
}