import { render, screen } from "@testing-library/react";
import { ProductCard } from "@/components/common/product-card";
import type { Product } from "@/types";

const product: Product = {
  id: "prod_1",
  name: "Aurelia Signature Solitaire Ring",
  slug: "aurelia-signature-solitaire-ring",
  description: "A luminous solitaire ring.",
  shortDesc: "18K gold, diamond-inspired brilliance",
  category: "RING",
  basePrice: 1850,
  compareAt: null,
  isFeatured: true,
  isNew: true,
  isBestseller: false,
  isActive: true,
  tags: ["ring"],
  createdAt: new Date().toISOString(),
  images: [{ id: "img_1", url: "/ring.jpg", alt: "Solitaire ring on velvet", position: 0, isPrimary: true }],
  variants: [
    {
      id: "var_1",
      sku: "AUR-1-1",
      metal: "YELLOW_GOLD",
      size: "7",
      price: 1850,
      stock: 3,
      isActive: true,
    },
  ],
  reviews: [
    {
      id: "rev_1",
      rating: 4,
      title: "Beautiful",
      body: "Lovely finish.",
      isApproved: true,
      createdAt: new Date().toISOString(),
      user: { name: "Customer", image: null },
    },
  ],
};

describe("ProductCard", () => {
  it("renders product name, price, rating and image alt text", () => {
    render(<ProductCard product={product} />);

    expect(screen.getByText("Aurelia Signature Solitaire Ring")).toBeInTheDocument();
    expect(screen.getByText("₹1,850")).toBeInTheDocument();
    expect(screen.getByText("(81)")).toBeInTheDocument();
    expect(screen.getByAltText("Solitaire ring on velvet")).toBeInTheDocument();
  });
});
