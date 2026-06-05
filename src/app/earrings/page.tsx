import { CategoryPage, categoryMetadata } from "@/components/product/category-page";

export const metadata = categoryMetadata("Earrings");

export default async function Page({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  return <CategoryPage category="EARRING" categorySlug="earrings" title="Earrings" copy="Refined hoops, studs, and drops designed to frame the face with soft shine." pathname="/earrings" searchParams={await searchParams} />;
}
