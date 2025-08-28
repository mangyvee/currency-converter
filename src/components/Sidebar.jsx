import React from "react";
import { LayoutDashboard, Wallet, LineChart, Send, User, Settings, LifeBuoy, Bot } from "lucide-react";


const Item = ({ icon: Icon, label, active, badge }) => (
<div className={`flex items-center gap-3 px-3 py-2 rounded-xl cursor-pointer hover:bg-white/5 ${active ? "bg-white/5" : ""}`}>
<Icon size={18} className="text-white/80" />
<span className="text-sm text-white/80 flex-1">{label}</span>
{badge && <span className="chip">{badge}</span>}
</div>
);


export default function Sidebar() {
return (
<div className="glass p-4 sticky top-6">
<div className="flex items-center gap-2 mb-6">
<div className="h-8 w-8 rounded-lg bg-gradient-to-br from-mint-500 to-mint-600 shadow-glow"/>
<div>
<div className="text-sm text-white/60 leading-tight">Cryptix</div>
<div className="text-xs text-white/40 leading-tight">Trading // Dashboard</div>
</div>
</div>
<div className="space-y-1">
<Item icon={LayoutDashboard} label="Dashboard" active />
<Item icon={Wallet} label="Assets" />
<Item icon={LineChart} label="Market" badge="New" />
<Item icon={Send} label="Money Transfer" />
</div>
<div className="mt-6 border-t border-white/5 pt-4 space-y-1">
<Item icon={User} label="Profile" />
<Item icon={Settings} label="Settings" />
<Item icon={LifeBuoy} label="Support" />
</div>
<div className="mt-6">
<div className="glass p-3 rounded-2xl flex items-center gap-3">
<Bot size={18} className="text-mint-400"/>
<div className="text-xs text-white/70">Unlock CryptoAI<br/><span className="text-white/40">Your personal crypto assistant.</span></div>
</div>
</div>
</div>
);
}