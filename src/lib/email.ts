import { Resend } from "resend";
import { env } from "@/lib/env";

export async function sendOrderConfirmation(email: string, orderId: string) {
  if (!process.env.RESEND_API_KEY) {
    return { mode: "mock", message: `Order confirmation ${orderId} would be sent to ${email}` };
  }
  const resend = new Resend(process.env.RESEND_API_KEY);
  return resend.emails.send({
    from: env.resendFromEmail,
    to: email,
    subject: `Aurelia order ${orderId}`,
    html: `<h1>Thank you for your order</h1><p>Your Aurelia Jewellery order ${orderId} is confirmed.</p>`,
  });
}
