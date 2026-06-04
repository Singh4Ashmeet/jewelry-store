import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { ChevronDown } from "lucide-react";
import { ProductCard } from "@/components/common/product-card";
import { ButtonLink } from "@/components/common/button";
import { categoryPages, editorialImages, getProductsByCategory } from "@/lib/data";
import type { ProductCategory } from "@/types";

export function categoryMetadata(title: string): Metadata {
  return {
    title,
    description: `Shop ${title.toLowerCase()} from Aurelia Jewellery.`,
  };
}

const filters = ["Metal", "Stone", "Price", "Occasion", "Style", "Availability"];

export function CategoryPage({ category, title, copy }: { category?: ProductCategory; title: string; copy: string }) {
  const sourceItems = category ? getProductsByCategory(category) : getProductsByCategory().filter((item) => item.isNew);
  const items = [...sourceItems, ...getProductsByCategory().filter((item) => !sourceItems.some((source) => source.id === item.id))].slice(0, 8);
  const selected = categoryPages.find((page) => page.category === category);
  const heroImage = selected?.image ?? editorialImages.hero;

  return (
    <div>
      <section className="border-b border-[#EAE5DF] bg-white">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <div className="mb-6 flex items-center gap-2 text-sm text-[#6B6B68]">
              <Link href="/">Home</Link>
              <span>/</span>
              <span className="text-[#1C1C1A]">{title}</span>
            </div>
            <h1 className="font-display text-6xl font-semibold sm:text-7xl">{title}</h1>
            <p className="mt-5 max-w-lg text-base leading-7 text-[#2D2D2D]">{copy}</p>
          </div>
          <div className="relative hidden h-56 overflow-hidden rounded-bl-[80px] lg:block">
            <Image src={heroImage} alt={`${title} collection`} fill sizes="45vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-7 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
          <p className="text-sm text-[#2D2D2D]">{category === "RING" ? 168 : items.length * 21} Results</p>
          <div className="flex flex-wrap gap-3">
            {filters.map((filter) => (
              <button
                key={filter}
                className="inline-flex h-11 items-center gap-8 rounded-[4px] border border-[#EAE5DF] bg-white px-4 text-sm text-[#2D2D2D]"
                type="button"
                aria-label={`Filter by ${filter}`}
              >
                {filter}
                <ChevronDown size={15} />
              </button>
            ))}
          </div>
          <button className="inline-flex items-center gap-2 text-sm" type="button" aria-label="Sort products">
            Sort by: Best Selling
            <ChevronDown size={15} />
          </button>
        </div>

        <div className="relative mt-7 overflow-hidden rounded-[8px] bg-[#F5F1EB]">
          <div className="relative h-56 w-full">
            <Image src={editorialImages.hero} alt="Modern jewellery collection" fill sizes="100vw" className="object-cover object-center" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#FCFAF8]/95 via-[#FCFAF8]/65 to-transparent" />
          <div className="absolute left-6 top-1/2 max-w-sm -translate-y-1/2 sm:left-12">
            <h2 className="font-display text-4xl leading-tight">Modern heirlooms for everyday elegance.</h2>
            <p className="mt-3 text-sm leading-6 text-[#2D2D2D]">Effortless designs crafted to be cherished today and passed down tomorrow.</p>
            <ButtonLink href="/new-in" className="mt-5 bg-[#B58E62] border-[#B58E62]">Explore the Collection</ButtonLink>
          </div>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>

        <div className="mt-8 flex items-center justify-center gap-3">
          {["‹", "1", "2", "3", "4", "...", "17", "›"].map((page) => (
            <button key={page} className={`h-9 min-w-9 rounded-[4px] border px-3 text-sm ${page === "1" ? "border-[#B58E62] bg-[#B58E62] text-white" : "border-[#EAE5DF] bg-white"}`}>
              {page}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
