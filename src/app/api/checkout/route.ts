import { NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { checkoutSchema } from "@/lib/validations/checkout";
import { getRazorpayClient, isRazorpayConfigured } from "@/lib/razorpay";
import { sendOrderConfirmation } from "@/lib/email";

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = checkoutSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ message: "Invalid checkout details", issues: parsed.error.flatten() }, { status: 400 });
  }

  const orderId = `AUR-${nanoid(8).toUpperCase()}`;
  const amount = Math.max(0, Number(body.total ?? 0));

  if (!isRazorpayConfigured()) {
    await sendOrderConfirmation(parsed.data.email, orderId);
    return NextResponse.json({
      orderId,
      mode: "mock",
      message: "Razorpay keys are missing, so a local mock order was created.",
    });
  }

  const razorpay = getRazorpayClient();
  const razorpayOrder = await razorpay?.orders.create({
    amount: Math.round(amount * 100),
    currency: "INR",
    receipt: orderId,
  });

  await sendOrderConfirmation(parsed.data.email, orderId);
  return NextResponse.json({ orderId, razorpayOrder });
}
