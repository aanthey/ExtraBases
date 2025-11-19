import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const first = url.searchParams.get("first") || "";
  const last = url.searchParams.get("last") || "";

  // Prefer server-only env var first
  const backend = process.env.PYBASEBALL_URL || process.env.NEXT_PUBLIC_PYBASEBALL_URL || "http://localhost:8000";

  const target = `${backend.replace(/\/$/, "")}/player?first=${encodeURIComponent(first)}&last=${encodeURIComponent(last)}`;

  const res = await fetch(target, { method: "GET" });
  const body = await res.text();

  const headers: Record<string, string> = {};
  const contentType = res.headers.get("content-type");
  if (contentType) headers["content-type"] = contentType;

  return new NextResponse(body, { status: res.status, headers });
}
