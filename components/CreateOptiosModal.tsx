import React from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/hooks/useTheme";

const CreateOptionsModal = ({
    visible,
    onClose,
    onSelect,
}: any) => {
    const { theme } = useTheme();

    return (
        <Modal
            visible={visible}
            animationType="fade"
            transparent
            onRequestClose={onClose}
        >
            {/* BACKDROP */}
            <TouchableOpacity
                activeOpacity={1}
                onPress={onClose}
                style={{
                    flex: 1,
                    backgroundColor: "rgba(0,0,0,0.5)",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                {/* BOX */}
                <View style={{
                        width: "80%",
                        backgroundColor: theme.card,
                        padding: 20,
                        borderRadius: 15,
                    }}
                >
                    <Text
                        style={{
                            fontSize: 18,
                            fontWeight: "bold",
                            color: theme.text,
                            marginBottom: 15,
                            textAlign: "center",
                        }}
                    >
                        Create New Note
                    </Text>

                    {/* TEXT NOTE */}
                    <TouchableOpacity
                        onPress={() => onSelect("text")}
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            padding: 12,
                            marginBottom: 10,
                            borderRadius: 10,
                            backgroundColor: theme.background,
                        }}
                    >
                        <Ionicons name="create-outline" size={22} color={theme.text} />
                        <Text style={{ marginLeft: 10, color: theme.text }}>
                            Text Note
                        </Text>
                    </TouchableOpacity>

                    {/* IMAGE NOTE */}
                    <TouchableOpacity
                        onPress={() => onSelect("image")}
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            padding: 12,
                            marginBottom: 10,
                            borderRadius: 10,
                            backgroundColor: theme.background,
                        }}
                    >
                        <Ionicons name="image-outline" size={22} color={theme.text} />
                        <Text style={{ marginLeft: 10, color: theme.text }}>
                            Image Note
                        </Text>
                    </TouchableOpacity>

                    {/* VOICE NOTE */}
                    <TouchableOpacity
                        onPress={() => onSelect("voice")}
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            padding: 12,
                            borderRadius: 10,
                            backgroundColor: theme.background,
                        }}
                    >
                        <Ionicons name="mic-outline" size={22} color={theme.text} />
                        <Text style={{ marginLeft: 10, color: theme.text }}>
                            Voice Note
                        </Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </Modal>
    );
};

export default CreateOptionsModal;