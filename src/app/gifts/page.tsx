import { CategoryPage, categoryMetadata } from "@/components/product/category-page";

export const metadata = categoryMetadata("Gifts");

export default async function Page({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  return <CategoryPage category="GIFT" categorySlug="gifts" title="Gifts" copy="Gift-ready jewellery with premium packaging for milestones, rituals, and small celebrations." pathname="/gifts" searchParams={await searchParams} />;
}
