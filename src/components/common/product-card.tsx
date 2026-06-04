import Link from "next/link";
/* eslint-disable @next/next/no-img-element */
import { Heart, Star } from "lucide-react";
import type { Product } from "@/types";
import { formatPrice } from "@/lib/utils";

export function ProductVisual({
  name,
  src,
  className = "",
  imgClassName = "",
}: {
  name: string;
  src?: string | null;
  className?: string;
  imgClassName?: string;
}) {
  return (
    <div className={`stone-gradient relative flex aspect-[4/5] items-center justify-center overflow-hidden rounded-[8px] bg-[#F5F1EB] ${className}`}>
      {src ? (
        <img
          src={src}
          alt={name || "Aurelia jewellery"}
          className={`absolute inset-0 h-full w-full object-cover transition duration-700 ${imgClassName}`}
          loading="lazy"
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

  return (
    <article className="group rounded-[8px] bg-[#FCFAF8]">
      <Link href={`/product/${product.slug}`} className="block">
        <div className="relative overflow-hidden rounded-[8px] bg-[#F5F1EB]">
          <ProductVisual
            name={product.name}
            src={product.images[0]?.url}
            className={compact ? "aspect-[1.05/1]" : "aspect-[1.08/1]"}
            imgClassName="group-hover:scale-105"
          />
          <button className="absolute right-4 top-4 rounded-full bg-white/80 p-2 text-[#2D2D2D] shadow-sm backdrop-blur" aria-label="Add to wishlist">
            <Heart size={20} />
          </button>
          {(product.isNew || product.isBestseller) && (
            <span className="absolute left-4 top-4 rounded-sm bg-white/90 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-[#A07840]">
              {product.isNew ? "New" : "Bestseller"}
            </span>
          )}
        </div>
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
