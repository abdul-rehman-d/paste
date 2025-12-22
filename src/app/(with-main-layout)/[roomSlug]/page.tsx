import RoomPageClient from "./client-page";

export default async function RoomPage({
  params,
}: {
  params: Promise<{ roomSlug: string }>;
}) {
  const roomSlug = (await params).roomSlug;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl">{roomSlug}</h2>
      <RoomPageClient roomSlug={roomSlug} />
    </div>
  );
}
