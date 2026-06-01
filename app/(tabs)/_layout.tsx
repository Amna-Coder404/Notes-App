import { View, Text } from 'react-native'
import React from 'react'
import { useAuth } from '@clerk/clerk-expo'
import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { MaterialIcons } from '@expo/vector-icons';


const TabsLayout = () => {
    const { userId } = useAuth();



    return (
        <Tabs screenOptions={{ headerShown: false }}>
            <Tabs.Screen name='index' options={{
                title: "Notes",
                tabBarIcon: ({ size, color }) => <MaterialIcons name="edit-note" size={size} color={color} />
            }} />

            <Tabs.Screen name='search' options={{
                tabBarIcon: ({ size, color }) => <Ionicons name="search" size={size} color={color} />
            }} />

            <Tabs.Screen name='favorites' options={{
                tabBarIcon: ({ size, color }) => <Ionicons name="heart" size={size} color={color} />
            }} />


            <Tabs.Screen name='profile' options={{
                tabBarIcon: ({ size, color }) => <Ionicons name="person" size={size} color={color} />
            }} />


        </Tabs>
    )
}

export default TabsLayout