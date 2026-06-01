import { View, Text, Touchable, TouchableOpacity } from 'react-native'
import React from 'react'
import { useAuth } from '@clerk/clerk-expo'

const Home = () => {
  const { signOut } = useAuth()
  return (
    <View>
      <TouchableOpacity onPress={() => signOut()}>
        <Text>LogOut</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Home