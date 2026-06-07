import { MaterialIcons } from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";
import React from "react";
import { useTheme } from "@/hooks/useTheme";

const TabsLayout = () => {
  const { theme } = useTheme();

  return (
    <Tabs
      screenOptions={{
        
        headerShown: false,
        tabBarHideOnKeyboard: true,
        //  TAB BAR BACKGROUND
        tabBarStyle: {
          backgroundColor: theme.card,
          borderTopWidth: 0,
          height: 70,
          borderTopColor: theme.mutedText,
        },

        //  ICON COLORS
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.mutedText,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Notes",
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons name="edit-note" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="create"
        options={{
          title: "Create",
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="create" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="favorites"
        options={{
          title: "Fav",
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="heart" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;