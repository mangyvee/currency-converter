import React, { useState } from "react";
import { ArrowUpDown } from "lucide-react";


export default function QuickSwap() {
const [from, setFrom] = useState({ symbol: "BTC", amount: 0.00181682, balance: 0.01742682 });
const [to, setTo] = useState({ symbol: "USDT", amount: 193.4604, balance: 500 });


const swap = () => {
setFrom({ ...to, symbol: to.symbol });
setTo({ ...from, symbol: from.symbol });
};


return (
<div className="glass p-4 md:p-6 h-full">
<div className="text-lg font-medium mb-4">Quick swap</div>


<div className="space-y-3">
<div className="rounded-xl bg-white/5 ring-soft p-3">
<div className="text-xs text-white/50 mb-1">{from.amount.toFixed(8)}</div>
<div className="text-[11px] text-white/40">Balance: {from.balance.toFixed(8)} {from.symbol}</div>
</div>


<div className="flex justify-center">
<button onClick={swap} className="chip flex items-center gap-1">
<ArrowUpDown size={14}/> swap
</button>
</div>


<div className="rounded-xl bg-white/5 ring-soft p-3">
<div className="text-xs text-white/50 mb-1">{to.amount}</div>
<div className="text-[11px] text-white/40">Balance: {to.balance} {to.symbol}</div>
</div>


<button className="w-full mt-4 bg-white/10 hover:bg-white/15 border border-white/10 rounded-xl py-3 text-sm font-medium flex items-center justify-center gap-2">
Visualize swap <span>›</span>
</button>
</div>
</div>
);
}