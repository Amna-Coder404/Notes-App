import { api } from "@/convex/_generated/api";
import { useDbUser } from "@/hooks/useDbUser";
import { useTheme } from "@/hooks/useTheme";
import { createHomeStyles } from "@/style/home.style";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { useMutation, useQuery } from "convex/react";
import { formatDistanceToNow } from "date-fns";
import React, { useState } from "react";
import { FlatList, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Categories from "./CategoriesModal";
import EditBtn from "./EditBtn";
import EditNoteModal, { DeleteNote } from "./EditNoteModal";
import Loader from "./Loader";
import NotFound from "./NotFound";

const NotesCards = () => {
    const { dbUser } = useDbUser();
    const { theme } = useTheme();
    const styles = createHomeStyles(theme);
    const [dropdownPos, setDropdownPos] = useState({
        x: 0,
        y: 0,
    })

    const notes = useQuery(
        api.notes.getAllNotes,
        dbUser?.clerkId ? { clerkId: dbUser.clerkId } : "skip"
    );

    const categoryCounts: Record<string, number> = {};

    const safeNotes = notes ?? [];
    const hasNotes = safeNotes.length > 0;
    for (const note of safeNotes) {
        for (const category of note.categories) {
            categoryCounts[category] = (categoryCounts[category] || 0) + 1;
        }
    }

    const categoriesArray = Object.entries(categoryCounts); //arry to obj
    const allNotesCount = safeNotes.length;
    const updateNotes = useMutation(api.notes.editNotes);


    const pinnedNotes = useQuery(
        api.notes.getPinnedNotes,
        dbUser?.clerkId ? { clerkId: dbUser.clerkId } : "skip"
    );

    const [selectedNote, setSelectedNote] = useState<any>(null);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [showCategories, setShowCategories] = useState(false);
    const deleteNote = useMutation(api.notes.deleteNote);
    const toggleFavorite = useMutation(api.notes.toggleFavorite);
    const togglePinned = useMutation(api.notes.togglePinned);


    const handleEditSave = async (data: any) => {
        if (!selectedNote) return;

        const noteId = selectedNote._id;
        try {
            await updateNotes({
                noteId,
                title: data.title,
                content: data.content,
                categories: data.categories,
            })

            setEditModalVisible(false);
            setSelectedNote(null);
        } catch (error) {
            throw new Error("Faild to edit");
        }
    }
    const handleDelete = async () => {
        if (!selectedNote?._id) return;
        try {
            await deleteNote({ noteId: selectedNote._id });
            setSelectedNote(null);
            setDeleteModal(false);
        }
        catch (error) {
            throw new Error("Faild to delele!!");
        }
    }
    const handleTogglePinned = async (noteId: any) => {
        try {
            await togglePinned({
                noteId,
            });
            setSelectedNote(null);
        }
        catch (error) {
            throw new Error("Faild to pinned ");
        }
    }
    const handleToggleStar = async (noteId: any) => {
        try {
            await toggleFavorite({
                noteId,
            });
        }
        catch (error) {
            throw new Error("Faild to Star ");
        }
    }

    if (notes === undefined) return <Loader />
    const renderNote = ({ item }: any) => (
        <View style={styles.noteCard}>
            <View style={styles.noteBetween}>
                <Text style={styles.noteTitle}>
                    {item.title || "Untitled"}
                </Text>

                {/* Star  */}
                <View style={{ width: 150 }}></View>

                <TouchableOpacity onPress={() => handleToggleStar(item._id)}>
                    <AntDesign name="star" size={18} color={item.isFavorite ? "#CEC436" : theme.text} />
                </TouchableOpacity>


                <TouchableOpacity onPress={(event) => {
                    const { pageX, pageY } = event.nativeEvent;
                    setDropdownPos({
                        x: pageX,
                        y: pageY,
                    });
                    setSelectedNote(item);
                }}
                >
                    <Entypo
                        name="dots-three-vertical"
                        size={20}
                        color={theme.mutedText}
                    />
                </TouchableOpacity>
            </View>

            <Text style={styles.noteDescription}>
                {item.content}
            </Text>

            <View style={styles.noteBetween}>
                <Text style={styles.noteCategory}>
                    {item.categories.join(", ")}
                </Text>

                <Text style={styles.noteDate}>
                    {formatDistanceToNow(
                        new Date(item.createdAt),
                        { addSuffix: true }
                    )}
                </Text>

            </View>
        </View>
    );

    return (
        <View>
            {/* render all notes */}
            {hasNotes ? (
                <FlatList
                    style={styles.cardContainer}
                    data={safeNotes}
                    keyExtractor={(item) => item._id}
                    renderItem={renderNote}
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={
                        <>
                            {/* Catefories */}
                            <View style={styles.sectionHeader}>
                                <Text style={styles.sectionTitle}>Categories</Text>

                                <TouchableOpacity
                                    onPress={() => setShowCategories(true)}
                                >
                                    <Text style={styles.viewAll}>View all</Text>
                                </TouchableOpacity>
                            </View>

                            <ScrollView
                                horizontal
                                showsHorizontalScrollIndicator={false}
                            >
                                <View style={styles.categoryCard}>
                                    <Text style={styles.categoryText}>All</Text>
                                    <Text style={styles.categoryCount}>
                                        {allNotesCount}
                                    </Text>
                                </View>

                                {categoriesArray.map(([category, count]) => (
                                    <View key={category} style={styles.categoryCard} >
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
                                                <Text style={styles.noteTitle}>{note.title || "Untitle"}</Text>
                                                <TouchableOpacity onPress={() => handleTogglePinned(note._id)}>
                                                    <AntDesign name="pushpin" size={18} color={note.isPinned ? "#CEC436" : theme.mutedText} />
                                                </TouchableOpacity>
                                            </View>
                                            <Text style={styles.noteDescription}>{note.content}</Text>
                                        </View>
                                    ))}
                                </>
                            ) : (
                                null
                            )}

                            <View style={styles.sectionHeader}>
                                <Text style={styles.sectionTitle}>
                                    All Notes
                                </Text>
                            </View>
                        </>
                    }
                    ListFooterComponent={
                       <Categories visible={showCategories} onClose={() => setShowCategories(false)} />         
                    }
                />
            ) : (
                <NotFound />
            )}


            <EditBtn
                note={selectedNote}
                visible={selectedNote !== null}
                position={dropdownPos}
                onClose={() => setSelectedNote(null)}
                onEdit={() => { setEditModalVisible(true) }}
                onDelete={() => {
                    if (!selectedNote) return;
                    setDeleteModal(true)
                }}
                onPin={() => {
                    if (!selectedNote?._id) return;
                    handleTogglePinned(selectedNote._id);
                }} />
            {/* EDIT MODAL */}
            <EditNoteModal
                visible={editModalVisible}
                onClose={() => {
                    setEditModalVisible(false);
                    setSelectedNote(null);
                }}
                note={selectedNote}
                handleSave={handleEditSave}
            />
            {/* DELETE NOTE MODAL */}
            <DeleteNote
                visible={deleteModal}
                onClose={() => {
                    setDeleteModal(false);
                    setSelectedNote(null);
                }}
                note={selectedNote}
                handleDelete={handleDelete}
            />
        </View>
    );
};

export default NotesCards;