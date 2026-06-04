"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { Maximize2, X } from "lucide-react";
import type { Product } from "@/types";

function metalImage(base: string, metal: string) {
  if (!base.includes("images.unsplash.com")) return base;
  const tint = metal === "ROSE_GOLD" ? "sepia(0.28)" : metal === "WHITE_GOLD" || metal === "PLATINUM" ? "saturate(0.65)" : "none";
  return { url: base, tint };
}

export function ProductGallery({ product, gallery }: { product: Product; gallery: string[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [variantMetal, setVariantMetal] = useState(product.variants[0]?.metal);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const activeImage = gallery[activeIndex] ?? product.images[0]?.url;
  const variantVisual = useMemo(() => metalImage(activeImage ?? "", variantMetal ?? ""), [activeImage, variantMetal]);
  const filter = typeof variantVisual === "string" ? "none" : variantVisual.tint;
  const imageUrl = typeof variantVisual === "string" ? variantVisual : variantVisual.url;

  useEffect(() => {
    const handler = (event: Event) => {
      const customEvent = event as CustomEvent<{ metal?: string }>;
      if (customEvent.detail.metal) setVariantMetal(customEvent.detail.metal as Product["variants"][number]["metal"]);
      setActiveIndex(0);
    };
    window.addEventListener("aurelia:variant-change", handler);
    return () => window.removeEventListener("aurelia:variant-change", handler);
  }, []);

  return (
    <div>
      <div className="group relative aspect-[1.18/1] min-h-[520px] overflow-hidden rounded-[8px] bg-[#F5F1EB]">
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={product.images[activeIndex]?.alt ?? `${product.name} product image`}
            fill
            priority
            sizes="(min-width: 1024px) 52vw, 100vw"
            className="object-cover transition duration-500 group-hover:scale-105"
            style={{ filter }}
          />
        )}
        {product.isBestseller && (
          <span className="absolute left-5 top-5 rounded-sm bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#A07840]">
            Bestseller
          </span>
        )}
        <button
          className="absolute bottom-5 right-5 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 shadow"
          onClick={() => setLightboxOpen(true)}
          type="button"
          aria-label={`Zoom ${product.name} image`}
        >
          <Maximize2 size={18} />
        </button>
      </div>

      <div className="mt-3 grid grid-cols-5 gap-3" aria-label="Product image thumbnails">
        {gallery.map((item, index) => (
          <button
            key={item}
            type="button"
            onClick={() => setActiveIndex(index)}
            className={`relative aspect-square overflow-hidden rounded-[6px] bg-[#F5F1EB] ${index === activeIndex ? "ring-2 ring-[#B58E62]" : ""}`}
            aria-label={`Show ${product.name} image ${index + 1}`}
            aria-pressed={index === activeIndex}
          >
            <Image src={item} alt="" fill sizes="20vw" className="object-cover" />
          </button>
        ))}
      </div>

      {lightboxOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4" role="dialog" aria-modal="true" aria-label={`${product.name} image preview`}>
          <button
            className="absolute right-5 top-5 rounded-full bg-white p-3 text-[#1C1C1A]"
            onClick={() => setLightboxOpen(false)}
            type="button"
            aria-label="Close image preview"
          >
            <X />
          </button>
          <div className="relative h-[82vh] w-full max-w-5xl">
            {imageUrl && <Image src={imageUrl} alt={`${product.name} enlarged view`} fill sizes="90vw" className="object-contain" style={{ filter }} />}
          </div>
        </div>
      )}
    </div>
  );
}
