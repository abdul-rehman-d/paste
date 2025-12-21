import Link from "next/link";
import data from "@/data.json";

export default function WithNavAndFooterLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <header>
        <h1 className="text-2xl sm:text-3xl font-bitcount-grid-double">
          <Link href="/" className="text-indigo-400">
            Paste
          </Link>
        </h1>
      </header>

      <main className="grow text-neutral-500 dark:text-neutral-400">
        {children}
      </main>

      <footer className="border-t py-4 text-neutral-500 dark:text-neutral-400">
        <p className="text-xs sm:text-sm">
          © {new Date().getFullYear()}
          <a href={data.mainWebsite} className="underline">
            {data.mainWebsiteTitle}
          </a>
          . All rights reserved.
        </p>
      </footer>
    </>
  );
}
