// src/theme.js
export const THEME_KEY = "monei.theme";

export function applyTheme(theme /* "dark" | "light" */) {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  try { localStorage.setItem(THEME_KEY, theme); } catch {}
}

export function initTheme() {
  try {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === "dark" || saved === "light") {
      applyTheme(saved);
      return saved;
    }
  } catch {}
  const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)")?.matches;
  const initial = prefersDark ? "dark" : "light";
  applyTheme(initial);
  return initial;
}
