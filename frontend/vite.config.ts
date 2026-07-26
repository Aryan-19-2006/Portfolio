/**
 * vite.config.ts
 * ------------------------------------------------------------------
 * Build tool config. Rarely needs editing — the React plugin enables
 * JSX/Fast Refresh, and the port just matches what's expected in
 * backend/.env's FRONTEND_ORIGINS during local dev.
 * ------------------------------------------------------------------
 */

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
  },
});
