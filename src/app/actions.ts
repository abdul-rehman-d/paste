"use server";

import bcrypt from "bcryptjs";
import { fetchMutation, fetchQuery } from "convex/nextjs";
import { redirect } from "next/navigation";
import { api } from "@/convex/_generated/api";
import { getSession } from "@/lib/session";
import { slugify } from "@/lib/utils";

export async function createRoomAction(input: {
  roomName: string;
  pin: string;
}) {
  const roomName = input.roomName.trim();
  const pin = input.pin;

  if (!roomName)
    return { fields: { roomName: { message: "Room name is required" } } };
  if (!/^\d{4}$/.test(pin))
    return { fields: { pin: { message: "PIN must be exactly 4 digits" } } };

  const pinHash = await bcrypt.hash(pin, 10);
  const roomSlug = slugify(roomName);

  const room = await fetchQuery(api.room.getRoom, {
    slug: roomSlug,
  });
  const slugExists = room !== null;

  if (slugExists) {
    return {
      fields: {
        roomName: {
          message: "A room with this name already exists",
        },
      },
    };
  }

  const roomId = await fetchMutation(api.room.createRoom, {
    name: roomName,
    slug: roomSlug,
    pinHash,
  });

  if (!roomId) {
    return {
      fields: {},
      form: { message: "Couldnt create a room" },
    };
  }

  redirect(`/${roomSlug}`);
}

export async function unlockRoom(input: { roomSlug: string; pin: string }) {
  const slug = input.roomSlug.trim() ?? "";
  const pin = input.pin.trim() ?? "";

  if (!slug) redirect("/");

  const room = await fetchQuery(api.room.getRoom, { slug });

  if (!room) redirect("/");

  const isValid = await bcrypt.compare(pin, room.pinHash);

  if (!isValid) {
    return {
      fields: { pin: { message: "Incorrect pin" } },
    };
  }

  const session = await getSession();
  session.unlockedRoom = slug;
  await session.save();

  redirect(`/${slug}/unlocked`);
}
