
import CreateImageNoteModal from '@/components/CreateImageNoteModal'
import CreateOptionsModal from '@/components/CreateOptiosModal'
import CreateTextNotes from '@/components/CreateTextNotesModal'
import FullImageModal from '@/components/FullImageMode'
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

  const [showProfileImage, setShowProfileImage] = useState(false);


  const [showOptions, setShowOptions] = useState(false);
  const [showTextModal, setShowTextModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);


  return (
    <SafeAreaView style={styles.container}>

      <TouchableOpacity style={styles.fab} onPress={() => setShowOptions(true)}>
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
            <TouchableOpacity onPress={() => setShowProfileImage(true)}>
              <Image
                source={{ uri: dbUser.imageUrl }}
                style={styles.profilePic}
              />
            </TouchableOpacity>
          )}
        </TouchableOpacity>
      </View>

      <NotesCards />
      {/* <CreateTextNotes visible={showAddNoteModal} onClose={() => setShowAddNoteModal(false)} />
       */}

      <CreateOptionsModal
        visible={showOptions}
        onClose={() => setShowOptions(false)}

        onSelect={(type: string) => {
          setShowOptions(false);

          if (type === "text") setShowTextModal(true);
          if (type === "image") setShowImageModal(true);
          if (type === "voice") {
            console.log("voice modal later");
          }
        }}
      />





      {/* Create Image modal  */}
      <CreateTextNotes visible={showTextModal} onClose={() => setShowTextModal(false)}/>
        <CreateImageNoteModal visible={showImageModal} onClose={() => setShowImageModal(false)} />
      {/* Full image Modal */}
      <FullImageModal imageUrl={dbUser?.imageUrl || null} visible={showProfileImage} setVisible={(v) => setShowProfileImage(v)} />

    </SafeAreaView>

  )
}

export default Home

