import Link from "next/link";
import type { ReactNode } from "react";

const links = ["Dashboard", "Products", "Orders", "Customers", "Inventory", "Analytics", "Settings"];

export function AdminShell({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[240px_1fr] lg:px-8">
      <aside className="h-fit border border-[#EAE5DF] bg-white p-5">
        <h2 className="font-display text-3xl">Admin</h2>
        <nav className="mt-6 grid gap-2">
          {links.map((link) => {
            const href = link === "Dashboard" ? "/admin" : `/admin/${link.toLowerCase()}`;
            return <Link key={link} href={href} className="px-3 py-2 text-sm hover:bg-[#FAF7F2]">{link}</Link>;
          })}
        </nav>
      </aside>
      <section>
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-[#A07840]">Role check placeholder</p>
            <h1 className="font-display text-5xl">{title}</h1>
          </div>
        </div>
        {children}
      </section>
    </div>
  );
}
