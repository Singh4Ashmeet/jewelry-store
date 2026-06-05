import { CategoryPage, categoryMetadata } from '@/components/product/category-page';

export const metadata = categoryMetadata('Tennis Bracelets');

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  return (
    <CategoryPage
      category="BRACELET"
      categorySlug="bracelets"
      title="Tennis Bracelets"
      copy="Structured bracelets, line settings, and gold cuffs with a polished luxury finish."
      pathname="/bracelets/tennis"
      searchParams={await searchParams}
      subCategory={{
        label: 'Tennis Bracelets',
        tag: 'tennis',
        parentHref: '/bracelets',
        parentLabel: 'Bracelets',
      }}
    />
  );
}
