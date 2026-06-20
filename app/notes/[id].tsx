import EditNoteModal, { DeleteNote } from "@/components/modals/EditNoteModal";
import FullImageModal from "@/components/notes/FullImageMode";
import VoiceNoteCard from "@/components/notes/VoiceNoteCard";
import Loader from "@/components/ui/Loader";
import NotFound from "@/components/ui/NotFound";
import { api } from "@/convex/_generated/api";
import { useNotes } from "@/hooks/useNotes";
import { useTheme } from "@/hooks/useTheme";
import { notesEditSection } from "@/style/notesEdit.style";
import { AntDesign, Entypo, Feather, FontAwesome } from "@expo/vector-icons";
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

  const { handleEditSave, handleDelete, handleTogglePinned, handleToggleStar } = useNotes();
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);


  // fetch single note
  const note = useQuery(api.notes.getNoteById, { noteId: id as any });

  const [fullImage, setfullImage] = useState(false);
  if (note === undefined) {
    return <Loader />;
  }

  if (note === null) {
    return (
      <View style={styles.notePreviewContainer}>
        <TouchableOpacity onPress={() => router.back()}>
          <Entypo name="chevron-left" size={26} color={theme.text} />
        </TouchableOpacity>

        <NotFound
          text="This note has been deleted."
          icon="trash-outline"
        />
      </View>
    );
  }

  const onSaveEdit = async (data: {
    title: string;
    content: string;
    categories: string[];
  }) => {
    if (!note?._id) return;

    await handleEditSave(note._id, data);

    setEditModalVisible(false);

  };

  return (
    <ScrollView style={styles.notePreviewContainer}>

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Entypo name="chevron-left" size={26} color={theme.text} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setEditModalVisible(true)}>
          <Feather name="edit" size={22} color={theme.text} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setDeleteModal(true)}>
          <Feather name="trash-2" size={22} color={theme.text} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleTogglePinned(note._id)}>
          <AntDesign name="pushpin" size={22} color={note.isPinned ? "#CEC436" : theme.mutedText} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleToggleStar(note._id)}>
          <FontAwesome name={note.isFavorite ? "star" : "star-o"} size={18} color={note.isFavorite ? "#CEC436" : theme.text} />
        </TouchableOpacity>
      </View>


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


      {/* EditNoteModal */}
      <EditNoteModal
        visible={editModalVisible}
        onClose={() => {
          setEditModalVisible(false);

        }}
        note={note}
        handleSave={onSaveEdit}
      />


      {/* Delete note  */}
      <DeleteNote
        visible={deleteModal}
        onClose={() => {
          setDeleteModal(false);

        }}
        note={note}
        handleDelete={() =>
          handleDelete({
            selectedNote: note,
            setDeleteModal,
            setEditModalVisible
          })
        }
      />
    </ScrollView>
  );
}