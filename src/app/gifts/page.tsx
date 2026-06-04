import { CategoryPage, categoryMetadata } from "@/components/product/category-page";

export const metadata = categoryMetadata("Gifts");

export default function Page() {
  return <CategoryPage category="GIFT" title="Gifts" copy="Gift-ready jewellery with premium packaging for milestones, rituals, and small celebrations." />;
}
