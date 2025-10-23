"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

function NavLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const active = pathname === href;
  return (
    <Link
      href={href}
      className={[
        "rounded-lg px-3 py-2 text-sm transition",
        active
          ? "bg-neutral-800 text-white"
          : "text-neutral-300 hover:bg-neutral-900 hover:text-white",
      ].join(" ")}
    >
      {label}
    </Link>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-800 bg-neutral-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        {/* Brand / Logo */}
        <Link href="/" className="flex items-center gap-2">
          {/* put public/logo.png if you have one */}
          <img src="/logo.png" alt="" className="h-6 w-6" />
          <span className="text-sm font-semibold">Extra Bases</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden gap-1 sm:flex">
          <NavLink href="/" label="Home" />
          <NavLink href="/compare" label="Compare" />
          {/* Add more links later */}
        </nav>

        {/* Mobile menu button */}
        <button
          className="sm:hidden rounded-lg border border-neutral-800 px-3 py-2 text-sm text-neutral-300 hover:bg-neutral-900"
          aria-label="Toggle navigation"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          Menu
        </button>
      </div>

      {/* Mobile panel */}
      {open && (
        <nav className="sm:hidden border-t border-neutral-800">
          <div className="mx-auto max-w-6xl px-4 py-2 flex flex-col gap-1">
            <NavLink href="/" label="Home" />
            <NavLink href="/compare" label="Compare" />
          </div>
        </nav>
      )}
    </header>
  );
}
