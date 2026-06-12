import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    clerkId: v.string(),
    firstname: v.string(),
    lastname: v.string(),
    imageUrl: v.string(),
    email: v.string(),
  }).index("by_clerkId", ["clerkId"]),

  notes: defineTable({
    clerkId: v.string(),

    type: v.union(
      v.literal("text"),
      v.literal("image"),
      v.literal("voice")
    ),

    // shared
    title: v.optional(v.string()),
    categories: v.array(v.string()),

    // text / voice
    content: v.optional(v.string()),

    imageUrl: v.optional(v.id("_storage")),

    // voice only
    audioUrl: v.optional(v.id("_storage")),

    isFavorite: v.boolean(),
    isPinned: v.boolean(),

    createdAt: v.number(),
  }).index("by_clerkId", ["clerkId"]),
});
