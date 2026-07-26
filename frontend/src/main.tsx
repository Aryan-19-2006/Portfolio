/**
 * main.tsx
 * ------------------------------------------------------------------
 * Vite's entry point — mounts <App /> into the #root div in index.html.
 * You shouldn't need to touch this file; page content lives in App.tsx
 * and src/components/.
 * ------------------------------------------------------------------
 */

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
