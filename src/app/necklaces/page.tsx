import { CategoryPage, categoryMetadata } from "@/components/product/category-page";

export const metadata = categoryMetadata("Necklaces");

export default async function Page({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  return <CategoryPage category="NECKLACE" categorySlug="necklaces" title="Necklaces" copy="Layerable chains, pearl accents, and gemstone moments with a luminous finish." pathname="/necklaces" searchParams={await searchParams} />;
}
