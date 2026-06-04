import Link from "next/link";
import type { Metadata } from "next";
import { Gift } from "lucide-react";
import { ProductCard } from "@/components/common/product-card";
import { products } from "@/lib/data";

export const metadata: Metadata = {
  title: "Gift Guides",
  description: "Gift-ready jewellery recommendations for anniversaries, birthdays, weddings, and everyday gestures.",
};

const guides = [
  {
    title: "Anniversary Gifts",
    copy: "Choose refined stones, timeless silhouettes, and pieces that feel personal without needing exact sizing.",
    productIds: ["prod_2", "prod_3", "prod_8"],
  },
  {
    title: "Birthday Surprises",
    copy: "Small pieces with sparkle: studs, stacking rings, and delicate bracelets that are easy to wear immediately.",
    productIds: ["prod_6", "prod_9", "prod_12"],
  },
  {
    title: "Wedding Keepsakes",
    copy: "Statement jewellery for ceremonies, family gifting, and heirloom moments.",
    productIds: ["prod_5", "prod_11", "prod_4"],
  },
];

export default function GiftGuidesPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex items-center gap-4">
        <Gift className="text-[#B58E62]" size={36} strokeWidth={1.5} />
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-[#A07840]">Occasion edits</p>
          <h1 className="font-display text-6xl">Gift Guides</h1>
        </div>
      </div>
      <div className="mt-10 grid gap-10">
        {guides.map((guide) => {
          const guideProducts = guide.productIds.map((id) => products.find((product) => product.id === id)).filter(Boolean);
          return (
            <article key={guide.title} className="border-t border-[#EAE5DF] pt-8">
              <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
                <div>
                  <h2 className="font-display text-4xl">{guide.title}</h2>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-[#6B6B68]">{guide.copy}</p>
                </div>
                <Link href={`/search?q=${encodeURIComponent(guide.title.replace(" Gifts", ""))}`} className="text-xs font-semibold uppercase tracking-[0.18em] text-[#A07840]">
                  View more
                </Link>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {guideProducts.map((product) => product && <ProductCard key={product.id} product={product} />)}
              </div>
            </article>
          );
        })}
      </div>
    </main>
  );
}
