import Image from "next/image";
import Link from "next/link";
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
      <Link
        href="/create"
        className="text-orange-600 hover:text-orange-700 dark:text-orange-300 dark:hover:text-orange-400 underline underline-offset-2 font-bold py-1 cursor-pointer"
      >
        Create a room
      </Link>
    </div>
  );
}
