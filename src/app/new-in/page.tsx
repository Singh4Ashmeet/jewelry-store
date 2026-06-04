import { CategoryPage, categoryMetadata } from "@/components/product/category-page";

export const metadata = categoryMetadata("New In");

export default function Page() {
  return <CategoryPage title="New In" copy="Fresh arrivals across rings, bridal pieces, gifts, and everyday gold." />;
}
