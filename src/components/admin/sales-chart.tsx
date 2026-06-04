"use client";

import { Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";
import { salesData } from "@/lib/data";

export function SalesChart() {
  return (
    <div className="w-full overflow-x-auto">
        <AreaChart width={760} height={280} data={salesData}>
          <defs>
            <linearGradient id="gold" x1="0" x2="0" y1="0" y2="1">
              <stop offset="5%" stopColor="#B58E62" stopOpacity={0.45} />
              <stop offset="95%" stopColor="#B58E62" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="#EAE5DF" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="revenue" stroke="#A07840" fill="url(#gold)" />
        </AreaChart>
    </div>
  );
}
