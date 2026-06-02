
import { Id } from "./_generated/dataModel";
import { mutation, MutationCtx, query, QueryCtx } from "./_generated/server"
import { v } from "convex/values"


// This will check current user (here or not)
export async function getAuthenticatedUser(ctx: QueryCtx | MutationCtx) {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");
    const currentUser = await ctx.db.query("users")
        .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
        .first();

    if (!currentUser) throw new Error("User Not Found!!");
    return currentUser;
}

export const createUser = mutation({
    args: {
        clerkId: v.string(),
        firstname: v.string(),
        lastname: v.string(),
        imageUrl: v.string(),
        email: v.string(),

    },

    handler: async (ctx, args) => {
        const exitingUser = await ctx.db.query("users")
            .withIndex("by_clerkId", (q) => q.eq("clerkId", args.clerkId))
            .first();
        if (exitingUser) return;

        // Create a User in DB
        await ctx.db.insert("users", {
            clerkId: args.clerkId,
            firstname: args.firstname,
            lastname: args.lastname,
            imageUrl: args.imageUrl,
            email: args.email,

        })

    }


})


// Get user form clerk id

export const getUserByClerkId = query({
    args: { clerkId: v.string() },
    handler: async (ctx, args) => {
        const user = ctx.db.query("users")
            .withIndex("by_clerkId", (q) => q.eq("clerkId", args.clerkId))
            .unique();

        return user;
    }
})