/**
 * vite-env.d.ts
 * ------------------------------------------------------------------
 * Type declarations so TypeScript knows the shape of
 * import.meta.env (i.e. that VITE_API_URL exists and is a string).
 * Without this, siteConfig.ts's `import.meta.env.VITE_API_URL`
 * would fail to type-check. Add new VITE_ variables here if you
 * introduce more of them later.
 * ------------------------------------------------------------------
 */

/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
