import React from "react";
import {
  LayoutDashboard,
  Wallet,
  LineChart,
  Send,
  User,
  Settings,
  LifeBuoy,
  ArrowRightCircle,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const Item = ({ to, icon: Icon, label, badge }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center gap-3 px-3 py-2 rounded-xl cursor-pointer
       hover:bg-white/5 transition
       ${isActive ? "bg-white/10" : ""}`
    }
  >
    <Icon size={18} className="text-white/80" />
    <span className="text-sm text-white/80 flex-1">{label}</span>
    {badge && (
      <span className="chip">{badge}</span>
    )}
  </NavLink>
);

export default function Sidebar() {
  return (
    <div className="glass p-4 sticky top-6">
      {/* Monei' brand (match homepage) */}
      <div className="flex items-center gap-2 mb-6">
        <div className="h-8 w-8 rounded-sm bg-gradient-to-br from-emerald-400 to-teal-500 shadow-[0_0_20px_rgba(16,185,129,0.35)]" />
        <div className="leading-tight">
          <div className="text-sm font-semibold">Monei'</div>
          <div className="text-xs text-white/50">Trading // Dashboard</div>
        </div>
      </div>

      {/* Primary */}
      <div className="space-y-1">
        <Item to="/dashboard" icon={LayoutDashboard} label="Dashboard" />
        <Item to="/assets" icon={Wallet} label="Assets" />
        <Item to="/market" icon={LineChart} label="Market" badge="New" />
        <Item to="/transfer" icon={Send} label="Money Transfer" />
      </div>

      {/* Divider */}
      <div className="mt-6 border-t border-white/5 pt-4 space-y-1">
        <Item to="/profile" icon={User} label="Profile" />
        <Item to="/settings" icon={Settings} label="Settings" />
        <Item to="/support" icon={LifeBuoy} label="Support" />
      </div>

      {/* CTA card (currency-focused) */}
      <div className="mt-6">
        <div className="glass p-3 rounded-2xl flex items-center gap-3">
          <ArrowRightCircle size={18} className="text-emerald-400" />
          <div className="text-xs text-white/80">
            Try <span className="font-medium">Monei Convert</span>
            <br />
            <span className="text-white/50">Your real-time currency assistant.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
