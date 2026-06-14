import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useNotes } from "@/hooks/useNotes";
import { profileScreenStyles } from "@/style/profile.stlye";
import { useTheme } from "@/hooks/useTheme";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
const categoryIcons = {
    study: "book",
    programming: "code",
    personal: "user",
    ideas: "lightbulb",
    goals: "bullseye",
    images: "images",
    other: "folder",
} as any;
export default function CategoryDetails() {

    const router = useRouter();

    const { allNotesCount, fullCategoryList } = useNotes();

    const { theme } = useTheme();
    const styles = profileScreenStyles(theme);



    return (
        <SafeAreaView style={styles.categoryContainerMain}>

            {/* HEADER WITH BACK BUTTON */}
            <View style={styles.headerRow}>

                {/* BACK BUTTON */}
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons
                        name="arrow-back"
                        size={24}
                        color={theme.text}
                    />
                </TouchableOpacity>

                {/* TITLE */}
                <Text style={styles.menuTitle}>
                    All Categories
                </Text>

                {/* EMPTY SPACE (for alignment) */}
                <View style={{ width: 24 }} />
            </View>

            {/* CATEGORY LIST */}
            <ScrollView showsVerticalScrollIndicator={true} style={styles.categoryContainer}>

                {/* ALL */}
                <View style={styles.categoryBtn}>
                    <View style={styles.menuLeft} >
                        <View style={styles.iconCateContainer}>
                            <FontAwesome6 name="notes-medical" style={styles.icon} />
                        </View>
                        <Text style={styles.categoryText}>All </Text>
                    </View>

                    <Text style={styles.categoryText}>
                        {allNotesCount}
                    </Text>
                </View>

                {/* FIXED CATEGORIES */}
                {fullCategoryList.map((item) => (
                    <View key={item.name} style={styles.categoryBtn}>

                        <View style={styles.menuLeft}>
                            <View style={styles.iconCateContainer}>
                                <FontAwesome6 name={categoryIcons[item.name] || "folder"} style={styles.icon} />
                            </View>
                            <Text style={styles.categoryText}>
                                {item.name}
                            </Text>
                        </View>

                        <Text style={styles.categoryText}>
                            {item.count}
                        </Text>
                    </View>
                ))}

            </ScrollView>
        </SafeAreaView>
    );
}