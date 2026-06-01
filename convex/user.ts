
import { Id } from "./_generated/dataModel";
import { mutation, query, QueryCtx } from "./_generated/server"
import { v } from "convex/values"

export const createUser = mutation({
    args: {
         clerkId: v.string(),
        name: v.string(),
        imageUrl: v.string(),
        email: v.string(),
    },

    handler: async (ctx, args) => {

    }

    // Get user From Scama
})