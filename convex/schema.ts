import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    users: defineTable({
        clerkId: v.string(),
        name: v.string(),
        imageUrl: v.string(),
        email: v.string(),
        
    }).index("by_clerkId", ["clerkId"]),


    notes: defineTable({
        clerkId: v.string(),
        title: v.string(),
        content: v.string(),
        category: v.string(), // Study, Personal, Ideas etc.
        isFavorite: v.boolean(),
        isArchived: v.boolean(),
        createdAt: v.number(),
        updatedAt: v.number()
    }).index("by_clerkId", ["clerkId"]).index("by_category",
        ["category"]).index("by_favorite", ["isFavorite"]),


    categories: defineTable({
         clerkId: v.string(),
          name: v.string(), 
          color: v.string(), 
          createdAt: v.number(), 
        }).index("by_clerkId", ["clerkId"]),
});
