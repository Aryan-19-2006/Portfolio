/**
 * Education.tsx
 * ------------------------------------------------------------------
 * #education section — single institution card. Kept separate from
 * About.tsx to match the spec's section structure, even though both
 * pull from the same siteConfig.education object.
 * ------------------------------------------------------------------
 */

import { motion } from "framer-motion";
import { siteConfig } from "../config/siteConfig";

export default function Education() {
  const { institution, degree, branch } = siteConfig.education;

  return (
    <section id="education" className="max-w-4xl mx-auto px-6 py-16">
      <p className="text-xs font-mono text-accent mb-3">EDUCATION</p>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="rounded-xl border border-border bg-surface p-6 md:p-8"
      >
        <h3 className="font-display text-xl md:text-2xl font-semibold">{institution}</h3>
        <p className="text-muted mt-2">
          {degree} — {branch}
        </p>
      </motion.div>
    </section>
  );
}
