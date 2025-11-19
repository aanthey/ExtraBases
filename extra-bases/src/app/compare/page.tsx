"use client";
import React from "react";
import PlayerComparison from "@/components/playercomparison";

const defaultA = { name: "Juan Soto", team: "SDG", height: "6'1\"", weight: "220 lb", photo: undefined };
const defaultB = { name: "Mike Trout", team: "LAA", height: "6'2\"", weight: "235 lb", photo: undefined };

const stats = [
  { metric: "Exit Velocity", A: 24, B: 20, display: "bubble" },
  { metric: "Barrels %", A: 85, B: 66, display: "percent" },
  { metric: "Hard Hit %", A: 78, B: 72, display: "percent" },
  { metric: "xwOBA", A: 90, B: 86, display: "percent" },
  { metric: "Sprint Speed", A: 16, B: 14, display: "bubble" },
];

export default function ComparePage() {
  const [playerA, setPlayerA] = React.useState(defaultA);
  const [playerB, setPlayerB] = React.useState(defaultB);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    // Fetch profiles from the local pybaseball service (run tools/pybaseball_service)
    async function fetchProfiles() {
      setLoading(true);
      setError(null);
      try {
        // Call Next server-side proxy to avoid CORS: `/api/pybaseball/player`
        const [aRes, bRes] = await Promise.all([
          fetch(`/api/pybaseball/player?first=Juan&last=Soto`),
          fetch(`/api/pybaseball/player?first=Mike&last=Trout`),
        ]);

        if (!aRes.ok) throw new Error(`A: ${aRes.status} ${await aRes.text()}`);
        if (!bRes.ok) throw new Error(`B: ${bRes.status} ${await bRes.text()}`);

        const aData = await aRes.json();
        const bData = await bRes.json();

        setPlayerA((p) => ({ ...p, name: aData.name_display_first_last || aData.name_first + " " + aData.name_last, height: aData.height || p.height, weight: aData.weight || p.weight, photo: aData.image_url }));
        setPlayerB((p) => ({ ...p, name: bData.name_display_first_last || bData.name_first + " " + bData.name_last, height: bData.height || p.height, weight: bData.weight || p.weight, photo: bData.image_url }));
      } catch (e: any) {
        console.error(e);
        setError(e.message || String(e));
      } finally {
        setLoading(false);
      }
    }

    fetchProfiles();
  }, []);

  return (
    <main className="p-8 space-y-6">
      <h1 className="text-2xl font-semibold">Compare</h1>
      {loading && <div className="text-sm text-neutral-400">Loading player profiles...</div>}
      {error && <div className="text-sm text-red-400">{error}</div>}
      <PlayerComparison playerA={playerA} playerB={playerB} stats={stats} />
    </main>
  );
}

