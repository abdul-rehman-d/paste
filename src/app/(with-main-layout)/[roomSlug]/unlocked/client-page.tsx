"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function RoomPageClient({ roomSlug }: { roomSlug: string }) {
  const items = useQuery(api.item.listByRoom, { roomSlug: roomSlug });

  if (!items || !items.length) {
    return <p>no items</p>;
  }

  return items.map((item) => <li key={item._id}>{item.text}</li>);
}
