'use server'

import bcrypt from "bcryptjs";
import { fetchMutation, fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { slugify } from "@/lib/utils";
import { redirect } from "next/navigation";

export async function createRoomAction(input: { roomName: string; pin: string }) {
  const roomName = input.roomName.trim();
  const pin = input.pin;

  if (!roomName) throw new Error("Room name is required");
  if (!/^\d{4}$/.test(pin))
    throw new Error("PIN must be exactly 4 digits");

  const pinHash = await bcrypt.hash(pin, 10);
  const roomSlug = slugify(roomName);

  const slugExists = await fetchQuery(api.room.checkRoomSlugExists, { slug: roomSlug });

  if (slugExists) {
    throw new Error("A room with this name already exists");
  }
[]
  const roomId = await fetchMutation(api.room.createRoom, {
    name: roomName,
    slug: roomSlug,
    pinHash,
  });

  redirect(`/${roomSlug}`);
}

export async function validateRoomNameUnique(input: { roomName: string }) {
  const roomName = input.roomName.trim();
  if (!roomName) {
    return { fields: { roomName: {message:"Room name is required" } } };
  }

  const slug = slugify(roomName);
  const exists = await fetchQuery(api.room.checkRoomSlugExists, { slug });

  if (exists) {
    return {
      fields: { roomName: { message: "A room with this name already exists"} },
    };
  }

  return {
    fields: {},
  }
}