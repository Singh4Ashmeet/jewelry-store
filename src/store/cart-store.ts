"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem } from "@/types";

type CartState = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (variantId: string) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  incrementItem: (variantId: string) => void;
  decrementItem: (variantId: string) => void;
  clearCart: () => void;
  cartTotal: () => number;
  cartCount: () => number;
};

function clampQuantity(quantity: number, stock: number) {
  return Math.min(Math.max(1, quantity), Math.max(1, stock));
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) =>
        set((state) => {
          if (item.stock < 1) {
            return state;
          }

          const existing = state.items.find((entry) => entry.variantId === item.variantId);
          if (existing) {
            return {
              items: state.items.map((entry) =>
                entry.variantId === item.variantId
                  ? {
                      ...entry,
                      stock: item.stock,
                      quantity: clampQuantity(entry.quantity + item.quantity, item.stock),
                    }
                  : entry,
              ),
            };
          }
          return { items: [...state.items, { ...item, quantity: clampQuantity(item.quantity, item.stock) }] };
        }),
      removeItem: (variantId) => set((state) => ({ items: state.items.filter((item) => item.variantId !== variantId) })),
      updateQuantity: (variantId, quantity) =>
        set((state) => ({
          items: state.items.map((item) => (item.variantId === variantId ? { ...item, quantity: clampQuantity(quantity, item.stock) } : item)),
        })),
      incrementItem: (variantId) =>
        set((state) => ({
          items: state.items.map((item) => (item.variantId === variantId ? { ...item, quantity: clampQuantity(item.quantity + 1, item.stock) } : item)),
        })),
      decrementItem: (variantId) =>
        set((state) => ({
          items: state.items.map((item) => (item.variantId === variantId ? { ...item, quantity: clampQuantity(item.quantity - 1, item.stock) } : item)),
        })),
      clearCart: () => set({ items: [] }),
      cartTotal: () => get().items.reduce((total, item) => total + item.price * item.quantity, 0),
      cartCount: () => get().items.reduce((total, item) => total + item.quantity, 0),
    }),
    { name: "aurelia-cart" },
  ),
);
