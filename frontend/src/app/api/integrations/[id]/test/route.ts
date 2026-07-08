import { NextResponse } from "next/server";

export async function POST(_request: Request, { params }: { params: { id: string } }) {
  try {
    const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/integrations/${params.id}/test`, { method: "POST" });
    const data = await resp.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ ok: false, error: "Backend unavailable" });
  }
}
