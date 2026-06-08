import { View, Text, Modal } from 'react-native'
import React from 'react'
import { modalStlye } from '@/style/modal.stlye';
import { useTheme } from '@/hooks/useTheme';

const SettingsModals = ({ visible, onClose }: any) => {
    const {theme}= useTheme();
    const styles = modalStlye(theme);
    return (
        <Modal visible={visible} transparent={true} animationType='slide' onRequestClose={onClose}>
            <View style={styles.centerModalOverlay}>
                <View style={styles.centerModalBox}>
                    <Text>Settings Modals</Text>
                </View>
            </View>
        </Modal>
    )
}

export default SettingsModals