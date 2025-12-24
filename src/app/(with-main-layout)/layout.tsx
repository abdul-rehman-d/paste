import Link from "next/link";
import data from "@/data.json";
import { ConvexClientProvider } from "@/providers/convex-client-provider";

export default function WithNavAndFooterLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ConvexClientProvider>
      <header>
        <h1 className="text-2xl sm:text-3xl font-bitcount-grid-double">
          <Link href="/" className="text-indigo-400">
            Paste
          </Link>
        </h1>
      </header>

      <main className="grow flex flex-col">{children}</main>

      <footer className="border-t py-4 text-xs sm:text-sm">
        <p>
          © {new Date().getFullYear()}{" "}
          <a href={data.mainWebsite} className="underline">
            {data.mainWebsiteTitle}
          </a>
          . All rights reserved.
        </p>
        <p>
          built with love and{" "}
          <i>
            <strong>not</strong>
          </i>{" "}
          built with AI, btw
        </p>
      </footer>
    </ConvexClientProvider>
  );
}
