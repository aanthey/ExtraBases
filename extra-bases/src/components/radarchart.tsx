"use client";

import React from "react";
import {
  Radar,
  RadarChart as RChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

type Datum = { metric: string; A?: number; B?: number };

export default function RadarChart({ data }: { data: Datum[] }) {
  // map metrics to values for quick lookup in custom ticks
  const map = React.useMemo(() => {
    const m: Record<string, Datum> = {};
    (data || []).forEach((d) => (m[d.metric] = d));
    return m;
  }, [data]);

  // custom tick renderer to show metric label and small percentile badges for A/B
  const renderTick = (props: any) => {
    const { x, y, payload, textAnchor } = props;
    const metric = payload.value as string;
    const vals = map[metric] || {};
    const a = vals.A;
    const b = vals.B;

    // small offsets; rely on textAnchor to position badges left/right
    const offsetX = textAnchor === "start" ? 12 : -12;
    const align = textAnchor === "start" ? "start" : "end";

    return (
      <g>
        <text x={x} y={y} textAnchor={textAnchor} fill="#e6eef8" fontSize={12} dy={-6}>
          {metric}
        </text>

        {a !== undefined && (
          <text x={x + offsetX} y={y + 8} textAnchor={align} fill="#8884d8" fontSize={11}>
            {Math.round(a)}%
          </text>
        )}

        {b !== undefined && (
          <text x={x + offsetX} y={y + 22} textAnchor={align} fill="#82ca9d" fontSize={11}>
            {Math.round(b)}%
          </text>
        )}
      </g>
    );
  };

  return (
    <div className="h-80 w-full rounded-2xl border border-neutral-800 bg-neutral-900 p-4">
      <ResponsiveContainer width="100%" height="100%">
        <RChart data={data}>
          <PolarGrid radialLines={false} stroke="#1f2937" />
          <PolarAngleAxis dataKey="metric" tick={renderTick} tickLine={false} />

          <PolarRadiusAxis
            angle={90}
            domain={[0, 100]}
            ticks={[0, 25, 50, 75, 100]}
            tickFormatter={(v: number) => `${v}%`}
            axisLine={false}
            tick={{ fill: "#94a3b8", fontSize: 11 }}
          />

          <Tooltip
            contentStyle={{ background: "#0b1220", borderColor: "#23303a" }}
            formatter={(value: any, name: string) => [`${value}%`, name]}
          />

          <Radar
            name="A"
            dataKey="A"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.65}
            strokeWidth={2}
          />
          <Radar
            name="B"
            dataKey="B"
            stroke="#36c37f"
            fill="#36c37f"
            fillOpacity={0.45}
            strokeWidth={2}
          />
        </RChart>
      </ResponsiveContainer>
    </div>
  );
}
