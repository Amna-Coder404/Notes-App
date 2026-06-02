import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F8FA",
    paddingHorizontal: 20,
    paddingTop: 50,
  },

  // HEADER
  header: {
    marginBottom: 25,
  },

  headerTitle: {
    fontSize: 26,
    fontWeight: "700",
    color: "#111",
  },

  headerSubtitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },

  // INPUTS
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    marginBottom: 15,
    color: "#111",
  },

  textArea: {
    height: 140,
    textAlignVertical: "top",
  },

  // CATEGORY DROPDOWN
  dropdown: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    padding: 14,
    marginBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  dropdownText: {
    color: "#111",
    fontSize: 15,
  },

  dropdownPlaceholder: {
    color: "#999",
  },

  dropdownList: {
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#eee",
    marginBottom: 15,
    overflow: "hidden",
  },

  dropdownItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f1f1",
  },

  // BUTTON
  button: {
    backgroundColor: "#111",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});