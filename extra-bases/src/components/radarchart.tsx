"use client";

import {
  Radar, RadarChart as RChart, PolarGrid,
  PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip
} from "recharts";

type Datum = { metric: string; A?: number; B?: number };

export default function RadarChart({ data }: { data: Datum[] }) {
  return (
    <div className="h-80 w-full rounded-2xl border border-neutral-800 bg-neutral-900 p-4">
      <ResponsiveContainer width="100%" height="100%">
        <RChart data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="metric" />
          <PolarRadiusAxis />
          <Tooltip />
          <Radar name="A" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.5} />
          <Radar name="B" dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.5} />
        </RChart>
      </ResponsiveContainer>
    </div>
  );
}
