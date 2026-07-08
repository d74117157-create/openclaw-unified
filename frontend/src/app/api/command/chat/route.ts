import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  try {
    const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/command/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
    return new Response(resp.body, {
      headers: { "Content-Type": "text/event-stream", "Cache-Control": "no-cache", "Connection": "keep-alive" }
    });
  } catch {
    return NextResponse.json({ error: "Backend unavailable" }, { status: 503 });
  }
}
