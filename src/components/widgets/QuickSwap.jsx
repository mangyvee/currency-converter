// src/components/widgets/QuickSwap.jsx
import React, { useMemo, useState } from "react";
import { ArrowUpDown } from "lucide-react";
import ConverterModal from "../ConverterModal";
import { addTxn } from "../../utils/txns";

const CURRENCIES = ["USD", "EUR", "GBP", "KES", "JPY"];

export default function QuickSwap() {
  const [from, setFrom] = useState("EUR");
  const [to, setTo] = useState("KES");
  const [amount, setAmount] = useState("");
  const [open, setOpen] = useState(false);

  const canSwap = useMemo(() => from !== to, [from, to]);
  const canOpen = canSwap;

  const swap = () => {
    setFrom(to);
    setTo(from);
  };

  return (
    <div className="glass p-5 rounded-3xl h-full flex flex-col">
      <h3 className="font-semibold mb-4">Quick swap</h3>

      <div className="space-y-1">
        <label className="text-xs text-white/60">You pay</label>
        <div className="grid grid-cols-[1fr,140px] gap-2">
          <input
            type="number"
            inputMode="decimal"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            className="rounded-xl bg-white/5 border border-white/10 px-3 py-2 text-sm outline-none focus:border-emerald-400/60 focus-ring"
          />
          <select
            className="select-dark focus-ring"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          >
            {CURRENCIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex items-center justify-center my-3">
        <button
          onClick={swap}
          disabled={!canSwap}
          className="px-3 py-1.5 rounded-full bg-white/10 border border-white/10 hover:bg-white/15 inline-flex items-center gap-2 disabled:opacity-50 focus-ring"
          title="Swap"
        >
          <ArrowUpDown size={14} />
          <span className="text-sm">swap</span>
        </button>
      </div>

      <div className="space-y-1">
        <label className="text-xs text-white/60">You receive</label>
        <div className="grid grid-cols-[1fr,140px] gap-2">
          <input
            disabled
            value={amount ? "Preview in converter" : ""}
            placeholder="—"
            className="rounded-xl bg-white/5 border border-white/10 px-3 py-2 text-sm text-white/50"
          />
          <select
            className="select-dark focus-ring"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          >
            {CURRENCIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex-1" />

      <button
        onClick={() => setOpen(true)}
        disabled={!canOpen}
        className="w-full mt-4 px-4 py-3 rounded-2xl bg-emerald-500 text-black font-medium hover:bg-emerald-400 transition disabled:opacity-50 disabled:cursor-not-allowed focus-ring"
      >
        Visualize swap →
      </button>

      <ConverterModal
        open={open}
        onClose={() => setOpen(false)}
        presetFrom={from}
        presetTo={to}
        onConverted={({ from, to, amount, result, rate }) => {
          addTxn({ from, to, amount, result, rate, at: new Date().toISOString() });
        }}
      />
    </div>
  );
}
