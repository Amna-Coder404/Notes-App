import Initiallayout from "@/components/Initiallayout";
import { ThemeProvider } from "@/context/ThemeContext";

import ClerkAndConvexProvider from "@/providers/ClerkAndConvexProvider";
import { SplashScreen } from "expo-router";
import { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import * as NavigationBar from "expo-navigation-bar";
import { useTheme } from "@/hooks/useTheme";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
 
  useEffect(() => {
    async function prepare() {
      // Load fonts, auth, etc.

      await SplashScreen.hideAsync();
      await NavigationBar.setBackgroundColorAsync("black");
      await NavigationBar.setButtonStyleAsync("light");

      // Hide bottom navigation bar (immersive mode)
      NavigationBar.setVisibilityAsync("hidden");
    }

    prepare();
  }, []);

  return (
    <ThemeProvider>
      <ClerkAndConvexProvider>
        <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
  
          <Initiallayout />

        </SafeAreaView>
      </ClerkAndConvexProvider>
    </ThemeProvider>
  )
}
