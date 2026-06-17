import FullImageModal from "@/components/notes/FullImageMode";
import VoiceNoteCard from "@/components/notes/VoiceNoteCard";
import Loader from "@/components/ui/Loader";
import { api } from "@/convex/_generated/api";
import { useTheme } from "@/hooks/useTheme";
import { notesEditSection } from "@/style/notesEdit.style";
import { Entypo } from "@expo/vector-icons";
import { useQuery } from "convex/react";
import { formatDistanceToNow } from "date-fns";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";



export default function NotePreview() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { theme } = useTheme();
  const styles = notesEditSection(theme);

  // fetch single note
  const note = useQuery(api.notes.getNoteById, { noteId: id as any });

  const [fullImage, setfullImage] = useState(false);
  if (!note) return <Loader />

  return (
    <ScrollView style={styles.notePreviewContainer}>

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Entypo name="chevron-left" size={26} color={theme.text} />
        </TouchableOpacity>

        <TouchableOpacity>
          <Entypo name="dots-three-vertical" size={20} color={theme.text} />
        </TouchableOpacity>
      </View>

      {/* IMAGE */}
      <TouchableOpacity onPress={() => setfullImage(!fullImage)}>
        {note.imageUrl && (
          <Image source={{ uri: note.imageUrl }} style={styles.image} resizeMode="cover" />
        )}

      </TouchableOpacity>
      {/* TITLE */}
      <Text
        style={styles.title}>
        {note.title || "Untitled"}
      </Text>

      {/* CATEGORY */}
      <View style={styles.categoryRow}>
        {note.categories?.map((cat: string, index: number) => (
          <View key={index} style={styles.categoryChip} >
            <Text style={styles.text}>{cat}</Text>
          </View>
        ))}
      </View>

      {/* CONTENT */}
      {note.type === "voice" ? (
        <VoiceNoteCard audioUrl={note.audioUrl} />

      ) : (
        <Text style={styles.content}>
          {note.content}
        </Text>

      )}
      {/* DATE */}
      <Text style={styles.time}>
        {formatDistanceToNow(new Date(note.createdAt), { addSuffix: true })}
      </Text>
      <FullImageModal visible={fullImage} imageUrl={note.imageUrl} setVisible={(v) => setfullImage(v)} />
    </ScrollView>
  );
}