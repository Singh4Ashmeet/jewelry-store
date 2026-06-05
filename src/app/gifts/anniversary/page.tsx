import { CategoryPage, categoryMetadata } from '@/components/product/category-page';

export const metadata = categoryMetadata('Anniversary Gifts');

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  return (
    <CategoryPage
      category="GIFT"
      categorySlug="gifts"
      title="Anniversary Gifts"
      copy="Gift-ready pendants, studs, charms, and rings selected for meaningful milestone moments."
      pathname="/gifts/anniversary"
      searchParams={await searchParams}
      subCategory={{
        label: 'Anniversary Gifts',
        tag: 'anniversary',
        parentHref: '/gifts',
        parentLabel: 'Gifts',
      }}
    />
  );
}
