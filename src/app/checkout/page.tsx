"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/common/button";
import { checkoutSchema, type CheckoutInput } from "@/lib/validations/checkout";
import { useCartStore } from "@/store/cart-store";
import { formatPrice } from "@/lib/utils";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, cartTotal, clearCart } = useCartStore();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<CheckoutInput>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: { paymentMethod: "UPI" },
  });

  async function onSubmit(values: CheckoutInput) {
    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...values, items, total: cartTotal() }),
    });
    const order = await response.json();
    if (!response.ok) {
      toast.error(order.message ?? "Checkout failed");
      return;
    }
    clearCart();
    router.push(`/order/${order.orderId}`);
  }

  return (
    <section className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_380px] lg:px-8">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div>
          <h1 className="font-display text-5xl">Checkout</h1>
          <p className="mt-3 text-[#737373]">Razorpay is mocked safely until keys are added to `.env.local`.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            ["email", "Email"],
            ["phone", "Phone"],
            ["name", "Full name"],
            ["line1", "Address"],
            ["city", "City"],
            ["state", "State"],
            ["pincode", "Pincode"],
          ].map(([name, label]) => (
            <label key={name} className="grid gap-2 text-sm">
              {label}
              <input className="border border-[#EAE5DF] bg-white px-4 py-3" {...register(name as keyof CheckoutInput)} />
              {errors[name as keyof CheckoutInput] && <span className="text-xs text-red-700">Required</span>}
            </label>
          ))}
        </div>
        <label className="grid gap-2 text-sm">
          Payment method
          <select className="border border-[#EAE5DF] bg-white px-4 py-3" {...register("paymentMethod")}>
            <option value="UPI">UPI</option>
            <option value="CARD">Card</option>
            <option value="NET_BANKING">Net Banking</option>
            <option value="COD">Cash on Delivery</option>
          </select>
        </label>
        <label className="grid gap-2 text-sm">
          Gift message
          <textarea className="min-h-28 border border-[#EAE5DF] bg-white px-4 py-3" {...register("giftMessage")} />
        </label>
        <label className="flex items-center gap-3 text-sm">
          <input type="checkbox" {...register("terms")} /> I agree to the terms and privacy policy.
        </label>
        <Button disabled={isSubmitting || !items.length}>{isSubmitting ? "Placing..." : "Place Order"}</Button>
      </form>
      <aside className="h-fit border border-[#EAE5DF] bg-white p-6">
        <h2 className="font-display text-3xl">Order Summary</h2>
        <div className="mt-6 space-y-4">
          {items.map((item) => (
            <div key={item.variantId} className="flex justify-between gap-4 text-sm">
              <span>{item.name} × {item.quantity}</span>
              <span>{formatPrice(item.price * item.quantity)}</span>
            </div>
          ))}
          <div className="flex justify-between border-t border-[#EAE5DF] pt-4 text-lg font-medium">
            <span>Total</span>
            <span>{formatPrice(cartTotal())}</span>
          </div>
        </div>
      </aside>
    </section>
  );
}
