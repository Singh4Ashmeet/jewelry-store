import { filterLocalProducts, parseProductFilters, queryProductListing } from "@/lib/product-query";

describe("product query helpers", () => {
  it("parses shareable filter query parameters", () => {
    const filters = parseProductFilters({
      q: "ring",
      min: "500",
      max: "3000",
      metal: "YELLOW_GOLD,SILVER",
      gem: "diamond",
      stock: "in",
      sale: "true",
      sort: "price-asc",
    });

    expect(filters).toEqual({
      q: "ring",
      minPrice: 500,
      maxPrice: 3000,
      metals: ["YELLOW_GOLD", "SILVER"],
      gemstones: ["diamond"],
      inStock: true,
      onSale: true,
      sort: "price-asc",
    });
  });

  it("filters local products by search text and category", () => {
    const products = filterLocalProducts({ q: "ring", category: "RING" });

    expect(products.length).toBeGreaterThan(0);
    expect(products.every((product) => product.category === "RING")).toBe(true);
  });

  it("filters local products by subcategory tags", () => {
    const products = filterLocalProducts({ category: "RING", subCategory: "solitaire" });

    expect(products.length).toBeGreaterThan(0);
    expect(products.every((product) => product.tags.includes("solitaire"))).toBe(true);
  });

  it("returns paginated listing metadata", async () => {
    const listing = await queryProductListing({ category: "RING" }, { page: 2, pageSize: 3 });

    expect(listing.items).toHaveLength(3);
    expect(listing.total).toBeGreaterThan(3);
    expect(listing.page).toBe(2);
    expect(listing.totalPages).toBeGreaterThan(1);
  });
});
