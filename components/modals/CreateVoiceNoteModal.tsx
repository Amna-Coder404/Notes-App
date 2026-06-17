import { api } from "@/convex/_generated/api";
import { useTheme } from "@/hooks/useTheme";
import { useVoiceRecorder } from "@/hooks/useVoiceRecorder";
import { voiceNoteStyle } from "@/style/voiceNote.style";
import { MaterialIcons } from "@expo/vector-icons";
import { useMutation } from "convex/react";
import { Audio } from "expo-av";
import React, { useState } from "react";
import {
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import Loader from "../ui/Loader";

const CreateVoiceNoteModal = ({ visible, onClose, clerkId }: any) => {
  const { theme } = useTheme();
  const styles = voiceNoteStyle(theme);


  const { recording, startRecording, stopRecording } = useVoiceRecorder();

  const generateUploadUrl = useMutation(api.notes.generateUploadUrl);
  const createNote = useMutation(api.notes.createNote);

  const [loading, setLoading] = useState(false);

  const [audioUri, setAudioUri] = useState<string | null>(null);
  const [title, setTitle] = useState("");

  const [sound, setSound] = useState<Audio.Sound | null>(null);
  

  // Stop recording only
  const handleStopRecording = async () => {
    const uri = await stopRecording();

    if (uri) {
      setAudioUri(uri);
    }
  };



  // Delete recording
  const handleDeleteRecording = async () => {
    if (sound) {
      await sound.unloadAsync();
    }

    setSound(null);
   
    setAudioUri(null);
    setTitle("");
  };

  // Upload + create note
  const handleSaveVoiceNote = async () => {
    try {
      if (!audioUri || !clerkId) return;

      setLoading(true);

      const uploadUrl = await generateUploadUrl();

      const response = await fetch(audioUri);
      const blob = await response.blob();

      const uploadRes = await fetch(uploadUrl, {
        method: "POST",
        headers: {
          "Content-Type": blob.type,
        },
        body: blob,
      });

      const { storageId } = await uploadRes.json();

      await createNote({
        clerkId,
        type: "voice",
        title,
        content: "",
        categories: ["voice"],
        audioUrl: storageId,
      });

      // reset everything
      setTitle("");
      setAudioUri(null);
    

      if (sound) {
        await sound.unloadAsync();
      }

      setSound(null);

      onClose();
    } catch (error) {
      console.log("ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.container}>
        <View style={styles.voiceCard}>
          <View style={styles.title}>
            <MaterialIcons name="keyboard-voice" style={styles.voiceIcon} />
            <Text style={styles.titleText}>
              Voice Note
            </Text>

          </View>
          {loading && (
            <Loader />
          )}

          {/* Start Recording */}
          {!recording && !audioUri && (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={startRecording}
              style={styles.button} >


              <Text style={styles.btntext}>
                Start Recording
              </Text>
            </TouchableOpacity>
          )}

          {/* Recording */}
          {recording && (
            <>
              <Text style={[styles.text, { color: "red", margin: 10 }]}>
                Recording...
              </Text>

              <TouchableOpacity activeOpacity={0.8} onPress={handleStopRecording} style={[styles.button, { backgroundColor: theme.danger }]}>
                <Text style={styles.btntext}>
                  Stop Recording
                </Text>
              </TouchableOpacity>
            </>
          )}

          {/* Recorded voice */}
          {audioUri && (
            <View style={styles.btnContainer}>
              <TextInput
                placeholder="Voice title..."
                value={title}
                onChangeText={setTitle}
                style={styles.input}
                placeholderTextColor={theme.text}
              />


              <TouchableOpacity activeOpacity={0.8} onPress={handleDeleteRecording} style={[styles.button, { backgroundColor: theme.danger }]}>
                <Text style={styles.btntext}>
                  Delete Recording
                </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={handleSaveVoiceNote} style={styles.button} activeOpacity={0.8}>
                <Text style={styles.btntext}>
                  Save Voice Note
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {!recording && !loading && (
            <TouchableOpacity onPress={onClose} style={{ marginTop: 20 }}>
              <Text style={{ textAlign: "center", color: "gray", }}>
                Close
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default CreateVoiceNoteModal;