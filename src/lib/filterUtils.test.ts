import {
  buildFilterSearchParams,
  clearFilterSearchParams,
  parseListingParams,
  parseProductFilters,
  productMatchesSubCategory,
} from '@/lib/filterUtils';
import { products } from '@/lib/data';

describe('filter utils', () => {
  it('parses shareable filter query parameters', () => {
    const filters = parseListingParams({
      q: 'ring',
      page: '3',
      min: '500',
      max: '3000',
      metal: 'YELLOW_GOLD,silver',
      gem: 'diamond,pearl',
      rating: '4',
      stock: 'in',
      sale: 'true',
      sort: 'price-asc',
    });

    expect(filters).toEqual({
      q: 'ring',
      page: 3,
      minPrice: 500,
      maxPrice: 3000,
      metals: ['YELLOW_GOLD', 'SILVER'],
      gemstones: ['diamond', 'pearl'],
      minRating: 4,
      inStock: true,
      onSale: true,
      sort: 'price-asc',
    });
  });

  it('ignores invalid values gracefully', () => {
    expect(
      parseListingParams({
        page: '-2',
        min: 'nope',
        max: '-10',
        metal: 'WOOD,YELLOW_GOLD',
        rating: '7',
        sort: 'expensive',
      }),
    ).toEqual({
      page: 1,
      minPrice: undefined,
      maxPrice: undefined,
      metals: ['YELLOW_GOLD'],
      gemstones: [],
      minRating: undefined,
      inStock: false,
      onSale: false,
      sort: 'popular',
      q: undefined,
    });
  });

  it('merges filter query values and preserves unrelated params', () => {
    const params = buildFilterSearchParams('q=ring&utm=nav&page=4', {
      minPrice: 100,
      maxPrice: 500,
      metals: ['YELLOW_GOLD'],
      gemstones: ['diamond'],
      sort: 'price-desc',
    });

    expect(params.toString()).toBe('q=ring&utm=nav&page=1&min=100&max=500&metal=YELLOW_GOLD&gem=diamond&sort=price-desc');
  });

  it('clears only known filter params and pagination', () => {
    const params = clearFilterSearchParams('q=ring&metal=SILVER&page=2&utm=nav&sale=true');

    expect(params.toString()).toBe('q=ring&utm=nav');
  });

  it('matches products by normalized subcategory tags', () => {
    const solitaire = products.find((product) => product.tags.includes('solitaire'));

    expect(solitaire).toBeDefined();
    expect(productMatchesSubCategory(solitaire!, 'solitaire')).toBe(true);
  });

  it('keeps parseProductFilters available for existing callers', () => {
    expect(parseProductFilters({ sort: 'newest' }).sort).toBe('newest');
  });
});
