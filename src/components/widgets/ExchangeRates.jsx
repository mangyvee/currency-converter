import React from "react";


const rows = [
{ label: "Euro", value: 0.85925, delta: -0.15 },
{ label: "British Pound", value: 0.74413, delta: 0.029 },
{ label: "Japanese Yen", value: 147.67, delta: 0.024 },
];


export default function ExchangeRates() {
return (
<div className="glass p-4 md:p-6">
<div className="text-lg font-medium mb-4">Exchange Rates</div>
<div className="space-y-3">
{rows.map((r) => (
<div key={r.label} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
<div className="text-sm text-white/80">{r.label}</div>
<div className="text-sm text-white/60">{r.value}</div>
<div className={`text-xs ${r.delta < 0 ? 'text-red-400' : 'text-mint-400'}`}>{r.delta < 0 ? '' : '+'}{r.delta.toFixed(3)}%</div>
</div>
))}
</div>
</div>
);
}