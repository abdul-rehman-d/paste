import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  rooms: defineTable({
    name: v.string(),
    slug: v.string(),
    pinHash: v.string(), // store HASHED pin, never plaintext
  }),

  items: defineTable({
    roomId: v.id("rooms"),
    text: v.string(),
  }).index("by_room", ["roomId"]),
});
