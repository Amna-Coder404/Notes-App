
import Categories from '@/components/CategoriesModal'
import EditBtn from '@/components/EditBtn'
import Loader from '@/components/Loader'
import NotFound from '@/components/NotFound'
import { api } from '@/convex/_generated/api'
import { useDbUser } from '@/hooks/useDbUser'
import { useTheme } from '@/hooks/useTheme'
import { createHomeStyles } from '@/style/home.style'
import { Entypo } from '@expo/vector-icons'
import { useMutation, useQuery } from 'convex/react'
import React, { useState } from 'react'
import { FlatList, Image, Pressable, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { formatDistanceToNow } from "date-fns"
import { SafeAreaView } from 'react-native-safe-area-context'
import { it } from 'node:test'
import EditNoteModal, { DeleteNote } from '@/components/EditNoteModal'


const Home = () => {
  const { theme } = useTheme();
  const styles = createHomeStyles(theme);

  const { dbUser } = useDbUser();


  const notes = useQuery(
    api.notes.getAllNotes,
    dbUser?.clerkId ? { clerkId: dbUser.clerkId } : "skip"
  );

  const updateNotes = useMutation(api.notes.editNotes);


  const categoryCounts: Record<string, number> = {};

  if (notes) {
    for (const note of notes) {
      for (const category of note.categories) {
        categoryCounts[category] = (categoryCounts[category] || 0) + 1;
      }
    }
  }

  const categoriesArray = Object.entries(categoryCounts);//arry to obj
  const allNotesCount = notes?.length || 0;
  const [dropdownPos, setDropdownPos] = useState({
    x: 0,
    y: 0,
  })

  const [selectedNote, setSelectedNote] = useState<any>(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const [showCategories, setShowCategories] = useState(false);
  const deleteNote = useMutation(api.notes.deleteNote);

  const handleEditSave = async (data: any) => {
    if (!selectedNote) return;

    const noteId = selectedNote._id;
    try {
      await updateNotes({
        noteId,
        title: data.title,
        content: data.content,
        categories: data.categories,
      })

      setEditModalVisible(false);
      setSelectedNote(null);
    } catch (error) {
      console.log("ERROR : ", error);
      throw new Error("Faild to edit");
    }
  }

  const handleDelete = async () => {
    if (!selectedNote?._id) return;
    try {
      await deleteNote({ noteId: selectedNote._id });
      setSelectedNote(null);
      setDeleteModal(false);
    }
    catch (error) {
      throw new Error("Faild to delele!!");
    }
  }


  if (notes === undefined) return <Loader />

  if (!dbUser) {
    return <Loader />;
  };

  const renderNote = ({ item }: any) => (
    <View style={styles.noteCard}>
      <View style={styles.noteBetween}>
        <Text style={styles.noteTitle}>
          {item.title || "Untitled"}
        </Text>

        <TouchableOpacity
          onPress={(event) => {
            const { pageX, pageY } = event.nativeEvent;

            setDropdownPos({
              x: pageX,
              y: pageY,
            });

            setSelectedNote(item);
            console.log("ITem", item.title)
          }}
        >
          <Entypo
            name="dots-three-vertical"
            size={20}
            color={theme.mutedText}
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.noteDescription}>
        {item.content}
      </Text>

      <View style={styles.noteBetween}>
        <Text style={styles.noteCategory}>
          {item.categories.join(", ")}
        </Text>

        <Text style={styles.noteDate}>
          {formatDistanceToNow(
            new Date(item.createdAt),
            { addSuffix: true }
          )}
        </Text>
      </View>
    </View>
  );


  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER  */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello, {dbUser?.firstname} 👋</Text>
          <Text style={styles.subtitle}>Here are your notes</Text>
        </View>

        <TouchableOpacity style={styles.profileBtn}>
          {dbUser?.imageUrl && (
            <Image
              source={{ uri: dbUser.imageUrl }}
              style={styles.profilePic}
            />
          )}
        </TouchableOpacity>
      </View>
      {/* render all notes */}
      <FlatList
        data={notes}
        keyExtractor={(item) => item._id}
        renderItem={renderNote}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Categories</Text>

              <TouchableOpacity
                onPress={() => setShowCategories(true)}
              >
                <Text style={styles.viewAll}>View all</Text>
              </TouchableOpacity>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
            >
              <View style={styles.categoryCard}>
                <Text style={styles.categoryText}>ALL</Text>
                <Text style={styles.categoryCount}>
                  {allNotesCount}
                </Text>
              </View>

              {categoriesArray.map(([category, count]) => (
                <View
                  key={category}
                  style={styles.categoryCard}
                >
                  <Text style={styles.categoryText}>
                    {category}
                  </Text>

                  <Text style={styles.categoryCount}>
                    {count}
                  </Text>
                </View>
              ))}
            </ScrollView>

            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>
                All Notes
              </Text>
            </View>
          </>
        }
        ListFooterComponent={
          <>
            <Categories
              visible={showCategories}
              onClose={() => setShowCategories(false)}
            />
          </>
        }
      />


      <EditBtn
        visible={selectedNote !== null}
        position={dropdownPos}
        onClose={() => setSelectedNote(null)}
        onEdit={() => { setEditModalVisible(true) }}
        onDelete={() => {
          if (!selectedNote) return;
          setDeleteModal(true)
        }}
        onPin={() => {
          console.log('Pin',)
          setSelectedNote(null);
        }} />
      {/* EDIT MODAL */}
      <EditNoteModal
        visible={editModalVisible}
        onClose={() => {
          setEditModalVisible(false);
          setSelectedNote(null);
        }}
        note={selectedNote}
        handleSave={handleEditSave}
      />
      {/* DELETE NOTE MODAL */}
      <DeleteNote
        visible={deleteModal}
        onClose={() => {
          setDeleteModal(false);
          setSelectedNote(null);
        }}
        note={selectedNote}
        handleDelete={handleDelete}
      />
    </SafeAreaView>

  )
}

export default Home

