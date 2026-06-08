
import Create from '@/components/CreateNotesModal'
import Loader from '@/components/Loader'
import NotesCards from '@/components/NotesCards'
import { useDbUser } from '@/hooks/useDbUser'
import { useTheme } from '@/hooks/useTheme'
import { createHomeStyles } from '@/style/home.style'
import { Ionicons } from '@expo/vector-icons'
import React, { useState } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'


const Home = () => {
  const { theme } = useTheme();
  const styles = createHomeStyles(theme);
  const { dbUser } = useDbUser();
  const [showAddNoteModal, setShowAddNoteModal] = useState(false);

  return (
    <SafeAreaView style={styles.container}>

      <TouchableOpacity style={styles.fab} onPress={() => setShowAddNoteModal(true)}>
        <Ionicons name="add" size={24} color="#fff" />
      </TouchableOpacity>
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
      <NotesCards />
      <Create
        visible={showAddNoteModal}
        onClose={() => setShowAddNoteModal(false)}
      />

    </SafeAreaView>

  )
}

export default Home

