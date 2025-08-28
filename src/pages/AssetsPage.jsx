import React, { useMemo, useState } from "react";
import { Wallet, Plus, Search, ArrowUpRight, ArrowDownRight } from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const chartData = [
  { m: "Jan", v: 3200 },
  { m: "Feb", v: 3400 },
  { m: "Mar", v: 3100 },
  { m: "Apr", v: 3700 },
  { m: "May", v: 4200 },
  { m: "Jun", v: 4600 },
  { m: "Jul", v: 4400 },
  { m: "Aug", v: 4900 },
];

const initialHoldings = [
  { code: "USD", name: "US Dollar",       amount: 1250.0, change: +0.42 },
  { code: "EUR", name: "Euro",            amount: 860.5,  change: -0.15 },
  { code: "GBP", name: "British Pound",   amount: 430.0,  change: +0.09 },
  { code: "KES", name: "Kenyan Shilling", amount: 61000,  change: +0.25 },
  { code: "JPY", name: "Japanese Yen",    amount: 54000,  change: -0.08 },
];

export default function AssetsPage() {
  const [q, setQ] = useState("");
  const [sortKey, setSortKey] = useState("code");
  const [sortDir, setSortDir] = useState("asc");

  const totalValue = 22193.05; // match the dashboard headline vibe
  const dayChange = +2.7;

  const holdings = useMemo(() => {
    let rows = initialHoldings.filter(
      (r) =>
        r.code.toLowerCase().includes(q.toLowerCase()) ||
        r.name.toLowerCase().includes(q.toLowerCase())
    );
    rows.sort((a, b) => {
      const dir = sortDir === "asc" ? 1 : -1;
      const A = a[sortKey];
      const B = b[sortKey];
      if (typeof A === "string") return A.localeCompare(B) * dir;
      return (A - B) * dir;
    });
    return rows;
  }, [q, sortKey, sortDir]);

  const changeSort = (key) => {
    setSortKey(key);
    setSortDir((d) => (key === sortKey ? (d === "asc" ? "desc" : "asc") : "asc"));
  };

  return (
    <div className="space-y-6">
      {/* Portfolio summary */}
      <div className="glass p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-[0_0_24px_rgba(16,185,129,0.35)]">
              <Wallet size={18} className="text-black" />
            </div>
            <div>
              <div className="text-sm text-white/60">Portfolio value</div>
              <div className="text-2xl font-semibold">€{totalValue.toLocaleString()}</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-1 text-sm px-2 py-1 rounded-lg ${
                dayChange >= 0 ? "bg-emerald-500/15 text-emerald-400" : "bg-red-500/15 text-red-400"
              }`}
            >
              {dayChange >= 0 ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
              {dayChange >= 0 ? "+" : ""}
              {dayChange}% today
            </span>
            <button className="px-3 py-2 rounded-lg bg-white/10 border border-white/10 hover:bg-white/15 text-sm">
              <Plus size={16} className="inline mr-1 -mt-0.5" />
              Add currency
            </button>
          </div>
        </div>

        {/* Portfolio area chart */}
        <div className="h-56 mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 8, right: 12, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10B981" stopOpacity={0.7} />
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.06)" />
              <XAxis dataKey="m" stroke="#9CA3AF" tickLine={false} axisLine={false} />
              <YAxis stroke="#9CA3AF" tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{
                  background: "#14171C",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 12,
                }}
                labelStyle={{ color: "#9CA3AF" }}
              />
              <Area type="monotone" dataKey="v" stroke="#10B981" fill="url(#grad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Holdings list */}
      <div className="glass p-6">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <h3 className="text-lg font-semibold">Holdings</h3>
          <div className="flex items-center gap-2">
            <div className="glass px-3 py-2 rounded-xl flex items-center gap-2">
              <Search size={16} className="text-white/50" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search currency (e.g., USD)"
                className="bg-transparent outline-none text-sm placeholder:text-white/40 w-48"
              />
            </div>
          </div>
        </div>

        <div className="mt-4 overflow-hidden rounded-2xl border border-white/10">
          <table className="w-full text-sm">
            <thead className="bg-white/5 text-white/60">
              <tr>
                <Th onClick={() => changeSort("code")} active={sortKey === "code"} dir={sortDir}>
                  Code
                </Th>
                <Th onClick={() => changeSort("name")} active={sortKey === "name"} dir={sortDir}>
                  Currency
                </Th>
                <Th onClick={() => changeSort("amount")} active={sortKey === "amount"} dir={sortDir} right>
                  Amount
                </Th>
                <Th onClick={() => changeSort("change")} active={sortKey === "change"} dir={sortDir} right>
                  24h
                </Th>
                <th className="py-3 pr-4 pl-2 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {holdings.map((h) => (
                <tr key={h.code} className="hover:bg-white/5">
                  <td className="py-3 pl-4 pr-2 font-medium">{h.code}</td>
                  <td className="py-3 px-2 text-white/80">{h.name}</td>
                  <td className="py-3 px-2 text-right text-white/90">
                    {h.amount.toLocaleString()}
                  </td>
                  <td
                    className={`py-3 px-2 text-right ${
                      h.change >= 0 ? "text-emerald-400" : "text-red-400"
                    }`}
                  >
                    {h.change >= 0 ? "+" : ""}
                    {h.change}%
                  </td>
                  <td className="py-3 pr-4 pl-2 text-right">
                    <button className="px-3 py-1.5 rounded-lg bg-white/10 border border-white/10 hover:bg-white/15">
                      Convert
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer actions */}
        <div className="mt-4 flex items-center justify-between text-xs text-white/60">
          <span>Showing {holdings.length} of {initialHoldings.length} currencies</span>
          <div className="space-x-2">
            <button className="px-3 py-1.5 rounded-lg bg-white/10 border border-white/10 hover:bg-white/15">
              Export CSV
            </button>
            <button className="px-3 py-1.5 rounded-lg bg-emerald-500 text-black hover:bg-emerald-400">
              Quick Convert
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---- Small table header component ---- */
function Th({ children, onClick, active, dir, right }) {
  return (
    <th
      onClick={onClick}
      className={`py-3 ${right ? "text-right pr-4" : "text-left pl-4"} select-none cursor-pointer`}
      title="Sort"
    >
      <span className="inline-flex items-center gap-1">
        {children}
        <span className={`text-[11px] ${active ? "text-white/80" : "text-white/30"}`}>
          {active ? (dir === "asc" ? "▲" : "▼") : "↕"}
        </span>
      </span>
    </th>
  );
}
