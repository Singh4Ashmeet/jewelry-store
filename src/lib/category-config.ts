import type { ProductCategory } from '@/types';

export type CategoryConfig = {
  slug: string;
  label: string;
  category: ProductCategory;
  copy: string;
  subcategories: Array<{ slug: string; label: string; tag: string; copy: string }>;
};

export const shopCategories: CategoryConfig[] = [
  {
    slug: 'rings',
    label: 'Rings',
    category: 'RING',
    copy: 'Sculptural bands, fine solitaires, and stackable gold pieces for everyday radiance.',
    subcategories: [
      { slug: 'diamond', label: 'Diamond Rings', tag: 'diamond', copy: 'Diamond-led rings with luminous center stones and refined settings.' },
      { slug: 'gold', label: 'Gold Rings', tag: 'gold', copy: 'Warm gold rings made for daily stacking, gifting, and quiet shine.' },
      { slug: 'solitaire', label: 'Solitaire Rings', tag: 'solitaire', copy: 'Clean center-stone rings with heirloom polish.' },
      { slug: 'stacking', label: 'Stacking Rings', tag: 'stacking', copy: 'Slim bands designed to layer beautifully.' },
    ],
  },
  {
    slug: 'necklaces',
    label: 'Necklaces',
    category: 'NECKLACE',
    copy: 'Layerable chains, pearl accents, and gemstone moments with a luminous finish.',
    subcategories: [
      { slug: 'pearl', label: 'Pearl Necklaces', tag: 'pearl', copy: 'Soft pearl necklaces with polished occasion-ready detail.' },
      { slug: 'pendants', label: 'Pendants', tag: 'pendants', copy: 'Fine chains and signature pendants for everyday styling.' },
      { slug: 'gold', label: 'Gold Necklaces', tag: 'gold', copy: 'Gold chains and collars with versatile shine.' },
      { slug: 'chains', label: 'Layering Chains', tag: 'chains', copy: 'Delicate chains designed to layer with ease.' },
    ],
  },
  {
    slug: 'earrings',
    label: 'Earrings',
    category: 'EARRING',
    copy: 'Refined hoops, studs, and drops designed to frame the face with soft shine.',
    subcategories: [
      { slug: 'hoops', label: 'Hoop Earrings', tag: 'hoops', copy: 'Polished hoops and huggies for everyday wear.' },
      { slug: 'pearl', label: 'Pearl Earrings', tag: 'pearl', copy: 'Pearl drops and huggies with soft movement.' },
      { slug: 'studs', label: 'Stud Earrings', tag: 'studs', copy: 'Minimal studs with precise sparkle.' },
      { slug: 'diamond', label: 'Diamond Earrings', tag: 'diamond', copy: 'Diamond-inspired studs and drops with refined brilliance.' },
    ],
  },
  {
    slug: 'bracelets',
    label: 'Bracelets',
    category: 'BRACELET',
    copy: 'Minimal cuffs, chains, and tennis bracelets with polished everyday structure.',
    subcategories: [
      { slug: 'tennis', label: 'Tennis Bracelets', tag: 'tennis', copy: 'Line-set stones and polished links.' },
      { slug: 'gold', label: 'Gold Bracelets', tag: 'gold', copy: 'Warm gold cuffs and chains for daily polish.' },
      { slug: 'cuffs', label: 'Cuffs', tag: 'cuffs', copy: 'Sculptural cuffs with clean metalwork.' },
      { slug: 'chain', label: 'Chain Bracelets', tag: 'chain', copy: 'Flexible chain bracelets with refined movement.' },
    ],
  },
  {
    slug: 'gifts',
    label: 'Gifts',
    category: 'GIFT',
    copy: 'Gift-ready jewellery with premium packaging for milestones, rituals, and small celebrations.',
    subcategories: [
      { slug: 'anniversary', label: 'Anniversary Gifts', tag: 'anniversary', copy: 'Milestone pieces with enduring meaning.' },
      { slug: 'under-1000', label: 'Under 1000', tag: 'under-1000', copy: 'Small luxuries ready to gift.' },
      { slug: 'diamond', label: 'Diamond Gifts', tag: 'diamond', copy: 'Giftable diamond-inspired signatures.' },
    ],
  },
];

export function getCategoryBySlug(slug: string) {
  return shopCategories.find((category) => category.slug === slug);
}

export function getSubcategory(categorySlug: string, subCategorySlug: string) {
  return getCategoryBySlug(categorySlug)?.subcategories.find((item) => item.slug === subCategorySlug);
}
