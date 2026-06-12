import { useTheme } from "@/hooks/useTheme";
import { createHomeStyles } from "@/style/home.style";
import { AntDesign } from "@expo/vector-icons";

import React, { useEffect, useMemo, useState } from "react";
import { FlatList, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";

import { useNotes } from "@/hooks/useNotes";
import EditBtn from "./EditBtn";
import EditNoteModal, { DeleteNote } from "./EditNoteModal";
import Loader from "./Loader";
import NotFound from "./NotFound";
import { RenderNotesCards } from "./RenderNoteCards";

const NotesCards = () => {
    const { theme } = useTheme();
    const styles = createHomeStyles(theme);

    const {
        notes,
        categoryStats,
        allNotesCount,
        handleEditSave,
        handleDelete,
        handleTogglePinned,
        handleToggleStar,
        filteredNotes,
        setSearchText,
        searchText,
        selectedCategory,
        setSelectedCategory
    } = useNotes();

    const isSearching = searchText.trim().length > 0;

    const [dropdownPos, setDropdownPos] = useState({ x: 0, y: 0 });
    const [selectedNote, setSelectedNote] = useState<any>(null);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);

    // remove selected note if deleted
    useEffect(() => {
        if (!selectedNote) return;

        const exists = notes?.find(n => n._id === selectedNote._id);

        if (!exists) {
            setSelectedNote(null);
        }
    }, [notes]);

    // hide pinned during search
    const filteredPinnedNotes = useMemo(() => {
        if (!notes) return [];
        if (isSearching) return [];
        return notes.filter((note) => note.isPinned);
    }, [notes, isSearching]);
    if (!notes || !filteredNotes) return <Loader />
   
    const isEmptySearchResult = isSearching && filteredNotes.length === 0;
    const isSearchingResult = !isSearching && filteredPinnedNotes.length > 0;

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

    // Render Note cards
    const renderNote = ({ item }: any) => (
        <RenderNotesCards
            item={item}
            handleToggleStar={handleToggleStar}
            setDropdownPos={setDropdownPos}
            setSelectedNote={setSelectedNote}
        />
    )
    return (
        <>
            {/* LOADER */}
            {notes === undefined ? (
                <Loader />
            ) : notes.length > 0 ? (
                <FlatList
                    style={styles.cardContainer}
                    data={filteredNotes}
                    keyExtractor={(item) => item._id}
                    renderItem={renderNote}
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={
                        <>

                            {/* SEARCH */}
                            <TextInput
                                value={searchText}
                                onChangeText={setSearchText}
                                placeholder="Search notes..."
                                style={styles.searchInput}
                                placeholderTextColor={theme.text}
                            />

                            {/* CATEGORIES (HIDDEN WHEN SEARCHING) */}
                            {!isSearching && (
                                <>
                                    <View style={styles.sectionHeader}>
                                        <Text style={styles.sectionTitle}>
                                            Categories
                                        </Text>
                                    </View>

                                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                        <TouchableOpacity onPress={() => setSelectedCategory("All")}
                                            style={[
                                                styles.categoryCard,
                                                selectedCategory === "All" && styles.selectCategory
                                            ]} >

                                            <Text style={styles.categoryText}>All</Text>
                                            <Text style={styles.categoryCount}>
                                                {allNotesCount}
                                            </Text>
                                        </TouchableOpacity>

                                        {categoryStats.map(([category, count]) => (
                                            <TouchableOpacity
                                                key={category}
                                                onPress={() => setSelectedCategory(category)}
                                                style={[
                                                    styles.categoryCard,
                                                    selectedCategory === category && styles.selectCategory
                                                ]}
                                            >
                                                <Text style={styles.categoryText}>
                                                    {category}
                                                </Text>
                                                <Text style={styles.categoryCount}>
                                                    {count}
                                                </Text>
                                            </TouchableOpacity>
                                        ))}
                                    </ScrollView>
                                </>
                            )}

                            {/* PINNED (HIDDEN WHEN SEARCHING) */}
                            {isSearchingResult && (
                                <>
                                    <View style={styles.sectionHeader}>
                                        <Text style={styles.sectionTitle}>
                                            Pinned
                                        </Text>
                                    </View>

                                    {filteredPinnedNotes.map((note) => (
                                        <View key={note._id} style={styles.noteCard}>
                                              {note.imageUrl && (
                                                              <Image
                                                                source={{ uri: note.imageUrl }}
                                                                style={{ width: 100, height: 100, borderRadius: 10 }}
                                                              />
                                                            )}
                                            <View style={styles.noteBetween}>
                                                <Text style={styles.noteTitle}>
                                                    {note.title || "Untitled"}
                                                </Text>

                                                <TouchableOpacity onPress={() => handleTogglePinned(note._id)}>
                                                    <AntDesign name="pushpin" size={18} color={note.isPinned ? "#CEC436" : theme.mutedText} />
                                                </TouchableOpacity>
                                            </View>

                                            <Text style={styles.noteDescription}>
                                                {note.content}
                                            </Text>
                                        </View>
                                    ))}
                                </>
                            )}

                            {/* HEADER */}
                            <View>
                                <View style={styles.sectionHeader}>
                                    <Text style={styles.sectionTitle}>
                                        {isSearching ? "Results" : " All Notes"}
                                    </Text>
                                </View>
                                {isEmptySearchResult && (
                                    <NotFound text={" Failed to find results"} />
                                )}
                            </View>
                        </>
                    }
                />
            ) : (
                <NotFound text={"Not notes Yet"} icon={"create-outline"} />
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
                        setEditModalVisible
                    })
                }
            />
        </>
    );
};

export default NotesCards;
