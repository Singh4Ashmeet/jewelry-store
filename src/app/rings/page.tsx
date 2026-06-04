import { CategoryPage, categoryMetadata } from "@/components/product/category-page";

export const metadata = categoryMetadata("Rings");

export default async function Page({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  return <CategoryPage category="RING" title="Rings" copy="Sculptural bands, fine solitaires, and stackable gold pieces for everyday radiance." searchParams={await searchParams} />;
}
