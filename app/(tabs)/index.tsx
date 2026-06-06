
import Loader from '@/components/Loader'
import NotesCards from '@/components/NotesCards'
import { useDbUser } from '@/hooks/useDbUser'
import { useTheme } from '@/hooks/useTheme'
import { createHomeStyles } from '@/style/home.style'
import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'


const Home = () => {
  const { theme } = useTheme();
  const styles = createHomeStyles(theme);
  const { dbUser } = useDbUser();

  if (!dbUser) {
    return <Loader />;
  };

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
      <NotesCards />
    </SafeAreaView>

  )
}

export default Home

