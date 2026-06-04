import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ButtonLink } from '@/components/common/button';
import { ProductCard } from '@/components/common/product-card';
import { ProductFilters } from '@/components/product/product-filters';
import { categoryPages, editorialImages } from '@/lib/data';
import { parseProductFilters, queryProducts } from '@/lib/product-query';
import type { ProductCategory } from '@/types';

const categoryEdits: Record<
  string,
  Array<{ title: string; href: string; image: string; copy: string }>
> = {
  RING: [
    {
      title: 'Solitaire Rings',
      href: '/rings/solitaire',
      image:
        'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=900&q=85',
      copy: 'Clean center-stone silhouettes.',
    },
    {
      title: 'Stacking Bands',
      href: '/search?q=stacking&metal=YELLOW_GOLD',
      image:
        'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=900&q=85',
      copy: 'Slim bands built for layering.',
    },
  ],
  EARRING: [
    {
      title: 'Hoop Earrings',
      href: '/earrings/hoops',
      image:
        'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=900&q=85',
      copy: 'Polished hoops and huggies.',
    },
    {
      title: 'Pearl Drops',
      href: '/search?q=pearl&gem=pearl',
      image:
        'https://images.unsplash.com/photo-1588444650733-d0767b753fc8?auto=format&fit=crop&w=900&q=85',
      copy: 'Soft movement for occasion wear.',
    },
  ],
  NECKLACE: [
    {
      title: 'Pendants',
      href: '/necklaces/pendants',
      image:
        'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&q=85',
      copy: 'Fine chains and signature stones.',
    },
    {
      title: 'Layering Chains',
      href: '/search?q=chain&metal=YELLOW_GOLD',
      image:
        'https://images.unsplash.com/photo-1611085583191-a3b181a88401?auto=format&fit=crop&w=900&q=85',
      copy: 'Delicate layers with warm shine.',
    },
  ],
  BRACELET: [
    {
      title: 'Tennis Bracelets',
      href: '/bracelets/tennis',
      image:
        'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=900&q=85',
      copy: 'Line-set stones and polished links.',
    },
    {
      title: 'Gold Cuffs',
      href: '/search?q=cuff&metal=YELLOW_GOLD',
      image:
        'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=900&q=85',
      copy: 'Sculptural bracelets for daily wear.',
    },
  ],
  BRIDAL: [
    {
      title: 'Bridal Sets',
      href: '/collections/bridal/sets',
      image:
        'https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=900&q=85',
      copy: 'Complete ceremony-ready styling.',
    },
    {
      title: 'Polki Edit',
      href: '/search?q=polki',
      image:
        'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&w=900&q=85',
      copy: 'Regal details for wedding rituals.',
    },
  ],
  GIFT: [
    {
      title: 'Anniversary Gifts',
      href: '/gifts/anniversary',
      image:
        'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=900&q=85',
      copy: 'Milestone pieces with meaning.',
    },
    {
      title: 'Under 1000',
      href: '/search?max=1000&sort=price-asc',
      image:
        'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=900&q=85',
      copy: 'Small luxuries, ready to gift.',
    },
  ],
  NEW: [
    {
      title: 'This Week',
      href: '/new-in?sort=newest',
      image:
        'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=900&q=85',
      copy: 'Fresh arrivals across every edit.',
    },
    {
      title: 'Bestseller Preview',
      href: '/search?sort=popular',
      image:
        'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?auto=format&fit=crop&w=900&q=85',
      copy: 'New pieces customers return to.',
    },
  ],
};

export function categoryMetadata(title: string): Metadata {
  return {
    title,
    description: `Shop ${title.toLowerCase()} from Aurelia Jewellery.`,
  };
}

export async function CategoryPage({
  category,
  title,
  copy,
  searchParams,
}: {
  category?: ProductCategory;
  title: string;
  copy: string;
  searchParams?: Record<string, string | string[] | undefined>;
}) {
  const filters = { ...parseProductFilters(searchParams), category };
  const items = await queryProducts(filters);
  const selected = categoryPages.find((page) => page.category === category);
  const heroImage = selected?.image ?? editorialImages.hero;
  const edits = categoryEdits[category ?? 'NEW'];

  return (
    <div>
      <section className="border-b border-[#EAE5DF] bg-white">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[0.88fr_1.12fr] lg:px-8">
          <div>
            <div className="mb-7 flex items-center gap-2 text-sm text-[#6B6B68]">
              <Link href="/">Home</Link>
              <span>/</span>
              <span className="text-[#1C1C1A]">{title}</span>
            </div>
            <p className="text-xs font-semibold tracking-[0.3em] text-[#A07840] uppercase">
              Aurelia edit
            </p>
            <h1 className="font-display mt-4 text-5xl leading-none font-semibold sm:text-7xl">
              {title}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-[#2D2D2D]">{copy}</p>
          </div>
          <div className="relative hidden h-72 overflow-hidden rounded-[8px] lg:block">
            <Image
              src={heroImage}
              alt={`${title} collection`}
              fill
              sizes="45vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#1C1C1A]/25 to-transparent" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-5 flex flex-col justify-between gap-3 lg:flex-row lg:items-end">
          <div>
            <h2 className="text-sm font-semibold tracking-[0.22em] uppercase">
              Shop the selection
            </h2>
            <p className="mt-2 text-sm text-[#6B6B68]">{items.length} refined results</p>
          </div>
          <p className="max-w-md text-sm leading-6 text-[#6B6B68]">
            Use filters to narrow the collection, then apply once to keep browsing smooth.
          </p>
        </div>

        <ProductFilters key={JSON.stringify(filters)} initialFilters={filters} />

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {edits.map((edit) => (
            <Link
              key={edit.href}
              href={edit.href}
              className="group relative min-h-64 overflow-hidden rounded-[8px] bg-[#F5F1EB]"
            >
              <Image
                src={edit.image}
                alt={`${edit.title} edit`}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1A]/70 via-[#1C1C1A]/20 to-transparent" />
              <div className="absolute bottom-6 left-6 max-w-xs text-white">
                <h2 className="font-display text-4xl leading-none">{edit.title}</h2>
                <p className="mt-3 text-sm leading-6">{edit.copy}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="relative mt-8 overflow-hidden rounded-[8px] bg-[#F5F1EB]">
          <div className="relative h-56 w-full">
            <Image
              src={editorialImages.hero}
              alt="Modern jewellery collection"
              fill
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#FCFAF8]/95 via-[#FCFAF8]/65 to-transparent" />
          <div className="absolute top-1/2 left-6 max-w-sm -translate-y-1/2 sm:left-12">
            <h2 className="font-display text-4xl leading-tight">
              Modern heirlooms for everyday elegance.
            </h2>
            <p className="mt-3 text-sm leading-6 text-[#2D2D2D]">
              Effortless designs crafted to be cherished today and passed down tomorrow.
            </p>
            <ButtonLink href="/new-in" className="mt-5 border-[#B58E62] bg-[#B58E62]">
              Explore the Collection
            </ButtonLink>
          </div>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
