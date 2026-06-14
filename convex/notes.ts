import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

/*
   CREATE NOTE */
export const createNote = mutation({
  args: {
    clerkId: v.string(),
    type: v.union(
      v.literal("text"),
      v.literal("image"),
      v.literal("voice")
    ),

    title: v.optional(v.string()),
    content: v.optional(v.string()),
    categories: v.array(v.string()),

    imageUrl: v.optional(v.id("_storage")),
    audioUrl: v.optional(v.id("_storage")),
  },

  handler: async (ctx, args) => {
    await ctx.db.insert("notes", {
      clerkId: args.clerkId,
      type: args.type,
      title: args.title,
      content: args.content,
      categories: args.categories,
      imageUrl: args.imageUrl,
      audioUrl: args.audioUrl,
      isFavorite: false,
      isPinned: false,
      createdAt: Date.now(),
    });
  },
});

/*
   EDIT NOTE */
export const editNotes = mutation({
  args: {
    noteId: v.id("notes"),

    title: v.optional(v.string()),
    content: v.optional(v.string()),
    categories: v.array(v.string()),

    imageUrl: v.optional(v.id("_storage")),
    audioUrl: v.optional(v.id("_storage")),
  },

  handler: async (ctx, args) => {
    const note = await ctx.db.get(args.noteId);
    if (!note) throw new Error("Note not found");

    // delete old image if replaced
    if (args.imageUrl && note.imageUrl && args.imageUrl !== note.imageUrl) {
      await ctx.storage.delete(note.imageUrl);
    }

    await ctx.db.patch(args.noteId, {
      title: args.title,
      content: args.content,
      categories: args.categories,
      imageUrl: args.imageUrl ?? note.imageUrl,
      audioUrl: args.audioUrl ?? note.audioUrl,
    });
  },
});

/*
   TOGGLES */
export const toggleFavorite = mutation({
  args: { noteId: v.id("notes") },
  handler: async (ctx, args) => {
    const note = await ctx.db.get(args.noteId);
    if (!note) throw new Error("Note not found");

    await ctx.db.patch(args.noteId, {
      isFavorite: !note.isFavorite,
    });
  },
});

export const togglePinned = mutation({
  args: { noteId: v.id("notes") },
  handler: async (ctx, args) => {
    const note = await ctx.db.get(args.noteId);
    if (!note) throw new Error("Note not found");

    await ctx.db.patch(args.noteId, {
      isPinned: !note.isPinned,
    });
  },
});

/*
   GET ALL NOTES
   (🔥 ALWAYS RETURNS URL) */
export const getAllNotes = query({
  args: { clerkId: v.string() },

  handler: async (ctx, args) => {
    const notes = await ctx.db
      .query("notes")
      .withIndex("by_clerkId", (q) =>
        q.eq("clerkId", args.clerkId)
      )
      .collect();

    return await Promise.all(
      notes.map(async (note) => ({
        ...note,

        imageUrl: note.imageUrl
          ? await ctx.storage.getUrl(note.imageUrl)
          : null,

        audioUrl: note.audioUrl
          ? await ctx.storage.getUrl(note.audioUrl)
          : null,
      }))
    );
  },
});

/* FAVORITE NOTES */
export const getFavoriteNotes = query({
  args: { clerkId: v.string() },

  handler: async (ctx, args) => {
    const notes = await ctx.db
      .query("notes")
      .withIndex("by_clerkId", (q) =>
        q.eq("clerkId", args.clerkId)
      )
      .filter((q) => q.eq(q.field("isFavorite"), true))
      .collect();

    return await Promise.all(
      notes.map(async (note) => ({
        ...note,
        imageUrl: note.imageUrl
          ? await ctx.storage.getUrl(note.imageUrl)
          : null,
      }))
    );
  },
});

/* PINNED NOTES */
export const getPinnedNotes = query({
  args: { clerkId: v.string() },

  handler: async (ctx, args) => {
    const notes = await ctx.db
      .query("notes")
      .withIndex("by_clerkId", (q) =>
        q.eq("clerkId", args.clerkId)
      )
      .filter((q) => q.eq(q.field("isPinned"), true))
      .collect();

    return await Promise.all(
      notes.map(async (note) => ({
        ...note,
        imageUrl: note.imageUrl
          ? await ctx.storage.getUrl(note.imageUrl)
          : null,
      }))
    );
  },
});

/*DELETE NOTE */
export const deleteNote = mutation({
  args: { noteId: v.id("notes") },

  handler: async (ctx, args) => {
    const note = await ctx.db.get(args.noteId);
    if (!note) return;

    if (note.imageUrl) await ctx.storage.delete(note.imageUrl);
    if (note.audioUrl) await ctx.storage.delete(note.audioUrl);

    await ctx.db.delete(args.noteId);
  },
});

/* DELETE ALL */
export const deleteAllNotes = mutation({
  args: { clerkId: v.string() },

  handler: async (ctx, args) => {
    const notes = await ctx.db
      .query("notes")
      .withIndex("by_clerkId", (q) =>
        q.eq("clerkId", args.clerkId)
      )
      .collect();

    await Promise.all(
      notes.map(async (note) => {
        if (note.imageUrl) await ctx.storage.delete(note.imageUrl);
        await ctx.db.delete(note._id);
      })
    );

    return { success: true };
  },
});

/* UPLOAD URL */
export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});