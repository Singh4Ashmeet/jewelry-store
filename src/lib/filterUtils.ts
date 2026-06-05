import type { Prisma } from '@prisma/client';
import type { MetalType, Product, ProductCategory } from '@/types';

export type ProductSort = 'price-asc' | 'price-desc' | 'newest' | 'popular';

export type ProductFilterInput = {
  q?: string;
  category?: ProductCategory;
  subCategory?: string;
  minPrice?: number;
  maxPrice?: number;
  metals?: MetalType[];
  gemstones?: string[];
  minRating?: number;
  inStock?: boolean;
  onSale?: boolean;
  sort?: ProductSort;
  limit?: number;
};

export type ListingParams = ProductFilterInput & {
  page: number;
};

export const DEFAULT_PAGE_SIZE = 12;

export const metalOptions: MetalType[] = [
  'YELLOW_GOLD',
  'ROSE_GOLD',
  'WHITE_GOLD',
  'PLATINUM',
  'SILVER',
];

export const gemstoneOptions = ['diamond', 'ruby', 'emerald', 'pearl'];

const sortOptions: ProductSort[] = ['popular', 'price-asc', 'price-desc', 'newest'];

const filterParamKeys = ['min', 'max', 'metal', 'gem', 'rating', 'stock', 'sale', 'sort'];

function normalizeTag(value: string) {
  return value.trim().toLowerCase().replace(/_/g, '-').replace(/\s+/g, '-');
}

function firstValue(value?: string | string[]) {
  return Array.isArray(value) ? value[0] : value;
}

function listValue(value?: string | string[]) {
  return firstValue(value)
    ?.split(',')
    .map((item) => item.trim())
    .filter(Boolean) ?? [];
}

function positiveNumber(value?: string) {
  if (!value) return undefined;
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : undefined;
}

function positiveInteger(value?: string) {
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : undefined;
}

function parseMetal(value: string): MetalType | undefined {
  const normalized = value.toUpperCase().replace(/-/g, '_');
  return metalOptions.includes(normalized as MetalType) ? (normalized as MetalType) : undefined;
}

export function parseProductFilters(
  searchParams?: Record<string, string | string[] | undefined>,
): ProductFilterInput {
  const minRating = positiveInteger(firstValue(searchParams?.rating));
  const sort = firstValue(searchParams?.sort);

  return {
    q: firstValue(searchParams?.q)?.trim() || undefined,
    minPrice: positiveNumber(firstValue(searchParams?.min)),
    maxPrice: positiveNumber(firstValue(searchParams?.max)),
    metals: listValue(searchParams?.metal)
      .map(parseMetal)
      .filter((metal): metal is MetalType => Boolean(metal)),
    gemstones: listValue(searchParams?.gem).map(normalizeTag),
    minRating: minRating && minRating <= 5 ? minRating : undefined,
    inStock: firstValue(searchParams?.stock) === 'in',
    onSale: firstValue(searchParams?.sale) === 'true',
    sort: sortOptions.includes(sort as ProductSort) ? (sort as ProductSort) : 'popular',
  };
}

export function parseListingParams(
  searchParams?: Record<string, string | string[] | undefined>,
): ListingParams {
  return {
    ...parseProductFilters(searchParams),
    page: positiveInteger(firstValue(searchParams?.page)) ?? 1,
  };
}

export function buildFilterSearchParams(
  current: URLSearchParams | string,
  filters: ProductFilterInput,
  options: { resetPage?: boolean } = { resetPage: true },
) {
  const params = new URLSearchParams(current);
  const setOrDelete = (key: string, value?: string | number | boolean) => {
    if (value === undefined || value === '' || value === false) params.delete(key);
    else params.set(key, String(value));
  };

  setOrDelete('min', filters.minPrice);
  setOrDelete('max', filters.maxPrice);
  setOrDelete('metal', filters.metals?.length ? filters.metals.join(',') : undefined);
  setOrDelete('gem', filters.gemstones?.length ? filters.gemstones.join(',') : undefined);
  setOrDelete('rating', filters.minRating);
  setOrDelete('stock', filters.inStock ? 'in' : undefined);
  setOrDelete('sale', filters.onSale ? 'true' : undefined);
  setOrDelete('sort', filters.sort && filters.sort !== 'popular' ? filters.sort : undefined);

  if (options.resetPage !== false) params.delete('page');
  return params;
}

export function clearFilterSearchParams(current: URLSearchParams | string) {
  const params = new URLSearchParams(current);
  filterParamKeys.forEach((key) => params.delete(key));
  params.delete('page');
  return params;
}

export function pageSearchParams(current: URLSearchParams | string, page: number) {
  const params = new URLSearchParams(current);
  if (page <= 1) params.delete('page');
  else params.set('page', String(page));
  return params;
}

export function productMatchesGemstone(product: Product, gemstone: string) {
  const normalized = normalizeTag(gemstone);
  const haystack = `${product.name} ${product.description} ${product.shortDesc ?? ''} ${product.tags.join(' ')}`.toLowerCase();
  return haystack.includes(normalized);
}

export function productMatchesSubCategory(product: Product, subCategory: string) {
  const normalized = normalizeTag(subCategory);
  return product.tags.some((tag) => normalizeTag(tag) === normalized);
}

export function buildProductWhere(filters: ProductFilterInput): Prisma.ProductWhereInput {
  const q = filters.q;
  const gemstoneClauses =
    filters.gemstones?.flatMap((gemstone) => [
      { name: { contains: gemstone, mode: 'insensitive' as const } },
      { description: { contains: gemstone, mode: 'insensitive' as const } },
      { shortDesc: { contains: gemstone, mode: 'insensitive' as const } },
      { tags: { has: gemstone } },
    ]) ?? [];

  return {
    isActive: true,
    category: filters.category,
    basePrice: {
      gte: filters.minPrice,
      lte: filters.maxPrice,
    },
    tags: filters.subCategory ? { has: normalizeTag(filters.subCategory) } : undefined,
    compareAt: filters.onSale ? { not: null } : undefined,
    variants:
      filters.metals?.length || filters.inStock
        ? {
            some: {
              metal: filters.metals?.length ? { in: filters.metals } : undefined,
              stock: filters.inStock ? { gt: 0 } : undefined,
              isActive: true,
            },
          }
        : undefined,
    reviews: filters.minRating
      ? { some: { rating: { gte: filters.minRating }, isApproved: true } }
      : undefined,
    AND: [
      q
        ? {
            OR: [
              { name: { contains: q, mode: 'insensitive' } },
              { description: { contains: q, mode: 'insensitive' } },
              { shortDesc: { contains: q, mode: 'insensitive' } },
              { tags: { has: normalizeTag(q) } },
            ],
          }
        : {},
      gemstoneClauses.length ? { OR: gemstoneClauses } : {},
    ],
  };
}
