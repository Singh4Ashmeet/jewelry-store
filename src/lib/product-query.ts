import type { Prisma } from "@prisma/client";
import { products } from "@/lib/data";
import type { MetalType, Product, ProductCategory } from "@/types";

export type ProductSort = "price-asc" | "price-desc" | "newest" | "popular";

export type ProductFilterInput = {
  q?: string;
  category?: ProductCategory;
  minPrice?: number;
  maxPrice?: number;
  metals?: MetalType[];
  gemstones?: string[];
  inStock?: boolean;
  onSale?: boolean;
  sort?: ProductSort;
  limit?: number;
};

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

export const gemstoneOptions = ["diamond", "ruby", "emerald", "pearl"];

export function parseProductFilters(searchParams?: Record<string, string | string[] | undefined>): ProductFilterInput {
  const value = (key: string) => {
    const entry = searchParams?.[key];
    return Array.isArray(entry) ? entry[0] : entry;
  };
  const list = (key: string) => value(key)?.split(",").filter(Boolean) ?? [];
  const numberValue = (key: string) => {
    const parsed = Number(value(key));
    return Number.isFinite(parsed) ? parsed : undefined;
  };

  return {
    q: value("q")?.trim(),
    minPrice: numberValue("min"),
    maxPrice: numberValue("max"),
    metals: list("metal")
      .map((metal) => metal.toUpperCase().replace("-", "_"))
      .filter((metal): metal is MetalType => ["YELLOW_GOLD", "ROSE_GOLD", "WHITE_GOLD", "PLATINUM", "SILVER"].includes(metal)),
    gemstones: list("gem"),
    inStock: value("stock") === "in",
    onSale: value("sale") === "true",
    sort: (value("sort") as ProductSort | undefined) ?? "popular",
  };
}

export function getReviewCount(product: Product) {
  return product.reviews?.length || 74 + Number(product.id.replace(/\D/g, "") || 1) * 7;
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
  if (filters.minPrice !== undefined) result = result.filter((product) => product.basePrice >= filters.minPrice!);
  if (filters.maxPrice !== undefined) result = result.filter((product) => product.basePrice <= filters.maxPrice!);
  if (filters.metals?.length) {
    result = result.filter((product) => product.variants.some((variant) => filters.metals?.includes(variant.metal)));
  }
  if (filters.gemstones?.length) {
    result = result.filter((product) => {
      const haystack = `${product.name} ${product.description} ${product.tags.join(" ")}`.toLowerCase();
      return filters.gemstones?.some((gemstone) => haystack.includes(gemstone));
    });
  }
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
    createdAt: product.createdAt.toISOString(),
    reviews: product.reviews.map((review) => ({
      ...review,
      createdAt: review.createdAt.toISOString(),
      user: { name: review.user.name, image: review.user.image },
    })),
    variants: product.variants.map((variant) => ({ ...variant, metal: variant.metal as MetalType })),
  };
}

function prismaWhere(filters: ProductFilterInput): Prisma.ProductWhereInput {
  return {
    isActive: true,
    category: filters.category,
    basePrice: {
      gte: filters.minPrice,
      lte: filters.maxPrice,
    },
    compareAt: filters.onSale ? { not: null } : undefined,
    variants: filters.metals?.length || filters.inStock
      ? {
          some: {
            metal: filters.metals?.length ? { in: filters.metals } : undefined,
            stock: filters.inStock ? { gt: 0 } : undefined,
          },
        }
      : undefined,
  };
}

export async function queryProducts(filters: ProductFilterInput) {
  try {
    const { prisma } = await import("@/lib/prisma");
    const where = prismaWhere(filters);
    const matchingIds = filters.q
      ? await prisma.$queryRaw<{ id: string }[]>`
          SELECT id
          FROM "Product"
          WHERE to_tsvector('english', coalesce(name, '') || ' ' || coalesce(description, '') || ' ' || category::text)
            @@ plainto_tsquery('english', ${filters.q})
          LIMIT ${filters.limit ?? 24}
        `
      : null;

    const productsFromDb = await prisma.product.findMany({
      where: {
        ...where,
        id: matchingIds ? { in: matchingIds.map((item) => item.id) } : undefined,
      },
      include: { images: true, variants: true, reviews: { include: { user: true } } },
      orderBy:
        filters.sort === "price-asc"
          ? { basePrice: "asc" }
          : filters.sort === "price-desc"
            ? { basePrice: "desc" }
            : filters.sort === "newest"
              ? { createdAt: "desc" }
              : { reviews: { _count: "desc" } },
      take: filters.limit ?? 24,
    });

    return productsFromDb.map(toProduct);
  } catch {
    return filterLocalProducts(filters);
  }
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
