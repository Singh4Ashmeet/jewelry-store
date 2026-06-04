import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ProductCard } from "@/components/common/product-card";
import { editorialImages, products } from "@/lib/data";

export const metadata: Metadata = {
  title: "Collections",
  description: "Explore curated Aurelia Jewellery edits for bridal, festive, gifting, and everyday occasions.",
};

const collections = [
  {
    title: "Bridal Collection",
    href: "/collections/bridal",
    image: editorialImages.bridal,
    copy: "Ceremonial pieces with heirloom presence and modern ease.",
    productIds: ["prod_5", "prod_11", "prod_2", "prod_1"],
  },
  {
    title: "Festive Picks",
    href: "/search?gem=diamond&sort=popular",
    image: editorialImages.hero,
    copy: "Luminous staples for celebrations, dinners, and festive dressing.",
    productIds: ["prod_3", "prod_4", "prod_8", "prod_9"],
  },
  {
    title: "Everyday Gold",
    href: "/search?metal=YELLOW_GOLD&stock=in",
    image: editorialImages.hands,
    copy: "Quiet signatures designed for daily wear and effortless layering.",
    productIds: ["prod_1", "prod_6", "prod_10", "prod_12"],
  },
];

export default function CollectionsPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <p className="text-xs uppercase tracking-[0.28em] text-[#A07840]">Curated edits</p>
      <h1 className="mt-3 font-display text-6xl">Collections</h1>
      <div className="mt-10 space-y-12">
        {collections.map((collection) => {
          const collectionProducts = collection.productIds.map((id) => products.find((product) => product.id === id)).filter(Boolean);
          return (
            <section key={collection.title}>
              <Link href={collection.href} className="group relative block min-h-80 overflow-hidden rounded-[8px] bg-[#F5F1EB]">
                <Image src={collection.image} alt={`${collection.title} banner`} fill sizes="100vw" className="object-cover transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#1C1C1A]/70 via-[#1C1C1A]/30 to-transparent" />
                <div className="absolute bottom-8 left-8 max-w-lg text-white">
                  <h2 className="font-display text-5xl">{collection.title}</h2>
                  <p className="mt-3 text-sm leading-6">{collection.copy}</p>
                </div>
              </Link>
              <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {collectionProducts.map((product) => product && <ProductCard key={product.id} product={product} />)}
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}
