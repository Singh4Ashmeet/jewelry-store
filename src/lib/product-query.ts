import type { Prisma } from "@prisma/client";
import { products } from "@/lib/data";
import {
  buildProductWhere,
  DEFAULT_PAGE_SIZE,
  gemstoneOptions,
  parseProductFilters,
  productMatchesGemstone,
  productMatchesSubCategory,
  type ProductFilterInput,
  type ProductSort,
} from "@/lib/filterUtils";
import type { MetalType, Product, ProductCategory, TryOnMetadata } from "@/types";

export { gemstoneOptions, parseProductFilters };
export type { ProductFilterInput, ProductSort };

type ProductWithRelations = Prisma.ProductGetPayload<{
  include: { images: true; variants: true; reviews: { include: { user: true } } };
}>;

const metalLabels: Record<MetalType, string[]> = {
  YELLOW_GOLD: ["gold", "yellow-gold"],
  ROSE_GOLD: ["gold", "rose-gold"],
  WHITE_GOLD: ["gold", "white-gold"],
  PLATINUM: ["platinum"],
  SILVER: ["silver"],
};

export function getReviewCount(product: Product) {
  return product.reviews?.length || 74 + Number(product.id.replace(/\D/g, "") || 1) * 7;
}

function getAverageRating(product: Product) {
  const reviews = product.reviews ?? [];
  if (!reviews.length) return 0;
  return reviews.reduce((total, review) => total + review.rating, 0) / reviews.length;
}

export function filterLocalProducts(filters: ProductFilterInput) {
  let result = [...products];
  const query = filters.q?.toLowerCase();

  if (query) {
    result = result.filter((product) =>
      [product.name, product.description, product.category, product.shortDesc ?? "", ...product.tags].some((field) => field.toLowerCase().includes(query)),
    );
  }
  if (filters.category) result = result.filter((product) => product.category === filters.category);
  if (filters.subCategory) result = result.filter((product) => productMatchesSubCategory(product, filters.subCategory!));
  if (filters.minPrice !== undefined) result = result.filter((product) => product.basePrice >= filters.minPrice!);
  if (filters.maxPrice !== undefined) result = result.filter((product) => product.basePrice <= filters.maxPrice!);
  if (filters.metals?.length) {
    result = result.filter((product) => product.variants.some((variant) => filters.metals?.includes(variant.metal)));
  }
  if (filters.gemstones?.length) {
    result = result.filter((product) => filters.gemstones?.some((gemstone) => productMatchesGemstone(product, gemstone)));
  }
  if (filters.minRating) result = result.filter((product) => getAverageRating(product) >= filters.minRating!);
  if (filters.inStock) result = result.filter((product) => product.variants.some((variant) => variant.stock > 0));
  if (filters.onSale) result = result.filter((product) => product.compareAt !== null);

  result.sort((a, b) => {
    if (filters.sort === "price-asc") return a.basePrice - b.basePrice;
    if (filters.sort === "price-desc") return b.basePrice - a.basePrice;
    if (filters.sort === "newest") return Date.parse(b.createdAt) - Date.parse(a.createdAt);
    return getReviewCount(b) - getReviewCount(a);
  });

  return filters.limit ? result.slice(0, filters.limit) : result;
}

function toProduct(product: ProductWithRelations): Product {
  return {
    ...product,
    category: product.category as ProductCategory,
    tryOn: product.tryOn as TryOnMetadata | null,
    createdAt: product.createdAt.toISOString(),
    reviews: product.reviews.map((review) => ({
      ...review,
      createdAt: review.createdAt.toISOString(),
      user: { name: review.user.name, image: review.user.image },
    })),
    variants: product.variants.map((variant) => ({ ...variant, metal: variant.metal as MetalType })),
  };
}

function orderBy(sort: ProductSort | undefined) {
  if (sort === "price-asc") return { basePrice: "asc" as const };
  if (sort === "price-desc") return { basePrice: "desc" as const };
  if (sort === "newest") return { createdAt: "desc" as const };
  return { reviews: { _count: "desc" as const } };
}

export async function queryProductListing(
  filters: ProductFilterInput,
  options: { page?: number; pageSize?: number } = {},
) {
  const pageSize = options.pageSize ?? DEFAULT_PAGE_SIZE;
  const page = Math.max(1, options.page ?? 1);
  const skip = (page - 1) * pageSize;

  try {
    const { prisma } = await import("@/lib/prisma");
    const where = buildProductWhere(filters);
    const [total, productsFromDb] = await prisma.$transaction([
      prisma.product.count({ where }),
      prisma.product.findMany({
        where,
        include: { images: true, variants: true, reviews: { include: { user: true } } },
        orderBy: orderBy(filters.sort),
        skip,
        take: pageSize,
      }),
    ]);

    return {
      items: productsFromDb.map(toProduct),
      total,
      page,
      pageSize,
      totalPages: Math.max(1, Math.ceil(total / pageSize)),
    };
  } catch {
    const allItems = filterLocalProducts(filters);
    const total = allItems.length;
    return {
      items: allItems.slice(skip, skip + pageSize),
      total,
      page,
      pageSize,
      totalPages: Math.max(1, Math.ceil(total / pageSize)),
    };
  }
}

export async function queryProducts(filters: ProductFilterInput) {
  const listing = await queryProductListing(filters, { page: 1, pageSize: filters.limit ?? 24 });
  return listing.items;
}

export function getRelatedProducts(product: Product, count = 4) {
  return products
    .filter((item) => item.id !== product.id)
    .map((item) => {
      const categoryScore = item.category === product.category ? 4 : 0;
      const metalScore = item.variants.some((variant) => product.variants.some((selected) => selected.metal === variant.metal)) ? 2 : 0;
      const priceScore = Math.abs(item.basePrice - product.basePrice) < 2500 ? 1 : 0;
      return { item, score: categoryScore + metalScore + priceScore };
    })
    .sort((a, b) => b.score - a.score || b.item.basePrice - a.item.basePrice)
    .slice(0, count)
    .map(({ item }) => item);
}

export function metalMatchesGemstone(product: Product, gemstone: string) {
  const haystack = `${product.name} ${product.description} ${product.tags.join(" ")}`.toLowerCase();
  return haystack.includes(gemstone.toLowerCase());
}

export function metalLabelIncludes(metal: MetalType, value: string) {
  return metalLabels[metal].includes(value.toLowerCase());
}
