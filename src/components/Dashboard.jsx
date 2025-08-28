import React from "react";
import MainChart from "./widgets/MainChart";
import QuickSwap from "./widgets/QuickSwap";
import ExchangeRates from "./widgets/ExchangeRates";
import PieWidget from "./widgets/PieWidget";
import Sections from "./widgets/Sections";

export default function Dashboard() {
  return (
    <div className="grid grid-cols-12 gap-6">
      {/* Main chart (big area) */}
      <div className="col-span-12 lg:col-span-8">
        <MainChart />
      </div>

      {/* Quick Swap card (side area) */}
      <div className="col-span-12 lg:col-span-4">
        <QuickSwap />
      </div>

      {/* Exchange Rates list (left bottom) */}
      <div className="col-span-12 lg:col-span-8">
        <ExchangeRates />
      </div>

      {/* Pie chart widget (right bottom) */}
      <div className="col-span-12 lg:col-span-4">
        <PieWidget />
      </div>

      {/* Recent / Market / Articles panels */}
      <div className="col-span-12">
        <Sections />
      </div>
    </div>
  );
}
