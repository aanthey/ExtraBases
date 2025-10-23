import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Extra Bases",
  description: "Compare MLB players with traditional + Statcast metrics.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-neutral-950 text-neutral-50">
        <nav className="sticky top-0 z-10 border-b border-neutral-800 bg-neutral-950/80 backdrop-blur">
          <div className="mx-auto max-w-6xl px-4 py-3 font-semibold">Extra Bases</div>
        </nav>
        <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>
      </body>
    </html>
  );
}
