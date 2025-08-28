import React, { useMemo, useState } from "react";
import { LineChart as LC, Line, ResponsiveContainer } from "recharts";
import { Search, SlidersHorizontal } from "lucide-react";

/** ----------------------------------------------------------------
 * MarketPage — currency pairs with filters, tabs, and sparklines
 * Style matches your glass/emerald theme.
 * ----------------------------------------------------------------*/

const PAIRS = [
  { pair: "EUR/USD", base: "EUR", quote: "USD" },
  { pair: "GBP/USD", base: "GBP", quote: "USD" },
  { pair: "USD/JPY", base: "USD", quote: "JPY" },
  { pair: "USD/KES", base: "USD", quote: "KES" },
  { pair: "USD/EUR", base: "USD", quote: "EUR" },
  { pair: "USD/GBP", base: "USD", quote: "GBP" },
  { pair: "KES/USD", base: "KES", quote: "USD" },
  { pair: "EUR/JPY", base: "EUR", quote: "JPY" },
];

const TIMEFRAMES = ["1D", "7D", "1M", "1Y"];

// quick tiny sparkline data (mocked; replace with API later)
function makeSeries(seed = 1, n = 24) {
  let x = seed * 100;
  return Array.from({ length: n }, (_, i) => {
    x += (Math.sin((i + seed) / 2) + Math.cos((i + seed) / 3)) * 6;
    return { t: i, v: Math.max(10, x / 100) };
  });
}

const BASE_DATA = Object.fromEntries(
  PAIRS.map((p, i) => [
    p.pair,
    {
      price: Number((1 + (i * 7) / 100).toFixed(4)),
      change: Number(((i % 2 ? -1 : 1) * (Math.random() * 1.2)).toFixed(2)), // %
      series: makeSeries(i + 1),
      category:
        p.pair.includes("USD")
          ? "USD"
          : p.pair.includes("EUR")
          ? "EUR"
          : p.pair.includes("GBP")
          ? "GBP"
          : "OTHER",
    },
  ])
);

export default function MarketPage() {
  const [q, setQ] = useState("");
  const [tf, setTf] = useState("1D");
  const [cat, setCat] = useState("ALL");
  const [sortKey, setSortKey] = useState("pair");
  const [sortDir, setSortDir] = useState("asc");

  const rows = useMemo(() => {
    let list = PAIRS.map((p) => ({ ...p, ...BASE_DATA[p.pair] }));

    if (q.trim()) {
      const s = q.toLowerCase();
      list = list.filter(
        (r) =>
          r.pair.toLowerCase().includes(s) ||
          r.base.toLowerCase().includes(s) ||
          r.quote.toLowerCase().includes(s)
      );
    }
    if (cat !== "ALL") list = list.filter((r) => r.category === cat);

    list.sort((a, b) => {
      const dir = sortDir === "asc" ? 1 : -1;
      const A = a[sortKey];
      const B = b[sortKey];
      if (typeof A === "string") return A.localeCompare(B) * dir;
      return (A - B) * dir;
    });

    // change the series “density” by timeframe (visual only for now)
    const sliceBy =
      tf === "1D" ? 24 : tf === "7D" ? 24 : tf === "1M" ? 24 : 24;
    return list.map((r) => ({ ...r, s: r.series.slice(-sliceBy) }));
  }, [q, cat, tf, sortKey, sortDir]);

  const changeSort = (key) => {
    setSortKey(key);
    setSortDir((d) => (key === sortKey ? (d === "asc" ? "desc" : "asc") : "asc"));
  };

  return (
    <div className="space-y-6">
      {/* Header controls */}
      <div className="glass p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold">Market</h2>
            <p className="text-white/60 text-sm">Live currency pairs & trends</p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* timeframe tabs */}
            <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-xl p-1">
              {TIMEFRAMES.map((t) => (
                <button
                  key={t}
                  onClick={() => setTf(t)}
                  className={`px-3 py-1.5 text-sm rounded-lg ${
                    tf === t ? "bg-white/10" : "hover:bg-white/5"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* category filter */}
            <select
              value={cat}
              onChange={(e) => setCat(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm outline-none"
              title="Filter by category"
            >
              <option value="ALL">All</option>
              <option value="USD">USD pairs</option>
              <option value="EUR">EUR pairs</option>
              <option value="GBP">GBP pairs</option>
              <option value="OTHER">Other</option>
            </select>

            {/* search */}
            <div className="glass px-3 py-2 rounded-xl flex items-center gap-2">
              <Search size={16} className="text-white/50" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search (e.g., USD, EUR/USD)"
                className="bg-transparent outline-none text-sm placeholder:text-white/40 w-48"
              />
            </div>

            {/* dummy settings pill for future */}
            <button
              className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 flex items-center gap-2 text-sm"
              title="Market settings (coming soon)"
            >
              <SlidersHorizontal size={16} />
              Settings
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="glass p-0 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-white/5 text-white/60">
            <tr>
              <Th onClick={() => changeSort("pair")} active={sortKey === "pair"} dir={sortDir} left>
                Pair
              </Th>
              <Th onClick={() => changeSort("price")} active={sortKey === "price"} dir={sortDir}>
                Price
              </Th>
              <Th onClick={() => changeSort("change")} active={sortKey === "change"} dir={sortDir}>
                24h
              </Th>
              <th className="py-3 px-4 text-left">Trend</th>
              <th className="py-3 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {rows.map((r) => (
              <tr key={r.pair} className="hover:bg-white/5">
                <td className="py-3 px-4 font-medium">{r.pair}</td>
                <td className="py-3 px-4 text-white/90">{r.price.toFixed(4)}</td>
                <td
                  className={`py-3 px-4 ${
                    r.change >= 0 ? "text-emerald-400" : "text-red-400"
                  }`}
                >
                  {r.change >= 0 ? "+" : ""}
                  {r.change}%
                </td>
                <td className="py-2 px-4">
                  <div className="h-8 w-40">
                    <Sparkline data={r.s} positive={r.change >= 0} />
                  </div>
                </td>
                <td className="py-3 px-4 text-right">
                  <a
                    href="/converter"
                    className="px-3 py-1.5 rounded-lg bg-white/10 border border-white/10 hover:bg-white/15"
                    title="Open converter"
                  >
                    Convert
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ---------- helpers ---------- */

function Th({ children, onClick, active, dir, left }) {
  return (
    <th
      onClick={onClick}
      className={`py-3 px-4 select-none cursor-pointer ${left ? "text-left" : "text-left"}`}
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

function Sparkline({ data, positive }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LC data={data} margin={{ top: 2, bottom: 2, left: 0, right: 0 }}>
        <Line
          type="monotone"
          dataKey="v"
          stroke={positive ? "#10B981" : "#EF4444"}
          strokeWidth={2}
          dot={false}
        />
      </LC>
    </ResponsiveContainer>
  );
}
