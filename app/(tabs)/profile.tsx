import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import ThemeToggle from '@/components/ThemeToggle'
import { useTheme } from '@/hooks/useTheme'
import { profileScreenStyles } from '@/style/profile.stlye'
import { useDbUser } from '@/hooks/useDbUser'
import Loader from '@/components/Loader'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { Alert } from 'react-native';
import { useAuth } from '@clerk/clerk-expo'

import { useRouter } from "expo-router";
import { useNotes } from '@/hooks/useNotes'
import FullImageModal from '@/components/FullImageMode'


const Profile = () => {
  const { theme } = useTheme();

  const styles = profileScreenStyles(theme);
  const { signOut } = useAuth();
  const router = useRouter();

  const [showProfileImage, setShowProfileImage] = useState(false);
  const { notes, handleDeleteAllNotes } = useNotes();
  const { dbUser } = useDbUser();
  const fullname = dbUser?.firstname + " " + dbUser?.lastname;
  if (!dbUser) {
    return <Loader />;
  };

  const ResetApp = () => {
    const count = notes?.length || 0;
    if (count === 0) {
      Alert.alert("No Notes", "There are no notes to delete.");
      return;
    }
    Alert.alert(
      " ⚠️  Reset App",
      `You have ${count} notes.\nThis cannot be undone.`,
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Reset App",
          style: "destructive",
          onPress: async () => {
            await handleDeleteAllNotes(dbUser.clerkId);
            Alert.alert("Done", "All notes deleted successfully.");
          }
        }
      ]
    );
  }
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
        <TouchableOpacity onPress={() => setShowProfileImage(true)}>
          <Image style={styles.profileImage} source={{ uri: dbUser?.imageUrl }} />
        </TouchableOpacity>

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

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => router.push("/categories/All")}
        >
          <View style={styles.menuLeft}>
            <Ionicons name="list" size={20} color={theme.text} style={styles.iconContainer} />
            <Text style={styles.menuTitle}>Categories</Text>
          </View>

          <Ionicons name="chevron-forward" size={20} color={theme.text} />
        </TouchableOpacity>



        <Text style={styles.dangerZoneTitle}>Danger Zone</Text>

        {/* DELTE ALL NOTES */}
        <TouchableOpacity style={styles.menuItem} onPress={ResetApp}>
          <View style={styles.menuLeft}>
            <MaterialCommunityIcons name="delete" size={20} color={theme.danger} style={styles.iconContainer} />

            <Text style={styles.logoutText}>Reset </Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={theme.text} />
        </TouchableOpacity>


        {/* HANDLE SIGN OUT */}
        <TouchableOpacity style={styles.menuItem} onPress={handleSignOut}>
          <View style={styles.menuLeft}>
            <Ionicons name="log-out" size={20} color={theme.danger} style={styles.iconContainer} />
            <Text style={styles.logoutText}>Logout</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={theme.text} />
        </TouchableOpacity>
      </View>
      <FullImageModal imageUrl={dbUser?.imageUrl || null} visible={showProfileImage} setVisible={(v) => setShowProfileImage(v)} />

    </View>
  )
}

export default Profile


