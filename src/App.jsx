import React from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

import Homepage from "./components/Homepage";
import DashboardPage from "./pages/DashboardPage";
import AssetsPage from "./pages/AssetsPage";
import MarketPage from "./pages/MarketPage";
import TransferPage from "./pages/TransferPage";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";
import SupportPage from "./pages/SupportPage";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeRoute />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/assets" element={<AssetsPage />} />
        <Route path="/market" element={<MarketPage />} />
        <Route path="/transfer" element={<TransferPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

function HomeRoute() {
  const navigate = useNavigate();
  return <Homepage onStart={() => navigate("/dashboard")} />;
}
