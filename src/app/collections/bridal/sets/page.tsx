import { CategoryPage, categoryMetadata } from '@/components/product/category-page';

export const metadata = categoryMetadata('Bridal Sets');

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  return (
    <CategoryPage
      category="BRIDAL"
      title="Bridal Sets"
      copy="Ceremonial chokers, earrings, maang tikkas, and polished sets for modern wedding rituals."
      searchParams={await searchParams}
    />
  );
}
