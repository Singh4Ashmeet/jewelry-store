import { CategoryPage, categoryMetadata } from "@/components/product/category-page";

export const metadata = categoryMetadata("Rings");

export default function Page() {
  return <CategoryPage category="RING" title="Rings" copy="Sculptural bands, fine solitaires, and stackable gold pieces for everyday radiance." />;
}
