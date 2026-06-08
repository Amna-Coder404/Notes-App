import { api } from "@/convex/_generated/api";
import { useDbUser } from "./useDbUser"
import { useMutation, useQuery } from "convex/react";
import { useMemo } from "react";
import { Id } from "@/convex/_generated/dataModel";

export const useNotes = () => {
    const { dbUser } = useDbUser();

    //   QUERIES
    const notes = useQuery(api.notes.getAllNotes, dbUser?.clerkId ? { clerkId: dbUser.clerkId } : "skip");
    const pinnedNotes = useQuery(
        api.notes.getPinnedNotes,
        dbUser?.clerkId ? { clerkId: dbUser.clerkId } : "skip"
    );

    // MUTATIONS
    const updateNotes = useMutation(api.notes.editNotes);
    const deleteNote = useMutation(api.notes.deleteNote);
    const toggleFavorite = useMutation(api.notes.toggleFavorite);
    const togglePinned = useMutation(api.notes.togglePinned);


    // Derived Data
    const categoryStats = useMemo(() => {
        const counts: Record<string, number> = {};
        if (!notes) return [];

        for (const note of notes) {
            for (const c of note.categories) {
                counts[c] = (counts[c] || 0) + 1;
            }
        }
        return Object.entries(counts);
    }, [notes]);

    const allNotesCount = notes?.length || 0;

    // Actions
    const handleEditSave = async (
        noteId: Id<"notes">,
        data: {
            title: string;
            content: string;
            categories: string[];
        }
    ) => {
        await updateNotes({
            noteId,
            title: data.title,
            content: data.content,
            categories: data.categories,
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
        notes,
        pinnedNotes,
        categoryStats,
        allNotesCount,
        handleDelete,
        handleEditSave,
        handleTogglePinned,
        handleToggleStar
    };
};

