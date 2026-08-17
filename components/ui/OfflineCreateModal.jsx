import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import AppModal from "@/components/ui/AppModal";
import { useTheme } from "@/hooks/useTheme";

const OfflineCreateModal = ({ visible, onClose }) => {
    const { theme } = useTheme();

    return (
        <AppModal
            visible={visible}
            onRequestClose={onClose}
            backgroundColor={theme.bg}
        >
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    paddingHorizontal: 30,
                    backgroundColor: theme.bg,
                }}
            >
                {/* ICON */}
                <View
                    style={{
                        width: 72,
                        height: 72,
                        borderRadius: 36,
                        backgroundColor: theme.secondary,
                        justifyContent: "center",
                        alignItems: "center",
                        marginBottom: 20,
                    }}
                >
                    <Ionicons
                        name="cloud-offline-outline"
                        size={34}
                        color={theme.primary}
                    />
                </View>

                {/* TITLE */}
                <Text
                    style={{
                        color: theme.text,
                        fontSize: 22,
                        fontWeight: "700",
                        marginBottom: 10,
                        textAlign: "center",
                    }}
                >
                    You're offline
                </Text>

                {/* DESCRIPTION */}
                <Text
                    style={{
                        color: theme.mutedText,
                        fontSize: 14,
                        lineHeight: 21,
                        textAlign: "center",
                        maxWidth: 320,
                        marginBottom: 28,
                    }}
                >
                    Connect to the internet to create a new note.
                    Your existing notes are still available.
                </Text>

                {/* BUTTON */}
                <TouchableOpacity
                    onPress={onClose}
                    activeOpacity={0.85}
                    style={{
                        backgroundColor: theme.primary,
                        paddingVertical: 13,
                        paddingHorizontal: 40,
                        borderRadius: 12,
                    }}
                >
                    <Text
                        style={{
                            color: theme.bright,
                            fontSize: 14,
                            fontWeight: "700",
                        }}
                    >
                        Got it
                    </Text>
                </TouchableOpacity>
            </View>
        </AppModal>
    );
};

export default OfflineCreateModal;