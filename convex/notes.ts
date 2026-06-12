import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

/* CREATE NOTE*/
export const createNote = mutation({
  args: {
    clerkId: v.string(),
    title: v.optional(v.string()),
    categories: v.array(v.string()),
    content: v.string(),
    imageUrl: v.optional(v.id("_storage")),
  },

  handler: async (ctx, args) => {
    await ctx.db.insert("notes", {
      clerkId: args.clerkId,
      title: args.title,
      content: args.content,
      categories: args.categories,
      isPinned: false,
      isFavorite: false,
      imageUrl: args.imageUrl,
      createdAt: Date.now(),
    });
  },
});

/* EDIT NOTE*/
export const editNotes = mutation({
  args: {
    noteId: v.id("notes"),
    title: v.optional(v.string()),
    categories: v.array(v.string()),
    content: v.string(),
    imageUrl: v.optional(v.id("_storage")),
  },

  handler: async (ctx, args) => {
    const note = await ctx.db.get(args.noteId);
    if (!note) throw new Error("Note not found!");

    await ctx.db.patch(args.noteId, {
      title: args.title,
      categories: args.categories,
      content: args.content,
      imageUrl: args.imageUrl,
    });
  },
});

/* TOGGLE FAVORITE*/
export const toggleFavorite = mutation({
  args: {
    noteId: v.id("notes"),
  },

  handler: async (ctx, args) => {
    const note = await ctx.db.get(args.noteId);
    if (!note) throw new Error("Note not found!");

    await ctx.db.patch(args.noteId, {
      isFavorite: !note.isFavorite,
    });
  },
});

/* TOGGLE PINNED*/
export const togglePinned = mutation({
  args: {
    noteId: v.id("notes"),
  },

  handler: async (ctx, args) => {
    const note = await ctx.db.get(args.noteId);
    if (!note) throw new Error("Note not found!");

    await ctx.db.patch(args.noteId, {
      isPinned: !note.isPinned,
    });
  },
});

/* GET ALL NOTES*/
export const getAllNotes = query({
  args: {
    clerkId: v.string(),
  },

  handler: async (ctx, args) => {
    return await ctx.db
      .query("notes")
      .withIndex("by_clerkId", (q) =>
        q.eq("clerkId", args.clerkId)
      )
      .collect();
  },
});

/* GET FAVORITE NOTES*/
export const getFavoriteNotes = query({
  args: {
    clerkId: v.string(),
  },

  handler: async (ctx, args) => {
    return await ctx.db
      .query("notes")
      .withIndex("by_clerkId", (q) =>
        q.eq("clerkId", args.clerkId)
      )
      .filter((q) => q.eq(q.field("isFavorite"), true))
      .collect();
  },
});

/* GET PINNED NOTES*/
export const getPinnedNotes = query({
  args: {
    clerkId: v.string(),
  },

  handler: async (ctx, args) => {
    return await ctx.db
      .query("notes")
      .withIndex("by_clerkId", (q) =>
        q.eq("clerkId", args.clerkId)
      )
      .filter((q) => q.eq(q.field("isPinned"), true))
      .collect();
  },
});

/* DELETE SINGLE NOTE (SAFE + STORAGE CLEANUP)*/
export const deleteNote = mutation({
  args: {
    noteId: v.id("notes"),
  },

  handler: async (ctx, args) => {
    const note = await ctx.db.get(args.noteId);
    if (!note) return;
    if (note.imageUrl) {
      await ctx.storage.delete(note.imageUrl);
    }

    await ctx.db.delete(args.noteId);
  },
});

/* DELETE ALL NOTES (OPTIMIZED)*/
export const deleteAllNotes = mutation({
  args: {
    clerkId: v.string(),
  },

  handler: async (ctx, args) => {
    const notes = await ctx.db
      .query("notes")
      .withIndex("by_clerkId", (q) =>
        q.eq("clerkId", args.clerkId)
      )
      .collect();

    // delete images first
    await Promise.all(
      notes.map(async (note) => {
        if (note.imageUrl) {
          await ctx.storage.delete(note.imageUrl);
        }

        await ctx.db.delete(note._id);
      })
    );

    return {
      success: true,
      deleted: notes.length,
    };
  },
});

/* GENERATE UPLOAD URL*/
export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});

export const getImageUrl = query({
  args: { storageId: v.id("_storage") },
  handler: async (ctx, args) => {
    return await ctx.storage.getUrl(args.storageId);
  },
});