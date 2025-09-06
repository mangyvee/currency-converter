import React, { useMemo, useState } from "react";
import ConverterModal from "../components/ConverterModal";
import { addTxn } from "../utils/txns";
import { ArrowUpRight, ArrowDownRight, Wallet } from "lucide-react";

const HOLDINGS = [
  { code: "USD", name: "US Dollar", amount: 500.0, change: +0.15 },
  { code: "EUR", name: "Euro", amount: 320.5, change: -0.10 },
  { code: "GBP", name: "British Pound", amount: 140.25, change: +0.08 },
  { code: "KES", name: "Kenyan Shilling", amount: 42000, change: +0.02 },
  { code: "JPY", name: "Japanese Yen", amount: 12000, change: -0.05 },
];

export default function AssetsPage() {
  const [q, setQ] = useState("");
  const [modal, setModal] = useState({ open: false, from: "USD", to: "KES" });

  const rows = useMemo(() => {
    const s = q.trim().toLowerCase();
    let list = HOLDINGS;
    if (s) {
      list = list.filter(
        (h) =>
          h.code.toLowerCase().includes(s) ||
          h.name.toLowerCase().includes(s)
      );
    }
    return list;
  }, [q]);

  const total = useMemo(
    () =>
      HOLDINGS.reduce(
        (acc, h) => acc + (isFinite(h.amount) ? Number(h.amount) : 0),
        0
      ),
    []
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass p-6 rounded-3xl">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
              <Wallet size={18} className="text-white/70" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Assets</h2>
              <p className="text-white/60 text-sm">
                Your currency balances at a glance
              </p>
            </div>
          </div>

          <div className="glass px-3 py-2 rounded-xl flex items-center gap-2">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search currency (e.g., USD, EUR)"
              className="bg-transparent outline-none text-sm placeholder:text-white/40 w-56 focus-ring"
            />
          </div>
        </div>

        <div className="mt-4 text-sm text-white/70">
          Total units held (all currencies):{" "}
          <span className="text-white font-medium">
            {total.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Table */}
      <div className="glass overflow-hidden rounded-3xl">
        <table className="w-full text-sm">
          <thead className="bg-white/5 text-white/60">
            <tr>
              <th scope="col" className="py-3 px-4 text-left">Currency</th>
              <th scope="col" className="py-3 px-4 text-left">Code</th>
              <th scope="col" className="py-3 px-4 text-right">Amount</th>
              <th scope="col" className="py-3 px-4 text-left">24h</th>
              <th scope="col" className="py-3 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {rows.map((h) => {
              const up = h.change >= 0;
              return (
                <tr key={h.code} className="hover:bg-white/5">
                  <td className="py-3 px-4">{h.name}</td>
                  <td className="py-3 px-4 font-medium">{h.code}</td>
                  <td className="py-3 px-4 text-right">
                    {Number(h.amount).toLocaleString()}
                  </td>
                  <td
                    className={`py-3 px-4 flex items-center gap-1 ${
                      up ? "text-emerald-400" : "text-red-400"
                    }`}
                  >
                    {up ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                    {up ? "+" : ""}
                    {(h.change * 100).toFixed(2)}%
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() =>
                        setModal({ open: true, from: h.code, to: "USD" })
                      }
                      className="px-3 py-1.5 rounded-lg bg-white/10 border border-white/10 hover:bg-white/15 focus-ring"
                    >
                      Convert
                    </button>
                  </td>
                </tr>
              );
            })}
            {rows.length === 0 && (
              <tr>
                <td className="py-6 px-4 text-white/60" colSpan={5}>
                  No currencies match your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Converter Modal */}
      <ConverterModal
        open={modal.open}
        onClose={() => setModal((m) => ({ ...m, open: false }))}
        presetFrom={modal.from}
        presetTo={modal.to}
        onConverted={({ from, to, amount, result, rate }) => {
          addTxn({ from, to, amount, result, rate, at: new Date().toISOString() });
        }}
      />
    </div>
  );
}
