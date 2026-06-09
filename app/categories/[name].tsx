import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useNotes } from "@/hooks/useNotes";
import { profileScreenStyles } from "@/style/profile.stlye";
import { useTheme } from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CategoryDetails() {
    const { name } = useLocalSearchParams();
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
                    <Text style={styles.categoryText}>All </Text>
                    <Text style={styles.categoryText}>
                        {allNotesCount}
                    </Text>
                </View>

                {/* FIXED CATEGORIES */}
                {fullCategoryList.map((item) => (
                    <View key={item.name} style={styles.categoryBtn}>
                        <Text style={styles.categoryText}>
                            {item.name}
                        </Text>
                        <Text style={styles.categoryText}>
                            {item.count}
                        </Text>
                    </View>
                ))}

            </ScrollView>
        </SafeAreaView>
    );
}