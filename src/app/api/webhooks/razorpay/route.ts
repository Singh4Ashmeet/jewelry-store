import crypto from "crypto";
import { NextResponse } from "next/server";
import { razorpayWebhookSchema } from "@/lib/validations/checkout";

function signaturesMatch(expected: string, received: string | null) {
  if (!received) return false;

  const expectedBuffer = Buffer.from(expected, "hex");
  const receivedBuffer = Buffer.from(received, "hex");
  return expectedBuffer.length === receivedBuffer.length && crypto.timingSafeEqual(expectedBuffer, receivedBuffer);
}

export async function POST(request: Request) {
  try {
    const body = await request.text();
    const signature = request.headers.get("x-razorpay-signature");
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

    if (!secret) {
      return NextResponse.json({ mode: "mock", message: "RAZORPAY_WEBHOOK_SECRET missing; webhook accepted in dev mode." });
    }

    const expected = crypto.createHmac("sha256", secret).update(body).digest("hex");
    if (!signaturesMatch(expected, signature)) {
      return NextResponse.json({ message: "Invalid signature" }, { status: 401 });
    }

    let payload: unknown;
    try {
      payload = JSON.parse(body);
    } catch {
      return NextResponse.json({ message: "Webhook body must be valid JSON" }, { status: 400 });
    }

    const parsed = razorpayWebhookSchema.safeParse(payload);
    if (!parsed.success) {
      return NextResponse.json({ message: "Invalid Razorpay webhook payload", issues: parsed.error.flatten() }, { status: 400 });
    }

    return NextResponse.json({ received: true, event: parsed.data.event });
  } catch {
    return NextResponse.json({ message: "Unable to process webhook" }, { status: 500 });
  }
}
