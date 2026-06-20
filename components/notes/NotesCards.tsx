import { useTheme } from "@/hooks/useTheme";
import { createHomeStyles } from "@/style/home.style";
import { AntDesign } from "@expo/vector-icons";

import React, { useMemo } from "react";
import {
    FlatList,
    Image,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";

import { useNotes } from "@/hooks/useNotes";
import { RenderNotesCards } from "../notes/RenderNoteCards";
import { useRouter } from "expo-router";

import Loader from "../ui/Loader";
import NotFound from "../ui/NotFound";
import VoiceNoteCard from "./VoiceNoteCard";

const NotesCards = () => {
    const { theme } = useTheme();
    const styles = createHomeStyles(theme);
    const router = useRouter();

    const {
        notes,
        categoryStats,
        allNotesCount,
        handleTogglePinned,
        filteredNotes,
        setSearchText,
        searchText,
        selectedCategory,
        setSelectedCategory
    } = useNotes();

    const isSearching = searchText.trim().length > 0;

    // pinned notes (hidden during search)
    const filteredPinnedNotes = useMemo(() => {
        if (!notes || isSearching) return [];
        return notes.filter((note) => note.isPinned);
    }, [notes, isSearching]);

    const isEmptySearchResult =
        isSearching && filteredNotes && filteredNotes.length === 0;

    // loading state
    if (!notes || !filteredNotes) {
        return <Loader />;
    }

    // render item
    const renderNote = ({ item }: any) => (
        <RenderNotesCards item={item} />
    );

    // empty state
    if (notes.length === 0) {
        return <NotFound text="No notes yet" icon="create-outline" />;
    }

    return (
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

                    {/* PINNED */}
                    {filteredPinnedNotes.length > 0 && !isSearching && (
                        <>
                            <View style={styles.sectionHeader}>
                                <Text style={styles.sectionTitle}>Pinned</Text>
                            </View>

                            {filteredPinnedNotes.map((note) => (
                                <TouchableOpacity
                                    key={note._id}
                                    style={[
                                        styles.noteCard,
                                        styles.importantCard
                                    ]}
                                    onPress={() =>
                                        router.push({
                                            pathname: "/notes/[id]",
                                            params: { id: String(note._id) }
                                        })
                                    }
                                >
                                    {note.imageUrl && (
                                        <Image
                                            source={{ uri: note.imageUrl }}
                                            style={styles.importantImage}
                                        />
                                    )}

                                    <View style={styles.importantContent}>
                                        <Text
                                            style={styles.noteTitle}
                                            numberOfLines={1}
                                        >
                                            {note.title || "Untitled"}
                                        </Text>

                                        {note.type === "voice" ? (
                                            <VoiceNoteCard
                                                audioUrl={note.audioUrl}
                                            />
                                        ) : (
                                            <Text
                                                style={
                                                    styles.importantNoteText
                                                }
                                                numberOfLines={4}
                                            >
                                                {note.content}
                                            </Text>
                                        )}
                                    </View>

                                    <TouchableOpacity
                                        onPress={() =>
                                            handleTogglePinned(note._id)
                                        }
                                    >
                                        <AntDesign
                                            name="pushpin"
                                            size={18}
                                            color={
                                                note.isPinned
                                                    ? "#CEC436"
                                                    : theme.mutedText
                                            }
                                        />
                                    </TouchableOpacity>
                                </TouchableOpacity>
                            ))}
                        </>
                    )}

                    {/* CATEGORIES */}
                    {!isSearching && (
                        <>
                            <View style={styles.sectionHeader}>
                                <Text style={styles.sectionTitle}>
                                    Categories
                                </Text>
                            </View>

                            <ScrollView
                                horizontal
                                showsHorizontalScrollIndicator={false}
                            >
                                <TouchableOpacity
                                    onPress={() =>
                                        setSelectedCategory("All")
                                    }
                                    style={[
                                        styles.categoryCard,
                                        selectedCategory === "All" &&
                                            styles.selectCategory
                                    ]}
                                >
                                    <Text style={styles.categoryText}>
                                        All
                                    </Text>
                                    <Text style={styles.categoryCount}>
                                        {allNotesCount}
                                    </Text>
                                </TouchableOpacity>

                                {categoryStats.map(([category, count]) => (
                                    <TouchableOpacity
                                        key={category}
                                        onPress={() =>
                                            setSelectedCategory(category)
                                        }
                                        style={[
                                            styles.categoryCard,
                                            selectedCategory === category &&
                                                styles.selectCategory
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

                    {/* HEADER */}
                    <View>
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>
                                {isSearching ? "Results" : "Notes"}
                            </Text>
                        </View>

                        {isEmptySearchResult && (
                            <NotFound
                                text="Failed to find results"
                                icon="search"
                            />
                        )}
                    </View>
                </>
            }
        />
    );
};

export default NotesCards;