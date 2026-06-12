import { api } from '@/convex/_generated/api';
import { useDbUser } from '@/hooks/useDbUser';
import { useNotes } from '@/hooks/useNotes';
import { useTheme } from '@/hooks/useTheme';
import { createStyles } from '@/style/create.stlye';
import { modalStlye } from '@/style/modal.stlye';
import { Ionicons } from '@expo/vector-icons';
import { useMutation } from 'convex/react';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Modal, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { useImageUpload } from "@/hooks/useImageUpload";
import { Image } from "react-native";
import { resourceUsage } from 'node:process';

const Create = ({ visible, onClose }: any) => {
    const { theme } = useTheme();
    const styles = createStyles(theme);
    const modalStlyes = modalStlye(theme);
    const { dbUser } = useDbUser();
    const { categories } = useNotes();

    const { image, pickImage, uploadImageToConvex, setImage } =
        useImageUpload();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const createNote = useMutation(api.notes.createNote);

    const [category, setCategory] = useState("");
    const [openCategory, setOpenCategory] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showCategoryError, setShowCategoryError] = useState(false);
    const [showContentError, setShowContentError] = useState(false);


    const handleCreateNotes = async () => {
        if (!dbUser || loading) return;
        let hasError = false;

        if (!content.trim()) {
            setShowContentError(true);
            hasError = true;
        } else {
            setShowContentError(false);
        }

        if (!category) {
            setShowCategoryError(true);
            hasError = true;
        } else {
            setShowCategoryError(false);
        }

        if (hasError) return;

        console.log("STEP 1: function started");
        console.log("user:", dbUser);
        console.log("content:", content);
        console.log("category:", category);
        console.log("image:", image);
        setLoading(true);
        try {
            const storageId = await uploadImageToConvex();



            await createNote({
                clerkId: dbUser?.clerkId,
                title: title,
                categories: category ? [category] : [],
                content: content,
                imageUrl: storageId//StoreageId OR nothing "undefined"
            })

            setTitle("");
            setContent("");
            setCategory("");
            setImage(null);
            onClose();
        }
        catch (error) {
            console.log("ERROR", error)
        }
        finally {
            setLoading(false);
        }
    }
    const handleClose = () => {
        setImage(null);
        setTitle("");
        setContent("");
        setCategory("");
        onClose();
    };

    return (
        <Modal visible={visible} animationType="slide" transparent={false} onRequestClose={handleClose}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={modalStlyes.modalContainer}
                keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
            >
                <ScrollView style={modalStlyes.modalContainer}>
                    {/* HEADER */}
                    <View style={modalStlyes.modalHeader}>
                        <TouchableOpacity onPress={onClose}>
                            <Ionicons name='close' size={24} color={theme.mutedText} />
                        </TouchableOpacity>

                        <Text style={modalStlyes.modalTitle}>Add Note</Text>
                        <View style={{ width: 120 }}></View>
                        <TouchableOpacity style={loading && { opacity: 0.6 }}
                            onPress={() => handleCreateNotes()} disabled={loading} >
                            <Text style={modalStlyes.savebtnText}>
                                {loading ? "Saving..." : "Save"}
                            </Text>
                        </TouchableOpacity>
                    </View>


                    <View style={styles.formContainer}>
                        <View style={styles.header}>
                            <Text style={styles.headerTitle}>Create your notes</Text>
                            <Text style={styles.headerSubtitle}>Save your ideas instantly</Text>
                        </View>

                        <Text style={styles.label}>Title</Text>
                        <TextInput
                            style={styles.input}
                            value={title}
                            placeholderTextColor={theme.mutedText}
                            placeholder='Add title'
                            onChangeText={setTitle}
                        />
                        {/* IMAGE PICKER */}
                        <Text style={styles.label}>Image (optional)</Text>

                        <TouchableOpacity
                            onPress={pickImage}
                            style={{
                                padding: 12,
                                borderRadius: 10,
                                borderWidth: 1,
                                borderColor: theme.mutedText,
                                marginBottom: 10,
                            }}
                        >
                            <Text style={{ color: theme.text }}>
                                {image ? "Change Image" : "Add Image"}
                            </Text>
                        </TouchableOpacity>

                        {/* PREVIEW */}
                        {image && (
                            <Image
                                source={{ uri: image }}
                                style={{
                                    width: "100%",
                                    height: 160,
                                    borderRadius: 12,
                                    marginBottom: 10,
                                }}
                            />
                        )}
                        <Text style={styles.label}>Category</Text>
                        <TouchableOpacity
                            style={styles.dropdown}
                            onPress={() => setOpenCategory(!openCategory)}>
                            <Text style={
                                category
                                    ? styles.dropdownText
                                    : styles.dropdownPlaceholder
                            }>
                                {category || "Select Category"}
                            </Text>
                            <Ionicons name={openCategory ? "chevron-up" : "chevron-down"} size={20} color="#666" />

                            {/* Notes */}
                        </TouchableOpacity>
                        {
                            showCategoryError && (<Text style={styles.errorText}>Please select a category before continuing </Text>)
                        }
                        {openCategory && (
                            <View style={styles.dropdownList}>
                                {categories.map((item) => (
                                    <TouchableOpacity
                                        key={item}
                                        style={styles.dropdownItem}
                                        onPress={() => {
                                            setCategory(item);
                                            setOpenCategory(false);
                                            setShowCategoryError(false);
                                        }}
                                    >
                                        <Text style={{ color: theme.mutedText }}>{item}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        )}

                        <Text style={styles.label}>Content</Text>
                        <TextInput
                            placeholder="Write your note..."
                            placeholderTextColor={theme.mutedText}
                            value={content}
                            onChangeText={(text) => {
                                setContent(text);

                                if (text.trim()) {
                                    setShowContentError(false);
                                }
                            }}
                            multiline
                            style={[styles.input, styles.textArea]}
                        />
                        {
                            showContentError && (<Text style={styles.errorText}>Please Write your note </Text>)
                        }
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </Modal>
    )
}

export default Create