import React from "react";
import { Bell, Search } from "lucide-react";

export default function Topbar() {
  return (
    <div className="mb-6 flex items-center justify-between">
      <div className="text-xl font-semibold tracking-tight">Main Dashboard</div>
      <div className="flex items-center gap-3">
        {/* Notifications button */}
        <button className="relative glass p-2 rounded-xl">
          <Bell size={18} className="text-white/80" />
        </button>
        {/* Search box */}
        <div className="glass rounded-xl flex items-center gap-2 px-3 py-2 w-64">
          <Search size={16} className="text-white/50" />
          <input
            placeholder="Search"
            className="bg-transparent outline-none text-sm placeholder:text-white/40 w-full"
          />
        </div>
      </div>
    </div>
  );
}
