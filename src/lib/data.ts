import type { MetalType, Product, ProductCategory, SalesDataPoint } from '@/types';

const now = new Date().toISOString();

export const editorialImages = {
  hero: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1800&q=85',
  craft:
    'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?auto=format&fit=crop&w=1400&q=85',
  hands:
    'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1400&q=85',
  bridal:
    'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1400&q=85',
};

export const categoryPages = [
  {
    href: '/rings',
    title: 'Rings',
    category: 'RING' as ProductCategory,
    copy: 'Sculptural bands, solitaires, and everyday gold signatures.',
    image:
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=900&q=85',
  },
  {
    href: '/necklaces',
    title: 'Necklaces',
    category: 'NECKLACE' as ProductCategory,
    copy: 'Delicate chains and luminous statement pieces.',
    image:
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&q=85',
  },
  {
    href: '/earrings',
    title: 'Earrings',
    category: 'EARRING' as ProductCategory,
    copy: 'Pearl drops, hoops, studs, and occasion-ready sparkle.',
    image:
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=900&q=85',
  },
  {
    href: '/bracelets',
    title: 'Bracelets',
    category: 'BRACELET' as ProductCategory,
    copy: 'Stackable cuffs and fine bracelets with refined detail.',
    image:
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=900&q=85',
  },
  {
    href: '/collections/bridal',
    title: 'Bridal',
    category: 'BRIDAL' as ProductCategory,
    copy: 'Heirloom-inspired jewellery for ceremonies and keepsakes.',
    image:
      'https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=900&q=85',
  },
  {
    href: '/gifts',
    title: 'Gifts',
    category: 'GIFT' as ProductCategory,
    copy: 'Meaningful gifts with packaging worthy of the moment.',
    image:
      'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=900&q=85',
  },
];

const productNames = [
  [
    'Aurelia Signature Solitaire Ring',
    'RING',
    1850,
    true,
    true,
    'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=900&q=90',
  ],
  [
    'Luna Teardrop Pendant',
    'NECKLACE',
    1590,
    true,
    false,
    'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&q=90',
  ],
  [
    'Eternal Hoop Earrings',
    'EARRING',
    1250,
    true,
    true,
    'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=900&q=90',
  ],
  [
    'Classic Diamond Tennis Bracelet',
    'BRACELET',
    3450,
    true,
    false,
    'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=900&q=90',
  ],
  [
    'Zariya Bridal Choker',
    'BRIDAL',
    5200,
    true,
    false,
    'https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=900&q=90',
  ],
  [
    'Petite Diamond Studs',
    'GIFT',
    680,
    false,
    true,
    'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=900&q=90',
  ],
  [
    'Eternal Radiance Ring',
    'RING',
    1450,
    false,
    false,
    'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=900&q=90',
  ],
  [
    'Ira Emerald Necklace',
    'NECKLACE',
    2890,
    true,
    false,
    'https://images.unsplash.com/photo-1611085583191-a3b181a88401?auto=format&fit=crop&w=900&q=90',
  ],
  [
    'Veda Pearl Drops',
    'EARRING',
    1320,
    false,
    true,
    'https://images.unsplash.com/photo-1588444650733-d0767b753fc8?auto=format&fit=crop&w=900&q=90',
  ],
  [
    'Amara Chain Bracelet',
    'BRACELET',
    1680,
    false,
    false,
    'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=900&q=90',
  ],
  [
    'Mehreen Bridal Set',
    'BRIDAL',
    7800,
    true,
    true,
    'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&w=900&q=90',
  ],
  [
    'Beaded Stacking Ring',
    'GIFT',
    380,
    false,
    false,
    'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=900&q=90',
  ],
  [
    'Mira Oval Diamond Ring',
    'RING',
    2250,
    true,
    false,
    'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=900&q=90',
  ],
  [
    'Noor Stacking Band',
    'RING',
    920,
    false,
    true,
    'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=900&q=90',
  ],
  [
    'Sia Pearl Collar Necklace',
    'NECKLACE',
    2480,
    true,
    true,
    'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&q=90',
  ],
  [
    'Ayla Layered Chain',
    'NECKLACE',
    1180,
    false,
    false,
    'https://images.unsplash.com/photo-1611085583191-a3b181a88401?auto=format&fit=crop&w=900&q=90',
  ],
  [
    'Raina Ruby Drop Earrings',
    'EARRING',
    1720,
    true,
    false,
    'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=900&q=90',
  ],
  [
    'Everyday Pearl Huggies',
    'EARRING',
    760,
    false,
    true,
    'https://images.unsplash.com/photo-1588444650733-d0767b753fc8?auto=format&fit=crop&w=900&q=90',
  ],
  [
    'Tara Emerald Line Bracelet',
    'BRACELET',
    2760,
    true,
    false,
    'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=900&q=90',
  ],
  [
    'Lila Gold Cuff',
    'BRACELET',
    990,
    false,
    true,
    'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=900&q=90',
  ],
  [
    'Anika Bridal Maang Tikka',
    'BRIDAL',
    3180,
    false,
    true,
    'https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=900&q=90',
  ],
  [
    'Kavya Polki Bridal Earrings',
    'BRIDAL',
    4650,
    true,
    false,
    'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&w=900&q=90',
  ],
  [
    'Gift Box Diamond Pendant',
    'GIFT',
    1450,
    true,
    true,
    'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=900&q=90',
  ],
  [
    'Minimal Silver Charm',
    'GIFT',
    540,
    false,
    false,
    'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=900&q=90',
  ],
] as const;

