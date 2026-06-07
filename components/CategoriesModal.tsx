import { useTheme } from '@/hooks/useTheme'
import { modalStlye } from '@/style/modal.stlye'
import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { Modal, Text, TouchableOpacity, View } from 'react-native'



const Categories = ({ visible, onClose }: any) => {
    const { theme } = useTheme();
    const styles = modalStlye(theme);
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