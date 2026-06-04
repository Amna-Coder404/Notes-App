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
        title: v.optional(v.string()),
        content: v.string(),
        categories: v.array(v.string()),
        isFavorite: v.boolean(), // ⭐ important
        isPinned: v.boolean(),   // optional (extra feature)

        createdAt: v.number(),
    }).index("by_clerkId", ["clerkId"]),




});