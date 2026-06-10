import Loader from '@/components/Loader';
import NotFound from '@/components/NotFound';

import { api } from '@/convex/_generated/api';
import { useDbUser } from '@/hooks/useDbUser';
import { useTheme } from '@/hooks/useTheme';
import { createHomeStyles } from '@/style/home.style';
import { FontAwesome} from '@expo/vector-icons';
import { useMutation, useQuery } from 'convex/react';
import { formatDistanceToNow } from "date-fns";
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Favorites = () => {
  const { dbUser } = useDbUser();
  const { theme } = useTheme();
  const styles = createHomeStyles(theme);

  const staredNotes = useQuery(
    api.notes.getFavoriteNotes,
    dbUser?.clerkId ? { clerkId: dbUser.clerkId } : "skip"
  )
  const toggleFavorite = useMutation(api.notes.toggleFavorite);

  const handleToggleStar = async (noteId: any) => {
    try {
      await toggleFavorite({
        noteId,
      });
    }
    catch (error) {
      throw new Error("Faild to Star ");
    }
  }

  if (staredNotes === undefined) return <Loader />
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Favorites</Text>
      </View>

      {
        staredNotes.length > 0 ? (
          <>
            {staredNotes?.map((note) => (
              <View key={note._id} style={styles.noteCard}>

                <View style={styles.noteBetween}>
                  <Text style={styles.noteTitle}>{note.title || "Untitle"}</Text>
                  <TouchableOpacity onPress={() => handleToggleStar(note._id)}>
                
                      <FontAwesome name={note.isFavorite ? "star" : "star-o"} size={18} color={note.isFavorite ? "#CEC436" : theme.mutedText} />
                  </TouchableOpacity>
                </View>
                <Text style={styles.noteDescription}>{note.content}</Text>
                <Text style={styles.noteDate}>
                  {formatDistanceToNow(
                    new Date(note.createdAt),
                    { addSuffix: true }
                  )}
                </Text>
              </View>
            ))}</>
        ) : (
         <NotFound text={"   No favorite notes yet"} icon={"book"}/>
        )
      }


    </SafeAreaView>
  )
}

export default Favorites