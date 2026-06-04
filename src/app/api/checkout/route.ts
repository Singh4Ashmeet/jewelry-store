import { NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { checkoutRequestSchema } from "@/lib/validations/checkout";
import { getRazorpayClient, isRazorpayConfigured } from "@/lib/razorpay";
import { sendOrderConfirmation } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);
    const parsed = checkoutRequestSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ message: "Invalid checkout details", issues: parsed.error.flatten() }, { status: 400 });
    }

    const orderId = `AUR-${nanoid(8).toUpperCase()}`;
    const calculatedTotal = parsed.data.items.reduce((total, item) => total + item.price * item.quantity, 0);
    if (Math.abs(calculatedTotal - parsed.data.total) > 0.01) {
      return NextResponse.json({ message: "Cart total does not match submitted items" }, { status: 400 });
    }

    const overstocked = parsed.data.items.find((item) => item.quantity > item.stock);
    if (overstocked) {
      return NextResponse.json({ message: `${overstocked.name} exceeds available stock` }, { status: 400 });
    }

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
      amount: Math.round(calculatedTotal * 100),
      currency: "INR",
      receipt: orderId,
    });

    await sendOrderConfirmation(parsed.data.email, orderId);
    return NextResponse.json({ orderId, razorpayOrder });
  } catch {
    return NextResponse.json({ message: "Unable to place order right now. Please try again." }, { status: 500 });
  }
}
