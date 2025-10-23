import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      {/* Hero */}
      <section className="space-y-5">
        <div className="inline-flex items-center gap-2 rounded-full border border-neutral-800 px-3 py-1 text-xs text-neutral-400">
          Extra Bases
          <span className="h-1 w-1 rounded-full bg-neutral-700" />
          Compare MLB players fast
        </div>

        <h1 className="text-3xl font-semibold leading-tight md:text-5xl">
          Side-by-side MLB player comparisons,
          <span className="block text-neutral-400">with traditional + Statcast metrics.</span>
        </h1>

        <p className="max-w-2xl text-sm text-neutral-400 md:text-base">
          Pick two players, visualize strengths, and (later) get an AI summary for fantasy decisions.
        </p>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/compare"
            className="rounded-xl border border-neutral-700 px-4 py-2 text-sm font-medium hover:bg-neutral-900"
          >
            Open Compare
          </Link>

          <Link
            href="https://example.com/docs" // replace or remove
            className="rounded-xl border border-neutral-800 px-4 py-2 text-sm text-neutral-400 hover:bg-neutral-900"
          >
            Read the plan
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <FeatureCard title="Traditional Stats" desc="AVG, OBP, SLG, OPS, HR, RBI, SB, WAR" />
        <FeatureCard title="Statcast Snapshot" desc="EV, LA, Hard-Hit%, Barrel%, xwOBA" />
        <FeatureCard title="Charts" desc="Radar now; bar charts later" />
      </section>


    </main>
  );
}

function FeatureCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-4">
      <h3 className="text-sm font-medium">{title}</h3>
      <p className="mt-1 text-xs text-neutral-400">{desc}</p>
    </div>
  );
}



