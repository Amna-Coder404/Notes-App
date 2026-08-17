import { useTheme } from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

const OfflineBanner = () => {
    const { theme } = useTheme();

    return (
        <View
            style={[
                styles.container,
                {
                    backgroundColor: theme.secondary,
                    borderBottomColor: theme.border,
                },
            ]}
        >
            <View
                style={[
                    styles.iconContainer,
                    {
                        backgroundColor: theme.primary,
                    },
                ]}
            >
                <Ionicons
                    name="cloud-offline-outline"
                    size={18}
                    color={theme.bright}
                />
            </View>

            <View style={styles.textContainer}>
                <Text
                    style={[
                        styles.title,
                        { color: theme.text },
                    ]}
                >
                    You're offline
                </Text>

                <Text
                    style={[
                        styles.subtitle,
                        { color: theme.mutedText },
                    ]}
                >
                    Check your connection to sync your notes.
                </Text>
            </View>

            <View
                style={[
                    styles.statusDot,
                    { backgroundColor: theme.danger },
                ]}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderBottomWidth: 1,
    },

    iconContainer: {
        width: 36,
        height: 36,
        borderRadius: 18,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 11,
    },

    textContainer: {
        flex: 1,
    },

    title: {
        fontSize: 14,
        fontWeight: "700",
        marginBottom: 2,
    },

    subtitle: {
        fontSize: 12,
        lineHeight: 17,
    },

    statusDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginLeft: 10,
    },
});

export default OfflineBanner;