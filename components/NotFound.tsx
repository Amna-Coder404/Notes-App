
import React, { useState } from 'react'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { useTheme } from '@/hooks/useTheme'
import { StyleSheet, Text, View } from 'react-native';

export default function NotFound({ text, icon }: any) {
    const { theme } = useTheme();
    


    return (
        <View style={styles.container} >
            <Ionicons
                name={icon}
                size={70}
                color={theme.mutedText}
            />
            <Text style={[styles.title, { color: theme.text }]}>
                {text}
            </Text>

    
        </View>

    )
}

// export const NotFavYet = () => {
//     const { theme } = useTheme();
//     return (
//         <View style={styles.container}>
//             <MaterialCommunityIcons name="cards-playing-heart-multiple" size={50} color={theme.mutedText} />

//             <Text style={[styles.title, { color: theme.text }]}>
//                 No favorite notes yet
//             </Text>
//         </View>
//     )
// }

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