import { useTheme } from '@/hooks/useTheme';
import { modalStlye } from '@/style/modal';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { Modal, Text, TextInput, TextInputBase, TouchableOpacity, View } from 'react-native';
import { createStyles } from '@/style/create.stlye';


const categories = [
    "Study",
    "Programming",
    "Personal",
    "Ideas",
    "Goals",
    "Other"
];


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

export default function EditNoteModal({ visible, onClose, note, handleSave }: editProps) {
    const { theme } = useTheme();
    const styles = modalStlye(theme);
    const dropDown = createStyles(theme);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const [category, setCategory] = useState("");

    const [openCategory, setOpenCategory] = useState(false);
    useEffect(() => {
        if (note) {
            setTitle(note.title || "");
            setContent(note.content || "");
            setCategory(note.categories?.[0] || "");
        }
    }, [note]);


    return (
        <Modal visible={visible} transparent={true} animationType='slide' onRequestClose={onClose}>
            <View style={styles.centerModalOverlay}>
                <View style={styles.centerModalBox}>
                    <TextInput
                        placeholder="Title"
                        placeholderTextColor={theme.mutedText}
                        value={title}
                        onChangeText={setTitle}
                        style={styles.input}
                    />

                    <TouchableOpacity style={dropDown.dropdown} onPress={() => setOpenCategory(!openCategory)}>
                        <Text style={category
                            ? dropDown.dropdownText
                            : dropDown.dropdownPlaceholder}>
                            {category || "Select Category"}
                        </Text>

                        <Ionicons name={openCategory ? "chevron-up" : "chevron-down"} size={20} color="#666" />

                        {/* Notes */}
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
                                    <Text style={{ color: theme.mutedText }}>{item}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}

                    <TextInput
                        placeholder="Write your note..."
                        placeholderTextColor={theme.mutedText}
                        value={content}
                        onChangeText={setContent}
                        multiline
                        style={[styles.input, dropDown.textArea]}
                    />
                    <View style={styles.buttonContainer} >
                        <TouchableOpacity onPress={onClose} style={[styles.button, styles.canalBtn]}>
                            <Text style={styles.buttonText}>Canal</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}
                            onPress={async () => {
                                if (!content.trim()) return;
                                await handleSave({
                                    title,
                                    content,
                                    categories: category ? [category] : [],
                                });
                                onClose();
                            }}>
                            <Text style={styles.buttonText}>
                                Save Change
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
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
                   <View style={{padding:12}}>
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