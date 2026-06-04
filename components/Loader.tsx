import { View, ActivityIndicator, StyleSheet } from 'react-native'
import React from 'react'
import { useTheme } from '@/hooks/useTheme';

const Loader = () => {
    const { theme } = useTheme();

    return (
        <View style={[styles.container, { backgroundColor: theme.bg }]}>
            <ActivityIndicator size="large" color={theme.primary} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default Loader