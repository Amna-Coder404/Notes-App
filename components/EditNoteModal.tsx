import { useImageUpload } from '@/hooks/useImageUpload';
import { useNotes } from '@/hooks/useNotes';
import { useTheme } from '@/hooks/useTheme';
import { createStyles } from '@/style/create.stlye';
import { modalStlye } from '@/style/modal.stlye';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { Image, Modal, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Loader from './Loader';




type editProps = {
    visible: boolean,
    onClose: () => void,
    note: any,
    handleSave: (data: {
        title: string;
        content: string;
        categories: string[];
    }) => void;
}

export default function EditNoteModal({
    visible,
    onClose,
    note,
    handleSave
}: editProps) {

    const { categories } = useNotes();
    const { theme } = useTheme();
    const styles = modalStlye(theme);
    const dropDown = createStyles(theme);

    const { pickImage, image, setImage, uploadImageToConvex } = useImageUpload();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("");
    const [openCategory, setOpenCategory] = useState(false);

    // sync note → state
    useEffect(() => {
        if (note) {
            setTitle(note.title || "");
            setContent(note.content || "");
            setCategory(note.categories?.[0] || "");
            setImage(null); // reset new image selection
        }
    }, [note]);

    if (!visible || !note) return null;
    const payload: any = {
        title,
        content,
        categories: category ? [category] : [],
    };

    if (image) {
        payload.imageUrl = image;
    }
    const handleSaveClick = async () => {
        const payload: any = {
            title,
            content,
            categories: category ? [category] : [],
        };

        // upload new image properly
        if (image) {
            const storageId = await uploadImageToConvex();
            payload.imageUrl = storageId;
        }

        await handleSave(payload);
        onClose();
    };

    return (
        <Modal
            visible={visible}
            transparent
            animationType="slide"
            onRequestClose={onClose}
        >
            <View style={styles.centerModalOverlay}>
                <View style={styles.centerModalBox}>

                    {/* TITLE */}
                    <TextInput
                        placeholder="Title"
                        placeholderTextColor={theme.mutedText}
                        value={title}
                        onChangeText={setTitle}
                        style={styles.input}
                    />

                    {/* IMAGE SECTION */}
                    {!image && note.imageUrl && (
                        <View style={{ marginVertical: 10 }}>

                            {/* EXISTING IMAGE */}
                            {!image && note.imageUrl && (
                                <Image
                                    source={{ uri: note.imageUrl }}
                                    style={{
                                        width: "100%",
                                        height: 160,
                                        borderRadius: 12,
                                    }}
                                />
                            )}

                            {/* NEW IMAGE PREVIEW */}
                            {image && (
                                <Image
                                    source={{ uri: image }}
                                    style={{
                                        width: "100%",
                                        height: 160,
                                        borderRadius: 12,
                                    }}
                                />
                            )}

                            <TouchableOpacity
                                onPress={pickImage}
                                style={{
                                    padding: 12,
                                    borderRadius: 10,
                                    backgroundColor: theme.card,
                                    marginTop: 10,
                                }}
                            >
                                <Text style={{ color: theme.text }}>
                                    📸 Change Image
                                </Text>
                            </TouchableOpacity>

                        </View>
                    )}

                    {/* CATEGORY */}
                    <TouchableOpacity style={dropDown.dropdown} onPress={() => setOpenCategory(!openCategory)}>
                        <Text style={
                            category
                                ? dropDown.dropdownText
                                : dropDown.dropdownPlaceholder
                        }>
                            {category || "Select Category"}
                        </Text>

                        <Ionicons
                            name={openCategory ? "chevron-up" : "chevron-down"}
                            size={20}
                            color="#666"
                        />
                    </TouchableOpacity>

                    {openCategory && (
                        <View style={dropDown.dropdownList}>
                            {categories.map((item) => (
                                <TouchableOpacity
                                    key={item}
                                    style={dropDown.dropdownItem}
                                    onPress={() => {
                                        setCategory(item);
                                        setOpenCategory(false);
                                    }}
                                >
                                    <Text style={{ color: theme.mutedText }}>
                                        {item}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}

                    {/* CONTENT */}
                    <TextInput
                        placeholder="Write your note..."
                        placeholderTextColor={theme.mutedText}
                        value={content}
                        onChangeText={setContent}
                        multiline
                        style={[styles.input, dropDown.textArea]}
                    />

                    {/* BUTTONS */}
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={onClose} style={[styles.button, styles.canalBtn]}>
                            <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.button}
                            onPress={handleSaveClick}
                        >
                            <Text style={styles.buttonText}>
                                Save Change
                            </Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        </Modal>
    );
}
// DELETE MODAL 
export function DeleteNote({ visible, note, onClose, handleDelete }: any) {

    const { theme } = useTheme();
    const styles = modalStlye(theme);
    if (!visible || !note) return null;
    return (
        <Modal visible={visible} transparent={true} animationType='slide' onRequestClose={onClose}>
            <View style={styles.centerModalOverlay}>
                <View style={styles.centerModalBox}>
                    <View style={{ padding: 12 }}>
                        <Text style={styles.modalTitle}>
                            {note?.title
                                ? `Are you sure you want to delete "${note.title}" note?`
                                : "Are you sure you want to delete this note?"}
                        </Text>
                    </View>


                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={onClose}>
                            <Text style={styles.buttonText}>Canal</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, styles.canalBtn]} onPress={handleDelete}>
                            <Text style={styles.buttonText}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}