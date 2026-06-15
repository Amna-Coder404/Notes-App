
import { useTheme } from '@/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
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