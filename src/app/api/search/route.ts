import { NextResponse } from "next/server";
import { queryProducts } from "@/lib/product-query";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get("q")?.trim() ?? "";

    if (q.length < 2) {
      return NextResponse.json({ products: [] });
    }

    const products = await queryProducts({ q, limit: 8, sort: "popular" });
    return NextResponse.json({
      products: products.map((product) => ({
        id: product.id,
        name: product.name,
        slug: product.slug,
        category: product.category,
        price: product.basePrice,
        image: product.images[0]?.url ?? null,
      })),
    });
  } catch {
    return NextResponse.json({ message: "Search is temporarily unavailable" }, { status: 500 });
  }
}
