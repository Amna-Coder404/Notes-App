import Initiallayout from "@/components/Initiallayout";
import ClerkAndConvexProvider from "@/providers/ClerkAndConvexProvider";
// import { Slot, SplashScreen } from "expo-router";
import { StatusBar, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


//  SplashScreen.preventAutoHideAsync();

export default function RootLayout() {


  return (
    <ClerkAndConvexProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
        <StatusBar barStyle={"light-content"} />
        <Initiallayout />
    
      </SafeAreaView>
    </ClerkAndConvexProvider>
  )
}
