import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ButtonLink } from '@/components/common/button';
import { ProductCard } from '@/components/common/product-card';
import { ProductFilters } from '@/components/product/product-filters';
import { categoryPages, editorialImages } from '@/lib/data';
import { parseProductFilters, queryProducts } from '@/lib/product-query';
import type { ProductCategory } from '@/types';

export function categoryMetadata(title: string): Metadata {
  return {
    title,
    description: `Shop ${title.toLowerCase()} from Aurelia Jewellery.`,
  };
}

export async function CategoryPage({
  category,
  title,
  copy,
  searchParams,
}: {
  category?: ProductCategory;
  title: string;
  copy: string;
  searchParams?: Record<string, string | string[] | undefined>;
}) {
  const filters = { ...parseProductFilters(searchParams), category };
  const items = await queryProducts(filters);
  const selected = categoryPages.find((page) => page.category === category);
  const heroImage = selected?.image ?? editorialImages.hero;

  return (
    <div>
      <section className="border-b border-[#EAE5DF] bg-white">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[0.88fr_1.12fr] lg:px-8">
          <div>
            <div className="mb-7 flex items-center gap-2 text-sm text-[#6B6B68]">
              <Link href="/">Home</Link>
              <span>/</span>
              <span className="text-[#1C1C1A]">{title}</span>
            </div>
            <p className="text-xs font-semibold tracking-[0.3em] text-[#A07840] uppercase">
              Aurelia edit
            </p>
            <h1 className="font-display mt-4 text-5xl leading-none font-semibold sm:text-7xl">
              {title}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-[#2D2D2D]">{copy}</p>
          </div>
          <div className="relative hidden h-72 overflow-hidden rounded-[8px] lg:block">
            <Image
              src={heroImage}
              alt={`${title} collection`}
              fill
              sizes="45vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#1C1C1A]/25 to-transparent" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-5 flex flex-col justify-between gap-3 lg:flex-row lg:items-end">
          <div>
            <h2 className="text-sm font-semibold tracking-[0.22em] uppercase">
              Shop the selection
            </h2>
            <p className="mt-2 text-sm text-[#6B6B68]">{items.length} refined results</p>
          </div>
          <p className="max-w-md text-sm leading-6 text-[#6B6B68]">
            Use filters to narrow the collection, then apply once to keep browsing smooth.
          </p>
        </div>

        <ProductFilters key={JSON.stringify(filters)} initialFilters={filters} />

        <div className="relative mt-10 overflow-hidden rounded-[8px] bg-[#F5F1EB]">
          <div className="relative h-56 w-full">
            <Image
              src={editorialImages.hero}
              alt="Modern jewellery collection"
              fill
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#FCFAF8]/95 via-[#FCFAF8]/65 to-transparent" />
          <div className="absolute top-1/2 left-6 max-w-sm -translate-y-1/2 sm:left-12">
            <h2 className="font-display text-4xl leading-tight">
              Modern heirlooms for everyday elegance.
            </h2>
            <p className="mt-3 text-sm leading-6 text-[#2D2D2D]">
              Effortless designs crafted to be cherished today and passed down tomorrow.
            </p>
            <ButtonLink href="/new-in" className="mt-5 border-[#B58E62] bg-[#B58E62]">
              Explore the Collection
            </ButtonLink>
          </div>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
