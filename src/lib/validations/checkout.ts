import { z } from "zod";

export const checkoutSchema = z.object({
  email: z.email(),
  phone: z.string().min(8),
  name: z.string().min(2),
  line1: z.string().min(4),
  city: z.string().min(2),
  state: z.string().min(2),
  pincode: z.string().min(4),
  paymentMethod: z.enum(["UPI", "CARD", "NET_BANKING", "COD"]),
  giftMessage: z.string().optional(),
  terms: z.literal(true),
});

export type CheckoutInput = z.infer<typeof checkoutSchema>;
