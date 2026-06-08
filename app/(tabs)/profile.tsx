import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import ThemeToggle from '@/components/ThemeToggle'
import { useTheme } from '@/hooks/useTheme'
import { profileScreenStyles } from '@/style/profile.stlye'
import { useDbUser } from '@/hooks/useDbUser'
import Loader from '@/components/Loader'
import { Ionicons } from '@expo/vector-icons'
import { Alert } from 'react-native';
import { useAuth } from '@clerk/clerk-expo'


const Profile = () => {
  const { theme } = useTheme();
  const styles = profileScreenStyles(theme);
const { signOut } = useAuth();


  const { dbUser } = useDbUser();
  const fullname = dbUser?.firstname + " " + dbUser?.lastname;
  if (!dbUser) {
    return <Loader />;
  };

const handleSignOut = () => {
  Alert.alert(
    "Confirm Logout",
    "Are you sure you want to log out?",
    [
      {
        text: "Cancel",
        style: "cancel"
      },
      {
        text: "Log Out",
        style: "destructive",
        onPress: () => signOut()
      }
    ]
  );
}
  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Image style={styles.profileImage} source={{ uri: dbUser?.imageUrl }} />

        <View style={styles.userInfo}>
          <Text style={styles.userName}>{fullname}</Text>
          <Text style={styles.userEmail}>{dbUser?.email}</Text>
        </View>
      </View>

      {/* SETTINGS */}
      <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuLeft}>
            <Ionicons name="moon" size={20} color={theme.text} style={styles.iconContainer} />
            <Text style={styles.menuTitle}>Dark Mode</Text>
          </View>
          <ThemeToggle />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuLeft}>
            <Ionicons name="list" size={20} color={theme.text} style={styles.iconContainer} />
            <Text style={styles.menuTitle}>Categories</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={theme.text} />
        </TouchableOpacity>


        <TouchableOpacity style={styles.menuItem} onPress={handleSignOut}>
          <View style={styles.menuLeft}>
            <Ionicons name="log-out" size={20} color={theme.danger} style={styles.iconContainer} />
            <Text style={styles.logoutText}>Logout</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={theme.text} />
        </TouchableOpacity>
      </View>

      {/* SIGN OUT CONFIRMATION */}
    </View>
  )
}

export default Profile

// I want to show Alert.alert when user clicks on logout, asking them to confirm if they want to log out. If they confirm, then I will call the signOut function from my auth context.
// give me code for that.

