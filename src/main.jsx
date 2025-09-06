import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

// Apply persisted theme before React mounts (prevents flash)
try {
  const saved = localStorage.getItem("theme"); // 'dark' | 'light' | null
  const useDark = saved ? saved === "dark" : true;
  document.documentElement.classList.toggle("dark", useDark);
} catch {}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
