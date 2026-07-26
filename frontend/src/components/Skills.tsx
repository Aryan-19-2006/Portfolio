/**
 * Skills.tsx
 * ------------------------------------------------------------------
 * #skills section — fetches grouped skills from the backend
 * (GET /api/skills/grouped, see backend/app/routers/skills.py) so
 * updating skills means editing the DB/seed data, not this file.
 * ------------------------------------------------------------------
 */

import { motion } from "framer-motion";
import { api } from "../lib/api";
import { useApiData } from "../hooks/useApiData";

export default function Skills() {
  const { data, loading, error } = useApiData(api.getSkillsGrouped);

  return (
    <section id="skills" className="max-w-4xl mx-auto px-6 py-16">
      <p className="text-xs font-mono text-accent mb-3">SKILLS</p>
      <h2 className="font-display text-3xl font-semibold mb-8">What I work with</h2>

      {loading && <p className="text-muted text-sm">Loading skills…</p>}
      {error && (
        <p className="text-sm text-muted">
          Couldn't reach the backend ({error}). Is the FastAPI server running on{" "}
          <code className="font-mono">VITE_API_URL</code>?
        </p>
      )}

      {data && (
        <div className="grid sm:grid-cols-2 gap-6">
          {Object.entries(data).map(([category, items], i) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="rounded-xl border border-border bg-surface p-5"
            >
              <h3 className="font-mono text-sm text-muted mb-3">{category}</h3>
              <div className="flex flex-wrap gap-2">
                {items.map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1 rounded-md bg-surface2 text-sm text-ink/90"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}
