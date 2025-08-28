/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: { sans: ["Inter", "sans-serif"] },
      colors: {
        brand: { DEFAULT: "#6366F1", light: "#A5B4FC", dark: "#4338CA" },
      },
      backgroundImage: {
        "gradient-glass": "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))",
      },
      boxShadow: { glass: "0 8px 32px 0 rgba(31, 38, 135, 0.37)" },
      borderRadius: { xl: "1rem", "2xl": "1.5rem" },
      animation: { fadeIn: "fadeIn 1s ease-in-out", float: "float 3s ease-in-out infinite" },
      keyframes: {
        fadeIn: { "0%": { opacity: 0 }, "100%": { opacity: 1 } },
        float: { "0%, 100%": { transform: "translateY(0px)" }, "50%": { transform: "translateY(-10px)" } },
      },
    },
  },
  plugins: [],
};
