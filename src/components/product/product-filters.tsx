"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { ProductFilterInput, ProductSort } from "@/lib/product-query";
import { gemstoneOptions } from "@/lib/product-query";
import { METAL_LABELS, type MetalType } from "@/types";

const metals: MetalType[] = ["YELLOW_GOLD", "ROSE_GOLD", "WHITE_GOLD", "PLATINUM", "SILVER"];
const sortOptions: { value: ProductSort; label: string }[] = [
  { value: "popular", label: "Popularity" },
  { value: "price-asc", label: "Price low to high" },
  { value: "price-desc", label: "Price high to low" },
  { value: "newest", label: "Newest first" },
];

function updateList(values: string[] | undefined, value: string, checked: boolean) {
  const current = new Set(values ?? []);
  if (checked) current.add(value);
  else current.delete(value);
  return Array.from(current);
}

export function ProductFilters({ initialFilters }: { initialFilters: ProductFilterInput }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function commit(next: Partial<ProductFilterInput>) {
    const params = new URLSearchParams(searchParams.toString());
    const setOrDelete = (key: string, value?: string | number | boolean) => {
      if (value === undefined || value === "" || value === false) params.delete(key);
      else params.set(key, String(value));
    };

    setOrDelete("min", next.minPrice ?? initialFilters.minPrice);
    setOrDelete("max", next.maxPrice ?? initialFilters.maxPrice);
    setOrDelete("sort", next.sort ?? initialFilters.sort);
    setOrDelete("stock", next.inStock ?? initialFilters.inStock ? "in" : undefined);
    setOrDelete("sale", next.onSale ?? initialFilters.onSale ? "true" : undefined);

    const metalValues = next.metals ?? initialFilters.metals ?? [];
    const gemstoneValues = next.gemstones ?? initialFilters.gemstones ?? [];
    setOrDelete("metal", metalValues.join(","));
    setOrDelete("gem", gemstoneValues.join(","));

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <form className="grid gap-5 rounded-[8px] border border-[#EAE5DF] bg-white p-5 lg:grid-cols-[1fr_1.2fr_1fr]">
      <fieldset>
        <legend className="text-xs font-semibold uppercase tracking-[0.2em]">Price</legend>
        <div className="mt-4 grid gap-3">
          <label className="grid gap-2 text-sm">
            Minimum
            <input
              type="range"
              min="0"
              max="10000"
              step="100"
              value={initialFilters.minPrice ?? 0}
              onChange={(event) => commit({ minPrice: Number(event.target.value) })}
              aria-label="Minimum price"
            />
          </label>
          <label className="grid gap-2 text-sm">
            Maximum
            <input
              type="range"
              min="0"
              max="10000"
              step="100"
              value={initialFilters.maxPrice ?? 10000}
              onChange={(event) => commit({ maxPrice: Number(event.target.value) })}
              aria-label="Maximum price"
            />
          </label>
          <p className="text-xs text-[#6B6B68]">
            {initialFilters.minPrice ?? 0} to {initialFilters.maxPrice ?? 10000}
          </p>
        </div>
      </fieldset>

      <div className="grid gap-5 sm:grid-cols-2">
        <fieldset>
          <legend className="text-xs font-semibold uppercase tracking-[0.2em]">Metal</legend>
          <div className="mt-3 grid gap-2">
            {metals.map((metal) => (
              <label key={metal} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={initialFilters.metals?.includes(metal) ?? false}
                  onChange={(event) => commit({ metals: updateList(initialFilters.metals, metal, event.target.checked) as MetalType[] })}
                />
                {METAL_LABELS[metal]}
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="text-xs font-semibold uppercase tracking-[0.2em]">Gemstone</legend>
          <div className="mt-3 grid gap-2">
            {gemstoneOptions.map((gemstone) => (
              <label key={gemstone} className="flex items-center gap-2 text-sm capitalize">
                <input
                  type="checkbox"
                  checked={initialFilters.gemstones?.includes(gemstone) ?? false}
                  onChange={(event) => commit({ gemstones: updateList(initialFilters.gemstones, gemstone, event.target.checked) })}
                />
                {gemstone}
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      <div className="grid gap-4">
        <label className="grid gap-2 text-sm">
          Sort
          <select
            className="border border-[#EAE5DF] bg-white px-3 py-2"
            value={initialFilters.sort ?? "popular"}
            onChange={(event) => commit({ sort: event.target.value as ProductSort })}
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={initialFilters.inStock ?? false} onChange={(event) => commit({ inStock: event.target.checked })} />
          In stock
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={initialFilters.onSale ?? false} onChange={(event) => commit({ onSale: event.target.checked })} />
          On sale
        </label>
      </div>
    </form>
  );
}
