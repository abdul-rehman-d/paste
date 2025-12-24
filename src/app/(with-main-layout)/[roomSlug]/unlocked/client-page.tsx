"use client";

import { useQuery } from "convex/react";
import fitty from "fitty";
import { useCallback, useEffect, useRef } from "react";
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

      <div className="mt-4">
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

  return (
    <>
      <p className="mb-2 text-xs">Tap an item to copy</p>
      <div className="space-y-4">
        {items.map((item) => (
          <Item key={item._id} item={item} />
        ))}
      </div>
    </>
  );
}

function Item({ item }: { item: Doc<"items"> }) {
  const copy = useCallback(() => {
    navigator.clipboard.writeText(item.text);
    toast("copied!");
  }, [item]);

  const pRef = useRef<HTMLParagraphElement>(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: false-positive
  useEffect(() => {
    if (!pRef.current) return;

    const inst = fitty(pRef.current, {
      minSize: 8,
      maxSize: 18,
      multiLine: true,
    });

    return () => inst.unsubscribe();
  }, [item.text]);

  return (
    <div className="">
      <Button
        className="group flex border rounded-xs p-4 w-full"
        variant="boring"
        onClick={copy}
      >
        <p className="whitespace-nowrap break-all" ref={pRef}>
          {item.text}
        </p>
      </Button>
    </div>
  );
}