const catalogueItems = productNames.flatMap((item) => {
  const [name, category, price, featured, isNew, image] = item;
  return Array.from({ length: 4 }, (_, edition) => [
    edition === 0 ? name : `${name} ${['Reserve', 'Atelier', 'Heritage'][edition - 1]}`,
    category,
    price + edition * 220,
    featured && edition < 2,
    isNew || edition === 3,
    image,
  ] as const);
});

function subcategoryTags(category: ProductCategory, name: string, price: number) {
  const lower = name.toLowerCase();
  const tags = new Set<string>(['gold']);

  if (lower.includes('diamond') || lower.includes('solitaire') || lower.includes('radiance') || lower.includes('oval')) tags.add('diamond');
  if (lower.includes('pearl')) tags.add('pearl');
  if (lower.includes('ruby')) tags.add('ruby');
  if (lower.includes('emerald')) tags.add('emerald');

  if (category === 'RING') {
    if (lower.includes('solitaire')) tags.add('solitaire');
    if (lower.includes('stacking') || lower.includes('band')) tags.add('stacking');
  }
  if (category === 'NECKLACE') {
    if (lower.includes('pendant')) tags.add('pendants');
    if (lower.includes('chain') || lower.includes('layered')) tags.add('chains');
  }
  if (category === 'EARRING') {
    if (lower.includes('hoop') || lower.includes('huggies')) tags.add('hoops');
    if (lower.includes('stud')) tags.add('studs');
  }
  if (category === 'BRACELET') {
    if (lower.includes('tennis') || lower.includes('line')) tags.add('tennis');
    if (lower.includes('cuff')) tags.add('cuffs');
    if (lower.includes('chain')) tags.add('chain');
  }
  if (category === 'GIFT') {
    tags.add('anniversary');
    if (price <= 1000) tags.add('under-1000');
  }
  if (category === 'BRIDAL') tags.add('sets');

  return Array.from(tags);
}

export const products: Product[] = catalogueItems.map(
  ([name, category, price, featured, isNew, image], index) => {
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/-$/, '');
    return {
      id: `prod_${index + 1}`,
      name,
      slug,
      category,
      basePrice: price,
      compareAt: index % 3 === 0 ? price + 6500 : null,
      description:
        'A timeless expression of fine jewellery, crafted with luminous stones, warm metal, and a refined profile designed for modern heirloom wear.',
      shortDesc: '18K gold, diamond-inspired brilliance',
      isFeatured: featured,
      isNew,
      isBestseller: index % 4 === 0,
      isActive: true,
      tags: ['18k finish', 'gift ready', category.toLowerCase(), ...subcategoryTags(category, name, price)],
      createdAt: now,
      images: [
        {
          id: `img_${index + 1}`,
          url: image,
          alt: name,
          position: 0,
          isPrimary: true,
        },
      ],
      variants: (['YELLOW_GOLD', 'ROSE_GOLD', 'WHITE_GOLD'] as MetalType[]).map(
        (metal, variantIndex) => ({
          id: `var_${index + 1}_${variantIndex + 1}`,
          sku: `AUR-${index + 1}-${variantIndex + 1}`,
          metal,
          size: category === 'RING' ? ['6', '7', '8'][variantIndex] : null,
          price: price + variantIndex * 1800,
          stock: 4 + index + variantIndex,
          isActive: true,
        }),
      ),
      reviews: [
        {
          id: `rev_${index + 1}`,
          rating: 5 - (index % 2),
          title: 'Beautifully finished',
          body: 'The packaging felt special and the piece has a very refined shine.',
          isApproved: true,
          createdAt: now,
          user: { name: 'Aurelia customer', image: null },
        },
      ],
    };
  },
);

export const reviews = [
  'The bridal choker felt handcrafted and incredibly elegant.',
  'Premium packaging, fast delivery, and the ring looks even better in person.',
  'A quiet luxury feel. I bought the hoops as a gift and they were loved instantly.',
];

export const adminOrders = [
  { id: 'AUR-1048', customer: 'Meera Kapoor', total: 142000, status: 'CONFIRMED', payment: 'PAID' },
  { id: 'AUR-1047', customer: 'Naina Gill', total: 48900, status: 'PACKED', payment: 'PAID' },
  { id: 'AUR-1046', customer: 'Rhea Shah', total: 78400, status: 'SHIPPED', payment: 'PAID' },
  { id: 'AUR-1045', customer: 'Simran Kaur', total: 27900, status: 'PENDING', payment: 'PENDING' },
];

export const salesData: SalesDataPoint[] = [
  { date: 'Jan', revenue: 220000, orders: 24 },
  { date: 'Feb', revenue: 310000, orders: 32 },
  { date: 'Mar', revenue: 275000, orders: 29 },
  { date: 'Apr', revenue: 410000, orders: 41 },
  { date: 'May', revenue: 468000, orders: 46 },
  { date: 'Jun', revenue: 525000, orders: 53 },
];

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getProductsByCategory(category?: ProductCategory) {
  return category ? products.filter((product) => product.category === category) : products;
}
