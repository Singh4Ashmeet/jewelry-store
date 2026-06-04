import { CategoryPage, categoryMetadata } from "@/components/product/category-page";

export const metadata = categoryMetadata("Bridal Jewellery");

export default function Page() {
  return <CategoryPage category="BRIDAL" title="Bridal Jewellery" copy="Heirloom-inspired sets, chokers, and ceremonial pieces for modern weddings." />;
}
