import VoiceNoteCard from '@/components/notes/VoiceNoteCard';
import Loader from '@/components/ui/Loader';
import NotFound from '@/components/ui/NotFound';
import { api } from '@/convex/_generated/api';
import { useDbUser } from '@/hooks/useDbUser';
import { useTheme } from '@/hooks/useTheme';
import { createHomeStyles } from '@/style/home.style';
import { FontAwesome } from '@expo/vector-icons';
import { useMutation, useQuery } from 'convex/react';
import { formatDistanceToNow } from "date-fns";
import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Favorites = () => {
  const { dbUser } = useDbUser();
  const { theme } = useTheme();
  const styles = createHomeStyles(theme);

  const staredNotes = useQuery(
    api.notes.getFavoriteNotes,
    dbUser?.clerkId ? { clerkId: dbUser.clerkId } : "skip"
  )
  const router = useRouter();

  const toggleFavorite = useMutation(api.notes.toggleFavorite);

  const handleToggleStar = async (noteId: any) => {
    try {
      await toggleFavorite({
        noteId,
      });
    }
    catch {
      throw new Error("Faild to Star ");
    }
  }

  if (staredNotes === undefined) return <Loader />

  const renderFavoriteNote = ({ item: note }: any) => (
    <TouchableOpacity style={[styles.noteCard, styles.importantCard]} onPress={() =>
      router.push({
        pathname: "/notes/[id]",
        params: { id: String(note._id) },
      })
    }>

      {/* IMAGE */}
      {note.imageUrl && (
        <Image
          source={{ uri: note.imageUrl }}
          style={styles.importantImage}
        />
      )}

      {/* CONTENT */}
      <View style={styles.importantContent}>

        <Text style={styles.noteTitle} numberOfLines={1}>
          {note.title || "Untitled"}
        </Text>



        {note.type === "voice" ? (
          <VoiceNoteCard audioUrl={note.audioUrl} />
        ) : (
          <Text
            style={styles.importantNoteText}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {note.content}
          </Text>
        )}



        <Text style={styles.noteDate}>
          {formatDistanceToNow(new Date(note.createdAt), { addSuffix: true })}
        </Text>

      </View>

      {/* STAR ICON */}

      <TouchableOpacity onPress={() => handleToggleStar(note._id)}>
        <FontAwesome
          name={note.isFavorite ? "star" : "star-o"}
          size={18}
          color={note.isFavorite ? "#CEC436" : theme.mutedText}
        />
      </TouchableOpacity>

    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={staredNotes}
        keyExtractor={(note) => note._id}
        renderItem={renderFavoriteNote}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.cardContainer}
        ListHeaderComponent={
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Favorites</Text>
          </View>
        }
        ListEmptyComponent={
          <NotFound text={"No favorite notes yet"} icon={"book"} />
        }
      />
    </SafeAreaView>
  )
}

export default Favorites
