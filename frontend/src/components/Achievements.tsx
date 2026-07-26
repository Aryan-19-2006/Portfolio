/**
 * Achievements.tsx
 * ------------------------------------------------------------------
 * #achievements section — fetches from GET /api/achievements/.
 * Each achievement's `icon` string (set in seed.py) is looked up in
 * `iconMap` below to pick a lucide-react icon; add new keys to both
 * places together if you introduce a new icon type.
 * ------------------------------------------------------------------
 */

import { motion } from "framer-motion";
import { Trophy, Award, BadgeCheck } from "lucide-react";
import { api } from "../lib/api";
import { useApiData } from "../hooks/useApiData";

const iconMap: Record<string, typeof Trophy> = {
  trophy: Trophy,
  certificate: Award,
  badge: BadgeCheck,
};

export default function Achievements() {
  const { data, loading, error } = useApiData(api.getAchievements);

  return (
    <section id="achievements" className="max-w-5xl mx-auto px-6 py-16">
      <p className="text-xs font-mono text-accent mb-3">ACHIEVEMENTS</p>
      <h2 className="font-display text-3xl font-semibold mb-8">Milestones</h2>

      {loading && <p className="text-muted text-sm">Loading achievements…</p>}
      {error && <p className="text-sm text-muted">Couldn't reach the backend ({error}).</p>}

      {data && (
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
          {data.map((a, i) => {
            const Icon = (a.icon && iconMap[a.icon]) || Trophy;
            return (
              <motion.div
                key={a.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="rounded-xl border border-border bg-surface p-5 text-center"
              >
                <Icon className="mx-auto mb-3 text-accent" size={22} />
                <p className="text-sm font-medium">{a.title}</p>
                {a.description && <p className="text-xs text-muted mt-1">{a.description}</p>}
              </motion.div>
            );
          })}
        </div>
      )}
    </section>
  );
}
