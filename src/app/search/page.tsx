import type { Metadata } from "next";
import { ProductCard } from "@/components/common/product-card";
import { ErrorAlert } from "@/components/common/error-alert";
import { ProductFilters } from "@/components/product/product-filters";
import { ProductPagination } from "@/components/product/product-pagination";
import { parseListingParams } from "@/lib/filterUtils";
import { queryProductListing } from "@/lib/product-query";

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const params = await searchParams;
  const query = Array.isArray(params.q) ? params.q[0] : params.q;
  return {
    title: query ? `Search results for ${query}` : "Search",
    description: "Search Aurelia Jewellery products by name, category, material, and price.",
  };
}

export default async function SearchPage({ searchParams }: Props) {
  const params = await searchParams;
  const listingParams = parseListingParams(params);
  const listing = await queryProductListing(listingParams, { page: listingParams.page });
  const products = listing.items;

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-xs uppercase tracking-[0.28em] text-[#A07840]">Search</p>
        <h1 className="mt-3 font-display text-5xl">{listingParams.q ? `Results for "${listingParams.q}"` : "Search Aurelia"}</h1>
        <p className="mt-3 text-sm text-[#6B6B68]">
          {listing.total} results{listing.totalPages > 1 ? `, page ${listing.page} of ${listing.totalPages}` : ""}
        </p>
      </div>

      <ProductFilters key={JSON.stringify(listingParams)} initialFilters={listingParams} />

      {products.length === 0 && (
        <div className="mt-6">
          <ErrorAlert title="No matching products" message="Try a broader term, fewer filters, or another category." />
        </div>
      )}

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <ProductPagination pathname="/search" searchParams={params} page={listing.page} totalPages={listing.totalPages} />
    </section>
  );
}
