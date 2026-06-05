import Image from 'next/image';
import Link from 'next/link';
import { BadgeCheck, Camera, Gem, Gift, ShieldCheck, Sparkles, Star, Truck } from 'lucide-react';
import { ButtonLink } from '@/components/common/button';
import { ProductCard } from '@/components/common/product-card';
import { categoryPages, editorialImages, products, reviews } from '@/lib/data';

const trust = [
  [BadgeCheck, 'Certified quality', 'Thoughtfully sourced materials and verified craftsmanship.'],
  [Camera, 'Virtual try-on', 'Preview rings, earrings, and necklaces before checkout.'],
  [ShieldCheck, 'Private by design', 'Try-on frames stay in your browser unless you save them.'],
  [Truck, 'Insured shipping', 'Complimentary delivery with premium packaging.'],
];

export default function Home() {
  const tryOnProduct = products.find((product) => product.tryOn) ?? products[0];
  const trending = products.filter((product) => product.isFeatured || product.isBestseller).slice(0, 8);

  return (
    <>
      <section className="relative overflow-hidden border-b border-[#EAE5DF] bg-white">
        <div className="absolute inset-0">
          <Image
            src={editorialImages.hero}
            alt="Aurelia jewellery styled for virtual try-on"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#FCFAF8] via-[#FCFAF8]/88 to-[#FCFAF8]/18" />
        </div>
        <div className="relative mx-auto grid min-h-[620px] max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <p className="text-xs font-semibold tracking-[0.32em] text-[#A07840] uppercase">
              Aurelia Virtual Studio
            </p>
            <h1 className="font-display mt-5 text-6xl leading-[0.92] font-semibold sm:text-7xl lg:text-8xl">
              Try the glow before it arrives.
            </h1>
            <p className="mt-6 max-w-lg text-base leading-7 text-[#2D2D2D]">
              Fine jewellery with a private in-browser try-on experience for rings, earrings, and
              necklaces. Choose the piece, preview the fit, then add your exact variant to bag.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={`/try-on/${tryOnProduct.slug}`} className="border-[#B58E62] bg-[#B58E62]">
                Start Virtual Try-On
              </ButtonLink>
              <ButtonLink href="/rings" variant="secondary">
                Shop Jewellery
              </ButtonLink>
            </div>
            <div className="mt-8 grid max-w-xl gap-4 sm:grid-cols-3">
              {['Camera optional', 'No stored frames', 'Variant-ready'].map((item) => (
                <p key={item} className="flex items-center gap-2 text-xs font-semibold tracking-[0.14em] uppercase">
                  <Sparkles size={15} className="text-[#B58E62]" />
                  {item}
                </p>
              ))}
            </div>
          </div>
          <div className="hidden lg:block" />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-semibold tracking-[0.28em] text-[#A07840] uppercase">Shop by category</p>
            <h2 className="font-display mt-3 text-4xl">Find your signature piece</h2>
          </div>
          <Link href="/new-in" className="text-xs font-semibold tracking-[0.18em] uppercase hover:text-[#A07840]">
            View new arrivals
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categoryPages.slice(0, 4).map((category) => (
            <Link
              key={category.href}
              href={category.href}
              className="group relative min-h-72 overflow-hidden rounded-[8px] bg-[#F5F1EB] transition hover:-translate-y-1 hover:shadow-xl hover:shadow-[#1C1C1A]/10"
            >
              <Image
                src={category.image}
                alt={category.title}
                fill
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1A]/72 via-[#1C1C1A]/12 to-transparent" />
              <div className="absolute inset-x-5 bottom-5 text-white">
                <h3 className="font-display text-4xl">{category.title}</h3>
                <p className="mt-2 text-sm leading-6 text-white/82">{category.copy}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-[#EAE5DF] bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <div className="relative min-h-80 overflow-hidden rounded-[8px] bg-[#F5F1EB]">
            <Image src={editorialImages.hands} alt="Hand wearing rings for try-on preview" fill sizes="45vw" className="object-cover" />
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-xs font-semibold tracking-[0.28em] text-[#A07840] uppercase">Virtual fit preview</p>
            <h2 className="font-display mt-3 text-5xl leading-tight">A calmer way to choose fine jewellery online.</h2>
            <p className="mt-5 max-w-xl text-sm leading-7 text-[#6B6B68]">
              Preview scale and placement from your camera or an uploaded photo, adjust the model
              manually, then share the result or add the selected metal and size directly to cart.
            </p>
            <div className="mt-7 grid gap-4 sm:grid-cols-3">
              {trust.slice(1).map(([Icon, title, copy]) => (
                <div key={title as string} className="border-l border-[#EAE5DF] pl-4">
                  <Icon className="text-[#B58E62]" size={24} strokeWidth={1.5} />
                  <h3 className="mt-3 text-xs font-semibold tracking-[0.16em] uppercase">{title as string}</h3>
                  <p className="mt-2 text-xs leading-5 text-[#6B6B68]">{copy as string}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold tracking-[0.28em] text-[#A07840] uppercase">Trending now</p>
            <h2 className="font-display mt-3 text-4xl">Most-loved pieces</h2>
          </div>
          <Gem className="hidden text-[#B58E62] sm:block" size={34} strokeWidth={1.4} />
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {trending.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid overflow-hidden rounded-[8px] border border-[#EAE5DF] bg-white sm:grid-cols-2 lg:grid-cols-4">
          {trust.map(([Icon, title, copy]) => (
            <div key={title as string} className="flex gap-4 border-b border-[#EAE5DF] p-6 sm:border-r lg:border-b-0 lg:last:border-r-0">
              <Icon className="mt-1 shrink-0 text-[#B58E62]" size={28} strokeWidth={1.5} />
              <div>
                <h3 className="text-xs font-semibold tracking-[0.16em] uppercase">{title as string}</h3>
                <p className="mt-2 text-xs leading-5 text-[#6B6B68]">{copy as string}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-4 lg:grid-cols-3">
          {reviews.map((review) => (
            <blockquote key={review} className="rounded-[8px] border border-[#EAE5DF] bg-white p-6">
              <div className="mb-4 flex gap-1 text-[#B58E62]">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} size={15} fill="currentColor" />
                ))}
              </div>
              <p className="text-sm leading-7 text-[#2D2D2D]">&quot;{review}&quot;</p>
              <p className="mt-5 text-xs font-semibold tracking-[0.18em] text-[#6B6B68] uppercase">Verified customer</p>
            </blockquote>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[8px] bg-[#1C1C1A] px-6 py-12 text-white sm:px-10">
          <Gift className="text-[#B58E62]" size={34} strokeWidth={1.4} />
          <h2 className="font-display mt-4 max-w-2xl text-5xl leading-tight">Gift-ready pieces, previewed with confidence.</h2>
          <p className="mt-4 max-w-xl text-sm leading-7 text-white/72">
            Start with the virtual studio, save a screenshot, and choose the exact finish before it is wrapped.
          </p>
          <ButtonLink href="/gifts" className="mt-7 border-white bg-white text-[#1C1C1A]">
            Shop Gifts
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
