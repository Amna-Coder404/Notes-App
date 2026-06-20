import { useTheme } from "@/hooks/useTheme";
import { createHomeStyles } from "@/style/home.style";
import { AntDesign } from "@expo/vector-icons";

import { useRouter } from "expo-router";

import { Image, Text, TouchableOpacity, View } from "react-native";

export const RenderNotesCards = ({ item }: any) => {
    const { theme } = useTheme();
    const styles = createHomeStyles(theme);
    const router = useRouter();

    return (
       <View>
         <TouchableOpacity
            style={styles.keepCard}
            onPress={() =>
                router.push({
                    pathname: "/notes/[id]",
                    params: { id: String(item._id) },
                })
            }
        >

            {/* IMAGE (TOP STYLE LIKE KEEP) */}
            {item.imageUrl && (
                <Image
                    source={{ uri: item.imageUrl }}
                    style={styles.keepImage}
                    resizeMode="cover"
                />
            )}

            {/* CONTENT */}
            <View style={styles.keepContent}>

                <Text style={styles.noteTitle} numberOfLines={2}>
                    {item.title || "Untitled"}
                </Text>

                {/* VOICE / TEXT SWITCH */}
                {item.type === "voice" ? (
                    <View style={styles.voiceRow}>
                        <Text style={styles.noteDescription}>
                            🎤 Voice note
                        </Text>
                        <AntDesign name="play-circle" style={styles.icon} />
                    </View>
                ) : (
                    <Text
                        style={styles.noteDescription}
                        numberOfLines={4}
                    >
                        {item.content}
                    </Text>
                )}

                {/* CATEGORY */}
                <Text style={styles.noteCategory}>
                    {item.categories}
                </Text>

            </View>
        </TouchableOpacity>
       </View>
    );
};