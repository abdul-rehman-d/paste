import Image from "next/image";
import { CreateARoomButton } from "@/components/create-room-button";

export default function Home() {
  return (
    <div className="space-y-4">
      <Image
        src="/get-a-room.gif"
        alt="Get a room"
        width={400}
        height={226}
        unoptimized
      />
      <CreateARoomButton />
    </div>
  );
}
