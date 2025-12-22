import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const addItem = mutation({
  args: {
    roomId: v.id("rooms"),
    text: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("items", {
      roomId: args.roomId,
      text: args.text,
    });
  },
});

export const listByRoom = query({
  args: {
    roomSlug: v.string(),
  },
  handler: async (ctx, args) => {
    const room = await ctx.db
      .query("rooms")
      .withIndex("by_slug", (q) => q.eq("slug", args.roomSlug))
      .first();

    if (!room) {
      return [];
    }

    return await ctx.db
      .query("items")
      .withIndex("by_room", (q) => q.eq("roomId", room._id))
      .collect();
  },
});
