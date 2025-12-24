"use client";

import { useQuery } from "convex/react";
import { useCallback } from "react";
import { toast } from "sonner";
import { lockRoom } from "@/app/actions";
import { AddItemForm } from "@/components/add-item-form";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import type { Doc } from "@/convex/_generated/dataModel";

export default function RoomPageClient({ roomSlug }: { roomSlug: string }) {
  return (
    <>
      <form action={lockRoom}>
        <Button type="submit">Lock Room</Button>
      </form>

      <AddItemForm roomSlug={roomSlug} />

      <div className="mt-4 space-y-4">
        <ItemsList roomSlug={roomSlug} />
      </div>
    </>
  );
}

function ItemsList({ roomSlug }: { roomSlug: string }) {
  const items = useQuery(api.item.listByRoom, { roomSlug: roomSlug });

  if (!items) return <p>loading...</p>;

  if (!items.length) {
    return <p>nothing saved yet</p>;
  }

  return items.map((item) => <Item key={item._id} item={item} />);
}

function Item({ item }: { item: Doc<"items"> }) {
  const copy = useCallback(() => {
    navigator.clipboard.writeText(item.text);
    toast("copied!");
  }, [item]);
  return (
    <div className="">
      <Button
        className="flex border rounded-xs p-4 w-full text-lg"
        variant="boring"
        onClick={copy}
      >
        <p>{item.text}</p>
      </Button>
    </div>
  );
}
