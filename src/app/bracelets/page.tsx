import { CategoryPage, categoryMetadata } from "@/components/product/category-page";

export const metadata = categoryMetadata("Bracelets");

export default async function Page({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  return <CategoryPage category="BRACELET" title="Bracelets" copy="Minimal cuffs, chains, and tennis bracelets with polished everyday structure." searchParams={await searchParams} />;
}
