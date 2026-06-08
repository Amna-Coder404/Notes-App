import React from 'react'
import { Pressable, Text, TouchableOpacity, View } from 'react-native'
import { AntDesign, Ionicons } from '@expo/vector-icons'
import { useTheme } from '@/hooks/useTheme'
import { notesEditSection } from '@/style/notesEdit.style'

type EditBtnProps = {
    visible: boolean
    position: {
        x: number
        y: number
    }

    onClose: () => void
    onEdit?: () => void
    onDelete?: () => void
    onPin?: () => void
    note :any
}

const EditBtn = ({ visible, position, onClose, onEdit, onDelete, onPin, note}: EditBtnProps) => {
    const { theme } = useTheme();
    const styles = notesEditSection(theme);
    if (!visible) return null


    return (
        <Pressable onPress={onClose} style={styles.onCloseBtn} >
            <View style={[styles.containerEditSection, {top: position.y + 10,left: position.x - 140,  }]}>

                <TouchableOpacity style={styles.editBtns} onPress={onEdit} >
                    <Ionicons name="create-outline" size={18} color={theme.text} />
                    <Text style={styles.text}>
                        Edit
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.editBtns} onPress={onDelete}>
                    <Ionicons name="trash-outline" size={18} color={theme.text} />
                    <Text style={styles.text}>
                        Delete
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.editBtns} onPress={onPin} >
                    <AntDesign
                        name="pushpin"
                        size={18}
                        color={note.isPinned ? "#CEC436" : theme.mutedText}
                    />
                    <Text style={{ color: theme.text }}>
                        Pin
                    </Text>
                </TouchableOpacity>

              
            </View>
        </Pressable>
    )
}

export default EditBtn