import { CategoryPage, categoryMetadata } from "@/components/product/category-page";

export const metadata = categoryMetadata("Bracelets");

export default function Page() {
  return <CategoryPage category="BRACELET" title="Bracelets" copy="Minimal cuffs, chains, and tennis bracelets with polished everyday structure." />;
}
