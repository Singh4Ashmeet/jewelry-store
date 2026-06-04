"use client";

import Link from "next/link";
import { Trash2 } from "lucide-react";
import { ButtonLink } from "@/components/common/button";
import { ProductVisual } from "@/components/common/product-card";
import { useCartStore } from "@/store/cart-store";
import { formatPrice } from "@/lib/utils";

export default function CartPage() {
  const { items, removeItem, updateQuantity, cartTotal } = useCartStore();
  const total = cartTotal();

  if (!items.length) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="font-display text-5xl">Your bag is waiting</h1>
        <p className="mt-4 text-[#737373]">Add a piece you love and it will appear here.</p>
        <ButtonLink href="/new-in" className="mt-8">Shop New In</ButtonLink>
      </section>
    );
  }

  return (
    <section className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_380px] lg:px-8">
      <div>
        <h1 className="font-display text-5xl">Shopping Bag</h1>
        <div className="mt-8 divide-y divide-[#EAE5DF] border-y border-[#EAE5DF]">
          {items.map((item) => (
            <div key={item.variantId} className="grid gap-4 py-6 sm:grid-cols-[120px_1fr_auto]">
              <ProductVisual name={item.name} className="aspect-square" />
              <div>
                <Link href={`/product/${item.slug}`} className="font-display text-2xl">{item.name}</Link>
                <p className="mt-2 text-sm text-[#737373]">{item.metal.replace("_", " ")} {item.size ? `• Size ${item.size}` : ""}</p>
                <div className="mt-4 flex w-fit items-center border border-[#EAE5DF] bg-white">
                  <button className="px-3 py-2" onClick={() => updateQuantity(item.variantId, item.quantity - 1)}>-</button>
                  <span className="w-10 text-center">{item.quantity}</span>
                  <button className="px-3 py-2" onClick={() => updateQuantity(item.variantId, item.quantity + 1)}>+</button>
                </div>
              </div>
              <div className="flex items-start justify-between gap-4 sm:block sm:text-right">
                <p className="font-medium">{formatPrice(item.price * item.quantity)}</p>
                <button className="mt-4 text-[#737373]" onClick={() => removeItem(item.variantId)} aria-label="Remove item"><Trash2 size={18} /></button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <aside className="h-fit border border-[#EAE5DF] bg-white p-6">
        <h2 className="font-display text-3xl">Summary</h2>
        <div className="mt-6 space-y-3 text-sm">
          <div className="flex justify-between"><span>Subtotal</span><span>{formatPrice(total)}</span></div>
          <div className="flex justify-between"><span>Shipping</span><span>Free</span></div>
          <div className="flex justify-between border-t border-[#EAE5DF] pt-4 text-lg font-medium"><span>Total</span><span>{formatPrice(total)}</span></div>
        </div>
        <input placeholder="Coupon code" className="mt-6 w-full border border-[#EAE5DF] px-4 py-3 text-sm" />
        <ButtonLink href="/checkout" className="mt-4 w-full">Proceed to Checkout</ButtonLink>
      </aside>
    </section>
  );
}
