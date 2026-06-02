import { View, Text, Touchable, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { useAuth } from '@clerk/clerk-expo'
import { styles } from '@/style/home.style'
import { Ionicons } from '@expo/vector-icons'

const Home = () => {

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* HEADER  */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hello, Amna 👋</Text>
            <Text style={styles.subtitle}>Here are your notes</Text>
          </View>

          <TouchableOpacity style={styles.profileBtn}>
            <Ionicons name="person" size={20} color="#333" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  )
}

export default Home