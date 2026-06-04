import { CategoryPage, categoryMetadata } from "@/components/product/category-page";

export const metadata = categoryMetadata("Necklaces");

export default function Page() {
  return <CategoryPage category="NECKLACE" title="Necklaces" copy="Layerable chains, pearl accents, and gemstone moments with a luminous finish." />;
}
