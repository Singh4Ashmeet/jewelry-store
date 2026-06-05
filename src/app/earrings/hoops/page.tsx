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
      categorySlug="earrings"
      title="Hoop Earrings"
      copy="Polished hoops and huggies with pearl, ruby, and diamond-inspired details for daily wear."
      pathname="/earrings/hoops"
      searchParams={await searchParams}
      subCategory={{
        label: 'Hoop Earrings',
        tag: 'hoops',
        parentHref: '/earrings',
        parentLabel: 'Earrings',
      }}
    />
  );
}
