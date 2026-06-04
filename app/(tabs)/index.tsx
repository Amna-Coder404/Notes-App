import AllNotes from '@/components/AllNotes'
import Loader from '@/components/Loader'
import { useDbUser } from '@/hooks/useDbUser'
import { useTheme } from '@/hooks/useTheme'
import { createHomeStyles } from '@/style/home.style'

import React from 'react'
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'


const Home = () => {
  const { theme } = useTheme();
  const styles = createHomeStyles(theme);

  const { dbUser } = useDbUser();



  if (!dbUser) {
    return <Loader />;
  };




  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
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
                style={{ width: 40, height: 40, borderRadius: 20 }}
              />
            )}
          </TouchableOpacity>
        </View>
        {/* NOTES DROPDOWN */}
        <AllNotes />
      </ScrollView>


    </View>
  )
}

export default Home


// TODO Later : Create loading page Ui