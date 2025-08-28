// src/components/Homepage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";

export default function Homepage({ onStart }) {
  const navigate = useNavigate();
  const go = onStart || (() => navigate("/dashboard"));

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0a0f14] text-white">
      {/* smooth Framer-like background (uses .hero-bg from index.css) */}
      <div className="pointer-events-none absolute inset-0 hero-bg" />

      {/* Header: logo left, menu right */}
      <header className="absolute inset-x-0 top-0 z-10">
        <div className="mx-auto max-w-6xl px-6 md:px-8 py-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-sm bg-gradient-to-br from-emerald-400 to-teal-500" />
            <span className="text-lg font-semibold tracking-tight">Monei'</span>
          </div>
          <button className="p-2 rounded-md hover:bg-white/10 transition">
            <Menu size={22} />
          </button>
        </div>
      </header>

      {/* central hero */}
      <main className="min-h-screen grid place-items-center">
        {/* green aura behind CTA */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[5%] w-[520px] h-[520px] rounded-full bg-emerald-500/12 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            Convert, Click, Glow
          </h1>

          <p className="mt-5 text-base md:text-lg text-white/70 leading-relaxed">
            We make global currency conversion fast, accurate and effortless, so you can focus
            <br className="hidden md:block" />
            on what truly matters
          </p>

          <button
            onClick={go}
            className="group mt-10 inline-flex items-center gap-2 rounded-full px-7 py-3 text-lg font-semibold
                       bg-emerald-400 text-black shadow-[0_0_30px_rgba(16,185,129,0.55)]
                       hover:shadow-[0_0_45px_rgba(16,185,129,0.75)]
                       transition-transform hover:-translate-y-0.5"
          >
            Get started now
            <span className="transition-transform group-hover:translate-x-0.5">↗</span>
          </button>

          {/* trust row */}
          <div className="mt-10 text-sm text-white/60">
            They trust us
            <div className="mt-2 flex items-center justify-center gap-1">
              <span className="text-emerald-400">★</span>
              <span className="text-emerald-400">★</span>
              <span className="text-emerald-400">★</span>
              <span className="text-emerald-400">★</span>
              <span className="text-emerald-400">★</span>
              <span className="ml-2">4.9 G</span>
            </div>
          </div>
        </div>
      </main>

      {/* bottom-right badge (like your mock) */}
      <div className="absolute right-4 bottom-4 z-10">
        <div className="px-3 py-1 rounded-full bg-white text-black text-xs font-medium shadow">
          Made in Framer
        </div>
      </div>
    </div>
  );
}
