import { AdminShell } from "@/components/admin/admin-shell";
import { SalesChart } from "@/components/admin/sales-chart";
import { adminOrders, products } from "@/lib/data";
import { formatPrice } from "@/lib/utils";

export default function AdminPage() {
  const metrics = [
    ["Revenue", 525000],
    ["Orders", 53],
    ["Customers", 1280],
    ["Conversion", "3.8%"],
  ];
  return (
    <AdminShell title="Dashboard">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map(([label, value]) => (
          <div key={label} className="border border-[#EAE5DF] bg-white p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-[#737373]">{label}</p>
            <p className="mt-3 font-display text-4xl">{typeof value === "number" ? formatPrice(value) : value}</p>
          </div>
        ))}
      </div>
      <div className="mt-8 grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
        <div className="border border-[#EAE5DF] bg-white p-5">
          <h2 className="font-display text-3xl">Sales</h2>
          <SalesChart />
        </div>
        <div className="border border-[#EAE5DF] bg-white p-5">
          <h2 className="font-display text-3xl">Low stock</h2>
          <div className="mt-4 space-y-3 text-sm">
            {products.slice(0, 5).map((product) => <p key={product.id} className="flex justify-between"><span>{product.name}</span><span>{product.variants[0]?.stock}</span></p>)}
          </div>
        </div>
      </div>
      <div className="mt-8 border border-[#EAE5DF] bg-white p-5">
        <h2 className="font-display text-3xl">Recent Orders</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <tbody>{adminOrders.map((order) => <tr key={order.id} className="border-t border-[#EAE5DF]"><td className="py-3">{order.id}</td><td>{order.customer}</td><td>{formatPrice(order.total)}</td><td>{order.status}</td><td>{order.payment}</td></tr>)}</tbody>
          </table>
        </div>
      </div>
    </AdminShell>
  );
}
