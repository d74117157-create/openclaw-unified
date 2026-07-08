import { NextResponse } from "next/server";

export async function GET() {
  try {
    const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/agents`, { next: { revalidate: 60 } });
    const data = await resp.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json([]);
  }
}
