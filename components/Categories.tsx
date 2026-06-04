import { View, Text, Modal, TouchableOpacity } from 'react-native'
import React from 'react'
import { categoryModal } from '@/style/categories.style'
import { useTheme } from '@/hooks/useTheme'
import { Ionicons } from '@expo/vector-icons'



const Categories = ({ visible, onClose }: any) => {
    const { theme } = useTheme();
    const styles = categoryModal(theme);
    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={false}
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                {/* HEADER */}
                <View style={styles.modalHeader}>
                    <TouchableOpacity onPress={onClose}>
                        <Ionicons name='close' size={24} color={theme.mutedText} />
                    </TouchableOpacity>

                    <Text style={styles.modalTitle}>Categories</Text>
                    <View style={{ width: 24 }}></View>
                </View>
                {/* todo later: ALL Categorys */}
            </View>
        </Modal>
    )
}

export default Categories