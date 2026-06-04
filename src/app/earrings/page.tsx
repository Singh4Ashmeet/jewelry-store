import { CategoryPage, categoryMetadata } from "@/components/product/category-page";

export const metadata = categoryMetadata("Earrings");

export default function Page() {
  return <CategoryPage category="EARRING" title="Earrings" copy="Refined hoops, studs, and drops designed to frame the face with soft shine." />;
}
