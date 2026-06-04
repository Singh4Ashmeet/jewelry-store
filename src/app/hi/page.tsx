import Link from "next/link";
import type { Metadata } from "next";
import { ProductCard } from "@/components/common/product-card";
import { products } from "@/lib/data";
import { t } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Aurelia Jewellery Hindi",
  description: "Aurelia Jewellery का हिंदी अनुभव।",
};

export default function HindiHomePage() {
  const featured = products.filter((product) => product.isFeatured).slice(0, 4);

  return (
    <main lang="hi">
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <p className="text-xs uppercase tracking-[0.28em] text-[#A07840]">Aurelia हिन्दी</p>
        <h1 className="mt-5 max-w-3xl font-display text-6xl font-semibold leading-tight">{t("hi", "headline")}</h1>
        <p className="mt-5 max-w-xl text-lg leading-8 text-[#2D2D2D]">{t("hi", "copy")}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/hi/search" className="inline-flex h-11 items-center justify-center rounded-sm border border-[#B58E62] bg-[#B58E62] px-5 text-xs font-medium uppercase tracking-[0.18em] text-white">
            {t("hi", "shop")}
          </Link>
          <Link href="/collections" className="inline-flex h-11 items-center justify-center rounded-sm border border-[#B58E62] px-5 text-xs font-medium uppercase tracking-[0.18em]">
            {t("hi", "collections")}
          </Link>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <h2 className="text-sm font-medium uppercase tracking-[0.22em]">लोकप्रिय डिज़ाइन</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
}
