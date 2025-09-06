/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,               // ✅ enable global `test`, `expect`, `vi`
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",
    css: true,                   // allow importing CSS in components during tests
  },
});
