/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { PrismaClient, UserRole, OrderStatus, PaymentStatus, PaymentMethod } from "@prisma/client";
import type { ProductCategory, MetalType } from "@prisma/client";
import { products } from "../src/lib/data";
import { env } from "../src/lib/env";

const prisma = new PrismaClient();

async function main() {
  const admin = await prisma.user.upsert({
    where: { email: env.seedAdminEmail },
    update: {},
    create: { email: env.seedAdminEmail, name: "Aurelia Admin", role: UserRole.ADMIN },
  });

  const customer = await prisma.user.upsert({
    where: { email: env.seedCustomerEmail },
    update: {},
    create: { email: env.seedCustomerEmail, name: "Meera Kapoor", role: UserRole.CUSTOMER },
  });

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {
        description: product.description,
        shortDesc: product.shortDesc,
        basePrice: product.basePrice,
        compareAt: product.compareAt,
        isFeatured: product.isFeatured,
        isNew: product.isNew,
        isBestseller: product.isBestseller,
        tags: product.tags,
      },
      create: {
        name: product.name,
        slug: product.slug,
        description: product.description,
        shortDesc: product.shortDesc,
        category: product.category as ProductCategory,
        basePrice: product.basePrice,
        compareAt: product.compareAt,
        isFeatured: product.isFeatured,
        isNew: product.isNew,
        isBestseller: product.isBestseller,
        tags: product.tags,
        images: {
          create: [{ url: `/mock/${product.slug}.jpg`, alt: product.name, isPrimary: true }],
        },
        variants: {
          create: product.variants.map((variant) => ({
            sku: variant.sku,
            metal: variant.metal as MetalType,
            size: variant.size,
            price: variant.price,
            stock: variant.stock,
          })),
        },
        reviews: {
          create: [{
            userId: customer.id,
            rating: 5,
            title: "Beautifully finished",
            body: "Premium feel, elegant shine, and gift-ready packaging.",
            isApproved: true,
          }],
        },
      },
    });
  }

  await prisma.coupon.upsert({
    where: { code: "AURELIA10" },
    update: {},
    create: { code: "AURELIA10", type: "PERCENT", value: 10, minOrder: 25000, maxDiscount: 5000 },
  });

  await prisma.order.upsert({
    where: { orderNumber: "AUR-SEED-001" },
    update: {},
    create: {
      orderNumber: "AUR-SEED-001",
      userId: admin.id,
      email: env.seedAdminEmail,
      phone: env.seedCustomerPhone,
      status: OrderStatus.CONFIRMED,
      paymentStatus: PaymentStatus.PAID,
      paymentMethod: PaymentMethod.UPI,
      subtotal: 48900,
      total: 48900,
      items: {
        create: [{
          productId: (await prisma.product.findFirstOrThrow()).id,
          name: "Celeste Diamond Ring",
          sku: "AUR-SEED",
          metal: "YELLOW_GOLD",
          price: 48900,
          quantity: 1,
        }],
      },
    },
  });
}

main().finally(async () => prisma.$disconnect());
