import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createNote = mutation({
  args: {
    clerkId: v.string(),
    title: v.optional(v.string()),
    categories: v.array(v.string()),
    content: v.string(),
  },

  handler: async (ctx, args) => {
    await ctx.db.insert("notes", {
      clerkId: args.clerkId,
      title: args.title,
      content: args.content,
      categories: args.categories,
      isPinned: false,
      isFavorite: false,
      createdAt: Date.now()
    });
  },
});

export const editNotes = mutation({
  args: {
    noteId: v.id("notes"),
    title: v.optional(v.string()),
    categories: v.array(v.string()),
    content: v.string(),
  },

  handler: async (ctx, args) => {
    const note = await ctx.db.get(args.noteId);

    if (!note) {
      throw new Error("Notes not found!");
    }

    await ctx.db.patch(args.noteId, {
      title: args.title,
      categories: args.categories,
      content: args.content,
    })

  }
})

export const toggleFavorite = mutation({
  args: {
    noteId: v.id("notes"),
  },

  handler: async (ctx, args) => {
    const note = await ctx.db.get(args.noteId);
    if (!note) throw new Error("Note not found!");

    await ctx.db.patch(args.noteId, {
      isFavorite: !note.isFavorite,
    })
  }
})

export const getAllNotes = query({
  args: {
    clerkId: v.string(),
  },

  handler: async (ctx, args) => {
    return await ctx.db.query("notes")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", args.clerkId))
      .collect();

  },
});


export const getFavoriteNotes = query({
  args: {
    clerkId: v.string(),
  },

  handler: async (ctx, args) => {
    const notes = await ctx.db.query("notes")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", args.clerkId))
      .collect();

    return notes.filter((note) => note.isFavorite);

  },
})


export const deleteNote = mutation({
  args: {
    noteId: v.id("notes"),
  },

  handler: async (ctx, args) => {
    await ctx.db.delete(args.noteId);
  },
});


export const togglePinned = mutation({
  args: {
    noteId: v.id("notes"),
  },

  handler: async (ctx, args) => {
    const note = await ctx.db.get(args.noteId);
    if (!note) throw new Error("Note not found!");

    await ctx.db.patch(args.noteId, {
      isPinned: !note.isPinned,
    })
  }
})


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


// Reset

export const deleteAllNotes = mutation({
  args: {
    clerkId: v.string(),
  },
  handler: async (ctx, args) => {
    const notes = await ctx.db
      .query("notes")
      .filter((q) => q.eq(q.field("clerkId"), args.clerkId))
      .collect();

    
for (const note of notes) {
      await ctx.db.delete(note._id);
    }
    return { success: true, deleted: notes.length };
  },
});