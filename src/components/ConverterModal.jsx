// src/components/ConverterModal.jsx
import React, { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { X, ArrowUpDown, RotateCcw } from "lucide-react";

const CURRENCIES = ["USD", "EUR", "GBP", "KES", "JPY", "AUD", "CAD", "ZAR"];

/* ----------- FX provider fallbacks (no API key) ----------- */
async function p1(from, to, amount = 1, signal) {
  const res = await fetch(
    `https://api.exchangerate.host/convert?from=${from}&to=${to}&amount=${amount || 1}`,
    { signal }
  );
  if (!res.ok) throw new Error("exchangerate.host");
  const data = await res.json();
  if (typeof data?.result !== "number") throw new Error("shape");
  const rate = data?.info?.rate ?? data.result / (amount || 1);
  return { rate, result: data.result };
}
async function p2(from, to, amount = 1, signal) {
  const res = await fetch(
    `https://api.frankfurter.app/latest?amount=${amount || 1}&from=${from}&to=${to}`,
    { signal }
  );
  if (!res.ok) throw new Error("frankfurter");
  const data = await res.json();
  if (!data?.rates || typeof data.rates[to] !== "number") throw new Error("shape");
  const result = data.rates[to];
  const rate = result / (amount || 1);
  return { rate, result };
}
async function p3(from, to, amount = 1, signal) {
  const res = await fetch(`https://open.er-api.com/v6/latest/${from}`, { signal });
  if (!res.ok) throw new Error("open.er-api");
  const data = await res.json();
  if (data?.result !== "success" || typeof data?.rates?.[to] !== "number")
    throw new Error("shape");
  const rate = data.rates[to];
  return { rate, result: rate * (amount || 1) };
}
async function getRate(from, to, amount = 1, signal) {
  const providers = [p1, p2, p3];
  let last;
  for (const p of providers) {
    try {
      return await p(from, to, amount, signal);
    } catch (e) {
      last = e;
    }
  }
  throw last || new Error("all providers failed");
}
/* ---------------------------------------------------------- */

export default function ConverterModal({
  open,
  onClose,
  presetFrom = "USD",
  presetTo = "KES",
  onConverted, // ({ from, to, amount, result, rate })
}) {
  const [from, setFrom] = useState(presetFrom);
  const [to, setTo] = useState(presetTo);
  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState(null);
  const [converted, setConverted] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    if (open) {
      setFrom(presetFrom);
      setTo(presetTo);
      setAmount("");
      setConverted("");
      setErr("");
    }
  }, [open, presetFrom, presetTo]);

  useEffect(() => {
    if (!open) return;
    const ac = new AbortController();
    const t = setTimeout(async () => {
      try {
        setLoading(true);
        setErr("");
        const { rate } = await getRate(from, to, 1, ac.signal);
        setRate(rate);
      } catch {
        setRate(null);
        setErr("Could not load live rate.");
      } finally {
        setLoading(false);
      }
    }, 250);
    return () => {
      ac.abort();
      clearTimeout(t);
    };
  }, [open, from, to]);

  const preview = useMemo(() => {
    const n = parseFloat(amount);
    if (!Number.isFinite(n) || !rate) return "";
    return (n * rate).toLocaleString(undefined, { maximumFractionDigits: 6 });
  }, [amount, rate]);

  const swap = () => {
    setFrom(to);
    setTo(from);
    setConverted("");
  };
  const reset = () => {
    setAmount("");
    setConverted("");
    setErr("");
  };
  const doConvert = async () => {
    try {
      setLoading(true);
      setErr("");
      const a = parseFloat(amount || "0");
      const { result, rate: r } = await getRate(from, to, isFinite(a) ? a : 0);
      setRate(r);
      const formatted = Number(result).toLocaleString(undefined, {
        maximumFractionDigits: 6,
      });
      setConverted(formatted);
      onConverted?.({ from, to, amount: a || 0, result, rate: r });
    } catch {
      setErr("Conversion failed. Try again.");
      setConverted("");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  const modal = (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="converter-title"
    >
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative glass w-full max-w-md p-6 rounded-2xl">
        <button
          onClick={onClose}
          className="absolute right-3 top-3 p-1 rounded-lg hover:bg-white/10 focus-ring"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        <h3 id="converter-title" className="text-lg font-semibold mb-1">
          Quick Convert
        </h3>
        <p className="text-white/60 text-xs mb-4">
          Live rates (no API key, multi-provider fallback).
        </p>

        <label className="text-sm text-white/70 mb-1 block">Amount</label>
        <input
          type="number"
          inputMode="decimal"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          className="w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2 text-sm outline-none focus:border-emerald-400/60 focus-ring"
        />

        <div className="grid grid-cols-[1fr,auto,1fr] gap-2 mt-3">
          <select
            className="select-dark w-full focus-ring"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          >
            {CURRENCIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>

          <button
            className="px-2 rounded-lg bg-white/10 border border-white/10 hover:bg-white/15 focus-ring"
            onClick={swap}
            title="Swap"
          >
            <ArrowUpDown size={16} />
          </button>

          <select
            className="select-dark w-full focus-ring"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          >
            {CURRENCIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center justify-between mt-3 text-sm">
          <div className="text-white/70">
            {loading ? (
              "Loading rate…"
            ) : rate ? (
              <>
                1 {from} ≈ <span className="text-white">{rate.toFixed(6)}</span> {to}
              </>
            ) : (
              "Rate unavailable"
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={reset}
              className="px-2 py-1 rounded-lg bg-white/10 border border-white/10 hover:bg-white/15 focus-ring"
              title="Clear"
            >
              <RotateCcw size={14} />
            </button>
            <button
              onClick={doConvert}
              disabled={loading}
              className="px-4 py-2 rounded-lg bg-emerald-500 text-black font-medium hover:bg-emerald-400 transition disabled:opacity-60 focus-ring"
            >
              Convert
            </button>
          </div>
        </div>

        <div className="mt-3 text-sm min-h-[1.5rem]">
          {err ? (
            <span className="text-red-400">{err}</span>
          ) : converted ? (
            <span className="text-white">
              {amount || 0} {from} ≈ {converted} {to}
            </span>
          ) : preview ? (
            <span className="text-white/80">
              Preview: {amount || 0} {from} ≈ {preview} {to}
            </span>
          ) : (
            <span className="text-white/50">Enter an amount to preview</span>
          )}
        </div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}
