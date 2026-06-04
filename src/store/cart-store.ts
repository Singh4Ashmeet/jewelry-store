"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem } from "@/types";

type CartState = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (variantId: string) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: () => number;
  cartCount: () => number;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) =>
        set((state) => {
          const existing = state.items.find((entry) => entry.variantId === item.variantId);
          if (existing) {
            return {
              items: state.items.map((entry) =>
                entry.variantId === item.variantId ? { ...entry, quantity: entry.quantity + item.quantity } : entry,
              ),
            };
          }
          return { items: [...state.items, item] };
        }),
      removeItem: (variantId) => set((state) => ({ items: state.items.filter((item) => item.variantId !== variantId) })),
      updateQuantity: (variantId, quantity) =>
        set((state) => ({
          items: state.items.map((item) => (item.variantId === variantId ? { ...item, quantity: Math.max(1, quantity) } : item)),
        })),
      clearCart: () => set({ items: [] }),
      cartTotal: () => get().items.reduce((total, item) => total + item.price * item.quantity, 0),
      cartCount: () => get().items.reduce((total, item) => total + item.quantity, 0),
    }),
    { name: "aurelia-cart" },
  ),
);
