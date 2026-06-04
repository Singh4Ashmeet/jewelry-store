'use client';

import Link from 'next/link';
import { Heart, Menu, ShoppingBag, User, X } from 'lucide-react';
import { HeaderSearch } from '@/components/layout/header-search';
import { useCartStore } from '@/store/cart-store';

const links = [
  ['New In', '/new-in'],
  ['Rings', '/rings'],
  ['Earrings', '/earrings'],
  ['Necklaces', '/necklaces'],
  ['Bracelets', '/bracelets'],
  ['Collections', '/collections'],
  ['Gifts', '/gifts'],
  ['Guides', '/gift-guides'],
];

export function Navbar() {
  const count = useCartStore((state) => state.cartCount());

  return (
    <header className="sticky top-0 z-40 border-b border-[#EAE5DF] bg-[#FCFAF8]/95 backdrop-blur">
      <div className="relative bg-[#F5F1EB] px-4 py-2 text-center text-[11px] font-medium tracking-[0.2em] text-[#1C1C1A] uppercase">
        Free shipping on all orders&nbsp;&nbsp; | &nbsp;&nbsp;Easy returns with 30-day policy
        <X className="absolute top-1/2 right-4 hidden -translate-y-1/2 sm:block" size={14} />
      </div>
      <nav className="mx-auto grid h-20 max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-4 px-4 sm:px-6 lg:px-8 xl:gap-8">
        <button className="lg:hidden" aria-label="Open menu">
          <Menu />
        </button>
        <Link
          href="/"
          className="font-display text-4xl font-semibold tracking-wide text-[#B58E62] sm:text-5xl"
        >
          Aurelia
        </Link>
        <div className="hidden min-w-0 items-center justify-center gap-5 lg:flex xl:gap-7">
          {links.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className="text-[11px] tracking-[0.18em] whitespace-nowrap text-[#2D2D2D] uppercase transition hover:text-[#A07840] xl:text-xs"
            >
              {label}
            </Link>
          ))}
        </div>
        <div className="flex min-w-0 items-center justify-end gap-3 xl:gap-4">
          <HeaderSearch />
          <Link href="/account/wishlist" aria-label="Wishlist" className="hidden sm:block">
            <Heart size={20} />
          </Link>
          <Link href="/account" aria-label="Account" className="hidden sm:block">
            <User size={20} />
          </Link>
          <Link href="/cart" aria-label="Cart" className="relative">
            <ShoppingBag size={20} />
            {count > 0 && (
              <span className="absolute -top-2 -right-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#B58E62] px-1 text-[10px] text-white">
                {count}
              </span>
            )}
          </Link>
          <Link
            href="/hi"
            hrefLang="hi"
            className="text-xs font-semibold tracking-[0.16em] uppercase"
            aria-label="Switch to Hindi"
          >
            HI
          </Link>
        </div>
      </nav>
    </header>
  );
}
