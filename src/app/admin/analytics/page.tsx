import { AdminShell } from "@/components/admin/admin-shell";
import { SalesChart } from "@/components/admin/sales-chart";

export default function Page() {
  return (
    <AdminShell title="Analytics">
      <div className="border border-[#EAE5DF] bg-white p-6">
        <SalesChart />
      </div>
    </AdminShell>
  );
}
