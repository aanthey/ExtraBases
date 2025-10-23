import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navbar";

export const metadata: Metadata = {
  title: "Extra Bases",
  description: "Compare MLB players with traditional + Statcast metrics.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-neutral-950 text-neutral-50">
        <Navbar />
        <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>
      </body>
    </html>
  );
}

