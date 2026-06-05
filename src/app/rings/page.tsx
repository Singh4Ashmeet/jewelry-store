import { CategoryPage, categoryMetadata } from "@/components/product/category-page";

export const metadata = categoryMetadata("Rings");

export default async function Page({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  return <CategoryPage category="RING" categorySlug="rings" title="Rings" copy="Sculptural bands, fine solitaires, and stackable gold pieces for everyday radiance." pathname="/rings" searchParams={await searchParams} />;
}
