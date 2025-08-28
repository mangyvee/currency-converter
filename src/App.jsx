import React from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

// Your existing components
import Homepage from "./components/Homepage";
import Converter from "./components/Converter";

// New pages/components we’ll add in the next steps
import DashboardPage from "./pages/DashboardPage";

function HomeRoute() {
  const navigate = useNavigate();
  return (
    <Homepage onStart={() => navigate("/dashboard")} />
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeRoute />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        {/* Optional: keep a dedicated converter route too */}
        <Route path="/converter" element={<Converter />} />
      </Routes>
    </BrowserRouter>
  );
}
