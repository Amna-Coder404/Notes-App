import { useTheme } from "@/hooks/useTheme";
import { createHomeStyles } from "@/style/home.style";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { formatDistanceToNow } from "date-fns";
import React, { useEffect, useState } from "react";
import { FlatList, ScrollView, Text, TouchableOpacity, View } from "react-native";

import { useNotes } from "@/hooks/useNotes";
import EditBtn from "./EditBtn";
import EditNoteModal, { DeleteNote } from "./EditNoteModal";
import Loader from "./Loader";
import NotFound from "./NotFound";

const NotesCards = () => {
    const { theme } = useTheme();
    const styles = createHomeStyles(theme);

    const {
        notes,
        pinnedNotes,
        categoryStats,
        allNotesCount,

        handleEditSave,
        handleDelete,
        handleTogglePinned,
        handleToggleStar,
    } = useNotes();

    const [dropdownPos, setDropdownPos] = useState({ x: 0, y: 0 });
    const [selectedNote, setSelectedNote] = useState<any>(null);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    useEffect(() => {
        if (!selectedNote) return;

        const exists = notes?.find(n => n._id === selectedNote._id);

        if (!exists) {
            setSelectedNote(null);
        }
    }, [notes]);
    const onSaveEdit = async (data: {
        title: string;
        content: string;
        categories: string[];
    }) => {
        if (!selectedNote?._id) return;

        await handleEditSave(selectedNote._id, data);

        setEditModalVisible(false);
        setSelectedNote(null);
    };

    const renderNote = ({ item }: any) => (
        <View style={styles.noteCard}>
            <View style={styles.noteBetween}>
                <Text style={styles.noteTitle}>
                    {item.title || "Untitled"}
                </Text>

                <View style={styles.noteBetween}>
                    <TouchableOpacity onPress={() => handleToggleStar(item._id)}>
                        <AntDesign
                            name="star"
                            size={18}
                            color={item.isFavorite ? "#CEC436" : theme.text}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={(event) => {
                            const { pageX, pageY } = event.nativeEvent;
                            setDropdownPos({ x: pageX, y: pageY });
                            setSelectedNote(item);
                        }}
                    >
                        <Entypo name="dots-three-vertical" size={20} color={theme.mutedText} />
                    </TouchableOpacity>
                </View>
            </View>

            <Text style={styles.noteDescription}>{item.content}</Text>

            <View style={styles.noteBetween}>
                <Text style={styles.noteCategory}>
                    {item.categories}
                </Text>

                <Text style={styles.noteDate}>
                    {formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}
                </Text>
            </View>
        </View>
    );

    return (
        <>
            {notes === undefined ? (
                <Loader />
            ) : notes.length > 0 ? (
                <FlatList
                    style={styles.cardContainer}
                    data={notes}
                    keyExtractor={(item) => item._id}
                    renderItem={renderNote}
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={
                        <>
                            {/* Categories */}
                            <View style={styles.sectionHeader}>
                                <Text style={styles.sectionTitle}>Categories</Text>
                            </View>

                            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                <View style={styles.categoryCard}>
                                    <Text style={styles.categoryText}>All</Text>
                                    <Text style={styles.categoryCount}>{allNotesCount}</Text>
                                </View>

                                {categoryStats.map(([category, count]) => (
                                    <View key={category} style={styles.categoryCard}>
                                        <Text style={styles.categoryText}>{category}</Text>
                                        <Text style={styles.categoryCount}>{count}</Text>
                                    </View>
                                ))}
                            </ScrollView>

                            {/* Pinned */}
                            {pinnedNotes === undefined ? (
                                <Loader />
                            ) : pinnedNotes.length > 0 ? (
                                <>
                                    <View style={styles.sectionHeader}>
                                        <Text style={styles.sectionTitle}>Pinned</Text>
                                    </View>

                                    {pinnedNotes.map((note) => (
                                        <View key={note._id} style={styles.noteCard}>
                                            <View style={styles.noteBetween}>
                                                <Text style={styles.noteTitle}>
                                                    {note.title || "Untitled"}
                                                </Text>

                                                <TouchableOpacity onPress={() => handleTogglePinned(note._id)} >
                                                    <AntDesign name="pushpin" size={18} color={note.isPinned ? "#CEC436" : theme.mutedText} />
                                                </TouchableOpacity>
                                            </View>

                                            <Text style={styles.noteDescription}>
                                                {note.content}
                                            </Text>
                                        </View>
                                    ))}
                                </>
                            ) : null}

                            <View style={styles.sectionHeader}>
                                <Text style={styles.sectionTitle}>
                                    All Notes
                                </Text>
                            </View>


                        </>
                    }
                />
            ) : (
                <NotFound />
            )}

            {/* EDIT BTN */}
            <EditBtn
                note={selectedNote}
                visible={!!selectedNote?._id}
                position={dropdownPos}
                onClose={() => setSelectedNote(null)}
                onEdit={() => setEditModalVisible(true)}
                onDelete={() => setDeleteModal(true)}
                onPin={() => {
                    if (!selectedNote?._id) return;
                    handleTogglePinned(selectedNote._id);
                }}
            />

            {/* MODALS */}
            <EditNoteModal
                visible={editModalVisible}
                onClose={() => {
                    setEditModalVisible(false);
                    setSelectedNote(null);
                }}
                note={selectedNote}
                handleSave={onSaveEdit}
            />
            <DeleteNote
                visible={deleteModal}
                onClose={() => {
                    setDeleteModal(false);
                    setSelectedNote(null);
                }}
                note={selectedNote}
                handleDelete={() =>
                    handleDelete({
                        selectedNote,
                        setDeleteModal,
                        setSelectedNote,
                        setEditModalVisible,
                    })
                }
            />
        </>
    );
};


export default NotesCards;