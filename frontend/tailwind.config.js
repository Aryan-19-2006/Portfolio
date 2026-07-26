/**
 * tailwind.config.js
 * ------------------------------------------------------------------
 * All design tokens (colors, fonts) used across every component live
 * here, not hardcoded in individual files — e.g. `bg-base`, `text-accent`,
 * and `font-display` everywhere in src/components/ resolve to the
 * values below. Change the look of the whole site by editing this file.
 * ------------------------------------------------------------------
 */

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // ---- Design tokens (dark, minimal, per spec) ----
        base: "#0A0A0B",      // page background — near-black
        surface: "#141417",   // card / panel background
        surface2: "#1C1C21",  // hover / raised surface
        border: "#2A2A30",    // hairline borders
        ink: "#F2F2F3",       // primary text (off-white, not pure #fff)
        muted: "#8B8B92",     // secondary text
        accent: "#4C6FFF",    // single blue accent — used sparingly
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
    },
  },
  plugins: [],
};
