import React from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import Dashboard from "../components/Dashboard";
import ConverterCard from "../components/widgets/ConverterCard";

export default function DashboardPage() {
  return (
    <div className="min-h-screen text-white bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950">
      {/* green glow could be added later if you copied the exact styles from the canvas */}
      <div className="relative mx-auto max-w-[1440px] px-4 lg:px-6 py-6 grid grid-cols-12 gap-6">
        <aside className="col-span-12 md:col-span-3 lg:col-span-2">
          <Sidebar />
        </aside>

        <main className="col-span-12 md:col-span-9 lg:col-span-10 space-y-6">
          <Topbar />
          <Dashboard />
          {/* Compact converter card on same page */}
          <ConverterCard />
        </main>
      </div>
    </div>
  );
}
