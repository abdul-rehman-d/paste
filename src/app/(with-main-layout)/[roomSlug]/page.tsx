export default function RoomPage({params}: {params: {roomSlug: string}}) {
  const { roomSlug } = params;
  return (
    <div className="space-y-4">
      <h2 className="text-2xl">{roomSlug}</h2>
      <p>Yet to be made</p>
    </div>
  );
}
