import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { useTheme } from '@/hooks/useTheme'
import { useRouter } from 'expo-router'
import Create from './CreateNotesModal'

export default function NotFound() {
    const { theme } = useTheme();
    const [showAddNoteModal, setShowAddNoteModal] = useState(false);
    const router = useRouter()
    
    return (
        <TouchableOpacity onPress={() => setShowAddNoteModal(true)} style={[styles.container, { backgroundColor: theme.bg }]}>
            <Ionicons
                name="create-outline"
                size={70}
                color={theme.mutedText}
            />
            <Text style={[styles.title, { color: theme.text }]}>
                No notes yet
            </Text>
            <Text style={[styles.subtitle, { color: theme.mutedText }]}>
                Start by creating your first note ✨
            </Text>
            <Create
                visible={showAddNoteModal}
                onClose={() => setShowAddNoteModal(false)}
            />
        </TouchableOpacity>

    )
}

export const NotFavYet = () => {
    const { theme } = useTheme();
    return (
        <View style={styles.container}>
            <MaterialCommunityIcons name="cards-playing-heart-multiple" size={50} color={theme.mutedText} />


            <Text style={[styles.title, { color: theme.text }]}>
                No favorite notes yet
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,

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