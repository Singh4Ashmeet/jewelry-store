"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { WishlistItem } from "@/types";

type WishlistState = {
  items: WishlistItem[];
  addItem: (item: WishlistItem) => void;
  removeItem: (productId: string) => void;
  toggleItem: (item: WishlistItem) => void;
  hasItem: (productId: string) => boolean;
  clearWishlist: () => void;
};

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) =>
        set((state) => (state.items.some((entry) => entry.productId === item.productId) ? state : { items: [...state.items, item] })),
      removeItem: (productId) => set((state) => ({ items: state.items.filter((item) => item.productId !== productId) })),
      toggleItem: (item) => {
        if (get().hasItem(item.productId)) {
          get().removeItem(item.productId);
          return;
        }
        get().addItem(item);
      },
      hasItem: (productId) => get().items.some((item) => item.productId === productId),
      clearWishlist: () => set({ items: [] }),
    }),
    { name: "aurelia-wishlist" },
  ),
);
