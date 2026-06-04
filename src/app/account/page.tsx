import Link from "next/link";

export default function AccountPage() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
      <h1 className="font-display text-6xl">Account</h1>
      <p className="mt-4 text-[#737373]">Auth-ready customer shell. Connect NextAuth providers and role checks when credentials are available.</p>
      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        <Link href="/account/orders" className="border border-[#EAE5DF] bg-white p-6 font-display text-3xl">Orders</Link>
        <Link href="/account/wishlist" className="border border-[#EAE5DF] bg-white p-6 font-display text-3xl">Wishlist</Link>
      </div>
    </section>
  );
}
