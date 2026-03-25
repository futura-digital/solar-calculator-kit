import { NextRequest, NextResponse } from "next/server";

const GHL_WEBHOOK = "https://services.leadconnectorhq.com/hooks/qlxAaqfjvbPeEfzYXTPS/webhook-trigger/297b5768-124f-4c97-a016-2ee21a8a8182";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const response = await fetch(GHL_WEBHOOK, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    return NextResponse.json({ error: "Failed to submit" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
