import { useTheme } from "@/hooks/useTheme";
import { createHomeStyles } from "@/style/home.style";
import { Entypo, FontAwesome } from "@expo/vector-icons";
import { formatDistanceToNow } from "date-fns";
import { useRouter } from "expo-router";

import { Image, Text, TouchableOpacity, View } from "react-native";
import VoiceNoteCard from "./VoiceNoteCard";

export const RenderNotesCards = ({ item, handleToggleStar, setDropdownPos, setSelectedNote }: any) => {

    const { theme } = useTheme();
    const styles = createHomeStyles(theme);
    const router = useRouter();

    return (

        <TouchableOpacity
            style={styles.noteCard}
            onPress={() =>
                router.push({
                    pathname: "/notes/[id]",
                    params: { id: String(item._id) },
                })
            }
        >
            {item.imageUrl && (
                <Image
                    source={{ uri: item.imageUrl }}
                    style={styles.noteImage}
                    resizeMode="cover"
                />
            )}

            <View style={styles.noteBetween}>
                <Text style={[styles.noteTitle, { width: 200 }]} numberOfLines={1} >
                    {item.title || "Untitled"}
                </Text>

                <View style={styles.noteBetween}>
                    <TouchableOpacity onPress={() => handleToggleStar(item._id)}>
                        <FontAwesome name={item.isFavorite ? "star" : "star-o"} size={18} color={item.isFavorite ? "#CEC436" : theme.text} />
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

        
                {item.type === "voice" ? (
                    <VoiceNoteCard audioUrl={item.audioUrl} />
                ) : (
                    <Text
                        style={styles.noteDescription}
                        numberOfLines={2}
                        ellipsizeMode="tail"
                    >
                        {item.content}
                    </Text>
                )}
            {/* </Text> */}

            <View style={styles.noteBetween}>
                <Text style={styles.noteCategory}>
                    {item.categories}
                </Text>

                <Text style={styles.noteDate}>
                    {formatDistanceToNow(
                        new Date(item.createdAt),
                        { addSuffix: true }
                    )}
                </Text>
            </View>
        </TouchableOpacity>
    );
}