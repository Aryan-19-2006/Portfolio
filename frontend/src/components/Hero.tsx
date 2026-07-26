/**
 * Hero.tsx
 * ------------------------------------------------------------------
 * The first thing a visitor sees (#home section, also the Dock's
 * "Home" target). Static content — no API call — everything comes
 * straight from siteConfig.ts so there's one place to edit your
 * name/role/links. Staggered Framer Motion entrance (photo -> name
 * -> role -> buttons) via increasing `delay` values.
 * ------------------------------------------------------------------
 */

import { motion } from "framer-motion";
import { siteConfig } from "../config/siteConfig";

export default function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen flex flex-col items-center justify-center px-6 text-center relative"
    >
      <motion.img
        src={siteConfig.profileImage}
        alt={siteConfig.name}
        onError={(e) => {
          // Falls back to an initials avatar if profile.jpg hasn't been added yet
          (e.target as HTMLImageElement).style.display = "none";
        }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-28 h-28 rounded-full object-cover border border-border mb-6"
      />

      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="font-display text-5xl md:text-7xl font-semibold tracking-tight"
      >
        {siteConfig.name}
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-4 flex flex-wrap justify-center gap-x-3 gap-y-1 text-muted font-mono text-sm md:text-base"
      >
        {siteConfig.role.map((r, i) => (
          <span key={r}>
            {r}
            {i < siteConfig.role.length - 1 && <span className="text-accent mx-2">·</span>}
          </span>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-10 flex flex-wrap justify-center gap-4"
      >
        <a
          href="#projects"
          className="px-6 py-3 rounded-lg bg-accent text-white text-sm font-medium hover:opacity-90 transition"
        >
          View Projects
        </a>
        <a
          href={siteConfig.links.resumeUrl}
          download
          className="px-6 py-3 rounded-lg border border-border text-sm font-medium hover:bg-surface2 transition"
        >
          Download Resume
        </a>
        <a
          href="#contact"
          className="px-6 py-3 rounded-lg border border-border text-sm font-medium hover:bg-surface2 transition"
        >
          Contact Me
        </a>
      </motion.div>
    </section>
  );
}
