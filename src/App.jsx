import React from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

import Homepage from "./components/Homepage";
import DashboardPage from "./pages/DashboardPage";
// keep your existing Converter page if you want it at /converter
import Converter from "./components/Converter";

// new pages
import AssetsPage from "./pages/AssetsPage";
import MarketPage from "./pages/MarketPage";
import TransferPage from "./pages/TransferPage";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";
import SupportPage from "./pages/SupportPage";

function HomeRoute() {
  const navigate = useNavigate();
  return <Homepage onStart={() => navigate("/dashboard")} />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeRoute />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/converter" element={<Converter />} />

        {/* new currency-related pages */}
        <Route path="/assets" element={<AssetsPage />} />
        <Route path="/market" element={<MarketPage />} />
        <Route path="/transfer" element={<TransferPage />} />

        {/* account/support */}
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/support" element={<SupportPage />} />
      </Routes>
    </BrowserRouter>
  );
}
