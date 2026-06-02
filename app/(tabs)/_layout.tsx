
import { MaterialIcons } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router';
import React from 'react';


const TabsLayout = () => {
  

    return (
        <Tabs screenOptions={{ headerShown: false }}>
            <Tabs.Screen name='index' options={{
                title: "Notes",
                tabBarIcon: ({ size, color }) => <MaterialIcons name="edit-note" size={size} color={color} />
            }} />

            <Tabs.Screen name='create' options={{
                tabBarIcon: ({ size, color }) => <Ionicons name="create" size={size} color={color} />
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