import { styles } from '@/style/login.styles';
import { useSSO } from '@clerk/clerk-expo';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


const Login = () => {
  const { startSSOFlow } = useSSO();
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    try {
      const { createdSessionId, setActive } = await startSSOFlow({ strategy: "oauth_google" });

      if (setActive && createdSessionId) {
        setActive({ session: createdSessionId })
        router.replace("/(tabs)");
      }
    } catch (error) {
      console.log("OAuth error : ", error);
    }
  }


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <MaterialIcons
          name="edit-note"
          size={55}
          color="#FFFFFF"
        />
      </View>

      <Text style={styles.title}>
        Your thoughts,{' '}
        <Text style={styles.highlightText}>
          organized
        </Text>
      </Text>

      <Text style={styles.subtitle}>
        Keep your notes safe, organized and
        easily accessible.
      </Text>

      <TouchableOpacity style={styles.button} onPress={handleGoogleSignIn} activeOpacity={0.9}>
        <Text style={styles.buttonText}>
          Get Started
        </Text>
      </TouchableOpacity>


    </SafeAreaView>
  );
};


export default Login