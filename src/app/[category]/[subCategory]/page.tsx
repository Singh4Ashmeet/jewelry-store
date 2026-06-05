import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CategoryPage } from '@/components/product/category-page';
import { getCategoryBySlug, getSubcategory } from '@/lib/category-config';

type Props = {
  params: Promise<{ category: string; subCategory: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, subCategory } = await params;
  const categoryConfig = getCategoryBySlug(category);
  const subCategoryConfig = getSubcategory(category, subCategory);

  if (!categoryConfig || !subCategoryConfig) {
    return { title: 'Collection' };
  }

  return {
    title: subCategoryConfig.label,
    description: `Shop ${subCategoryConfig.label.toLowerCase()} from Aurelia Jewellery.`,
  };
}

export default async function Page({ params, searchParams }: Props) {
  const { category, subCategory } = await params;
  const categoryConfig = getCategoryBySlug(category);
  const subCategoryConfig = getSubcategory(category, subCategory);

  if (!categoryConfig || !subCategoryConfig) notFound();

  return (
    <CategoryPage
      category={categoryConfig.category}
      categorySlug={categoryConfig.slug}
      title={subCategoryConfig.label}
      copy={subCategoryConfig.copy}
      pathname={`/${categoryConfig.slug}/${subCategoryConfig.slug}`}
      searchParams={await searchParams}
      subCategory={{
        label: subCategoryConfig.label,
        tag: subCategoryConfig.tag,
        parentHref: `/${categoryConfig.slug}`,
        parentLabel: categoryConfig.label,
      }}
    />
  );
}
