"use client";
import RadarChart from "@/components/radarchart";

const demo = [
  { metric: "Power (HR)", A: 45, B: 36 },
  { metric: "On-Base",    A: 0.41, B: 0.44 },
  { metric: "avgEV",      A: 95, B: 92.5 },
  { metric: "Barrels %",  A: 24, B: 17 },
  { metric: "xwOBA ",A: 430, B: 412 },
  { metric: "WAR",        A: 7.4, B: 7.0 },
];

export default function ComparePage() {
  return (
    <main className="p-8 space-y-6">
      <h1 className="text-2xl font-semibold">Compare (Chart Test)</h1>
      <RadarChart data={demo} />
    </main>
  );
}

