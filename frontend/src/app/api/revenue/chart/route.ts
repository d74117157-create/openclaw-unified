import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const days = searchParams.get("days") || "30";
  try {
    const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/revenue/chart?days=${days}`, { next: { revalidate: 60 } });
    const data = await resp.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json([]);
  }
}
