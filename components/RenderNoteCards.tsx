import { useTheme } from "@/hooks/useTheme";
import { createHomeStyles } from "@/style/home.style";
import { Entypo, FontAwesome } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import { formatDistanceToNow } from "date-fns";
import { Image } from "react-native";
import { useImageUrl } from "../hooks/useImageUrl";


export const RenderNotesCards = ({ item, handleToggleStar, setDropdownPos, setSelectedNote }: any) => {
    const { theme } = useTheme();
    const styles = createHomeStyles(theme);
    const imageUrl = useImageUrl(item.imageUrl);


    return (

        <View style={styles.noteCard}>
            {imageUrl && (
                <Image
                    source={{ uri: imageUrl }}
                    style={{
                        width: "100%",
                        height: 160,
                        borderRadius: 12,
                        marginBottom: 10,
                    }}
                    resizeMode="cover"
                />
            )}

            <View style={styles.noteBetween}>
                <Text style={styles.noteTitle}>
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

            <Text style={styles.noteDescription}>{item.content}</Text>

            <View style={styles.noteBetween}>
                <Text style={styles.noteCategory}>
                    {item.categories}
                </Text>

                <Text style={styles.noteDate}>
                    {formatDistanceToNow(new Date(item.createdAt), {
                        addSuffix: true
                    })}
                </Text>
            </View>
        </View>
    );
}