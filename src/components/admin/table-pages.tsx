import { AdminShell } from "@/components/admin/admin-shell";
import { adminOrders, products } from "@/lib/data";
import { formatPrice } from "@/lib/utils";

export function ProductsAdmin() {
  return (
    <AdminShell title="Products">
      <div className="border border-[#EAE5DF] bg-white p-5">
        <table className="w-full text-left text-sm">
          <tbody>{products.map((product) => <tr key={product.id} className="border-t border-[#EAE5DF]"><td className="py-3">{product.name}</td><td>{product.category}</td><td>{formatPrice(product.basePrice)}</td><td>{product.isActive ? "Active" : "Draft"}</td></tr>)}</tbody>
        </table>
      </div>
    </AdminShell>
  );
}

export function OrdersAdmin() {
  return (
    <AdminShell title="Orders">
      <div className="border border-[#EAE5DF] bg-white p-5">
        <table className="w-full text-left text-sm">
          <tbody>{adminOrders.map((order) => <tr key={order.id} className="border-t border-[#EAE5DF]"><td className="py-3">{order.id}</td><td>{order.customer}</td><td>{formatPrice(order.total)}</td><td>{order.status}</td><td>{order.payment}</td></tr>)}</tbody>
        </table>
      </div>
    </AdminShell>
  );
}

export function SimpleAdmin({ title }: { title: string }) {
  return (
    <AdminShell title={title}>
      <div className="grid gap-4 sm:grid-cols-2">
        {["Configuration", "Workflow", "Status", "Notes"].map((item) => (
          <div key={item} className="border border-[#EAE5DF] bg-white p-6">
            <h2 className="font-display text-3xl">{item}</h2>
            <p className="mt-3 text-sm leading-6 text-[#737373]">Production-ready UI foundation with integration fields and role-check placeholder.</p>
          </div>
        ))}
      </div>
    </AdminShell>
  );
}
