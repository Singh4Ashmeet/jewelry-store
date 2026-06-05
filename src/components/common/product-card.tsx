"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, Sparkles, Star } from "lucide-react";
import type { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import { useWishlistStore } from "@/store/wishlist-store";
import { useCartStore } from "@/store/cart-store";
import { cursorFor, interactiveCursor } from "@/lib/cursor";

export function ProductVisual({
  name,
  src,
  alt,
  className = "",
  imgClassName = "",
}: {
  name: string;
  src?: string | null;
  alt?: string | null;
  className?: string;
  imgClassName?: string;
}) {
  return (
    <div className={`stone-gradient relative flex aspect-[4/5] items-center justify-center overflow-hidden rounded-[8px] bg-[#F5F1EB] ${className}`}>
      {src ? (
        <Image
          src={src}
          alt={alt || name || "Aurelia jewellery"}
          className={`absolute inset-0 h-full w-full object-cover transition duration-700 ${imgClassName}`}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
        />
      ) : (
        <div className="h-28 w-28 rounded-full border-[14px] border-[#B58E62]/75 shadow-2xl shadow-[#A07840]/30" />
      )}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1C1C1A]/10 via-transparent to-white/5" />
    </div>
  );
}

export function ProductCard({ product, compact = false }: { product: Product; compact?: boolean }) {
  const rating = product.reviews?.[0]?.rating ?? 5;
  const reviewCount = 74 + Number(product.id.replace(/\D/g, "") || 1) * 7;
  const toggleWishlist = useWishlistStore((state) => state.toggleItem);
  const isWishlisted = useWishlistStore((state) => state.hasItem(product.id));
  const addItem = useCartStore((state) => state.addItem);
  const image = product.images[0];
  const firstVariant = product.variants[0];

  function quickAdd() {
    if (!firstVariant) return;
    addItem({
      productId: product.id,
      variantId: firstVariant.id,
      name: product.name,
      slug: product.slug,
      image: image?.url ?? "",
      metal: firstVariant.metal,
      size: firstVariant.size,
      price: firstVariant.price,
      quantity: 1,
      stock: firstVariant.stock,
      sku: firstVariant.sku,
    });
  }

  return (
    <article className={`group rounded-[8px] bg-[#FCFAF8] transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#1C1C1A]/10 ${cursorFor("pointer")}`}>
      <div className="relative overflow-hidden rounded-[8px] bg-[#F5F1EB]">
        <Link href={`/product/${product.slug}`} className="block" aria-label={`View ${product.name}`}>
          <ProductVisual
            name={product.name}
            src={image?.url}
            alt={image?.alt}
            className={compact ? "aspect-[1.05/1]" : "aspect-[1.08/1]"}
            imgClassName="group-hover:scale-105"
          />
        </Link>
        <button
          className={`absolute right-4 top-4 rounded-full bg-white/80 p-2 text-[#2D2D2D] shadow-sm backdrop-blur ${interactiveCursor()}`}
          aria-label={isWishlisted ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
          aria-pressed={isWishlisted}
          onClick={() =>
            toggleWishlist({
              productId: product.id,
              name: product.name,
              slug: product.slug,
              image: image?.url ?? "",
              price: product.basePrice,
            })
          }
          type="button"
        >
          <Heart size={20} fill={isWishlisted ? "currentColor" : "none"} />
        </button>
        {(product.isNew || product.isBestseller) && (
          <span className="absolute left-4 top-4 rounded-sm bg-white/90 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-[#A07840]">
            {product.isNew ? "New" : "Bestseller"}
          </span>
        )}
        <div className="absolute inset-x-3 bottom-3 flex translate-y-3 gap-2 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100">
          <button
            className={`flex h-10 flex-1 items-center justify-center gap-2 rounded-sm bg-white/95 px-3 text-[11px] font-semibold tracking-[0.14em] uppercase text-[#1C1C1A] shadow-sm backdrop-blur ${interactiveCursor(!firstVariant)}`}
            onClick={quickAdd}
            disabled={!firstVariant}
            type="button"
          >
            <ShoppingBag size={14} />
            Quick Add
          </button>
          {product.tryOn && (
            <Link
              href={`/try-on/${product.slug}`}
              className={`flex h-10 items-center justify-center gap-2 rounded-sm bg-[#1C1C1A]/95 px-3 text-[11px] font-semibold tracking-[0.14em] uppercase text-white shadow-sm backdrop-blur ${interactiveCursor()}`}
            >
              <Sparkles size={14} />
              Try
            </Link>
          )}
        </div>
      </div>
      <Link href={`/product/${product.slug}`} className="block">
        <div className="px-1 py-4">
          <h3 className="text-[15px] font-medium leading-tight text-[#2D2D2D]">{product.name}</h3>
          <p className="mt-1 text-[13px] text-[#6B6B68]">{product.shortDesc}</p>
          <p className="mt-3 text-lg font-medium tracking-wide">{formatPrice(product.basePrice)}</p>
          <div className="mt-2 flex items-center gap-1 text-[#B58E62]">
            {Array.from({ length: rating }).map((_, index) => (
              <Star key={index} size={13} fill="currentColor" />
            ))}
            <span className="ml-2 text-xs text-[#6B6B68]">({reviewCount})</span>
          </div>
        </div>
      </Link>
    </article>
  );
}
