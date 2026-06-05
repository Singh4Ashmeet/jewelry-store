import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { TryOnViewer } from '@/components/TryOnViewer';
import { getProductByTryOnId } from '@/lib/data';
import type { MetalType, Product, ProductCategory, TryOnMetadata } from '@/types';

type Props = {
  params: Promise<{ productId: string }>;
};

type DbProduct = Awaited<ReturnType<typeof fetchProductFromDb>>;

async function fetchProductFromDb(productId: string) {
  try {
    const { prisma } = await import('@/lib/prisma');
    return prisma.product.findFirst({
      where: { OR: [{ id: productId }, { slug: productId }] },
      include: { images: true, variants: true, reviews: { include: { user: true } } },
    });
  } catch {
    return null;
  }
}

function toProduct(product: NonNullable<DbProduct>): Product {
  return {
    ...product,
    category: product.category as ProductCategory,
    tryOn: product.tryOn as TryOnMetadata | null,
    createdAt: product.createdAt.toISOString(),
    variants: product.variants.map((variant) => ({ ...variant, metal: variant.metal as MetalType })),
    reviews: product.reviews.map((review) => ({
      ...review,
      createdAt: review.createdAt.toISOString(),
      user: { name: review.user.name, image: review.user.image },
    })),
  };
}

async function getTryOnProduct(productId: string) {
  const fromDb = await fetchProductFromDb(productId);
  return fromDb ? toProduct(fromDb) : getProductByTryOnId(productId);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { productId } = await params;
  const product = await getTryOnProduct(productId);
  return {
    title: product ? `Virtual Try-On: ${product.name}` : 'Virtual Try-On',
    description: product?.shortDesc ?? 'Try Aurelia Jewellery with in-browser virtual try-on.',
  };
}

export default async function TryOnPage({ params }: Props) {
  const { productId } = await params;
  const product = await getTryOnProduct(productId);
  if (!product?.tryOn) notFound();

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-[#737373]">
        <Link href="/">Home</Link>
        <span>/</span>
        <Link href={`/product/${product.slug}`}>{product.name}</Link>
        <span>/</span>
        <span className="text-[#1C1C1A]">Virtual Try-On</span>
      </div>
      <TryOnViewer product={product} tryOn={product.tryOn} />
    </main>
  );
}
