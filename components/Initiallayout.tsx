import { useAuth } from '@clerk/clerk-expo';
import { Stack, useRouter, useSegments } from 'expo-router';
import React, { useEffect } from 'react';

const Initiallayout = () => {
    const { isLoaded, isSignedIn } = useAuth();
    const segments = useSegments();
    const router = useRouter();

    useEffect(() => {
        if (!isLoaded) return;
        const inAuthScreen = segments[0] == "(auth)";
        if (!isSignedIn && !inAuthScreen) router.replace("/(auth)/login");
        else if (isSignedIn && inAuthScreen) router.replace("/(tabs)")
    }, [isLoaded, isSignedIn, segments])
    if (!isLoaded) return null;


    return <Stack screenOptions={{ headerShown: false }} />
}

export default Initiallayout