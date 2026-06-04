"use client";

import { useMemo, useState } from "react";
import { Heart, Minus, Plus, Sparkles, Truck } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/common/button";
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/types";
import { METAL_LABELS } from "@/types";

export function AddToCartPanel({ product }: { product: Product }) {
  const [variantId, setVariantId] = useState(product.variants[0]?.id ?? "");
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.addItem);
  const toggleWishlist = useWishlistStore((state) => state.toggleItem);
  const isWishlisted = useWishlistStore((state) => state.hasItem(product.id));
  const selected = useMemo(() => product.variants.find((variant) => variant.id === variantId) ?? product.variants[0], [product, variantId]);
  const maxQuantity = Math.max(1, selected?.stock ?? 1);

  function addToBag() {
    if (!selected) return;
    if (selected.stock < 1) {
      toast.error("This variant is currently out of stock");
      return;
    }

    addItem({
      productId: product.id,
      variantId: selected.id,
      name: product.name,
      slug: product.slug,
      image: product.images[0]?.url ?? "",
      metal: selected.metal,
      size: selected.size,
      price: selected.price,
      quantity,
      stock: selected.stock,
      sku: selected.sku,
    });
    toast.success("Added to bag");
  }

  return (
    <div className="space-y-7">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex gap-2">
            {product.isBestseller && <span className="bg-[#1C1C1A] px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-white">Bestseller</span>}
            {product.isNew && <span className="bg-[#F5F1EB] px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-[#A07840]">New</span>}
          </div>
          <h1 className="mt-4 font-display text-5xl">{product.name}</h1>
          <p className="mt-4 text-2xl font-medium">{formatPrice(selected?.price ?? product.basePrice)}</p>
        </div>
        <button
          aria-label={isWishlisted ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
          aria-pressed={isWishlisted}
          className="rounded-full border border-[#EAE5DF] p-3"
          onClick={() =>
            toggleWishlist({
              productId: product.id,
              name: product.name,
              slug: product.slug,
              image: product.images[0]?.url ?? "",
              price: product.basePrice,
            })
          }
          type="button"
        >
          <Heart fill={isWishlisted ? "currentColor" : "none"} />
        </button>
      </div>
      <p className="text-lg leading-8 text-[#6B6B68]">{product.description}</p>
      <div>
        <p className="mb-3 text-xs uppercase tracking-[0.22em]">Metal</p>
        <div className="grid gap-3 sm:grid-cols-3">
          {product.variants.map((variant) => (
            <button
              key={variant.id}
              onClick={() => {
                setVariantId(variant.id);
                setQuantity((value) => Math.min(value, Math.max(1, variant.stock)));
                window.dispatchEvent(new CustomEvent("aurelia:variant-change", { detail: { metal: variant.metal, variantId: variant.id } }));
              }}
              aria-label={`Select ${METAL_LABELS[variant.metal]} variant with ${variant.stock} in stock`}
              className={`border px-4 py-3 text-sm transition ${variant.id === variantId ? "border-[#1C1C1A] bg-white" : "border-[#EAE5DF] bg-[#FAF7F2]"}`}
              type="button"
            >
              {METAL_LABELS[variant.metal]}
            </button>
          ))}
        </div>
      </div>
      {selected?.size && (
        <div>
          <p className="mb-3 text-xs uppercase tracking-[0.22em]">Ring size</p>
          <select className="w-full border border-[#EAE5DF] bg-white px-4 py-3" defaultValue={selected.size}>
            {["5", "6", "7", "8", "9"].map((size) => <option key={size}>{size}</option>)}
          </select>
        </div>
      )}
      <div className="flex items-center gap-4">
        <div className="flex h-11 items-center border border-[#EAE5DF] bg-white">
          <button className="px-3" onClick={() => setQuantity((value) => Math.max(1, value - 1))} aria-label="Decrease quantity" type="button"><Minus size={16} /></button>
          <span className="w-10 text-center">{quantity}</span>
          <button className="px-3" onClick={() => setQuantity((value) => Math.min(maxQuantity, value + 1))} aria-label="Increase quantity" type="button"><Plus size={16} /></button>
        </div>
        <Button className="flex-1" onClick={addToBag} disabled={!selected || selected.stock < 1}>
          {selected?.stock ? "Add to Bag" : "Out of Stock"}
        </Button>
      </div>
      <Button variant="secondary" className="w-full">Book Video Consultation</Button>
      <div className="grid gap-3 text-sm text-[#6B6B68] sm:grid-cols-2">
        <p className="flex items-center gap-2"><Truck size={16} /> Express insured shipping</p>
        <p className="flex items-center gap-2"><Sparkles size={16} /> Premium gift packaging</p>
      </div>
    </div>
  );
}
