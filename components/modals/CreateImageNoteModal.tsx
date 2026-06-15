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


import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
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
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={modalStyles.modalContainer}>
                {/* HEADER */}
                <View style={modalStyles.modalHeader}>
                    <TouchableOpacity onPress={handleClose}>
                        <Ionicons name="close" size={24} color={theme.mutedText} />
                    </TouchableOpacity>

                    <Text style={modalStyles.modalTitle}>Image Note</Text>

                    {image ? <TouchableOpacity onPress={handleCreate} disabled={loading}>
                        <Text style={modalStyles.savebtnText}>
                            {loading ? "Saving..." : "Save"}
                        </Text>
                    </TouchableOpacity> : <View style={{ width: 100 }} />}
                </View>
                <ScrollView>


                    <View style={styles.formContainer}>
                        {/* IF NO IMAGE → SHOW CHOICES */}
                        {!image && (
                            <View style={{ alignItems: "center", marginTop: 30 }}>
                                <Text style={modalStyles.imageAddTitle}>
                                    Add an image
                                </Text>

                                <TouchableOpacity onPress={takePhoto} style={modalStyles.takeOrPick}>
                                    <AntDesign name="camera" style={modalStyles.icon} />
                                    <Text style={{ color: theme.text }}>Take Photo</Text>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={pickImage} style={modalStyles.takeOrPick}>
                                    <Entypo name="images" style={modalStyles.icon} />
                                    <Text style={modalStyles.buttonText}> Pick from Gallery</Text>
                                </TouchableOpacity>
                            </View>
                        )}

                        {/* AFTER IMAGE SELECTED */}
                        {image && (
                            <>
                                <View>
                                    <Image source={{ uri: image }} style={modalStyles.createImage} />
                                    <TouchableOpacity onPress={pickImage} style={modalStyles.changeBtn}>

                                        <Text style={modalStyles.buttonText}>Change Image</Text>
                                    </TouchableOpacity>
                                </View>

                                {/* Title Input */}
                                <TextInput
                                    value={title}
                                    onChangeText={setTitle}
                                    placeholder="Title..."
                                    placeholderTextColor={theme.mutedText}
                                    style={modalStyles.imageTitleInput}
                                />

                                {/* Content Input */}
                                <TextInput
                                    value={content}
                                    onChangeText={setContent}
                                    placeholder="Write your thoughts..."
                                    placeholderTextColor={theme.mutedText}
                                    multiline
                                    style={modalStyles.imageContentInput}
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