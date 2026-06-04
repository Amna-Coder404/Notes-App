import { api } from '@/convex/_generated/api'
import { useDbUser } from '@/hooks/useDbUser'
import { useTheme } from '@/hooks/useTheme'
import { createHomeStyles } from '@/style/home.style'

import { useQuery } from 'convex/react'
import { formatDistanceToNow } from "date-fns"
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'


const AllNotes = () => {
    const { theme } = useTheme();
    const styles = createHomeStyles(theme);

    const { dbUser } = useDbUser();

    const notes = useQuery(
        api.notes.getAllNotes,
        dbUser?.clerkId ? { clerkId: dbUser.clerkId } : "skip"
    );
    if (!dbUser) {
        return <Text>Loading...</Text>;
    };


    return (
        <View >
            {/* SECTION TITLE */}
            <View style={styles.sectionHeader}>
                <Text style={styles.categoryTitle}>Categories</Text>
                <TouchableOpacity>
                    <Text style={styles.viewAll}>View all</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.categoriesRow}>
                {notes?.map((item) => (
                    <View style={styles.categoryCard}>
                        <Text style={styles.categoryCount}>{item.categories.length}</Text>
                    </View>
                ))}
            </View>



            {/* SECTION TITLE */}
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>All Notes</Text>

            </View>

            {/* NOTES LIST */}
            {notes?.map((item) => (
                <View key={item._id} style={styles.noteCard}>

                    {/* NOTE HEADER */}
                    <View style={styles.noteHeader}>
                        <Text style={styles.noteTitle}>
                            {item.title || "Untitled"}
                        </Text>

                        <Text style={styles.noteDate}>

                            {formatDistanceToNow(new Date(item.createdAt), {
                                addSuffix: true,
                            })}
                        </Text>
                    </View>

                    {/* DESCRIPTION */}
                    <Text style={styles.noteDescription}>
                        {item.content}
                    </Text>

                    {/* CATEGORY TAG */}
                    <Text style={styles.noteCategory}>
                        {item.categories}
                    </Text>

                </View>
            ))}




        </View>
    )
}

export default AllNotes