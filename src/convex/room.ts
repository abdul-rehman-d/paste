import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createRoom = mutation({
  args: {
    name: v.string(),
    slug: v.string(),
    pinHash: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("rooms", {
      name: args.name,
      slug: args.slug,
      pinHash: args.pinHash,
    });
  },
});

export const getRoom = query({
  args: {
    slug: v.string(),
  },
  handler: async (ctx, args) => {
    const room = await ctx.db
      .query("rooms")
      .filter((q) => q.eq(q.field("slug"), args.slug))
      .first();
    return room;
  },
});
