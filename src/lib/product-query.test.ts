import { filterLocalProducts, parseProductFilters } from "@/lib/product-query";

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
});
