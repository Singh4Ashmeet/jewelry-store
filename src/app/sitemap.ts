import type { MetadataRoute } from "next";
import { categoryPages, products } from "@/lib/data";
import { env } from "@/lib/env";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = env.appUrl;
  const staticRoutes = ["", "about", "contact", "faqs", "shipping-returns", "size-guide", "care", "privacy", "terms", "cart", "checkout"];
  return [
    ...staticRoutes.map((route) => ({ url: `${baseUrl}/${route}`, lastModified: new Date() })),
    ...categoryPages.map((page) => ({ url: `${baseUrl}${page.href}`, lastModified: new Date() })),
    ...products.map((product) => ({ url: `${baseUrl}/product/${product.slug}`, lastModified: new Date() })),
  ];
}
