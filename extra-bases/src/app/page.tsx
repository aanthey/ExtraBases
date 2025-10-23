import Link from "next/link";

export default function Home() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Compare MLB Players</h1>
      <p className="text-sm text-neutral-400">
        Search, select two players, and hit Compare.
      </p>

      <Link
        href="/compare"
        className="inline-block rounded-xl border border-neutral-700 px-4 py-2 hover:bg-neutral-900"
      >
        Try it Here!
      </Link>
    </div>
  );
}


