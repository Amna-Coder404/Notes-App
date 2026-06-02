import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingTop: 60,
  },

  // Header
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  greeting: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1A1A1A",
  },

  subtitle: {
    marginTop: 6,
    fontSize: 15,
    color: "#8A8A8A",
  },

  profileBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    justifyContent: "center",
    alignItems: "center",
  },

  // Search
  searchRow: {
    flexDirection: "row",
    marginTop: 25,
    gap: 12,
  },

  searchContainer: {
    flex: 1,
    height: 50,
    backgroundColor: "#F7F7F7",
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
  },

  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
    color: "#333",
  },

  filterBtn: {
    width: 50,
    height: 50,
    borderRadius: 14,
    backgroundColor: "#F7F7F7",
    justifyContent: "center",
    alignItems: "center",
  },

  // Section Header
  sectionHeader: {
    marginTop: 30,
    marginBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1A1A1A",
  },

  viewAll: {
    color: "#7C4DFF",
    fontSize: 15,
    fontWeight: "600",
  },

  // Categories
  categoriesRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  categoryCard: {
    width: 78,
    height: 85,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },

  categoryTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 6,
  },

  categoryCount: {
    fontSize: 18,
    fontWeight: "700",
  },

  allCategory: {
    backgroundColor: "#F5F0FF",
  },

  studyCategory: {
    backgroundColor: "#EAF8EF",
  },

  personalCategory: {
    backgroundColor: "#FFF5DD",
  },

  workCategory: {
    backgroundColor: "#EAF3FF",
  },
noteCategory: {
  marginTop: 8,
  fontSize: 13,
  fontWeight: "600",
  color: "#7C4DFF",
  paddingHorizontal: 10,
  paddingVertical: 4,
  borderRadius: 10,
  alignSelf: "flex-start",
  backgroundColor: "#F3EEFF",
},
  // Pinned Note
  pinnedCard: {
    marginTop: 10,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#EEEEEE",
    borderRadius: 18,
    padding: 16,
  },

  pinnedTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#1A1A1A",
  },

  pinnedText: {
    marginTop: 6,
    fontSize: 14,
    color: "#8A8A8A",
  },

  starIcon: {
    position: "absolute",
    right: 15,
    bottom: 15,
  },

  // Notes List
  noteCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#F0F0F0",
  },

  noteHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  noteTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1A1A1A",
  },

  noteDate: {
    fontSize: 13,
    color: "#A0A0A0",
  },

  noteDescription: {
    marginTop: 6,
    fontSize: 14,
    color: "#8A8A8A",
  },

  // Floating Button
  fab: {
    position: "absolute",
    right: 25,
    bottom: 30,
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: "#7C4DFF",
    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#7C4DFF",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
});