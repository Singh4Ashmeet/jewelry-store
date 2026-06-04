import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ChevronLeft, ChevronRight, Gem, Gift, ShieldCheck, Truck } from "lucide-react";
import { ProductVisual, ProductCard } from "@/components/common/product-card";
import { AddToCartPanel } from "@/components/product/add-to-cart-panel";
import { editorialImages, getProduct, products } from "@/lib/data";
import { formatPrice } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  return {
    title: product?.name ?? "Product",
    description: product?.shortDesc ?? "Aurelia Jewellery product",
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  const related = products.filter((item) => item.id !== product.id).slice(0, 5);
  const image = product.images[0]?.url;
  const gallery = [image, editorialImages.hands, editorialImages.hero, editorialImages.craft].filter(Boolean) as string[];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    offers: { "@type": "Offer", priceCurrency: "INR", price: product.basePrice, availability: "https://schema.org/InStock" },
  };

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-[#737373]">
          <Link href="/">Home</Link>
          <span>›</span>
          <Link href={`/${product.category.toLowerCase()}s`}>{product.category.toLowerCase()}</Link>
          <span>›</span>
          <span className="text-[#1C1C1A]">{product.name}</span>
        </div>

        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <div className="relative">
              <ProductVisual name={product.name} src={image} className="min-h-[520px] aspect-[1.18/1] rounded-[8px]" />
              {product.isBestseller && <span className="absolute left-5 top-5 rounded-sm bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#A07840]">Bestseller</span>}
              <button className="absolute left-5 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow" aria-label="Previous image">
                <ChevronLeft />
              </button>
              <button className="absolute right-5 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow" aria-label="Next image">
                <ChevronRight />
              </button>
            </div>
            <div className="mt-3 grid grid-cols-5 gap-3">
              {gallery.map((item, index) => (
                <ProductVisual key={item} name={`${product.name} view ${index + 1}`} src={item} className={`aspect-square rounded-[6px] ${index === 0 ? "ring-1 ring-[#B58E62]" : ""}`} />
              ))}
              <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-[6px] bg-[#B58E62]/25 text-xs font-semibold uppercase tracking-[0.16em] text-white">
                <Image src={editorialImages.craft} alt="Watch video" fill sizes="20vw" className="object-cover" />
                <div className="absolute inset-0 bg-black/25" />
                <span className="relative">Watch video</span>
              </div>
            </div>
          </div>

          <AddToCartPanel product={product} />
        </div>

        <section className="mt-14 grid rounded-[8px] border border-[#EAE5DF] bg-white/80 sm:grid-cols-2 lg:grid-cols-4">
          {[
            [Gem, "Certified Quality", "IGI/GIA certified diamonds and fine materials"],
            [Truck, "Insured Shipping", "Complimentary insured shipping on all orders"],
            [ShieldCheck, "Easy Returns", "30-day returns and exchanges"],
            [Gift, "Gift Packaging", "Signature packaging for life's special moments"],
          ].map(([Icon, title, copy]) => (
            <div key={title as string} className="flex gap-4 border-b border-[#EAE5DF] p-6 lg:border-b-0 lg:border-l lg:first:border-l-0">
              <Icon className="mt-1 shrink-0 text-[#B58E62]" size={30} strokeWidth={1.5} />
              <div>
                <h2 className="text-xs font-semibold uppercase tracking-[0.16em]">{title as string}</h2>
                <p className="mt-2 text-xs leading-5 text-[#6B6B68]">{copy as string}</p>
              </div>
            </div>
          ))}
        </section>

        <section className="mt-10 grid gap-8 lg:grid-cols-[1fr_0.95fr]">
          <div>
            <div className="flex gap-10 border-b border-[#EAE5DF] text-xs font-semibold uppercase tracking-[0.18em]">
              {["Details", "Size Guide", "Shipping & Returns", "Care"].map((tab, index) => (
                <button key={tab} className={`pb-4 ${index === 0 ? "border-b-2 border-[#B58E62] text-[#A07840]" : "text-[#6B6B68]"}`}>{tab}</button>
              ))}
            </div>
            <div className="mt-6 text-sm leading-7 text-[#2D2D2D]">
              <p>{product.description}</p>
              <ul className="mt-4 list-disc space-y-1 pl-5">
                <li>18K yellow gold with rose and platinum options</li>
                <li>Natural diamond-inspired center stone</li>
                <li>Handmade with precision and care</li>
                <li>Gift packaging and insured shipping included</li>
              </ul>
            </div>
          </div>
          <div className="grid overflow-hidden rounded-[8px] border border-[#EAE5DF] bg-white sm:grid-cols-[0.55fr_1fr]">
            <div className="p-6">
              <p className="text-xs uppercase tracking-[0.22em]">Loved by thousands</p>
              <p className="mt-5 font-display text-5xl">4.9</p>
              <p className="mt-2 text-[#B58E62]">★★★★★</p>
              <p className="mt-2 text-xs text-[#737373]">Based on verified purchases</p>
              <button className="mt-6 border border-[#B58E62] px-5 py-3 text-xs uppercase tracking-[0.18em] text-[#A07840]" type="button">
                Write a Review
              </button>
            </div>
            <div className="grid grid-cols-3 gap-2 p-3">
              {gallery.slice(0, 3).map((item) => (
                <div key={item} className="relative min-h-44 overflow-hidden rounded-[4px]">
                  <Image src={item} alt="Customer jewellery review" fill sizes="15vw" className="object-cover" />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-sm font-semibold uppercase tracking-[0.22em]">You may also like</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {related.map((item) => <ProductCard key={item.id} product={item} compact />)}
          </div>
        </section>
      </div>

      <div className="sticky bottom-0 z-30 border-t border-[#EAE5DF] bg-white/95 px-4 py-3 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <div className="hidden items-center gap-4 sm:flex">
            <ProductVisual name={product.name} src={image} className="h-16 w-20 aspect-auto rounded-[4px]" />
            <div>
              <p className="text-sm font-medium">{product.name}</p>
              <p className="text-xs text-[#737373]">18K Yellow Gold, Size 7</p>
            </div>
          </div>
          <p className="font-medium">{formatPrice(product.basePrice)}</p>
          <button className="h-12 min-w-52 rounded-sm bg-[#B58E62] px-8 text-xs font-semibold uppercase tracking-[0.18em] text-white" type="button">
            Add to Bag
          </button>
        </div>
      </div>
    </>
  );
}
