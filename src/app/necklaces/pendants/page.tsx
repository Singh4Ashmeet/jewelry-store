import { CategoryPage, categoryMetadata } from '@/components/product/category-page';

export const metadata = categoryMetadata('Pendants');

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  return (
    <CategoryPage
      category="NECKLACE"
      categorySlug="necklaces"
      title="Pendants"
      copy="Fine pendants, layered chains, and pearl collars designed to frame every neckline."
      pathname="/necklaces/pendants"
      searchParams={await searchParams}
      subCategory={{
        label: 'Pendants',
        tag: 'pendants',
        parentHref: '/necklaces',
        parentLabel: 'Necklaces',
      }}
    />
  );
}
