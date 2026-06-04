import Link from "next/link";
import { Mail, Phone } from "lucide-react";

const columns = [
  ["Shop", [["New In", "/new-in"], ["Rings", "/rings"], ["Earrings", "/earrings"], ["Necklaces", "/necklaces"], ["Bracelets", "/bracelets"], ["Collections", "/collections/bridal"], ["Gifts", "/gifts"]]],
  ["Customer Care", [["FAQs", "/faqs"], ["Shipping & Delivery", "/shipping-returns"], ["Returns & Exchanges", "/shipping-returns"], ["Size Guide", "/size-guide"], ["Care Instructions", "/care"], ["Contact Us", "/contact"]]],
  ["About Aurelia", [["Our Story", "/about"], ["Craftsmanship", "/about"], ["Sustainability", "/about"], ["Journal", "/about"], ["Careers", "/contact"], ["Store Locator", "/contact"]]],
];

export function Footer() {
  return (
    <footer className="border-t border-[#EAE5DF] bg-[#FAF7F2] text-[#1C1C1A]">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[1.2fr_2fr_0.9fr] lg:px-8">
        <div>
          <h2 className="font-display text-3xl">Stay Inspired</h2>
          <p className="mt-3 max-w-xs text-sm leading-6 text-[#6B6B68]">
            Be the first to discover new collections, exclusive offers and style stories.
          </p>
          <form className="mt-5 flex max-w-sm gap-2">
            <input className="min-w-0 flex-1 border border-[#D8D0C5] bg-transparent px-3 py-2 text-sm" placeholder="Enter your email" />
            <button className="rounded-sm bg-[#B58E62] px-4 text-xs font-semibold uppercase tracking-[0.16em] text-white">Subscribe</button>
          </form>
          <div className="mt-5 flex gap-4 text-[#2D2D2D]">
            {["IG", "FB", "PI", "YT"].map((item) => (
              <span key={item} className="flex h-7 w-7 items-center justify-center rounded-full border border-[#D8D0C5] text-[10px] font-semibold">
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="grid gap-8 border-y border-[#D8D0C5] py-8 sm:grid-cols-3 lg:border-y-0 lg:border-x lg:px-10 lg:py-0">
          {columns.map(([title, items]) => (
            <div key={title as string}>
              <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-[#2D2D2D]">{title as string}</h3>
              <div className="mt-4 grid gap-2">
                {(items as string[][]).map(([label, href]) => (
                  <Link key={label} href={href} className="text-sm text-[#6B6B68] hover:text-[#A07840]">
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-5 text-sm text-[#6B6B68]">
          <p className="flex items-start gap-3"><Phone className="mt-1 text-[#A07840]" size={20} /> <span>+1 (800) 123-4567<br />Mon - Fri, 9AM - 6PM EST</span></p>
          <p className="flex items-center gap-3"><Mail className="text-[#A07840]" size={20} /> hello@aurelia.com</p>
          <p className="pt-6 text-xs">© 2026 Aurelia Jewellery. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
