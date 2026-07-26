/**
 * Projects.tsx
 * ------------------------------------------------------------------
 * #projects section — cards loaded dynamically from the backend
 * (GET /api/projects/, see backend/app/routers/projects.py), exactly
 * as the spec requires ("Project cards should be loaded dynamically
 * from backend APIs"). `ProjectCard` is a small internal component
 * so the featured-project styling logic stays in one place.
 * ------------------------------------------------------------------
 */

import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import { api, ApiProject } from "../lib/api";
import { useApiData } from "../hooks/useApiData";

function ProjectCard({ project, index }: { project: ApiProject; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className={`rounded-xl border p-6 bg-surface hover:bg-surface2 transition ${
        project.featured ? "border-accent/50" : "border-border"
      }`}
    >
      {project.featured && (
        <span className="text-xs font-mono text-accent mb-2 inline-block">FEATURED</span>
      )}
      <h3 className="font-display text-xl font-semibold mb-2">{project.title}</h3>
      <p className="text-muted text-sm leading-relaxed mb-4">{project.description}</p>

      {project.features.length > 0 && (
        <ul className="text-sm text-ink/80 mb-4 space-y-1">
          {project.features.map((f) => (
            <li key={f} className="flex gap-2">
              <span className="text-accent">›</span>
              {f}
            </li>
          ))}
        </ul>
      )}

      <div className="flex flex-wrap gap-2 mb-5">
        {project.tech_stack.map((t) => (
          <span key={t} className="px-2.5 py-1 rounded-md bg-surface2 text-xs text-muted">
            {t}
          </span>
        ))}
      </div>

      <div className="flex gap-4">
        {project.github_link && (
          <a
            href={project.github_link}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 text-sm hover:text-accent transition"
          >
            <Github size={16} /> Code
          </a>
        )}
        {project.live_demo_link && (
          <a
            href={project.live_demo_link}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 text-sm hover:text-accent transition"
          >
            <ExternalLink size={16} /> Live Demo
          </a>
        )}
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const { data, loading, error } = useApiData(api.getProjects);

  return (
    <section id="projects" className="max-w-5xl mx-auto px-6 py-16">
      <p className="text-xs font-mono text-accent mb-3">PROJECTS</p>
      <h2 className="font-display text-3xl font-semibold mb-8">Things I've built</h2>

      {loading && <p className="text-muted text-sm">Loading projects…</p>}
      {error && (
        <p className="text-sm text-muted">
          Couldn't reach the backend ({error}). Make sure the FastAPI server is running and
          has been seeded (<code className="font-mono">python -m app.seed</code>).
        </p>
      )}

      {data && (
        <div className="grid md:grid-cols-2 gap-6">
          {data.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>
      )}
    </section>
  );
}
