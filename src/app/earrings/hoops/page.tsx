import { CategoryPage, categoryMetadata } from '@/components/product/category-page';

export const metadata = categoryMetadata('Hoop Earrings');

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  return (
    <CategoryPage
      category="EARRING"
      title="Hoop Earrings"
      copy="Polished hoops and huggies with pearl, ruby, and diamond-inspired details for daily wear."
      searchParams={await searchParams}
    />
  );
}
