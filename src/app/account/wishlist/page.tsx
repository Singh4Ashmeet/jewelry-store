import type { Metadata } from "next";
import { WishlistClient } from "./wishlist-client";

export const metadata: Metadata = {
  title: "Wishlist",
  description: "Your saved Aurelia Jewellery pieces.",
};

export default function WishlistPage() {
  return <WishlistClient />;
}
