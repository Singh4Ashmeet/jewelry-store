import crypto from "crypto";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get("x-razorpay-signature");
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

  if (!secret) {
    return NextResponse.json({ mode: "mock", message: "RAZORPAY_WEBHOOK_SECRET missing; webhook accepted in dev mode." });
  }

  const expected = crypto.createHmac("sha256", secret).update(body).digest("hex");
  if (expected !== signature) {
    return NextResponse.json({ message: "Invalid signature" }, { status: 401 });
  }

  return NextResponse.json({ received: true });
}
