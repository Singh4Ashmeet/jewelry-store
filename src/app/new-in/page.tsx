import { CategoryPage, categoryMetadata } from "@/components/product/category-page";

export const metadata = categoryMetadata("New In");

export default async function Page({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  return <CategoryPage title="New In" copy="Fresh arrivals across rings, bridal pieces, gifts, and everyday gold." searchParams={await searchParams} />;
}
