"use client";

import React from "react";

type Player = {
  name: string;
  team?: string;
  height?: string;
  weight?: string;
  color?: string;
  photo?: string;
};

type Stat = {
  metric: string;
  A: number;
  B: number;
  display?: "percent" | "bubble" | "raw";
};

export default function PlayerComparison({
  playerA,
  playerB,
  stats,
}: {
  playerA: Player;
  playerB: Player;
  stats: Stat[];
}) {
  const initials = (name = "") =>
    name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  return (
    <div className="space-y-4">
      <div className="flex items-start gap-6">
        <div className="flex-1 rounded-2xl border border-neutral-800 bg-neutral-900 p-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {playerA.photo ? (
                <img
                  src={playerA.photo}
                  alt={`${playerA.name} photo`}
                  className="w-12 h-12 rounded-full object-cover"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-neutral-800 flex items-center justify-center text-sm text-neutral-300">
                  {initials(playerA.name)}
                </div>
              )}

              <div>
                <div className="text-sm text-neutral-400">Player A</div>
                <div className="text-lg font-semibold">{playerA.name}</div>
                <div className="text-sm text-neutral-400">{playerA.team}</div>
              </div>
            </div>

            <div className="text-right text-sm text-neutral-400">
              <div>{playerA.height}</div>
              <div>{playerA.weight}</div>
            </div>
          </div>
        </div>

        <div className="w-16 flex items-center justify-center">
          <div className="text-xs text-neutral-500">vs</div>
        </div>

        <div className="flex-1 rounded-2xl border border-neutral-800 bg-neutral-900 p-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {playerB.photo ? (
                <img
                  src={playerB.photo}
                  alt={`${playerB.name} photo`}
                  className="w-12 h-12 rounded-full object-cover"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-neutral-800 flex items-center justify-center text-sm text-neutral-300">
                  {initials(playerB.name)}
                </div>
              )}

              <div>
                <div className="text-sm text-neutral-400">Player B</div>
                <div className="text-lg font-semibold">{playerB.name}</div>
                <div className="text-sm text-neutral-400">{playerB.team}</div>
              </div>
            </div>

            <div className="text-right text-sm text-neutral-400">
              <div>{playerB.height}</div>
              <div>{playerB.weight}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {stats.map((s) => (
          <div key={s.metric} className="rounded-xl border border-neutral-800 bg-neutral-900 p-3">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-neutral-300 font-medium">{s.metric}</div>
              <div className="text-sm text-neutral-400">A: {s.A} • B: {s.B}</div>
            </div>

            {s.display === "bubble" ? (
              <div className="flex items-center gap-6 px-2">
                <div className="flex-1 flex items-center justify-center">
                  <div className="relative h-20 w-full flex items-center">
                    <div className="absolute left-0 flex items-center">
                      <div
                        title={`${playerA.name} ${s.metric}: ${s.A}`}
                        className="rounded-full bg-[#8884d8]" 
                        style={{ width: `${Math.max(12, s.A)}px`, height: `${Math.max(12, s.A)}px` }}
                      />
                    </div>
                    <div className="absolute right-0 flex items-center">
                      <div
                        title={`${playerB.name} ${s.metric}: ${s.B}`}
                        className="rounded-full bg-[#36c37f]"
                        style={{ width: `${Math.max(12, s.B)}px`, height: `${Math.max(12, s.B)}px` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-24 text-sm text-neutral-400">{playerA.name}</div>
                  <div className="flex-1 h-4 rounded-full bg-neutral-800 overflow-hidden">
                    <div
                      className="h-4 bg-[#8884d8]"
                      style={{ width: `${Math.min(100, s.A)}%` }}
                    />
                  </div>
                  <div className="w-10 text-right text-sm text-neutral-300">{s.A}%</div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-24 text-sm text-neutral-400">{playerB.name}</div>
                  <div className="flex-1 h-4 rounded-full bg-neutral-800 overflow-hidden">
                    <div
                      className="h-4 bg-[#36c37f]"
                      style={{ width: `${Math.min(100, s.B)}%` }}
                    />
                  </div>
                  <div className="w-10 text-right text-sm text-neutral-300">{s.B}%</div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
