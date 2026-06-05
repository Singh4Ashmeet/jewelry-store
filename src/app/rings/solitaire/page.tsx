import { CategoryPage, categoryMetadata } from '@/components/product/category-page';

export const metadata = categoryMetadata('Solitaire Rings');

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  return (
    <CategoryPage
      category="RING"
      categorySlug="rings"
      title="Solitaire Rings"
      copy="Refined center-stone rings with clean profiles, luminous settings, and everyday heirloom appeal."
      pathname="/rings/solitaire"
      searchParams={await searchParams}
      subCategory={{
        label: 'Solitaire Rings',
        tag: 'solitaire',
        parentHref: '/rings',
        parentLabel: 'Rings',
      }}
    />
  );
}
