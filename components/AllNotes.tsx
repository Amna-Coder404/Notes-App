import { api } from '@/convex/_generated/api'
import { styles } from '@/style/home.style'
import { useUser } from '@clerk/clerk-expo'
import { useQuery } from 'convex/react'
import { formatDistanceToNow } from "date-fns"
import React from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'


const AllNotes = () => {
    const { user } = useUser();

    const dbUser = useQuery(
        api.user.getUserByClerkId,
        user?.id ? { clerkId: user.id } : "skip"
    );

    const notes = useQuery(
        api.notes.getAllNotes,
        dbUser?.clerkId ? { clerkId: dbUser.clerkId } : "skip"
    );
    if (!dbUser) {
        return <Text>Loading user...</Text>;
    }


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