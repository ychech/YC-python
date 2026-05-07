import { NextResponse } from "next/server";

export async function GET() {
  const base = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:8000";
  try {
    const res = await fetch(`${base}/health`, { cache: "no-store" });
    const data = await res.json();
    return NextResponse.json({ ok: true, upstream: data }, { status: 200 });
  } catch {
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}

