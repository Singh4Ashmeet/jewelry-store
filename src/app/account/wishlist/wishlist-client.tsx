"use client";

import Link from "next/link";
import { HeartOff } from "lucide-react";
import { ButtonLink } from "@/components/common/button";
import { useWishlistStore } from "@/store/wishlist-store";
import { formatPrice } from "@/lib/utils";

export function WishlistClient() {
  const items = useWishlistStore((state) => state.items);
  const removeItem = useWishlistStore((state) => state.removeItem);

  if (!items.length) {
    return (
      <section className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <HeartOff className="mx-auto text-[#B58E62]" size={42} strokeWidth={1.5} />
        <h1 className="mt-5 font-display text-5xl">Your wishlist is empty</h1>
        <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-[#6B6B68]">
          Save pieces you love and return to them when you are ready.
        </p>
        <ButtonLink href="/new-in" className="mt-7 bg-[#B58E62] border-[#B58E62]">
          Explore New Arrivals
        </ButtonLink>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="font-display text-5xl">Wishlist</h1>
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <article key={item.productId} className="rounded-[8px] border border-[#EAE5DF] bg-white p-5">
            <Link href={`/product/${item.slug}`} className="block">
              <p className="text-sm font-medium text-[#1C1C1A]">{item.name}</p>
              <p className="mt-2 text-lg font-medium">{formatPrice(item.price)}</p>
            </Link>
            <button
              className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-[#A07840]"
              onClick={() => removeItem(item.productId)}
              type="button"
              aria-label={`Remove ${item.name} from wishlist`}
            >
              Remove
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
