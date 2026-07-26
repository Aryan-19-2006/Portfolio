/**
 * About.tsx
 * ------------------------------------------------------------------
 * #about section — education blurb + interest tags. Static content;
 * animates in on scroll via Framer Motion's `whileInView` (fires once,
 * `viewport={{ once: true }}`, so it doesn't replay every scroll).
 * ------------------------------------------------------------------
 */

import { motion } from "framer-motion";
import { siteConfig } from "../config/siteConfig";

const interests = ["Full Stack Development", "AI/ML", "Problem Solving", "Data Structures & Algorithms"];

export default function About() {
  return (
    <section id="about" className="max-w-4xl mx-auto px-6 py-24">
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-xs font-mono text-accent mb-3"
      >
        ABOUT
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.05 }}
        className="font-display text-3xl md:text-4xl font-semibold mb-6"
      >
        Currently a {siteConfig.education.degree} student, building things that work end to end.
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-muted leading-relaxed mb-10"
      >
        I'm pursuing {siteConfig.education.degree} in {siteConfig.education.branch} at {siteConfig.education.institution}
         {" | AICTE Approved & AKTU Affiliated Engineering and Management Programs "}. My focus is full-stack engineering — from
        database design to backend APIs to interfaces people actually enjoy using — with a
        growing interest in applied AI/ML. I care most about solving real problems cleanly,
        which is also why competitive programming and DSA stay part of my routine.
      </motion.p>

      <div className="flex flex-wrap gap-2">
        {interests.map((tag, i) => (
          <motion.span
            key={tag}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.05 * i }}
            className="px-3 py-1.5 rounded-md border border-border text-sm text-ink/90 bg-surface"
          >
            {tag}
          </motion.span>
        ))}
      </div>
    </section>
  );
}
