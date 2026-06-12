import React, { useState } from "react";
import {
    Modal,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    Image,
} from "react-native";


import { Ionicons } from "@expo/vector-icons";
import { useMutation } from "convex/react";

import { api } from "@/convex/_generated/api";
import { useDbUser } from "@/hooks/useDbUser";
import { useTheme } from "@/hooks/useTheme";
import { useImageUpload } from "@/hooks/useImageUpload";
import { createStyles } from "@/style/create.stlye";
import { modalStlye } from "@/style/modal.stlye";

const CreateImageNoteModal = ({ visible, onClose }: any) => {
    const { theme } = useTheme();
    const styles = createStyles(theme);
    const modalStyles = modalStlye(theme);

    const { dbUser } = useDbUser();
    const createNote = useMutation(api.notes.createNote);



    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);


    const { image, pickImage, uploadImageToConvex, setImage, takePhoto } =
        useImageUpload();


    const handleCreate = async () => {
        if (!dbUser || !image) return;

        setLoading(true);

        try {
            const storageId = await uploadImageToConvex();
            if (!storageId) throw new Error("Faild to create Image not");

            await createNote({
                clerkId: dbUser.clerkId,
                type: "image",
                title,
                categories: ["image"],
                imageUrl: storageId,
                content: content

            });

            setTitle("");
            setContent("");
            setImage(null);

            onClose();
        } catch (err) {
            console.log("IMAGE NOTE ERROR:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        setImage(null);
        setTitle("");
        setContent("");
        onClose();
    };

    return (
        <Modal visible={visible} animationType="slide" onRequestClose={handleClose}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={modalStyles.modalContainer}
            >
                <ScrollView>
                    {/* HEADER */}
                    <View style={modalStyles.modalHeader}>
                        <TouchableOpacity onPress={handleClose}>
                            <Ionicons name="close" size={24} color={theme.mutedText} />
                        </TouchableOpacity>

                        <Text style={modalStyles.modalTitle}>Image Note</Text>

                        <TouchableOpacity onPress={handleCreate} disabled={loading}>
                            <Text style={modalStyles.savebtnText}>
                                {loading ? "Saving..." : "Save"}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.formContainer}>
                        {/* IF NO IMAGE → SHOW CHOICES */}
                        {!image && (
                            <View style={{ alignItems: "center", marginTop: 30 }}>
                                <Text style={{ color: theme.text, marginBottom: 20 }}>
                                    Add an image
                                </Text>

                                <TouchableOpacity
                                    onPress={takePhoto}
                                    style={{
                                        padding: 12,
                                        borderRadius: 10,
                                        backgroundColor: theme.card,
                                        marginBottom: 10,
                                        width: "80%",
                                    }}
                                >
                                    <Text style={{ color: theme.text }}>📸 Take Photo</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={pickImage}
                                    style={{
                                        padding: 12,
                                        borderRadius: 10,
                                        backgroundColor: theme.card,
                                        width: "80%",
                                    }}
                                >
                                    <Text style={{ color: theme.text }}>🖼 Pick from Gallery</Text>
                                </TouchableOpacity>
                            </View>
                        )}

                        {/* AFTER IMAGE SELECTED */}
                        {image && (
                            <>
                                <Image
                                    source={{ uri: image }}
                                    style={{
                                        width: "100%",
                                        height: 200,
                                        borderRadius: 12,
                                        marginBottom: 15,
                                    }}
                                />

                                <Text style={styles.label}>Title</Text>
                                <TextInput
                                    value={title}
                                    onChangeText={setTitle}
                                    placeholder="Add title"
                                    placeholderTextColor={theme.mutedText}
                                    style={styles.input}
                                />

                                <Text style={styles.label}>Content</Text>
                                <TextInput
                                    value={content}
                                    onChangeText={setContent}
                                    placeholder="Write Content..."
                                    placeholderTextColor={theme.mutedText}
                                    multiline
                                    style={[styles.input, { height: 100 }]}
                                />
                            </>
                        )}
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </Modal>
    );
};

export default CreateImageNoteModal;