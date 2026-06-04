"use client";

import Link from "next/link";
import { Heart, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { useCartStore } from "@/store/cart-store";

const links = [
  ["New In", "/new-in"],
  ["Rings", "/rings"],
  ["Earrings", "/earrings"],
  ["Necklaces", "/necklaces"],
  ["Bracelets", "/bracelets"],
  ["Bridal", "/collections/bridal"],
  ["Gifts", "/gifts"],
];

export function Navbar() {
  const count = useCartStore((state) => state.cartCount());

  return (
    <header className="sticky top-0 z-40 border-b border-[#EAE5DF] bg-[#FCFAF8]/95 backdrop-blur">
      <div className="relative bg-[#F5F1EB] px-4 py-2 text-center text-[11px] font-medium uppercase tracking-[0.2em] text-[#1C1C1A]">
        Free shipping on all orders&nbsp;&nbsp; | &nbsp;&nbsp;Easy returns with 30-day policy
        <X className="absolute right-4 top-1/2 hidden -translate-y-1/2 sm:block" size={14} />
      </div>
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <button className="lg:hidden" aria-label="Open menu">
          <Menu />
        </button>
        <Link href="/" className="font-display text-5xl font-semibold tracking-wide text-[#B58E62]">
          Aurelia
        </Link>
        <div className="hidden items-center gap-8 lg:flex">
          {links.map(([label, href]) => (
            <Link key={href} href={href} className="text-xs uppercase tracking-[0.18em] text-[#2D2D2D] transition hover:text-[#A07840]">
              {label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <Search size={20} />
          <Heart className="hidden sm:block" size={20} />
          <Link href="/account" aria-label="Account" className="hidden sm:block">
            <User size={20} />
          </Link>
          <Link href="/cart" aria-label="Cart" className="relative">
            <ShoppingBag size={20} />
            {count > 0 && <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#B58E62] px-1 text-[10px] text-white">{count}</span>}
          </Link>
        </div>
      </nav>
    </header>
  );
}
