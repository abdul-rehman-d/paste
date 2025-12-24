import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import RoomPageClient from "./client-page";

export default async function RoomPage({
  params,
}: {
  params: Promise<{ roomSlug: string }>;
}) {
  const roomSlug = (await params).roomSlug;

  const session = await getSession();
  const ok = session.unlockedRoom === roomSlug;

  if (!ok) redirect(`/${roomSlug}`);

  return <RoomPageClient roomSlug={roomSlug} />;
}
