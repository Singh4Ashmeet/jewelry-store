// ─── Product Types ────────────────────────────────────

export type ProductCategory = 'RING' | 'NECKLACE' | 'EARRING' | 'BRACELET' | 'BRIDAL' | 'GIFT';
export type MetalType = 'YELLOW_GOLD' | 'ROSE_GOLD' | 'WHITE_GOLD' | 'PLATINUM' | 'SILVER';
export type OrderStatus = 'PENDING' | 'CONFIRMED' | 'PACKED' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED' | 'REFUNDED';
export type PaymentStatus = 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED';
export type PaymentMethod = 'UPI' | 'CARD' | 'NET_BANKING' | 'COD';

export interface ProductImage {
  id: string;
  url: string;
  alt: string | null;
  position: number;
  isPrimary: boolean;
}

export interface ProductVariant {
  id: string;
  sku: string;
  metal: MetalType;
  size: string | null;
  price: number;
  stock: number;
  isActive: boolean;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDesc: string | null;
  category: ProductCategory;
  basePrice: number;
  compareAt: number | null;
  isFeatured: boolean;
  isNew: boolean;
  isBestseller: boolean;
  isActive: boolean;
  tags: string[];
  variants: ProductVariant[];
  images: ProductImage[];
  reviews?: Review[];
  createdAt: string;
}

export interface Review {
  id: string;
  rating: number;
  title: string | null;
  body: string | null;
  isApproved: boolean;
  createdAt: string;
  user: {
    name: string | null;
    image: string | null;
  };
}

// ─── Cart Types ───────────────────────────────────────

export interface CartItem {
  productId: string;
  variantId: string;
  name: string;
  slug: string;
  image: string;
  metal: MetalType;
  size: string | null;
  price: number;
  quantity: number;
  stock: number;
  sku: string;
}

export interface WishlistItem {
  productId: string;
  name: string;
  slug: string;
  image: string;
  price: number;
}

// ─── Order Types ──────────────────────────────────────

export interface Order {
  id: string;
  orderNumber: string;
  email: string;
  phone: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod | null;
  subtotal: number;
  shippingCost: number;
  discount: number;
  tax: number;
  total: number;
  couponCode: string | null;
  giftMessage: string | null;
  trackingNumber: string | null;
  items: OrderItem[];
  createdAt: string;
}

export interface OrderItem {
  id: string;
  name: string;
  sku: string;
  metal: string | null;
  size: string | null;
  price: number;
  quantity: number;
  imageUrl: string | null;
}

// ─── Address Types ────────────────────────────────────

export interface Address {
  id: string;
  name: string;
  phone: string;
  line1: string;
  line2: string | null;
  city: string;
  state: string;
  pincode: string;
  country: string;
  isDefault: boolean;
}

// ─── User Types ───────────────────────────────────────

export interface User {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
  phone: string | null;
  role: 'CUSTOMER' | 'ADMIN';
}

// ─── Coupon Types ─────────────────────────────────────

export interface Coupon {
  id: string;
  code: string;
  type: 'PERCENT' | 'FLAT';
  value: number;
  minOrder: number | null;
  maxDiscount: number | null;
  isActive: boolean;
  expiresAt: string | null;
}

// ─── Filter / Sort Types ─────────────────────────────

export interface ProductFilters {
  category?: ProductCategory;
  metal?: MetalType;
  minPrice?: number;
  maxPrice?: number;
  isNew?: boolean;
  isFeatured?: boolean;
  inStock?: boolean;
  search?: string;
}

export type SortOption = 'newest' | 'price-low' | 'price-high' | 'featured' | 'bestseller';

// ─── Admin Dashboard Types ────────────────────────────

export interface DashboardMetrics {
  totalRevenue: number;
  totalOrders: number;
  totalCustomers: number;
  conversionRate: number;
  revenueChange: number;
  ordersChange: number;
  customersChange: number;
}

export interface SalesDataPoint {
  date: string;
  revenue: number;
  orders: number;
}

// ─── Metal display helpers ────────────────────────────

export const METAL_LABELS: Record<MetalType, string> = {
  YELLOW_GOLD: 'Yellow Gold',
  ROSE_GOLD: 'Rose Gold',
  WHITE_GOLD: 'White Gold',
  PLATINUM: 'Platinum',
  SILVER: 'Silver',
};

export const CATEGORY_LABELS: Record<ProductCategory, string> = {
  RING: 'Rings',
  NECKLACE: 'Necklaces',
  EARRING: 'Earrings',
  BRACELET: 'Bracelets',
  BRIDAL: 'Bridal',
  GIFT: 'Gifts',
};

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  PENDING: 'Pending',
  CONFIRMED: 'Confirmed',
  PACKED: 'Packed',
  SHIPPED: 'Shipped',
  DELIVERED: 'Delivered',
  CANCELLED: 'Cancelled',
  REFUNDED: 'Refunded',
};
