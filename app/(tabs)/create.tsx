import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useState } from 'react'
import { useMutation, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useUser } from '@clerk/clerk-expo';
import { styles } from '@/style/create.stlye';
import { Ionicons } from '@expo/vector-icons';


const categories = [
  "Study",
  "Programming",
  "Personal",
  "Ideas",
  "Goals",
  "Other"
];


const Create = () => {
  const { user } = useUser();
  const dbUser = useQuery(
    api.user.getUserByClerkId,
    user?.id ? { clerkId: user.id } : "skip"
  );
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const createNote = useMutation(api.notes.createNote);

  const [category, setCategory] = useState("");
  const [openCategory, setOpenCategory] = useState(false);
  const [loading, setLoading] = useState(false);


  const handleCreateNotes = async () => {
    if (!dbUser) return;
    if (!title.trim() || !content.trim()) return;
    if (loading) return;

    setLoading(true);
    try {
      await createNote({
        clerkId: dbUser?.clerkId,
        title: title,
        categories: category,
        content: content
      })

      setTitle("")
      setContent("")
      setCategory("")
    }
    catch (error) {
      console.log("ERROR", error)
    }
    finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Create your notes</Text>
        <Text style={styles.headerSubtitle}>Save your ideas instantly</Text>
      </View>

      <TextInput
        style={styles.input}
        value={title}
        placeholder='Add title'
        onChangeText={setTitle}
      />
      <TouchableOpacity
        style={styles.dropdown}
        onPress={() => setOpenCategory(!openCategory)}>
        <Text style={
          category
            ? styles.dropdownText
            : styles.dropdownPlaceholder
        }>
          {category || "Select Category"}
        </Text>

        <Ionicons
          name={openCategory ? "chevron-up" : "chevron-down"}
          size={20}
          color="#666"
        />

        {/* Notes */}
      </TouchableOpacity>

      {openCategory && (
        <View style={styles.dropdownList}>
          {categories.map((item) => (
            <TouchableOpacity
              key={item}
              style={styles.dropdownItem}
              onPress={() => {
                setCategory(item);
                setOpenCategory(false);
              }}
            >
              <Text>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
      <TextInput
        placeholder="Write your note..."
        value={content}
        onChangeText={setContent}
        multiline
        style={[styles.input, styles.textArea]}
      />
      <TouchableOpacity
        style={[
          styles.button,
          loading && { opacity: 0.6 }
        ]}
        onPress={() => handleCreateNotes()}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Creating..." : "Create Note"}
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  )
}

export default Create