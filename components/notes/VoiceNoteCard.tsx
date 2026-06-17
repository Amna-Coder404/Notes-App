import { useTheme } from '@/hooks/useTheme';
import { voiceNoteStyle } from '@/style/voiceNote.style';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import React, { useRef, useState } from 'react';
import {  TouchableOpacity, View } from 'react-native';



const VoiceNoteCard = ({ audioUrl }: any) => {
    const { theme } = useTheme();
    const styles = voiceNoteStyle(theme);

    const [sound, setSound] = useState<Audio.Sound | null>(null);
    const [playing, setPlaying] = useState(false);
    const [progress, setProgress] = useState(0);

    const waveform = useRef(Array.from({ length: 25 }, () => Math.random())).current



   const togglePlay = async () => {
    if (!audioUrl) return;

    // FIRST TIME LOAD
    if (!sound) {
        const { sound: newSound } = await Audio.Sound.createAsync(
            { uri: audioUrl },
            { shouldPlay: true }
        );

        setSound(newSound);
        setPlaying(true);

        newSound.setOnPlaybackStatusUpdate((status: any) => {
            if (!status.isLoaded) return;

            // SAFE PROGRESS (IMPORTANT FIX)
            if (status.isPlaying && status.durationMillis) {
                setProgress(
                    status.positionMillis / status.durationMillis
                );
            }

            // CLEAN FINISH HANDLING
            if (status.didJustFinish) {
                setPlaying(false);
                setProgress(0);

                // IMPORTANT SAFE RESET (NO CRASH)
                newSound.stopAsync().then(() => {
                    newSound.setPositionAsync(0);
                });
            }
        });

        return;
    }

    // PAUSE
    if (playing) {
        await sound.pauseAsync();
        setPlaying(false);
        return;
    }

    // RESUME
    await sound.playAsync();
    setPlaying(true);
};

    return (
        <View style={styles.voiceContainer}>
            <View style={styles.voiceWaveCon}>
                {waveform.map((h, i) => {
                    const active = i / waveform.length < progress
                    return (
                        <View key={i} style={[styles.voiceWave, { height: 8 + h * 18, backgroundColor: active ? "#2ecc71" : "#ccc" }]} />
                    )
                })}
            </View>

            <TouchableOpacity onPress={togglePlay}>
                <Ionicons name={playing ? "pause" : "play"} style={styles.icon}/>
            </TouchableOpacity>
        </View>
    );
};

export default VoiceNoteCard;