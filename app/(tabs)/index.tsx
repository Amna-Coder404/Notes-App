import AllNotes from '@/components/AllNotes'
import { api } from '@/convex/_generated/api'
import { styles } from '@/style/home.style'
import { useUser } from '@clerk/clerk-expo'
import { Ionicons } from '@expo/vector-icons'
import { useMutation, useQuery } from 'convex/react'
import React, { useState } from 'react'
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'

const Home = () => {
  const { user } = useUser();
  const dbUser = useQuery(
    api.user.getUserByClerkId,
    user?.id ? { clerkId: user.id } : "skip"
  );
  if (!dbUser) {
    return <Text>Loading...</Text>;
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


// TODO Later : Create loading state