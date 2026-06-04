import { api } from '@/convex/_generated/api'
import { useDbUser } from '@/hooks/useDbUser'
import { useTheme } from '@/hooks/useTheme'
import { createHomeStyles } from '@/style/home.style'

import { useMutation, useQuery } from 'convex/react'
import { formatDistanceToNow } from "date-fns"
import React, { useState } from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import NotFound from './NotFound'
import Loader from './Loader'
import { AntDesign, Entypo, Ionicons } from '@expo/vector-icons'


const AllNotes = () => {
    const { theme } = useTheme();
    const styles = createHomeStyles(theme);

    const { dbUser } = useDbUser();

    const notes = useQuery(
        api.notes.getAllNotes,
        dbUser?.clerkId ? { clerkId: dbUser.clerkId } : "skip"
    );


    const togglePin = useMutation(api.notes.togglePinned);

    const categoryCounts: Record<string, number> = {};

    if (notes) {
        for (const note of notes) {
            for (const category of note.categories) {
                categoryCounts[category] = (categoryCounts[category] || 0) + 1;
            }
        }
    }

    const categoriesArray = Object.entries(categoryCounts);//arry to obj

    const allNotesCount = notes?.length || 0;
    if (!dbUser) {
        return <Text>Loading...</Text>;
    };
    if (notes === undefined) return <Loader />

    const [menuVisible, setMenuVisible] = React.useState(false);
    const [activeNoteId, setActiveNoteId] = React.useState<string | null>(null);


    return (
        <View >
            {/* SECTION TITLE */}
            {notes && notes.length > 0 ? (
                <>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Categories</Text>
                        <TouchableOpacity>
                            <Text style={styles.viewAll}>View all</Text>
                        </TouchableOpacity>
                    </View>
                    <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                    >
                        <View style={styles.categoryCard}>
                            <Text style={styles.categoryText}>ALL</Text>
                            <Text style={styles.categoryCount}>{allNotesCount}</Text>

                        </View>
                        {categoriesArray.map(([category, count]) => (

                            <View key={category} style={styles.categoryCard}>
                                <Text style={styles.categoryText}>{category}</Text>
                                <Text style={styles.categoryCount}>{count}</Text>

                            </View>
                        ))}
                    </ScrollView>

                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>All Notes</Text>
                    </View>

                    {/* NOTES LIST */}
                    {notes?.map((item) => (
                        
                        <View key={item._id} style={styles.noteCard}>

                            {/* NOTE HEADER */}
                            <View style={styles.noteBetween}>
                                <Text style={styles.noteTitle}>
                                    {item.title || "Untitled"}
                                </Text>

                                <TouchableOpacity
                                    onPress={() => {
                                        setActiveNoteId(item._id);
                                        setMenuVisible(true);
                                    }}>
                                    <Entypo name="dots-three-vertical" size={20} color={theme.mutedText} />
                                </TouchableOpacity>
                                
                            </View>

                            {/* DESCRIPTION */}
                            <Text style={styles.noteDescription}>
                                {item.content}
                            </Text>

                            {/* CATEGORY TAG */}
                            <View style={styles.noteBetween}>
                                <Text style={styles.noteCategory}>
                                    {item.categories}
                                </Text>
                                <Text style={styles.noteDate}>
                                    {formatDistanceToNow(new Date(item.createdAt), {
                                        addSuffix: true,
                                    })}
                                </Text>

                            </View>

                        </View>
                    ))}
                </>
            ) : (
                <NotFound />
            )}



        </View>
    )
}

export default AllNotes