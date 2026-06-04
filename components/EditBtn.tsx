import React from 'react'
import { Pressable, Text, TouchableOpacity, View } from 'react-native'
import { AntDesign, Ionicons } from '@expo/vector-icons'

type EditBtnProps = {
    visible: boolean
    position: {
        x: number
        y: number
    }
    theme: any
    onClose: () => void
    onEdit?: () => void
    onDelete?: () => void
    onPin?: () => void
    onStar?: () => void
}

const EditBtn = ({
    visible,
    position,
    theme,
    onClose,
    onEdit,
    onDelete,
    onPin,
    onStar,
}: EditBtnProps) => {
    if (!visible) return null

    return (
        <Pressable
            onPress={onClose}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 9999,
            }}
        >
            <View
                style={{
                    position: 'absolute',
                    top: position.y + 10,
                    left: position.x - 140,
                    width: 150,
                    backgroundColor: theme.card || theme.background,
                    borderRadius: 12,
                    paddingVertical: 8,
                    elevation: 10,
                    shadowColor: '#000',
                    shadowOpacity: 0.15,
                    shadowRadius: 8,
                    shadowOffset: {
                        width: 0,
                        height: 4,
                    },
                }}
            >
                <TouchableOpacity
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 10,
                        paddingHorizontal: 12,
                        paddingVertical: 10,
                    }}
                    onPress={onEdit}
                >
                    <Ionicons
                        name="create-outline"
                        size={18}
                        color={theme.text}
                    />
                    <Text style={{ color: theme.text }}>
                        Edit
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 10,
                        paddingHorizontal: 12,
                        paddingVertical: 10,
                    }}
                    onPress={onDelete}
                >
                    <Ionicons
                        name="trash-outline"
                        size={18}
                        color="red"
                    />
                    <Text style={{ color: 'red' }}>
                        Delete
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 10,
                        paddingHorizontal: 12,
                        paddingVertical: 10,
                    }}
                    onPress={onPin}
                >
                    <AntDesign
                        name="pushpin"
                        size={18}
                        color="#facc15"
                    />
                    <Text style={{ color: theme.text }}>
                        Pin
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 10,
                        paddingHorizontal: 12,
                        paddingVertical: 10,
                    }}
                    onPress={onStar}
                >
                    <AntDesign
                        name="star"
                        size={18}
                        color="#facc15"
                    />
                    <Text style={{ color: theme.text }}>
                        Star
                    </Text>
                </TouchableOpacity>
            </View>
        </Pressable>
    )
}

export default EditBtn