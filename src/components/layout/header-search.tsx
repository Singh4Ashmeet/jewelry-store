"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";
import { formatPrice } from "@/lib/utils";

type SearchResult = {
  id: string;
  name: string;
  slug: string;
  category: string;
  price: number;
  image: string | null;
};

export function HeaderSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const timeout = window.setTimeout(async () => {
      if (query.trim().length < 2) {
        setResults([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`, {
          signal: controller.signal,
        });
        const payload = await response.json();
        setResults(response.ok ? payload.products ?? [] : []);
      } catch {
        if (!controller.signal.aborted) setResults([]);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }, 250);

    return () => {
      window.clearTimeout(timeout);
      controller.abort();
    };
  }, [query]);

  return (
    <div className="relative hidden min-w-64 lg:block" ref={containerRef}>
      <form action="/search" role="search">
        <label className="sr-only" htmlFor="site-search">
          Search jewellery
        </label>
        <div className="flex h-10 items-center gap-2 border border-[#EAE5DF] bg-white px-3">
          <Search size={16} aria-hidden="true" />
          <input
            id="site-search"
            name="q"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            placeholder="Search rings, gifts, bridal..."
            className="w-full bg-transparent text-sm outline-none placeholder:text-[#737373]"
            autoComplete="off"
          />
        </div>
      </form>

      {open && query.trim().length >= 2 && (
        <div className="absolute right-0 top-12 z-50 w-[360px] rounded-[6px] border border-[#EAE5DF] bg-white p-3 shadow-xl">
          {loading && <p className="px-2 py-3 text-sm text-[#6B6B68]">Searching...</p>}
          {!loading && results.length === 0 && <p className="px-2 py-3 text-sm text-[#6B6B68]">No products found.</p>}
          <div className="space-y-2">
            {results.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.slug}`}
                className="grid grid-cols-[56px_1fr] gap-3 rounded-[4px] p-2 transition hover:bg-[#F5F1EB] focus:bg-[#F5F1EB] focus:outline-none"
                onClick={() => setOpen(false)}
              >
                <div className="relative h-14 overflow-hidden rounded-[4px] bg-[#F5F1EB]">
                  {product.image && <Image src={product.image} alt="" fill sizes="56px" className="object-cover" />}
                </div>
                <div>
                  <p className="text-sm font-medium">{product.name}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.12em] text-[#737373]">{product.category}</p>
                  <p className="mt-1 text-sm">{formatPrice(product.price)}</p>
                </div>
              </Link>
            ))}
          </div>
          <Link
            href={`/search?q=${encodeURIComponent(query)}`}
            className="mt-3 block border-t border-[#EAE5DF] px-2 pt-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#A07840]"
            onClick={() => setOpen(false)}
          >
            View all results
          </Link>
        </div>
      )}
    </div>
  );
}
