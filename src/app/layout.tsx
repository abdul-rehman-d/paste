import type { Metadata } from "next";
import { Bitcount_Grid_Double, Inter } from "next/font/google";
import "./globals.css";
import data from "@/data.json";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const bitcountGridDouble = Bitcount_Grid_Double({
  variable: "--font-bitcount-grid-double",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: data.title,
  description: data.shortDescription,
  openGraph: {
    title: data.title,
    description: data.shortDescription,
    images: [data.ogImageUrl],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${bitcountGridDouble.variable} antialiased min-h-svh font-inter flex flex-col bg-neutral-900 text-neutral-100`}
      >
        <div className="grow w-full max-w-5xl mx-auto text-sm sm:text-base lg:text-lg flex flex-col gap-8 py-12 px-8">
          {children}
        </div>
      </body>
    </html>
  );
}
