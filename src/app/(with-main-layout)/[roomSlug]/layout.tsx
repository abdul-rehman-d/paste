import { fetchQuery } from "convex/nextjs";
import { redirect } from "next/navigation";
import { api } from "@/convex/_generated/api";

export default async function WithNavAndFooterLayout({
  params,
  children,
}: LayoutProps<"/[roomSlug]">) {
  const slug = (await params).roomSlug;

  const room = await fetchQuery(api.room.getRoom, { slug });
  if (!room) redirect("/");

  const roomName = room.name;

  return (
    <div className="grow flex flex-col gap-4">
      <h2 className="text-2xl">Room: {roomName}</h2>
      {children}
    </div>
  );
}
