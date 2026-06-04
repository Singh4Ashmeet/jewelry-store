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

export const checkoutItemSchema = z.object({
  productId: z.string().min(1),
  variantId: z.string().min(1),
  name: z.string().min(1),
  slug: z.string().min(1),
  image: z.string(),
  metal: z.enum(["YELLOW_GOLD", "ROSE_GOLD", "WHITE_GOLD", "PLATINUM", "SILVER"]),
  size: z.string().nullable(),
  price: z.number().positive(),
  quantity: z.number().int().min(1),
  stock: z.number().int().min(0),
  sku: z.string().min(1),
});

export const checkoutRequestSchema = checkoutSchema.extend({
  items: z.array(checkoutItemSchema).min(1, "Cart must contain at least one item"),
  total: z.number().nonnegative(),
});

export const razorpayWebhookSchema = z
  .object({
    event: z.string().min(1),
    payload: z.record(z.string(), z.unknown()),
  })
  .passthrough();

export type CheckoutInput = z.infer<typeof checkoutSchema>;
export type CheckoutRequestInput = z.infer<typeof checkoutRequestSchema>;
