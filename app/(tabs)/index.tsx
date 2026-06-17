
import CreateImageNoteModal from '@/components/modals/CreateImageNoteModal'
import CreateOptionsModal from '@/components/modals/CreateOptiosModal'
import CreateTextNotes from '@/components/modals/CreateTextNotesModal'
import CreateVoiceNoteModal from '@/components/modals/CreateVoiceNoteModal'
import FullImageModal from '@/components/notes/FullImageMode'

import NotesCards from '@/components/notes/NotesCards'
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
  const [showVoiceModal, setShowVoiceModal] = useState(false);


  return (
    <SafeAreaView style={styles.container}>

      <TouchableOpacity style={styles.fab} onPress={() => setShowOptions(true)}>
        <Ionicons name="add" size={24} color="#fff" />
      </TouchableOpacity>
      {/* HEADER  */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello, {dbUser?.firstname} 👋</Text>
          <Text style={styles.subtitle}>Everything organized in one place</Text>
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
    

      <CreateOptionsModal
        visible={showOptions}
        onClose={() => setShowOptions(false)}

        onSelect={(type: string) => {
          setShowOptions(false);

          if (type === "text") setShowTextModal(true);
          if (type === "image") setShowImageModal(true);
          if (type === "voice") { setShowVoiceModal(true) }
        }}
      />





      {/* Create Notes modal s */}
      <CreateTextNotes visible={showTextModal} onClose={() => setShowTextModal(false)} />
      <CreateImageNoteModal visible={showImageModal} onClose={() => setShowImageModal(false)} />
      <CreateVoiceNoteModal visible={showVoiceModal} onClose={() => setShowVoiceModal(false)}   clerkId={dbUser?.clerkId}/>
      {/* Full image Modal */}
      <FullImageModal imageUrl={dbUser?.imageUrl || null} visible={showProfileImage} setVisible={(v: any) => setShowProfileImage(v)} />


    </SafeAreaView>

  )
}

export default Home

