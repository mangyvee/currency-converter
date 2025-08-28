// src/pages/SettingsPage.jsx
import React, { useEffect, useState } from "react";
import {
  Moon, Sun, Bell, ShieldCheck, Globe, Mail, Trash2, CheckCircle2
} from "lucide-react";
import { applyTheme } from "../theme.js";

// ...

const switchTheme = () => {
  const next = settings.theme === "dark" ? "light" : "dark";
  setSettings((s) => ({ ...s, theme: next }));
  applyTheme(next); // <-- this flips the <html class="dark"> on/off
  localStorage.setItem("monei.settings", JSON.stringify({ ...settings, theme: next }));
};

const LS_KEY = "monei.settings";
const CURRENCIES = ["USD", "EUR", "GBP", "KES", "JPY"];
const LANGUAGES  = ["English (US)", "English (UK)", "Français", "Swahili (KE)"];

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    theme: "dark",
    currency: "USD",
    language: "English (US)",
    priceAlerts: true,
    productUpdates: false,
    marketingEmails: false,
    analytics: true,
  });
  const [savedMsg, setSavedMsg] = useState("");

  // Load existing settings
  useEffect(() => {
    const raw = localStorage.getItem(LS_KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        setSettings((s) => ({ ...s, ...parsed }));
      } catch {}
    }
  }, []);

  // Save helper
  const persist = (s) => {
    localStorage.setItem(LS_KEY, JSON.stringify(s));
    setSavedMsg("Saved");
    setTimeout(() => setSavedMsg(""), 1000);
  };

  const setField = (k, v) => setSettings((p) => ({ ...p, [k]: v }));
  const onSave   = () => persist(settings);

  // Theme switch powered by theme manager
  const switchTheme = () => {
    const next = settings.theme === "dark" ? "light" : "dark";
    setSettings((s) => ({ ...s, theme: next }));
    applyTheme(next); // toggles <html class="dark"> and persists in theme.js
    // optional: also persist whole settings object now
    persist({ ...settings, theme: next });
  };

  return (
    <div className="space-y-6 text-white">
      <h1 className="text-2xl font-semibold">Settings</h1>

      {/* Appearance */}
      <section className="glass p-6">
        <h2 className="text-lg font-semibold mb-4">Appearance</h2>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-white/80">
            <div className="h-10 w-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
              {settings.theme === "dark" ? <Moon size={18} /> : <Sun size={18} />}
            </div>
            <div>
              <div className="text-sm">Theme</div>
              <div className="text-xs text-white/50">Switch between light and dark</div>
            </div>
          </div>
          <button
            onClick={switchTheme}
            className="px-3 py-2 rounded-lg bg-emerald-500 text-black text-sm font-medium hover:bg-emerald-400 transition"
          >
            {settings.theme === "dark" ? "Use Light" : "Use Dark"}
          </button>
        </div>
      </section>

      {/* Localization */}
      <section className="glass p-6">
        <h2 className="text-lg font-semibold mb-4">Localization</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-white/70 flex items-center gap-2 mb-1">
              <Globe size={16} className="text-white/40" /> Default currency
            </label>
            <select
              value={settings.currency}
              onChange={(e) => setField("currency", e.target.value)}
              className="select-dark w-full"
            >
              {CURRENCIES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm text-white/70 flex items-center gap-2 mb-1">
              <Globe size={16} className="text-white/40" /> Language
            </label>
            <select
              value={settings.language}
              onChange={(e) => setField("language", e.target.value)}
              className="select-dark w-full"
            >
              {LANGUAGES.map((l) => (
                <option key={l}>{l}</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Notifications */}
      <section className="glass p-6">
        <h2 className="text-lg font-semibold mb-4">Notifications</h2>
        <ToggleRow
          label="Price alerts & conversion updates"
          value={settings.priceAlerts}
          onChange={(v) => setField("priceAlerts", v)}
          icon={<Bell size={16} className="text-white/50" />}
        />
        <ToggleRow
          label="Product updates"
          value={settings.productUpdates}
          onChange={(v) => setField("productUpdates", v)}
          icon={<ShieldCheck size={16} className="text-white/50" />}
        />
        <ToggleRow
          label="Marketing emails"
          value={settings.marketingEmails}
          onChange={(v) => setField("marketingEmails", v)}
          icon={<Mail size={16} className="text-white/50" />}
        />
      </section>

      {/* Privacy */}
      <section className="glass p-6">
        <h2 className="text-lg font-semibold mb-4">Privacy</h2>
        <ToggleRow
          label="Share anonymous usage analytics"
          value={settings.analytics}
          onChange={(v) => setField("analytics", v)}
          icon={<ShieldCheck size={16} className="text-white/50" />}
        />
        <p className="text-xs text-white/50 mt-2">
          Analytics help us improve conversion accuracy and performance. No personal data is collected.
        </p>
      </section>

      {/* Actions */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-emerald-400 h-6 flex items-center gap-1">
          {savedMsg && (
            <>
              <CheckCircle2 size={16} /> {savedMsg}
            </>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onSave}
            className="px-4 py-2 rounded-lg bg-emerald-500 text-black text-sm font-medium hover:bg-emerald-400 transition"
          >
            Save changes
          </button>
          <button
            className="px-4 py-2 rounded-lg bg-white/10 border border-white/10 hover:bg-white/15 text-sm flex items-center gap-2"
            title="Irreversible (placeholder action)"
            onClick={() => alert("Account deletion flow coming soon.")}
          >
            <Trash2 size={16} /> Delete account
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------- Small helpers ---------- */

function ToggleRow({ label, value, onChange, icon }) {
  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center gap-2 text-white/80">
        {icon}
        <span className="text-sm">{label}</span>
      </div>
      <button
        onClick={() => onChange(!value)}
        className={`relative w-12 h-6 rounded-full transition
          ${value ? "bg-emerald-500" : "bg-white/10 border border-white/10"}`}
        aria-label={label}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition ${
            value ? "right-0.5" : "left-0.5"
          }`}
        />
      </button>
    </div>
  );
}
