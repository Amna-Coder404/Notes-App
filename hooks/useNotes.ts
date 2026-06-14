import { api } from "@/convex/_generated/api";
import { useDbUser } from "./useDbUser"
import { useMutation, useQuery } from "convex/react";
import { useMemo, useState } from "react";
import { Id } from "@/convex/_generated/dataModel";


export const useNotes = () => {
    const { dbUser } = useDbUser();
    const categories = [
        "study",
        "programming",
        "personal",
        "ideas",
        "goals",
        "image",
        "other"
    ];


    //   QUERIES
    const notes = useQuery(api.notes.getAllNotes, dbUser?.clerkId ? { clerkId: dbUser.clerkId } : "skip");
    const pinnedNotes = useQuery(
        api.notes.getPinnedNotes,
        dbUser?.clerkId ? { clerkId: dbUser.clerkId } : "skip");

    // MUTATIONS
    const updateNotes = useMutation(api.notes.editNotes);
    const deleteNote = useMutation(api.notes.deleteNote);
    const toggleFavorite = useMutation(api.notes.toggleFavorite);
    const togglePinned = useMutation(api.notes.togglePinned);
    const deleteAllNotes = useMutation(api.notes.deleteAllNotes);

    // Derived Data
    const handleDeleteAllNotes = async (clerkId: string) => {
        try {
            const res = await deleteAllNotes({ clerkId });
            return res;
        } catch (error) {
            console.log("Delete All Notes Error:", error);
            throw new Error("Failed to delete all notes");
        }
    };
    const categoryStats = useMemo(() => {
        if (!notes) return [];

        const counts: Record<string, number> = {};


        for (const note of notes) {
            for (const c of note.categories) {
                counts[c] = (counts[c] || 0) + 1;
            }
        }
        return Object.entries(counts);
    }, [notes]);

    const allNotesCount = notes?.length || 0;
    const fullCategoryList = useMemo(() => {
        return categories.map((cat) => {
            const found = categoryStats.find(([c]) => c === cat);

            return {
                name: cat,
                count: found ? found[1] : 0,
            };
        });
    }, [categoryStats]);

    // Filter Notes 
    const [searchText, setSearchText] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");

   const filteredNotes = useMemo(() => {
    if (!notes) return [];

    const q = searchText.trim().toLowerCase();

    return notes.filter((note) => {
        const matchCategory =
            selectedCategory === "All" ||
            note.categories.includes(selectedCategory);

        let text = "";

        // TYPE-BASED SEARCH (IMPORTANT)
        if (note.type === "text") {
            text = `${note.title ?? ""} ${note.content ?? ""}`;
        }

        if (note.type === "image") {
             text = `${note.title ?? ""} ${note.content ?? ""}`;
        }

        if (note.type === "voice") {
            text = `${note.title ?? ""}`;
        }

        const matchSearch =
            q === "" || text.toLowerCase().includes(q);

        return matchCategory && matchSearch;
    });
}, [notes, searchText, selectedCategory]);
    // Actions
    const handleEditSave = async (
        noteId: Id<"notes">,
        data: {
            title: string;
            content: string;
            categories: string[];
            imageUrl?: Id<"_storage">;
        }
    ) => {
        await updateNotes({
            noteId,
            title: data.title,
            content: data.content,
            categories: data.categories,
            imageUrl: data.imageUrl ,
        });
    };
    const handleDelete = async ({
        selectedNote,
        setDeleteModal,
        setSelectedNote,
        setEditModalVisible,
    }: any) => {
        if (!selectedNote?._id) return;

        try {
            await deleteNote({ noteId: selectedNote._id });

            setDeleteModal(false);
            setSelectedNote(null);
            setEditModalVisible(false);
        } catch (error) {
            console.log("ERROR:", error);
            throw new Error("Failed to delete");
        }
    };
    const handleToggleStar = async (noteId: any) => {
        await toggleFavorite({ noteId });
    };

    const handleTogglePinned = async (noteId: any) => {
        await togglePinned({ noteId });
    };


    return {
        fullCategoryList,
        categories,
        notes,
        pinnedNotes,
        categoryStats,
        allNotesCount,
        handleDelete,
        handleEditSave,
        handleTogglePinned,
        handleToggleStar,
        // Filter Note 
        filteredNotes,
        setSearchText,
        searchText,
        selectedCategory,
        setSelectedCategory,
        handleDeleteAllNotes
    };
};

