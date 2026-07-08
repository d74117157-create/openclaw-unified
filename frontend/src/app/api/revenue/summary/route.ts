import { NextResponse } from "next/server";

export async function GET() {
  try {
    const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/revenue/summary`, { next: { revalidate: 60 } });
    const data = await resp.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ daily: 0, weekly: 0, monthly: 0, mrr_estimate: 0, by_source: {}, trend_percent: 0 });
  }
}
