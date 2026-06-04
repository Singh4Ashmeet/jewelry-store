"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Star } from "lucide-react";
import type { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import { useWishlistStore } from "@/store/wishlist-store";

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
  const image = product.images[0];

  return (
    <article className="group rounded-[8px] bg-[#FCFAF8]">
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
          className="absolute right-4 top-4 rounded-full bg-white/80 p-2 text-[#2D2D2D] shadow-sm backdrop-blur"
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
