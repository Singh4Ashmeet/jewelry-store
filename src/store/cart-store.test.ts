import { useCartStore } from "@/store/cart-store";
import type { CartItem } from "@/types";

const item: CartItem = {
  productId: "prod_1",
  variantId: "var_1",
  name: "Aurelia Signature Solitaire Ring",
  slug: "aurelia-signature-solitaire-ring",
  image: "/ring.jpg",
  metal: "YELLOW_GOLD",
  size: "7",
  price: 1850,
  quantity: 1,
  stock: 3,
  sku: "AUR-1-1",
};

describe("cart store", () => {
  beforeEach(() => {
    useCartStore.setState({ items: [] });
  });

  it("increments cart count and total when adding the same item", () => {
    useCartStore.getState().addItem(item);
    useCartStore.getState().addItem(item);

    expect(useCartStore.getState().cartCount()).toBe(2);
    expect(useCartStore.getState().cartTotal()).toBe(3700);
  });
});
