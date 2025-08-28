import React from "react";
import { LineChart, Line, ResponsiveContainer, YAxis, XAxis, Tooltip } from "recharts";


const data = [
{ m: "Sep", v: 16 }, { m: "Oct", v: 19 }, { m: "Nov", v: 21 }, { m: "Dec", v: 20 },
{ m: "Jan", v: 22 }, { m: "Feb", v: 21 }, { m: "Mar", v: 25 }, { m: "Apr", v: 23 },
{ m: "May", v: 26 }, { m: "Jun", v: 27 }, { m: "Jul", v: 28 }, { m: "Aug", v: 31 },
];


export default function MainChart() {
return (
<div className="glass p-4 md:p-6">
<div className="flex items-end justify-between">
<div>
<div className="text-3xl md:text-4xl font-semibold tracking-tight">€22,193.05</div>
<div className="text-mint-400 text-sm mt-1 font-medium">+47.3%</div>
</div>
<div className="flex items-center gap-2 text-xs text-white/60">
{['1D','7D','1M','1Y'].map((t) => (
<button key={t} className={`px-2 py-1 rounded-lg border border-white/10 ${t==='1Y' ? 'bg-white/10' : 'hover:bg-white/5'}`}>{t}</button>
))}
</div>
</div>
<div className="h-56 md:h-72 mt-4">
<ResponsiveContainer width="100%" height="100%">
<LineChart data={data} margin={{ top: 10, right: 10, bottom: 0, left: 0 }}>
<XAxis dataKey="m" stroke="#6b7280" tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />
<YAxis stroke="#6b7280" tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />
<Tooltip contentStyle={{ background: "#14171C", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12 }} labelStyle={{ color: "#9CA3AF" }} />
<Line type="monotone" dataKey="v" stroke="#2ECB9B" strokeWidth={2.4} dot={false} />
</LineChart>
</ResponsiveContainer>
</div>
</div>
);
}