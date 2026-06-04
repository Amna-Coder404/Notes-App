import Initiallayout from "@/components/Initiallayout";
import { ThemeProvider } from "@/context/ThemeContext";
import ClerkAndConvexProvider from "@/providers/ClerkAndConvexProvider";
import { SplashScreen } from "expo-router";
import { useEffect } from "react";

import { StatusBar, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


 SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
 useEffect(() => {
    async function prepare() {
      // Load fonts, auth, etc.

      await SplashScreen.hideAsync();
    }

    prepare();
  }, []);


  return (
   <ThemeProvider>
     <ClerkAndConvexProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
        <StatusBar barStyle={"light-content"} />
        <Initiallayout />
    
      </SafeAreaView>
    </ClerkAndConvexProvider>
   </ThemeProvider>
  )
}
