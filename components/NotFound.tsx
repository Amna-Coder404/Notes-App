import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useTheme } from '@/hooks/useTheme'
import { useRouter } from 'expo-router'

const NotFound = () => {
    const { theme } = useTheme();

    const router = useRouter()
    const handleCreate = () => {
        router.push("/(tabs)/create");
    }
    return (

            <TouchableOpacity onPress={() => handleCreate()} style={[styles.container, { backgroundColor: theme.background }]}>
                <Ionicons
                    name="create-outline"
                    size={70}
                    color={theme.mutedText}
                />
            

            <Text style={[styles.title, { color: theme.text }]}>
                No Notes Found
            </Text>

            <Text style={[styles.subtitle, { color: theme.mutedText }]}>
                Start by creating your first note ✨
            </Text>
            </TouchableOpacity>
        
    )
}

export default NotFound

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginTop: 100
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
        marginTop: 12,
    },
    subtitle: {
        fontSize: 14,
        marginTop: 6,
        textAlign: 'center',
    },
})