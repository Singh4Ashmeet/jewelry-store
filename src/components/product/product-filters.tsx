'use client';

import { useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { SlidersHorizontal, X } from 'lucide-react';
import type { ProductFilterInput, ProductSort } from '@/lib/product-query';
import {
  buildFilterSearchParams,
  clearFilterSearchParams,
  gemstoneOptions,
  metalOptions,
} from '@/lib/filterUtils';
import { METAL_LABELS, type MetalType } from '@/types';

const sortOptions: { value: ProductSort; label: string }[] = [
  { value: 'popular', label: 'Popularity' },
  { value: 'price-asc', label: 'Price low to high' },
  { value: 'price-desc', label: 'Price high to low' },
  { value: 'newest', label: 'Newest first' },
];

function updateList(values: string[] | undefined, value: string, checked: boolean) {
  const current = new Set(values ?? []);
  if (checked) current.add(value);
  else current.delete(value);
  return Array.from(current);
}

export function ProductFilters({
  initialFilters,
  onChange,
}: {
  initialFilters: ProductFilterInput;
  onChange?: (filters: ProductFilterInput) => void;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [draft, setDraft] = useState<ProductFilterInput>(initialFilters);

  useEffect(() => {
    onChange?.(draft);
  }, [draft, onChange]);

  const activeFilterCount = useMemo(() => {
    return [
      draft.minPrice !== undefined,
      draft.maxPrice !== undefined,
      Boolean(draft.metals?.length),
      Boolean(draft.gemstones?.length),
      draft.minRating !== undefined,
      draft.inStock,
      draft.onSale,
    ].filter(Boolean).length;
  }, [draft]);

  function commit(nextFilters = draft) {
    const params = buildFilterSearchParams(searchParams.toString(), nextFilters);
    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }

  function setDraftAndCommit(nextFilters: ProductFilterInput) {
    setDraft(nextFilters);
    commit(nextFilters);
  }

  function clearFilters() {
    const params = clearFilterSearchParams(searchParams.toString());
    setDraft({
      q: initialFilters.q,
      category: initialFilters.category,
      subCategory: initialFilters.subCategory,
      sort: 'popular',
    });
    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }

  function setNumber(key: 'minPrice' | 'maxPrice', value: string) {
    const parsed = Number(value);
    setDraft((current) => ({
      ...current,
      [key]: Number.isFinite(parsed) && value !== '' ? parsed : undefined,
    }));
  }

  return (
    <form
      className="rounded-[8px] border border-[#EAE5DF] bg-white shadow-sm"
      onSubmit={(event) => {
        event.preventDefault();
        commit();
      }}
    >
      <div className="flex flex-col gap-4 border-b border-[#EAE5DF] p-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F5F1EB] text-[#A07840]">
            <SlidersHorizontal size={18} aria-hidden="true" />
          </span>
          <div>
            <h2 className="text-sm font-semibold tracking-[0.18em] uppercase">Refine Selection</h2>
            <p className="mt-1 text-sm text-[#6B6B68]">
              Filter by budget, material, gemstone, and availability.
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {activeFilterCount > 0 && (
            <span className="rounded-full bg-[#F5F1EB] px-3 py-1 text-xs text-[#6B6B68]">
              {activeFilterCount} active
            </span>
          )}
          <button
            className="inline-flex h-10 items-center gap-2 border border-[#EAE5DF] px-4 text-xs font-semibold tracking-[0.16em] uppercase"
            type="button"
            onClick={clearFilters}
          >
            <X size={14} />
            Clear
          </button>
          <button
            className="h-10 bg-[#1C1C1A] px-5 text-xs font-semibold tracking-[0.16em] text-white uppercase"
            type="submit"
          >
            Apply Filters
          </button>
        </div>
      </div>

      <div className="grid gap-0 lg:grid-cols-[1fr_1.3fr_1fr]">
        <fieldset className="border-b border-[#EAE5DF] p-5 lg:border-r lg:border-b-0">
          <legend className="text-xs font-semibold tracking-[0.2em] uppercase">Price Range</legend>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <label className="grid gap-2 text-sm text-[#6B6B68]">
              Min
              <input
                type="number"
                min="0"
                step="100"
                value={draft.minPrice ?? ''}
                onChange={(event) => setNumber('minPrice', event.target.value)}
                className="h-11 border border-[#EAE5DF] bg-[#FCFAF8] px-3 text-[#1C1C1A] outline-none focus:border-[#B58E62]"
                placeholder="0"
              />
            </label>
            <label className="grid gap-2 text-sm text-[#6B6B68]">
              Max
              <input
                type="number"
                min="0"
                step="100"
                value={draft.maxPrice ?? ''}
                onChange={(event) => setNumber('maxPrice', event.target.value)}
                className="h-11 border border-[#EAE5DF] bg-[#FCFAF8] px-3 text-[#1C1C1A] outline-none focus:border-[#B58E62]"
                placeholder="10000"
              />
            </label>
          </div>
          <p className="mt-3 text-xs text-[#6B6B68]">
            Use exact values for a cleaner, shareable result.
          </p>
        </fieldset>

        <div className="grid gap-0 border-b border-[#EAE5DF] sm:grid-cols-2 lg:border-r lg:border-b-0">
          <fieldset>
            <legend className="px-5 pt-5 text-xs font-semibold tracking-[0.2em] uppercase">
              Metal
            </legend>
            <div className="grid gap-1 p-5 pt-3">
              {metalOptions.map((metal) => (
                <label key={metal} className="flex min-h-9 items-center gap-3 text-sm">
                  <input
                    type="checkbox"
                    className="h-4 w-4 accent-[#B58E62]"
                    checked={draft.metals?.includes(metal) ?? false}
                    onChange={(event) => {
                      const next = {
                        ...draft,
                        metals: updateList(
                          draft.metals,
                          metal,
                          event.target.checked,
                        ) as MetalType[],
                      };
                      setDraftAndCommit(next);
                    }}
                  />
                  {METAL_LABELS[metal]}
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className="px-5 pt-5 text-xs font-semibold tracking-[0.2em] uppercase">
              Gemstone
            </legend>
            <div className="grid gap-1 p-5 pt-3">
              {gemstoneOptions.map((gemstone) => (
                <label
                  key={gemstone}
                  className="flex min-h-9 items-center gap-3 text-sm capitalize"
                >
                  <input
                    type="checkbox"
                    className="h-4 w-4 accent-[#B58E62]"
                    checked={draft.gemstones?.includes(gemstone) ?? false}
                    onChange={(event) => {
                      const next = {
                        ...draft,
                        gemstones: updateList(draft.gemstones, gemstone, event.target.checked),
                      };
                      setDraftAndCommit(next);
                    }}
                  />
                  {gemstone}
                </label>
              ))}
            </div>
          </fieldset>
        </div>

        <div className="grid gap-4 p-5">
          <label className="grid gap-2 text-sm">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase">Sort</span>
            <select
              className="h-11 border border-[#EAE5DF] bg-[#FCFAF8] px-3 outline-none focus:border-[#B58E62]"
              value={draft.sort ?? 'popular'}
              onChange={(event) => setDraftAndCommit({ ...draft, sort: event.target.value as ProductSort })}
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
          <label className="flex min-h-9 items-center gap-3 text-sm">
            <input
              className="h-4 w-4 accent-[#B58E62]"
              type="checkbox"
              checked={draft.inStock ?? false}
              onChange={(event) => setDraftAndCommit({ ...draft, inStock: event.target.checked })}
            />
            In stock
          </label>
          <label className="flex min-h-9 items-center gap-3 text-sm">
            <input
              className="h-4 w-4 accent-[#B58E62]"
              type="checkbox"
              checked={draft.onSale ?? false}
              onChange={(event) => setDraftAndCommit({ ...draft, onSale: event.target.checked })}
            />
            On sale
          </label>
          <label className="grid gap-2 text-sm">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase">Rating</span>
            <select
              className="h-11 border border-[#EAE5DF] bg-[#FCFAF8] px-3 outline-none focus:border-[#B58E62]"
              value={draft.minRating ?? ''}
              onChange={(event) =>
                setDraftAndCommit({
                  ...draft,
                  minRating: event.target.value ? Number(event.target.value) : undefined,
                })
              }
            >
              <option value="">Any rating</option>
              <option value="4">4 stars & up</option>
              <option value="5">5 stars</option>
            </select>
          </label>
        </div>
      </div>
    </form>
  );
}
