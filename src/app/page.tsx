import Link from "next/link";
/* eslint-disable @next/next/no-img-element */
import { Gem, Gift, LockKeyhole, Truck, Play } from "lucide-react";
import { ProductCard } from "@/components/common/product-card";
import { ButtonLink } from "@/components/common/button";
import { categoryPages, editorialImages, products, reviews } from "@/lib/data";

const trust = [
  [Gem, "Certified Quality", "IGI/GIA certified diamonds and fine materials"],
  [LockKeyhole, "Secure Checkout", "Encrypted payments and 100% secure shopping"],
  [Gift, "Gift Packaging", "Signature packaging for life's special moments"],
  [Truck, "Free Shipping", "Complimentary insured shipping on all orders"],
];

export default function Home() {
  const featured = products.filter((product) => product.isFeatured).slice(0, 4);

  return (
    <>
      <section className="relative overflow-hidden border-b border-[#EAE5DF]">
        <div className="absolute inset-0">
          <img src={editorialImages.hero} alt="Model wearing Aurelia jewellery" className="h-full w-full object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#FCFAF8] via-[#FCFAF8]/82 to-[#FCFAF8]/10" />
        </div>
        <div className="relative mx-auto flex min-h-[430px] max-w-7xl items-center px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-xl">
            <p className="text-xs font-medium uppercase tracking-[0.32em] text-[#A07840]">Timeless by design</p>
            <h1 className="mt-5 font-display text-5xl font-semibold leading-[0.95] sm:text-7xl">
              Where Elegance Becomes You
            </h1>
            <p className="mt-6 max-w-md text-base leading-7 text-[#2D2D2D]">
              Fine jewellery, thoughtfully crafted to celebrate your most precious moments.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/new-in" className="bg-[#B58E62] border-[#B58E62]">Shop New Arrivals</ButtonLink>
              <ButtonLink href="/collections/bridal" variant="secondary">Explore Collections</ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {categoryPages.slice(0, 5).map((category) => (
            <Link key={category.href} href={category.href} className="group relative h-32 overflow-hidden rounded-[8px] bg-[#F5F1EB]">
              <img src={category.image} alt={category.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#FCFAF8]/90 via-transparent to-transparent" />
              <p className="absolute bottom-4 left-0 right-0 text-center text-xs font-medium uppercase tracking-[0.18em]">{category.title}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-medium uppercase tracking-[0.28em]">Featured Pieces</h2>
          <Link href="/new-in" className="text-xs uppercase tracking-[0.18em] text-[#1C1C1A]">View all &rarr;</Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid rounded-[8px] border border-[#EAE5DF] bg-white/80 shadow-sm sm:grid-cols-2 lg:grid-cols-4">
          {trust.map(([Icon, title, copy]) => (
            <div key={title as string} className="flex gap-5 border-b border-[#EAE5DF] p-6 last:border-b-0 sm:nth-[2n]:border-l lg:border-b-0 lg:border-l lg:first:border-l-0">
              <Icon className="mt-1 shrink-0 text-[#B58E62]" size={34} strokeWidth={1.5} />
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-[0.16em]">{title as string}</h3>
                <p className="mt-2 text-xs leading-5 text-[#6B6B68]">{copy as string}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[0.75fr_1.25fr] lg:px-8">
        <div className="flex flex-col justify-center">
          <p className="text-xs uppercase tracking-[0.3em] text-[#A07840]">Crafted to perfection</p>
          <h2 className="mt-3 font-display text-4xl">The Aurelia Promise</h2>
          <p className="mt-4 max-w-md text-sm leading-7 text-[#6B6B68]">
            Every piece is a blend of timeless design and meticulous craftsmanship, made to create jewellery that becomes part of your story.
          </p>
          <ButtonLink href="/about" variant="secondary" className="mt-6 w-fit">Discover Our Craftsmanship</ButtonLink>
        </div>
        <div className="relative min-h-72 overflow-hidden rounded-[8px]">
          <img src={editorialImages.craft} alt="Jewellery craftsmanship" className="h-full min-h-72 w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/35 to-transparent" />
          <div className="absolute right-8 top-1/2 flex -translate-y-1/2 items-center gap-4 text-white">
            <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white"><Play fill="currentColor" /></span>
            <span className="max-w-40 text-xs font-semibold uppercase tracking-[0.2em]">See how we craft timeless beauty</span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="rounded-[8px] border border-[#EAE5DF] bg-white/80 p-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_1fr_1fr]">
            {reviews.map((review) => (
              <blockquote key={review} className="border-[#EAE5DF] text-sm leading-6 text-[#2D2D2D] lg:border-l lg:pl-6">
                <div className="mb-2 text-[#B58E62]">★★★★★</div>
                “{review}”
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-medium uppercase tracking-[0.24em]">@aurelia.jewellery</h2>
          <p className="flex items-center gap-2 text-xs uppercase tracking-[0.18em]">Follow us <span className="font-semibold">IG</span></p>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-8">
          {[...categoryPages, ...products.slice(0, 2)].map((item, index) => {
            const image = "image" in item ? item.image : item.images[0]?.url;
            return <img key={index} src={image} alt="Aurelia social gallery" className="aspect-square w-full rounded-[4px] object-cover" />;
          })}
        </div>
      </section>
    </>
  );
}
