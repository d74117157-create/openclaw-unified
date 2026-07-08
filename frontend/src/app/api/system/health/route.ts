import { NextResponse } from "next/server";

export async function GET() {
  try {
    const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/health/live`, { next: { revalidate: 0 } });
    const data = await resp.json();
    return NextResponse.json({ status: "ok", backend: data });
  } catch {
    return NextResponse.json({ status: "degraded", backend: null });
  }
}
